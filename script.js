const SUBJECT_FILES = {
    preigcse: {
        biology: 'flashcards_biology.txt',
        maths: 'flashcards_math.txt',
        physics: 'flashcards_physics.txt',
        chemistry: 'flashcards_chemistry.txt',
        english: 'flashcards_english.txt',
        history: 'flashcards_history.txt',
        geography: 'flashcards_geography.txt',
        economics: 'flashcards_economics.txt',
        businessstudies: 'flashcards_businessstudies.txt',
        psychology: 'flashcards_psychology.txt',
        chinese: 'flashcards_chinese_firstlanguage.txt'
    },
    igcse: {
        biology: 'igcse/flashcards_biologyigcse.txt',
        maths: 'igcse/flashcards_mathigcse.txt',
        physics: 'igcse/flashcards_physicsigcse.txt',
        chemistry: 'igcse/flashcards_chemistryigcse.txt',
        english: 'igcse/flashcards_englishigcse.txt',
        history: 'igcse/flashcards_historyigcse.txt',
        geography: 'igcse/flashcards_geographyigcse.txt',
        economics: 'igcse/flashcards_economicsigcse.txt',
        businessstudies: 'igcse/flashcards_businessstudiesigcse.txt',
        psychology: 'igcse/flashcards_psychologyigcse.txt',
        chinese: 'igcse/flashcards_chinese_firstlanguage_igcse.txt'
    }
};

const SUBJECT_NAMES = {
    biology: 'Biology',
    maths: 'Mathematics',
    physics: 'Physics',
    chemistry: 'Chemistry',
    english: 'English',
    history: 'History',
    geography: 'Geography',
    economics: 'Economics',
    businessstudies: 'Business Studies',
    psychology: 'Psychology',
    chinese: 'Chinese (First Language)'
};

const LEVEL_SUBJECTS = {
    preigcse: ['biology', 'maths', 'physics', 'chemistry', 'english', 'history', 'geography', 'economics', 'businessstudies', 'psychology', 'chinese'],
    igcse: ['biology', 'maths', 'physics', 'chemistry', 'english', 'history', 'geography', 'economics', 'businessstudies', 'psychology', 'chinese']
};

let flashcardData = {};
let loadedSubjects = new Set();
let currentUser = null;
let userProgress = {
    totalPoints: 0,
    gamesPlayed: 0,
    totalCorrect: 0,
    totalWrong: 0,
    subjects: {}
};

function initUser() {
    const savedUser = localStorage.getItem('flashdash_user');
    const savedProgress = localStorage.getItem('flashdash_progress');
    
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        userProgress = savedProgress ? JSON.parse(savedProgress) : {
            totalPoints: 0,
            gamesPlayed: 0,
            totalCorrect: 0,
            totalWrong: 0,
            subjects: {}
        };
        updateUserInfo();
    } else {
        showLoginModal();
    }
}

function showLoginModal() {
    document.getElementById('login-modal').classList.add('show');
}

function closeLoginModal() {
    document.getElementById('login-modal').classList.remove('show');
}

function login() {
    const username = document.getElementById('username-input').value.trim();
    if (!username) {
        alert('Please enter your name');
        return;
    }
    
    currentUser = {
        id: Date.now().toString(),
        name: username,
        isGuest: false
    };
    
    localStorage.setItem('flashdash_user', JSON.stringify(currentUser));
    
    if (!localStorage.getItem('flashdash_progress')) {
        userProgress = {
            totalPoints: 0,
            gamesPlayed: 0,
            totalCorrect: 0,
            totalWrong: 0,
            subjects: {}
        };
        localStorage.setItem('flashdash_progress', JSON.stringify(userProgress));
    } else {
        userProgress = JSON.parse(localStorage.getItem('flashdash_progress'));
    }
    
    closeLoginModal();
    updateUserInfo();
    updateProgressDisplay();
}

function loginAsGuest() {
    currentUser = {
        id: 'guest_' + Date.now().toString(),
        name: 'Guest',
        isGuest: true
    };
    
    userProgress = {
        totalPoints: 0,
        gamesPlayed: 0,
        totalCorrect: 0,
        totalWrong: 0,
        subjects: {}
    };
    
    closeLoginModal();
    updateUserInfo();
}

function logout() {
    localStorage.removeItem('flashdash_user');
    localStorage.removeItem('flashdash_progress');
    currentUser = null;
    userProgress = {
        totalPoints: 0,
        gamesPlayed: 0,
        totalCorrect: 0,
        totalWrong: 0,
        subjects: {}
    };
    
    updateUserInfo();
    updateProgressDisplay();
    showLoginModal();
}

function updateUserInfo() {
    if (currentUser) {
        document.getElementById('user-name').textContent = currentUser.name;
        document.getElementById('total-points').textContent = userProgress.totalPoints;
        document.getElementById('logout-btn').style.display = currentUser.isGuest ? 'none' : 'block';
    } else {
        document.getElementById('user-name').textContent = 'Player';
        document.getElementById('total-points').textContent = '0';
        document.getElementById('logout-btn').style.display = 'none';
    }
}

function updateProgress(subject, isCorrect, points) {
    if (!currentUser || currentUser.isGuest) return;
    
    userProgress.totalPoints += points;
    userProgress.gamesPlayed++;
    
    if (isCorrect) {
        userProgress.totalCorrect++;
    } else {
        userProgress.totalWrong++;
    }
    
    if (!userProgress.subjects[subject]) {
        userProgress.subjects[subject] = {
            correct: 0,
            wrong: 0,
            totalPoints: 0
        };
    }
    
    if (isCorrect) {
        userProgress.subjects[subject].correct++;
    } else {
        userProgress.subjects[subject].wrong++;
    }
    userProgress.subjects[subject].totalPoints += points;
    
    localStorage.setItem('flashdash_progress', JSON.stringify(userProgress));
    updateUserInfo();
    updateProgressDisplay();
}

function updateProgressDisplay() {
    if (!currentUser) {
        document.getElementById('progress-total-points').textContent = '0';
        document.getElementById('progress-games-played').textContent = '0';
        document.getElementById('progress-total-correct').textContent = '0';
        document.getElementById('progress-accuracy').textContent = '0%';
        document.getElementById('progress-subjects-content').innerHTML = '<div class="progress-subject-row"><span colspan="4" style="grid-column: 1 / -1; text-align: center;">Please login to track progress</span></div>';
        return;
    }
    
    document.getElementById('progress-total-points').textContent = userProgress.totalPoints;
    document.getElementById('progress-games-played').textContent = userProgress.gamesPlayed;
    document.getElementById('progress-total-correct').textContent = userProgress.totalCorrect;
    
    const totalAnswers = userProgress.totalCorrect + userProgress.totalWrong;
    const accuracy = totalAnswers > 0 ? Math.round((userProgress.totalCorrect / totalAnswers) * 100) : 0;
    document.getElementById('progress-accuracy').textContent = accuracy + '%';
    
    let content = '';
    const subjects = Object.keys(userProgress.subjects);
    
    if (subjects.length === 0) {
        content = '<div class="progress-subject-row"><span style="grid-column: 1 / -1; text-align: center; color: var(--apple-gray);">No progress yet. Start playing!</span></div>';
    } else {
        subjects.forEach(subject => {
            const subjProgress = userProgress.subjects[subject];
            const subjTotal = subjProgress.correct + subjProgress.wrong;
            const subjAccuracy = subjTotal > 0 ? Math.round((subjProgress.correct / subjTotal) * 100) : 0;
            content += `
                <div class="progress-subject-row">
                    <span class="progress-subject-name">${SUBJECT_NAMES[subject] || subject}</span>
                    <span class="progress-subject-score">${subjAccuracy}%</span>
                    <span class="progress-subject-correct">${subjProgress.correct}</span>
                    <span class="progress-subject-wrong">${subjProgress.wrong}</span>
                </div>
            `;
        });
    }
    
    document.getElementById('progress-subjects-content').innerHTML = content;
}

