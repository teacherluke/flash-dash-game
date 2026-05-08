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
        chemistry: 'igcse/flashcards_chemistryigcse.txt',
        english: 'igcse/flashcards_englishigcse.txt',
        psychology: 'igcse/flashcards_psychologyigcse.txt'
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
    igcse: ['biology', 'maths', 'chemistry', 'english', 'psychology']
};

let flashcardData = {};
let loadedSubjects = new Set();
let currentLevel = 'preigcse';

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
                const flashcards = JSON.parse(jsonString);
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
let currentUser = null;

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
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523.25, this.audioContext.currentTime);
        oscillator.frequency.setValueAtTime(659.25, this.audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(783.99, this.audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.4);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.4);
    }

    playWrong() {
        this.init();
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
        oscillator.frequency.setValueAtTime(150, this.audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.5);
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
}

const soundManager = new SoundManager();

function trackEvent(eventName, properties = {}) {
    if (typeof posthog !== 'undefined') {
        posthog.capture(eventName, properties);
    }
}

function triggerRedFlash() {
    const gameSection = document.getElementById('game');
    gameSection.classList.add('red-flash');
    setTimeout(() => {
        gameSection.classList.remove('red-flash');
    }, 200);
}

function handleGoogleLogin() {
    trackEvent('login_attempt', { provider: 'google' });
    const mockUser = { name: 'Student', email: 'student@school.edu', provider: 'google' };
    completeLogin(mockUser);
}

function handleMicrosoftLogin() {
    trackEvent('login_attempt', { provider: 'microsoft' });
    const mockUser = { name: 'Student', email: 'student@school.edu', provider: 'microsoft' };
    completeLogin(mockUser);
}

function handleWeChatLogin() {
    trackEvent('login_attempt', { provider: 'wechat' });
    const mockUser = { name: 'Student', email: 'student@school.edu', provider: 'wechat' };
    completeLogin(mockUser);
}

function completeLogin(user) {
    currentUser = { name: user.name, email: user.email, provider: user.provider, isLoggedIn: true };
    trackEvent('login_success', { provider: user.provider });
    
    if (typeof posthog !== 'undefined') {
        posthog.identify(user.email, { name: user.name, provider: user.provider });
    }
    
    document.getElementById('user-name').textContent = user.name;
    document.getElementById('auth-buttons').style.display = 'none';
    document.getElementById('logout-btn').style.display = 'flex';
    loadUserProgress();
}

function logout() {
    trackEvent('logout');
    currentUser = null;
    document.getElementById('user-name').textContent = 'Guest';
    document.getElementById('auth-buttons').style.display = 'flex';
    document.getElementById('logout-btn').style.display = 'none';
}

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    document.querySelector(`[href="#${sectionId}"]`)?.classList.add('active');
}

function showSubjects() { showSection('subjects'); }
function goHome() { showSection('home'); }

async function selectSubject(subjectId) {
    const data = await loadSubjectData(subjectId);
    if (!data) {
        alert(`Could not load ${SUBJECT_NAMES[subjectId]} flashcards`);
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
    
    resetTimer();
    loadFlashcard();
    showSection('game');
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
    
    const flashcard = currentFlashcards[currentIndex];
    document.getElementById('question').textContent = flashcard.question;
    document.getElementById('answer').textContent = flashcard.answer;
    
    document.getElementById('explanation').textContent = flashcard.explanation ? `💡 ${flashcard.explanation}` : '';
    document.getElementById('example').textContent = flashcard.example ? `📝 ${flashcard.example}` : '';
    
    document.getElementById('flashcard').classList.remove('flipped');
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
    flipCard();
    
    setTimeout(() => {
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
        }
        
        setTimeout(() => nextQuestion(), 2000);
    }, 500);
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
    flipCard();
    
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
        
        setTimeout(() => nextQuestion(), 2000);
    }, 500);
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
    localStorage.setItem('flashDashPoints', totalPoints.toString());
    localStorage.setItem('flashDashWrongFlashcards', JSON.stringify(wrongFlashcards));
}

function loadUserProgress() {
    const savedPoints = localStorage.getItem('flashDashPoints');
    const savedWrongFlashcards = localStorage.getItem('flashDashWrongFlashcards');
    
    if (savedPoints) {
        totalPoints = parseInt(savedPoints);
        document.getElementById('total-points').textContent = totalPoints;
    }
    
    if (savedWrongFlashcards) {
        try { wrongFlashcards = JSON.parse(savedWrongFlashcards); }
        catch (e) { wrongFlashcards = []; }
    }
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
    container.innerHTML = '';
    
    const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dfe6e9'];
    const shapes = ['circle', 'square', 'triangle'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = `confetti ${shapes[Math.floor(Math.random() * shapes.length)]}`;
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        if (!confetti.classList.contains('triangle')) {
            confetti.style.background = color;
        } else {
            confetti.style.borderBottomColor = color;
        }
        
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDuration = `${3 + Math.random() * 2}s`;
        confetti.style.animationDelay = `${Math.random() * 0.5}s`;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        container.appendChild(confetti);
    }
    
    setTimeout(() => container.innerHTML = '', 5000);
}

function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const curtainLeft = document.querySelector('.curtain-left');
    const curtainRight = document.querySelector('.curtain-right');
    const loadingBar = document.getElementById('loading-bar');
    const loadingText = document.querySelector('.loading-text');
    
    const texts = ['Loading knowledge...', 'Preparing questions...', 'Almost ready...', 'Let\'s start!'];
    let textIndex = 0;
    
    const textInterval = setInterval(() => {
        textIndex = (textIndex + 1) % texts.length;
        loadingText.textContent = texts[textIndex];
    }, 1500);
    
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        loadingBar.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            clearInterval(textInterval);
            
            gsap.to([curtainLeft, curtainRight], {
                scaleX: 0,
                duration: 1.2,
                ease: 'power2.inOut',
                stagger: 0.1
            });
            
            gsap.to('.loading-content', {
                opacity: 0,
                y: -30,
                duration: 0.6,
                delay: 2
            });
            
            gsap.to(loadingScreen, {
                opacity: 0,
                duration: 0.6,
                delay: 2.5,
                onComplete: () => loadingScreen.style.display = 'none'
            });
        }
    }, 300);
}

document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    loadUserProgress();
    renderLeaderboard();
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(link.getAttribute('href').substring(1));
        });
    });
    
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    
    document.querySelectorAll('.option-btn').forEach((btn, index) => {
        btn.addEventListener('click', () => selectAnswer(index));
    });
    
    document.getElementById('redemption-btn').addEventListener('click', startRedemptionQuiz);
    document.getElementById('google-login-btn').addEventListener('click', handleGoogleLogin);
    document.getElementById('microsoft-login-btn').addEventListener('click', handleMicrosoftLogin);
    document.getElementById('wechat-login-btn').addEventListener('click', handleWeChatLogin);
    
    document.addEventListener('keydown', (e) => {
        if (e.key >= '1' && e.key <= '4') {
            const index = parseInt(e.key) - 1;
            const btn = document.getElementById(`option-${index}`);
            if (btn && !btn.classList.contains('disabled')) selectAnswer(index);
        }
    });
    
    updateSubjectDisplay();
    showSection('home');
});