function loginWithGoogle() {
    window.location.href = '/auth/google';
}

function loginWithMicrosoft() {
    window.location.href = '/auth/microsoft';
}

function loginWithWeChat() {
    window.location.href = '/auth/wechat';
}

async function loadUser() {
    try {
        const res = await fetch('/api/me');
        const user = await res.json();
        
        if (user) {
            currentUser = {
                id: user.id,
                name: user.name,
                isGuest: false
            };
            
            localStorage.setItem('flashdash_user', JSON.stringify(currentUser));
            
            userProgress = {
                totalPoints: user.score || 0,
                gamesPlayed: user.gamesPlayed || 0,
                totalCorrect: user.totalCorrect || 0,
                totalWrong: user.totalWrong || 0,
                subjects: user.subjects || {}
            };
            
            localStorage.setItem('flashdash_progress', JSON.stringify(userProgress));
            
            document.getElementById('loginSection').style.display = 'none';
            
            closeLoginModal();
            updateUserInfo();
            updateProgressDisplay();
        }
    } catch (err) {
        console.log('Not logged in via OAuth');
    }
}

async function saveUserProgress(score, progressPercent, cardsCompleted) {
    try {
        await fetch('/api/save-progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                score: score,
                progress: progressPercent,
                completedCards: cardsCompleted
            })
        });
        console.log('✅ Progress saved!');
        loadUser();
    } catch (err) {
        console.log('Backend not available, using localStorage');
    }
}

let currentLevel = 'preigcse';

function transformQuestion(question) {
    if (!question) return question;
    
    let transformed = question.trim();
    
    const transformations = [
        { regex: /^Define\s+(.+)/i, replace: 'What does $1 mean?' },
        { regex: /^What is\s+(.+)\?$/i, replace: 'What is $1?' },
        { regex: /^Explain\s+(.+)/i, replace: 'Explain what $1 is.' },
        { regex: /^Describe\s+(.+)/i, replace: 'Describe what $1 is.' },
        { regex: /^State\s+(.+)/i, replace: 'State what $1 is.' },
        { regex: /^Name\s+(.+)/i, replace: 'Name $1.' },
        { regex: /^List\s+(.+)/i, replace: 'List $1.' },
        { regex: /^Compare\s+(.+)/i, replace: 'Compare $1.' },
        { regex: /^Contrast\s+(.+)/i, replace: 'Contrast $1.' },
        { regex: /^Analyze\s+(.+)/i, replace: 'Analyze $1.' },
        { regex: /^Evaluate\s+(.+)/i, replace: 'Evaluate $1.' },
        { regex: /^Discuss\s+(.+)/i, replace: 'Discuss $1.' },
        { regex: /^Solve\s+(.+)/i, replace: 'Solve: $1' },
        { regex: /^Calculate\s+(.+)/i, replace: 'Calculate: $1' },
        { regex: /^Find\s+(.+)/i, replace: 'Find: $1' }
    ];
    
    for (const { regex, replace } of transformations) {
        if (regex.test(transformed)) {
            transformed = transformed.replace(regex, replace);
            break;
        }
    }
    
    return transformed;
}

async function loadSubjectData(subjectId) {
    const levelKey = `${currentLevel}_${subjectId}`;
    if (loadedSubjects.has(levelKey)) {
        return flashcardData[levelKey];
    }
    
    const fileName = SUBJECT_FILES[currentLevel]?.[subjectId];
    if (!fileName) {
        console.error(`No file found for subject: ${subjectId} at level: ${currentLevel}`);
        return null;
    }
    
    try {
        const response = await fetch(fileName);
        const text = await response.text();
        
        const startIndex = text.indexOf('[');
        const endIndex = text.lastIndexOf(']') + 1;
        
        if (startIndex !== -1 && endIndex !== -1) {
            let jsonString = text.substring(startIndex, endIndex);
            
            jsonString = jsonString.replace(/\/\/.*$/gm, '');
            jsonString = jsonString.replace(/,\s*]/g, ']');
            jsonString = jsonString.replace(/,\s*}/g, '}');
            
            jsonString = jsonString.replace(/,\s*\n\s*\n\s*question:/g, ',\n    {\n        question:');
            
            const lines = jsonString.split('\n');
            const quotedLines = lines.map(line => {
                return line.replace(/^\s*(\w+):/, '    "$1":');
            });
            jsonString = quotedLines.join('\n');
            
            try {
                let flashcards = JSON.parse(jsonString);
                
                flashcards = flashcards.map(card => ({
                    ...card,
                    question: transformQuestion(card.question)
                }));
                
                flashcardData[levelKey] = {
                    name: SUBJECT_NAMES[subjectId] || subjectId,
                    flashcards: flashcards
                };
                loadedSubjects.add(levelKey);
                return flashcardData[levelKey];
            } catch (parseError) {
                console.error(`JSON parse error in ${fileName}:`, parseError);
                return null;
            }
        }
    } catch (error) {
        console.error(`Error loading ${fileName}:`, error);
        return null;
    }
    
    return null;
}

function setLevel(level) {
    currentLevel = level;
    updateSubjectDisplay();
}

function updateSubjectDisplay() {
    const subjectsContainer = document.querySelector('.subject-grid');
    const subjects = LEVEL_SUBJECTS[currentLevel];
    
    subjectsContainer.innerHTML = '';
    
    subjects.forEach(subjectId => {
        const card = document.createElement('div');
        card.className = 'subject-card';
        card.setAttribute('data-subject', subjectId);
        
        const icon = getSubjectIcon(subjectId);
        
        card.innerHTML = `
            ${icon}
            <h3>${SUBJECT_NAMES[subjectId]}</h3>
        `;
        
        card.addEventListener('click', () => selectSubject(subjectId));
        subjectsContainer.appendChild(card);
    });
}

function getSubjectIcon(subjectId) {
    const icons = {
        biology: '<i class="fas fa-dna"></i>',
        maths: '<i class="fas fa-calculator"></i>',
        physics: '<i class="fas fa-atom"></i>',
        chemistry: '<i class="fas fa-flask"></i>',
        english: '<i class="fas fa-book-open"></i>',
        history: '<i class="fas fa-history"></i>',
        geography: '<i class="fas fa-globe"></i>',
        economics: '<i class="fas fa-chart-line"></i>',
        businessstudies: '<i class="fas fa-briefcase"></i>',
        psychology: '<i class="fas fa-brain"></i>',
        chinese: '<i class="fas fa-language"></i>'
    };
    
    return icons[subjectId] || '<i class="fas fa-question-circle"></i>';
}

let currentSubject = null;
let currentFlashcards = [];
let originalFlashcards = [];
let wrongFlashcards = [];
let currentIndex = 0;
let timer = 15;
let timerInterval = null;
let roundPoints = 0;
let totalPoints = 0;
let correctCount = 0;
let wrongCount = 0;
let consecutiveCorrect = 0;
let doublePointsActive = false;
let powerUpsAvailable = false;
let powerUpDoublePointsUsed = false;
let powerUpSkipUsed = false;
let powerUpHintUsed = false;
let currentUser = { name: 'Player', isLoggedIn: true };

const MAX_QUESTIONS_PER_ROUND = 20;

class SoundManager {
    constructor() {
        this.audioContext = null;
    }

    init() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    playCorrect() {
        this.init();
        const oscillator1 = this.audioContext.createOscillator();
        const oscillator2 = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator1.connect(gainNode);
        oscillator2.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator1.type = 'sine';
        oscillator2.type = 'sine';
        
        oscillator1.frequency.setValueAtTime(523.25, this.audioContext.currentTime);
        oscillator1.frequency.setValueAtTime(659.25, this.audioContext.currentTime + 0.1);
        oscillator1.frequency.setValueAtTime(783.99, this.audioContext.currentTime + 0.2);
        oscillator1.frequency.setValueAtTime(1046.50, this.audioContext.currentTime + 0.3);
        
        oscillator2.frequency.setValueAtTime(659.25, this.audioContext.currentTime);
        oscillator2.frequency.setValueAtTime(783.99, this.audioContext.currentTime + 0.1);
        oscillator2.frequency.setValueAtTime(880, this.audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0.25, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
        
        oscillator1.start(this.audioContext.currentTime);
        oscillator2.start(this.audioContext.currentTime);
        oscillator1.stop(this.audioContext.currentTime + 0.5);
        oscillator2.stop(this.audioContext.currentTime + 0.5);
    }

    playWrong() {
        this.init();
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
        oscillator.frequency.setValueAtTime(150, this.audioContext.currentTime + 0.15);
        oscillator.frequency.setValueAtTime(100, this.audioContext.currentTime + 0.3);
        
        gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.6);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.6);
    }

    playCountdown(number) {
        this.init();
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        const frequencies = {
            5: 523.25,
            4: 587.33,
            3: 659.25,
            2: 783.99,
            1: 1046.50
        };
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequencies[number] || 523.25, this.audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0.4, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.15);
    }

    playBuzzer() {
        this.init();
        
        const oscillator1 = this.audioContext.createOscillator();
        const oscillator2 = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator1.connect(gainNode);
        oscillator2.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator1.type = 'square';
        oscillator2.type = 'sawtooth';
        
        oscillator1.frequency.setValueAtTime(100, this.audioContext.currentTime);
        oscillator2.frequency.setValueAtTime(150, this.audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0.5, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.8);
        
        oscillator1.start(this.audioContext.currentTime);
        oscillator2.start(this.audioContext.currentTime);
        oscillator1.stop(this.audioContext.currentTime + 0.8);
        oscillator2.stop(this.audioContext.currentTime + 0.8);
    }

    playCheer() {
        this.init();
        
        const playClap = () => {
            const noiseBuffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 0.1, this.audioContext.sampleRate);
            const output = noiseBuffer.getChannelData(0);
            for (let i = 0; i < noiseBuffer.length; i++) {
                output[i] = Math.random() * 2 - 1;
            }
            
            const noiseSource = this.audioContext.createBufferSource();
            noiseSource.buffer = noiseBuffer;
            
            const filter = this.audioContext.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.value = 800;
            filter.Q.value = 0.5;
            
            const gainNode = this.audioContext.createGain();
            gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
            
            noiseSource.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            noiseSource.start();
        };
        
        for (let i = 0; i < 12; i++) {
            setTimeout(playClap, i * 150);
        }
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, this.audioContext.currentTime);
        oscillator.frequency.setValueAtTime(554.37, this.audioContext.currentTime + 0.2);
        oscillator.frequency.setValueAtTime(659.25, this.audioContext.currentTime + 0.4);
        oscillator.frequency.setValueAtTime(880, this.audioContext.currentTime + 0.6);
        
        gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 2);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 2);
    }

    playCardFlip() {
        this.init();
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();
        
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.2);
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2000, this.audioContext.currentTime);
        filter.frequency.exponentialRampToValueAtTime(500, this.audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.2);
    }

    playPowerUpUnlock() {
        this.init();
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, this.audioContext.currentTime);
        oscillator.frequency.setValueAtTime(554.37, this.audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(659.25, this.audioContext.currentTime + 0.2);
        oscillator.frequency.setValueAtTime(880, this.audioContext.currentTime + 0.3);
        
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.5);
    }

    playPowerUpUse() {
        this.init();
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(1200, this.audioContext.currentTime);
        oscillator.frequency.setValueAtTime(1500, this.audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(1800, this.audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.3);
    }

    playButtonClick() {
        this.init();
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.05);
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.05);
    }

    playScoreIncrease() {
        this.init();
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime);
        oscillator.frequency.setValueAtTime(700, this.audioContext.currentTime + 0.08);
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime + 0.16);
        oscillator.frequency.setValueAtTime(900, this.audioContext.currentTime + 0.24);
        
        gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.3);
    }

    playRoundComplete() {
        this.init();
        
        const notes = [523.25, 659.25, 783.99, 1046.50, 1244.51];
        
        notes.forEach((freq, i) => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime + i * 0.15);
            
            gainNode.gain.setValueAtTime(0.25, this.audioContext.currentTime + i * 0.15);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + i * 0.15 + 0.3);
            
            oscillator.start(this.audioContext.currentTime + i * 0.15);
            oscillator.stop(this.audioContext.currentTime + i * 0.15 + 0.3);
        });
    }

    playGameStart() {
        this.init();
        
        const oscillator1 = this.audioContext.createOscillator();
        const oscillator2 = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator1.connect(gainNode);
        oscillator2.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator1.type = 'sine';
        oscillator2.type = 'sine';
        
        oscillator1.frequency.setValueAtTime(440, this.audioContext.currentTime);
        oscillator1.frequency.setValueAtTime(554.37, this.audioContext.currentTime + 0.15);
        oscillator1.frequency.setValueAtTime(659.25, this.audioContext.currentTime + 0.3);
        
        oscillator2.frequency.setValueAtTime(880, this.audioContext.currentTime);
        oscillator2.frequency.setValueAtTime(1108.73, this.audioContext.currentTime + 0.15);
        oscillator2.frequency.setValueAtTime(1318.51, this.audioContext.currentTime + 0.3);
        
        gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
        
        oscillator1.start(this.audioContext.currentTime);
        oscillator2.start(this.audioContext.currentTime);
        oscillator1.stop(this.audioContext.currentTime + 0.5);
        oscillator2.stop(this.audioContext.currentTime + 0.5);
    }
}

const soundManager = new SoundManager();

function trackEvent(eventName, properties = {}) {
    if (typeof posthog !== 'undefined') {
        posthog.capture(eventName, properties);
    }
}

let redFlashActive = false;

function triggerRedFlash() {
    if (redFlashActive) return;
    redFlashActive = true;
    
    const gameSection = document.getElementById('game');
    if (gameSection) {
        gameSection.classList.add('red-flash');
    }
}

function stopRedFlash() {
    redFlashActive = false;
    const gameSection = document.getElementById('game');
    if (gameSection) {
        gameSection.classList.remove('red-flash');
    }
}

const TTS_CONFIG = {
    elevenlabs: {
        apiKey: '',
        voiceId: '21m00Tcm4TlvDq8ikWAM',
        url: 'https://api.elevenlabs.io/v1/text-to-speech'
    },
    openai: {
        apiKey: '',
        url: 'https://api.openai.com/v1/audio/speech'
    },
    google: {
        apiKey: '',
        url: 'https://texttospeech.googleapis.com/v1/text:synthesize'
    }
};

async function playQuestionAudio() {
    const question = document.getElementById('question').textContent;
    if (!question || question.trim() === '') return;
    
    const audioBtn = document.getElementById('audio-btn');
    audioBtn.classList.add('active');
    
    let played = false;
    
    if (TTS_CONFIG.elevenlabs.apiKey) {
        played = await playElevenLabsAudio(question, audioBtn);
    }
    
    if (!played && TTS_CONFIG.openai.apiKey) {
        played = await playOpenAIAudio(question, audioBtn);
    }
    
    if (!played && TTS_CONFIG.google.apiKey) {
        played = await playGoogleAudio(question, audioBtn);
    }
    
    if (!played && 'speechSynthesis' in window) {
        playBrowserAudio(question, audioBtn);
    } else if (!played) {
        audioBtn.classList.remove('active');
    }
}

async function playElevenLabsAudio(text, audioBtn) {
    try {
        const response = await fetch(`${TTS_CONFIG.elevenlabs.url}/${TTS_CONFIG.elevenlabs.voiceId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'xi-api-key': TTS_CONFIG.elevenlabs.apiKey
            },
            body: JSON.stringify({
                text: text,
                model_id: 'eleven_monolingual_v1',
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.5
                }
            })
        });
        
        if (response.ok) {
            const audioBlob = await response.blob();
            await playAudioBlob(audioBlob, audioBtn);
            return true;
        }
    } catch (error) {
        console.error('ElevenLabs TTS error:', error);
    }
    return false;
}

async function playOpenAIAudio(text, audioBtn) {
    try {
        const response = await fetch(TTS_CONFIG.openai.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TTS_CONFIG.openai.apiKey}`
            },
            body: JSON.stringify({
                model: 'tts-1',
                input: text,
                voice: 'nova',
                response_format: 'mp3'
            })
        });
        
        if (response.ok) {
            const audioBlob = await response.blob();
            await playAudioBlob(audioBlob, audioBtn);
            return true;
        }
    } catch (error) {
        console.error('OpenAI TTS error:', error);
    }
    return false;
}

async function playGoogleAudio(text, audioBtn) {
    try {
        const response = await fetch(`${TTS_CONFIG.google.url}?key=${TTS_CONFIG.google.apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                input: { text: text },
                voice: {
                    languageCode: 'en-US',
                    name: 'en-US-Standard-C',
                    ssmlGender: 'FEMALE'
                },
                audioConfig: {
                    audioEncoding: 'MP3',
                    speakingRate: 0.8
                }
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            const audioBytes = data.audioContent;
            const audioBlob = base64ToBlob(audioBytes, 'audio/mp3');
            await playAudioBlob(audioBlob, audioBtn);
            return true;
        }
    } catch (error) {
        console.error('Google TTS error:', error);
    }
    return false;
}

function playBrowserAudio(text, audioBtn) {
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB';
    utterance.rate = 0.8;
    utterance.pitch = 0.9;
    utterance.volume = 1;
    
    const voices = window.speechSynthesis.getVoices();
    
    const maleUKVoices = [
        'Google UK English Male', 'Microsoft David - English (United Kingdom)',
        'Google English (UK, male)', 'Microsoft George - English (United Kingdom)',
        'Brian', 'Daniel', 'Oliver', 'William', 'James', 'Harry'
    ];
    
    let selectedVoice = voices.find(voice => 
        maleUKVoices.some(mv => voice.name.toLowerCase().includes(mv.toLowerCase()))
    );
    
    if (!selectedVoice) {
        selectedVoice = voices.find(voice => 
            voice.lang.startsWith('en-GB') && voice.gender === 'male'
        );
    }
    
    if (!selectedVoice) {
        selectedVoice = voices.find(voice => 
            voice.lang.startsWith('en-GB') && voice.name.toLowerCase().includes('male')
        );
    }
    
    if (!selectedVoice) {
        selectedVoice = voices.find(voice => voice.lang.startsWith('en-GB'));
    }
    
    if (!selectedVoice) {
        selectedVoice = voices.find(voice => 
            voice.lang.startsWith('en') && voice.gender === 'male'
        );
    }
    
    if (!selectedVoice) {
        selectedVoice = voices.find(voice => voice.lang.startsWith('en'));
    }
    
    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }
    
    utterance.onend = () => {
        audioBtn.classList.remove('active');
    };
    
    utterance.onerror = () => {
        audioBtn.classList.remove('active');
    };
    
    window.speechSynthesis.speak(utterance);
}

async function playAudioBlob(blob, audioBtn) {
    return new Promise((resolve) => {
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        
        audio.onended = () => {
            URL.revokeObjectURL(audioUrl);
            audioBtn.classList.remove('active');
            resolve();
        };
        
        audio.onerror = () => {
            URL.revokeObjectURL(audioUrl);
            audioBtn.classList.remove('active');
            resolve();
        };
        
        audio.play();
    });
}

function base64ToBlob(base64, mimeType) {
    const byteString = atob(base64);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    
    for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
    }
    
    return new Blob([uint8Array], { type: mimeType });
}



function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    document.querySelector(`[href="#${sectionId}"]`)?.classList.add('active');
}

function showSubjects() { showSection('subjects'); }
function goHome() { showSection('home'); }

function showLoading(message = 'Loading...') {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <p>${message}</p>
        </div>
    `;
    document.body.appendChild(loadingOverlay);
    return loadingOverlay;
}

function hideLoading(overlay) {
    if (overlay && overlay.parentNode) {
        overlay.remove();
    }
}

function showErrorMessage(title, message) {
    const errorOverlay = document.createElement('div');
    errorOverlay.className = 'error-overlay';
    errorOverlay.innerHTML = `
        <div class="error-content">
            <div class="error-icon">
                <i class="fas fa-exclamation-circle"></i>
            </div>
            <h3>${title}</h3>
            <p>${message}</p>
            <button class="error-close-btn" onclick="this.parentElement.parentElement.remove()">
                OK
            </button>
        </div>
    `;
    document.body.appendChild(errorOverlay);
}

async function selectSubject(subjectId) {
    const loadingOverlay = showLoading(`Loading ${SUBJECT_NAMES[subjectId]}...`);
    
    try {
        const data = await loadSubjectData(subjectId);
        if (!data) {
            hideLoading(loadingOverlay);
            showErrorMessage(
                'Flashcards Not Found',
                `Sorry, we couldn't load the ${SUBJECT_NAMES[subjectId]} flashcards. Please try again later.`
            );
            return;
        }
        
        if (data.flashcards.length === 0) {
            hideLoading(loadingOverlay);
            showErrorMessage(
                'No Flashcards Available',
                `There are no flashcards available for ${SUBJECT_NAMES[subjectId]} yet. Please check back later.`
            );
            return;
        }
        
        trackEvent('subject_selected', { subject: subjectId, subject_name: data.name });
        
        currentSubject = subjectId;
        originalFlashcards = [...data.flashcards];
        currentFlashcards = getRandomFlashcards(originalFlashcards, MAX_QUESTIONS_PER_ROUND);
        currentIndex = 0;
        roundPoints = 0;
        correctCount = 0;
        wrongCount = 0;
        consecutiveCorrect = 0;
        doublePointsActive = false;
        powerUpsAvailable = false;
        powerUpDoublePointsUsed = false;
        powerUpSkipUsed = false;
        powerUpHintUsed = false;
        
        document.getElementById('game-subject').textContent = data.name;
        document.getElementById('current-question').textContent = '1';
        document.getElementById('total-questions').textContent = currentFlashcards.length;
        document.getElementById('round-points').textContent = '0';
        
        hideLoading(loadingOverlay);
        resetTimer();
        loadFlashcard();
        showSection('game');
    } catch (error) {
        hideLoading(loadingOverlay);
        showErrorMessage(
            'Unexpected Error',
            'Something went wrong while loading the flashcards. Please try again.'
        );
        console.error('Error selecting subject:', error);
    }
}

function getRandomFlashcards(flashcards, count) {
    const shuffled = [...flashcards];
    shuffleArray(shuffled);
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function loadFlashcard() {
    if (currentIndex >= currentFlashcards.length) {
        endGame();
        return;
    }
    
    const flashcardElement = document.getElementById('flashcard');
    flashcardElement.style.opacity = '1';
    flashcardElement.style.transform = 'rotateY(0deg)';
    
    const flashcard = currentFlashcards[currentIndex];
    document.getElementById('question').textContent = flashcard.question;
    document.getElementById('answer').textContent = flashcard.answer;
    
    document.getElementById('explanation').textContent = flashcard.explanation ? `💡 ${flashcard.explanation}` : '';
    document.getElementById('example').textContent = flashcard.example ? `📝 ${flashcard.example}` : '';
    
    flashcardElement.classList.remove('flipped');
    generateOptions(flashcard);
    resetOptionButtons();
}

let currentOptions = [];

function generateOptions(currentFlashcard) {
    const correctAnswer = currentFlashcard.answer;
    const wrongAnswers = [currentFlashcard.wrong1, currentFlashcard.wrong2, currentFlashcard.wrong3].filter(Boolean);
    
    currentOptions = [correctAnswer, ...wrongAnswers];
    
    while (currentOptions.length < 4) {
        const randomSubject = Object.keys(SUBJECT_FILES)[Math.floor(Math.random() * Object.keys(SUBJECT_FILES).length)];
        if (flashcardData[randomSubject] && flashcardData[randomSubject].flashcards.length > 0) {
            const randomCard = flashcardData[randomSubject].flashcards[Math.floor(Math.random() * flashcardData[randomSubject].flashcards.length)];
            if (!currentOptions.includes(randomCard.answer)) {
                currentOptions.push(randomCard.answer);
            }
        }
    }
    
    shuffleArray(currentOptions);
    
    for (let i = 0; i < 4; i++) {
        document.getElementById(`option-text-${i}`).textContent = currentOptions[i];
    }
}

function resetOptionButtons() {
    for (let i = 0; i < 4; i++) {
        const btn = document.getElementById(`option-${i}`);
        btn.classList.remove('correct', 'wrong', 'disabled', 'selected');
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'auto';
    }
}

function resetTimer() {
    timer = 15;
    stopRedFlash();
    
    document.getElementById('timer').textContent = timer;
    document.getElementById('timer').classList.remove('timer-warning');
    
    const timerBar = document.getElementById('timer-bar');
    timerBar.style.width = '100%';
    timerBar.classList.remove('warning');
    
    if (timerInterval) clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        timer--;
        document.getElementById('timer').textContent = timer;
        timerBar.style.width = `${(timer / 15) * 100}%`;
        
        if (timer <= 5) {
            document.getElementById('timer').classList.add('timer-warning');
            timerBar.classList.add('warning');
            triggerRedFlash();
        }
        
        if (timer <= 0) handleTimeout();
    }, 1000);
}

function flipCard() {
    document.getElementById('flashcard').classList.toggle('flipped');
}

function apply5050Split() {
    const currentFlashcard = currentFlashcards[currentIndex];
    const correctAnswer = currentFlashcard.answer;
    const wrongOptions = currentOptions.filter(opt => opt !== correctAnswer);
    const optionsToRemove = [];
    
    while (optionsToRemove.length < 2 && wrongOptions.length > 0) {
        const randomIndex = Math.floor(Math.random() * wrongOptions.length);
        optionsToRemove.push(wrongOptions.splice(randomIndex, 1)[0]);
    }
    
    document.querySelectorAll('.option-btn').forEach((btn, index) => {
        if (optionsToRemove.includes(currentOptions[index])) {
            btn.style.opacity = '0.3';
            btn.style.pointerEvents = 'none';
        }
    });
}

function selectAnswer(optionIndex) {
    clearInterval(timerInterval);
    
    const selectedAnswer = currentOptions[optionIndex];
    const currentFlashcard = currentFlashcards[currentIndex];
    const isCorrect = selectedAnswer === currentFlashcard.answer;
    
    document.querySelectorAll('.option-btn').forEach(btn => btn.classList.add('disabled'));
    
    if (isCorrect) {
        trackEvent('answer_correct', { subject: currentSubject, question_index: currentIndex, time_remaining: timer });
        soundManager.playCorrect();
        correctCount++;
        consecutiveCorrect++;
        
        const basePoints = Math.max(10, timer * 2);
        const multiplier = doublePointsActive ? 2 : 1;
        roundPoints += basePoints * multiplier;
        document.getElementById('round-points').textContent = roundPoints;
        
        if (currentFlashcards.length === MAX_QUESTIONS_PER_ROUND && consecutiveCorrect >= 3 && !powerUpsAvailable) {
            powerUpsAvailable = true;
            showPowerUpNotification();
            trackEvent('powerups_unlocked', { subject: currentSubject });
        }
        
        if (consecutiveCorrect >= 3) {
            totalPoints += 100;
            document.getElementById('total-points').textContent = totalPoints;
            consecutiveCorrect = 0;
        }
        
        document.getElementById(`option-${optionIndex}`).classList.add('correct');
        createConfetti();
        
        const cardIndex = wrongFlashcards.findIndex(card => card.question === currentFlashcard.question && card.subject === currentSubject);
        if (cardIndex !== -1) {
            wrongFlashcards.splice(cardIndex, 1);
        }
        
        updateProgress(currentSubject, true, basePoints * multiplier);
    } else {
        trackEvent('answer_incorrect', { subject: currentSubject, question_index: currentIndex, time_remaining: timer });
        soundManager.playWrong();
        wrongCount++;
        consecutiveCorrect = 0;
        
        if (!wrongFlashcards.some(fc => fc.question === currentFlashcard.question)) {
            wrongFlashcards.push({ ...currentFlashcard, subject: currentSubject });
        }
        
        document.getElementById(`option-${optionIndex}`).classList.add('wrong');
        
        const correctIndex = currentOptions.indexOf(currentFlashcard.answer);
        if (correctIndex !== -1) {
            document.getElementById(`option-${correctIndex}`).classList.add('correct');
        }
        
        updateProgress(currentSubject, false, 0);
    }
    
    setTimeout(() => {
        flipCard();
    }, 200);
    
    setTimeout(() => {
        const flashcard = document.getElementById('flashcard');
        flashcard.style.opacity = '0';
        flashcard.style.transform = 'translateY(-20px) rotateY(180deg)';
    }, 2000);
    
    setTimeout(() => nextQuestion(), 3000);
}

function showPowerUpNotification() {
    const notification = document.createElement('div');
    notification.className = 'powerup-notification';
    notification.innerHTML = `
        <div class="powerup-content">
            <span class="powerup-title">🎉 Power-Ups Unlocked!</span>
            <div class="powerup-buttons">
                <button class="powerup-btn" id="powerup-double" onclick="usePowerUp('double')" ${powerUpDoublePointsUsed ? 'disabled' : ''}>
                    <span>⚡</span> Double Points
                </button>
                <button class="powerup-btn" id="powerup-skip" onclick="usePowerUp('skip')" ${powerUpSkipUsed ? 'disabled' : ''}>
                    <span>➡️</span> Skip Question
                </button>
                <button class="powerup-btn" id="powerup-hint" onclick="usePowerUp('hint')" ${powerUpHintUsed ? 'disabled' : ''}>
                    <span>🎯</span> 50/50 Split
                </button>
            </div>
        </div>
    `;
    document.getElementById('game').appendChild(notification);
    
    setTimeout(() => notification.remove(), 8000);
}

function usePowerUp(type) {
    switch(type) {
        case 'double':
            if (!powerUpDoublePointsUsed) {
                powerUpDoublePointsUsed = true;
                doublePointsActive = true;
                document.getElementById('powerup-double').disabled = true;
                trackEvent('powerup_used', { powerup_type: 'double_points', subject: currentSubject });
                setTimeout(() => doublePointsActive = false, 30000);
            }
            break;
        case 'skip':
            if (!powerUpSkipUsed) {
                powerUpSkipUsed = true;
                document.getElementById('powerup-skip').disabled = true;
                trackEvent('powerup_used', { powerup_type: 'skip', subject: currentSubject });
                nextQuestion();
            }
            break;
        case 'hint':
            if (!powerUpHintUsed) {
                powerUpHintUsed = true;
                document.getElementById('powerup-hint').disabled = true;
                trackEvent('powerup_used', { powerup_type: '5050_split', subject: currentSubject });
                apply5050Split();
            }
            break;
    }
    
    const notification = document.querySelector('.powerup-notification');
    if (notification) notification.remove();
}

function handleTimeout() {
    clearInterval(timerInterval);
    
    document.querySelectorAll('.option-btn').forEach(btn => btn.classList.add('disabled'));
    
    setTimeout(() => {
        flipCard();
    }, 200);
    
    setTimeout(() => {
        wrongCount++;
        consecutiveCorrect = 0;
        
        const currentFlashcard = currentFlashcards[currentIndex];
        if (!wrongFlashcards.some(fc => fc.question === currentFlashcard.question)) {
            wrongFlashcards.push({ ...currentFlashcard, subject: currentSubject });
        }
        
        const correctIndex = currentOptions.indexOf(currentFlashcard.answer);
        if (correctIndex !== -1) {
            document.getElementById(`option-${correctIndex}`).classList.add('correct');
        }
        
        const flashcard = document.getElementById('flashcard');
        flashcard.style.opacity = '0';
        flashcard.style.transform = 'translateY(-20px) rotateY(180deg)';
    }, 2000);
    
    setTimeout(() => nextQuestion(), 3000);
}

function nextQuestion() {
    currentIndex++;
    document.getElementById('current-question').textContent = currentIndex + 1;
    resetTimer();
    loadFlashcard();
}

function endGame() {
    clearInterval(timerInterval);
    
    const totalQuestions = correctCount + wrongCount;
    const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    
    trackEvent('game_ended', {
        subject: currentSubject,
        correct_count: correctCount,
        wrong_count: wrongCount,
        accuracy: accuracy,
        points_earned: roundPoints,
        is_full_game: currentFlashcards.length === MAX_QUESTIONS_PER_ROUND
    });
    
    if (currentFlashcards.length === MAX_QUESTIONS_PER_ROUND) {
        soundManager.playCheer();
        createFireworks();
    }
    
    totalPoints += roundPoints;
    document.getElementById('total-points').textContent = totalPoints;
    
    document.getElementById('correct-count').textContent = correctCount;
    document.getElementById('wrong-count').textContent = wrongCount;
    document.getElementById('accuracy').textContent = `${accuracy}%`;
    document.getElementById('earned-points').textContent = roundPoints;
    
    updateLeaderboard(correctCount, wrongCount, accuracy, roundPoints);
    
    const redemptionBtn = document.getElementById('redemption-btn');
    const redemptionInfo = document.getElementById('redemption-info');
    const subjectWrongCards = wrongFlashcards.filter(card => card.subject === currentSubject);
    
    if (subjectWrongCards.length > 0) {
        redemptionInfo.textContent = `${subjectWrongCards.length} questions need review`;
        redemptionBtn.style.display = 'inline-block';
    } else {
        redemptionInfo.textContent = '';
        redemptionBtn.style.display = 'none';
    }
    
    saveUserProgress();
    showSection('results');
}

function startRedemptionQuiz() {
    const subjectWrongCards = wrongFlashcards.filter(card => card.subject === currentSubject);
    if (subjectWrongCards.length === 0) return;
    
    currentFlashcards = [...subjectWrongCards];
    shuffleArray(currentFlashcards);
    currentIndex = 0;
    roundPoints = 0;
    correctCount = 0;
    wrongCount = 0;
    consecutiveCorrect = 0;
    doublePointsActive = false;
    powerUpsAvailable = false;
    powerUpDoublePointsUsed = false;
    powerUpSkipUsed = false;
    powerUpHintUsed = false;
    
    document.getElementById('game-subject').textContent = `Redemption - ${SUBJECT_NAMES[currentSubject] || 'Review'}`;
    document.getElementById('current-question').textContent = '1';
    document.getElementById('total-questions').textContent = currentFlashcards.length;
    document.getElementById('round-points').textContent = '0';
    
    resetTimer();
    loadFlashcard();
    showSection('game');
}

function playAgain() { selectSubject(currentSubject); }

let scoreboardRefreshInterval = null;

function startScoreboardRefresh() {
    if (scoreboardRefreshInterval) clearInterval(scoreboardRefreshInterval);
    scoreboardRefreshInterval = setInterval(() => {
        updateLeaderboardDisplay();
    }, 10000);
}

function stopScoreboardRefresh() {
    if (scoreboardRefreshInterval) {
        clearInterval(scoreboardRefreshInterval);
        scoreboardRefreshInterval = null;
    }
}

function updateLeaderboardDisplay() {
    const tableBody = document.querySelector('#leaderboard-table tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    leaderboard.forEach((player, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="rank">${index + 1}</td>
            <td class="player-name">${player.name}</td>
            <td class="player-subject">${player.subject}</td>
            <td class="player-points">${player.points}</td>
        `;
        tableBody.appendChild(row);
    });
}

function exportScoresToExcel() {
    let csv = 'Rank,Name,Subject,Points\n';
    
    leaderboard.forEach((player, index) => {
        csv += `${index + 1},${player.name},${player.subject},${player.points}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `flash-dash-scores-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    trackEvent('scores_exported', { count: leaderboard.length });
}

const leaderboard = [
    { name: 'Alex Johnson', points: 2500, subject: 'Mathematics' },
    { name: 'Sarah Williams', points: 2200, subject: 'Physics' },
    { name: 'Michael Chen', points: 1900, subject: 'Chemistry' },
    { name: 'Emma Davis', points: 1750, subject: 'Biology' },
    { name: 'James Wilson', points: 1600, subject: 'History' },
    { name: 'Olivia Brown', points: 1450, subject: 'Geography' },
    { name: 'William Taylor', points: 1300, subject: 'Economics' },
    { name: 'Sophia Martinez', points: 1150, subject: 'English' },
    { name: 'David Anderson', points: 1000, subject: 'Mathematics' },
    { name: 'Isabella Thomas', points: 850, subject: 'Physics' }
];

function updateLeaderboard(correct, wrong, accuracy, points) {
    leaderboard.push({ name: currentUser?.name || 'Player', points: points, subject: SUBJECT_NAMES[currentSubject] || 'Unknown' });
    leaderboard.sort((a, b) => b.points - a.points);
    if (leaderboard.length > 10) leaderboard.pop();
}

function saveUserProgress() {
    const progress = {
        totalPoints: totalPoints,
        wrongFlashcards: wrongFlashcards,
        lastPlayedSubject: currentSubject,
        lastPlayedDate: new Date().toISOString(),
        gamesPlayed: getGamesPlayed() + 1,
        totalCorrect: getTotalCorrect() + correctCount,
        totalWrong: getTotalWrong() + wrongCount
    };
    localStorage.setItem('flashDashProgress', JSON.stringify(progress));
}

function loadUserProgress() {
    const savedProgress = localStorage.getItem('flashDashProgress');
    
    if (savedProgress) {
        try {
            const progress = JSON.parse(savedProgress);
            
            if (progress.totalPoints !== undefined) {
                totalPoints = progress.totalPoints;
                document.getElementById('total-points').textContent = totalPoints;
            }
            
            if (progress.wrongFlashcards && Array.isArray(progress.wrongFlashcards)) {
                wrongFlashcards = progress.wrongFlashcards;
            }
            
            if (progress.lastPlayedDate) {
                const lastPlayed = new Date(progress.lastPlayedDate);
                const now = new Date();
                const diffDays = Math.floor((now - lastPlayed) / (1000 * 60 * 60 * 24));
                
                if (diffDays > 7) {
                    clearOldProgress();
                }
            }
        } catch (e) {
            console.error('Error loading progress:', e);
        }
    }
}

function getGamesPlayed() {
    const savedProgress = localStorage.getItem('flashDashProgress');
    if (savedProgress) {
        try {
            const progress = JSON.parse(savedProgress);
            return progress.gamesPlayed || 0;
        } catch (e) {
            return 0;
        }
    }
    return 0;
}

function getTotalCorrect() {
    const savedProgress = localStorage.getItem('flashDashProgress');
    if (savedProgress) {
        try {
            const progress = JSON.parse(savedProgress);
            return progress.totalCorrect || 0;
        } catch (e) {
            return 0;
        }
    }
    return 0;
}

function getTotalWrong() {
    const savedProgress = localStorage.getItem('flashDashProgress');
    if (savedProgress) {
        try {
            const progress = JSON.parse(savedProgress);
            return progress.totalWrong || 0;
        } catch (e) {
            return 0;
        }
    }
    return 0;
}

function clearOldProgress() {
    localStorage.removeItem('flashDashProgress');
    totalPoints = 0;
    wrongFlashcards = [];
    document.getElementById('total-points').textContent = '0';
}

function clearAllProgress() {
    localStorage.removeItem('flashDashProgress');
    totalPoints = 0;
    wrongFlashcards = [];
    document.getElementById('total-points').textContent = '0';
}

function renderLeaderboard() {
    const rowsContainer = document.getElementById('leaderboard-rows');
    rowsContainer.innerHTML = '';
    
    leaderboard.forEach((player, index) => {
        const row = document.createElement('div');
        row.className = 'leaderboard-row';
        row.innerHTML = `
            <span class="rank">#${index + 1}</span>
            <span class="player-name">${player.name}</span>
            <span class="player-points">${player.points}</span>
            <span class="player-subject">${player.subject}</span>
        `;
        rowsContainer.appendChild(row);
    });
}

function createConfetti() {
    const container = document.getElementById('confetti-container');
    
    const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dfe6e9', '#a29bfe', '#fd79a8', '#00b894'];
    const shapes = ['circle', 'square', 'triangle'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = `confetti ${shapes[Math.floor(Math.random() * shapes.length)]}`;
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        if (!confetti.classList.contains('triangle')) {
            confetti.style.background = color;
        } else {
            confetti.style.borderBottomColor = color;
        }
        
        const size = 8 + Math.random() * 12;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDuration = `${2 + Math.random() * 3}s`;
        confetti.style.animationDelay = `${Math.random() * 0.3}s`;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.opacity = 0.8 + Math.random() * 0.2;
        
        container.appendChild(confetti);
    }
    
    setTimeout(() => {
        const remaining = container.querySelectorAll('.confetti');
        remaining.forEach(c => c.remove());
    }, 6000);
}

function createFireworks() {
    const container = document.getElementById('confetti-container');
    
    const fireworksColors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#a29bfe', '#fd79a8'];
    const explosionCount = 8;
    
    for (let e = 0; e < explosionCount; e++) {
        setTimeout(() => {
            const centerX = 20 + Math.random() * 60;
            const centerY = 20 + Math.random() * 40;
            const particleCount = 30 + Math.floor(Math.random() * 20);
            const color = fireworksColors[Math.floor(Math.random() * fireworksColors.length)];
            
            for (let p = 0; p < particleCount; p++) {
                const particle = document.createElement('div');
                particle.className = 'firework-particle';
                particle.style.background = color;
                particle.style.left = `${centerX}%`;
                particle.style.top = `${centerY}%`;
                particle.style.width = '6px';
                particle.style.height = '6px';
                particle.style.borderRadius = '50%';
                
                const angle = (Math.PI * 2 * p) / particleCount;
                const velocity = 3 + Math.random() * 4;
                const distance = 80 + Math.random() * 120;
                
                particle.style.setProperty('--angle', `${angle}rad`);
                particle.style.setProperty('--velocity', `${velocity}s`);
                particle.style.setProperty('--distance', `${distance}px`);
                particle.style.setProperty('--delay', `${Math.random() * 0.1}s`);
                
                container.appendChild(particle);
            }
            
            const burst = document.createElement('div');
            burst.className = 'firework-burst';
            burst.style.left = `${centerX}%`;
            burst.style.top = `${centerY}%`;
            burst.style.background = `radial-gradient(circle, ${color} 0%, transparent 70%)`;
            container.appendChild(burst);
        }, e * 300);
    }
    
    setTimeout(() => {
        const fireworks = container.querySelectorAll('.firework-particle, .firework-burst');
        fireworks.forEach(f => f.remove());
    }, 5000);
}

function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingBar = document.getElementById('loading-bar');
    const loadingText = document.querySelector('.loading-text');
    
    const texts = ['Loading knowledge...', 'Preparing questions...', 'Almost ready...', 'Let\'s start!'];
    let textIndex = 0;
    
    const textInterval = setInterval(() => {
        textIndex = (textIndex + 1) % texts.length;
        loadingText.textContent = texts[textIndex];
    }, 1500);
    
    if (window.DrawSVGPlugin) {
        gsap.from('#loading-bolt', {
            drawSVG: 0,
            duration: 1.5,
            ease: "power2.out",
            repeat: -1,
            repeatDelay: 0.5
        });
        
        gsap.from('#loading-ring', {
            drawSVG: 0,
            duration: 2,
            ease: "linear",
            repeat: -1
        });
    }
    
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        loadingBar.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            clearInterval(textInterval);
            
            gsap.to('.loading-content', {
                opacity: 0,
                y: -30,
                duration: 0.8,
                delay: 1.5
            });
            
            gsap.to(loadingScreen, {
                opacity: 0,
                duration: 0.8,
                delay: 2,
                onComplete: () => {
                    loadingScreen.style.display = 'none';
                    document.getElementById('app').classList.add('visible');
                    initDraggableCards();
                    initSplitTextAnimation();
                    initScrollAnimations();
                }
            });
        }
    }, 300);
}

function initDraggableCards() {
      const heroGraphic = document.querySelector('.hero-graphic');
      if (!heroGraphic) return;
      
      const cards = heroGraphic.querySelectorAll('.floating-card');
      const snapValue = 20;
      
      cards.forEach((card, index) => {
          Draggable.create(card, {
              type: "x,y",
              bounds: heroGraphic,
              inertia: true,
              snap: {
                  x: function(value) {
                      return Math.round(value / snapValue) * snapValue;
                  },
                  y: function(value) {
                      return Math.round(value / snapValue) * snapValue;
                  }
              },
              onDrag: function() {
                  gsap.to(this.target, { scale: 1.1, duration: 0.2 });
              },
              onRelease: function() {
                  gsap.to(this.target, { scale: 1, duration: 0.3 });
              }
          });
      });
  }

  function initSplitTextAnimation() {
      const heroTitle = document.querySelector('.hero-title');
      if (!heroTitle || !window.SplitText) return;
      
      const splitTitle = new SplitText(heroTitle, { 
          type: "words, chars",
          charsClass: "char"
      });
      
      gsap.from(splitTitle.chars, {
          y: 50,
          opacity: 0,
          stagger: 0.03,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: 0.5
      });
      
      const heroSubtitle = document.querySelector('.hero-subtitle');
      if (heroSubtitle) {
          gsap.from(heroSubtitle, {
              y: 30,
              opacity: 0,
              duration: 0.6,
              delay: 0.8,
              ease: "power2.out"
          });
      }
      
      const heroButton = document.querySelector('.hero-button');
      if (heroButton) {
          gsap.from(heroButton, {
              scale: 0.9,
              opacity: 0,
              duration: 0.5,
              delay: 1,
              ease: "back.out(1.5)"
          });
      }
  }

  function initScrollAnimations() {
      if (!window.Observer) return;
      
      const features = document.querySelectorAll('.feature');
      const subjectCards = document.querySelectorAll('.subject-card');
      
      features.forEach((feature, index) => {
          gsap.set(feature, { opacity: 0, y: 50 });
      });
      
      subjectCards.forEach((card, index) => {
          gsap.set(card, { opacity: 0, y: 30 });
      });
      
      const observer = new Observer({
          target: window,
          type: "wheel,touch,scroll",
          onScroll: (self) => {
              const scrollY = self.scrollY;
              
              features.forEach((feature, index) => {
                  const rect = feature.getBoundingClientRect();
                  const windowHeight = window.innerHeight;
                  const triggerPoint = windowHeight * 0.7;
                  
                  if (rect.top < triggerPoint && gsap.getProperty(feature, "opacity") === 0) {
                      gsap.to(feature, {
                          opacity: 1,
                          y: 0,
                          duration: 0.8,
                          delay: index * 0.1,
                          ease: "power3.out"
                      });
                  }
              });
              
              subjectCards.forEach((card, index) => {
                  const rect = card.getBoundingClientRect();
                  const windowHeight = window.innerHeight;
                  const triggerPoint = windowHeight * 0.8;
                  
                  if (rect.top < triggerPoint && gsap.getProperty(card, "opacity") === 0) {
                      gsap.to(card, {
                          opacity: 1,
                          y: 0,
                          duration: 0.6,
                          delay: (index % 4) * 0.1,
                          ease: "power3.out"
                      });
                  }
              });
          }
      });
      
      return observer;
  }

  function initInertiaScroll() {
      if (!window.InertiaPlugin || !window.Observer) return;
      
      let scrollVelocity = 0;
      let animationId = null;
      
      const inertiaObserver = new Observer({
          target: window,
          type: "wheel,touch",
          onUp: () => {
              if (animationId) cancelAnimationFrame(animationId);
              
              const applyInertia = () => {
                  if (Math.abs(scrollVelocity) > 0.5) {
                      window.scrollBy(0, scrollVelocity);
                      scrollVelocity *= 0.95;
                      animationId = requestAnimationFrame(applyInertia);
                  }
              };
              
              applyInertia();
          },
          tolerance: 1
      });
      
      return inertiaObserver;
  }

  document.addEventListener('DOMContentLoaded', () => {
      initLoadingScreen();
      loadUserProgress();
      renderLeaderboard();
      initDraggableCards();
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(link.getAttribute('href').substring(1));
        });
    });
    
    document.querySelectorAll('.level-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.level-tab').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    
    document.querySelectorAll('.option-btn').forEach((btn, index) => {
        btn.addEventListener('click', () => selectAnswer(index));
    });
    
    document.getElementById('redemption-btn').addEventListener('click', startRedemptionQuiz);
    
    document.addEventListener('keydown', (e) => {
        if (e.key >= '1' && e.key <= '4') {
            const index = parseInt(e.key) - 1;
            const btn = document.getElementById(`option-${index}`);
            if (btn && !btn.classList.contains('disabled')) selectAnswer(index);
        }
    });
    
    updateSubjectDisplay();
    showSection('home');
    initUser();
});