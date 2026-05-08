const SUBJECT_FILES = {
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

let flashcardData = {};
let loadedSubjects = new Set();

async function loadSubjectData(subjectId) {
    if (loadedSubjects.has(subjectId)) {
        return flashcardData[subjectId];
    }
    
    const fileName = SUBJECT_FILES[subjectId];
    if (!fileName) {
        console.error(`No file found for subject: ${subjectId}`);
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
                flashcardData[subjectId] = {
                    name: SUBJECT_NAMES[subjectId] || subjectId,
                    flashcards: flashcards
                };
                loadedSubjects.add(subjectId);
                return flashcardData[subjectId];
            } catch (parseError) {
                console.error(`JSON parse error in ${fileName}:`, parseError);
                console.log('First 500 chars of processed JSON:', jsonString.substring(0, 500));
                return null;
            }
        }
    } catch (error) {
        console.error(`Error loading ${fileName}:`, error);
        return null;
    }
    
    return null;
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

const MAX_QUESTIONS_PER_ROUND = 20;

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[href="#${sectionId}"]`)?.classList.add('active');
}

function showSubjects() {
    showSection('subjects');
}

function goHome() {
    showSection('home');
}

async function selectSubject(subjectId) {
    const data = await loadSubjectData(subjectId);
    if (!data) {
        alert(`Could not load ${SUBJECT_NAMES[subjectId]} flashcards`);
        return;
    }
    
    currentSubject = subjectId;
    originalFlashcards = [...data.flashcards];
    currentFlashcards = getRandomFlashcards(originalFlashcards, MAX_QUESTIONS_PER_ROUND);
    currentIndex = 0;
    roundPoints = 0;
    correctCount = 0;
    wrongCount = 0;
    consecutiveCorrect = 0;
    doublePointsActive = false;
    
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
    
    if (flashcard.explanation) {
        document.getElementById('explanation').textContent = `💡 ${flashcard.explanation}`;
    } else {
        document.getElementById('explanation').textContent = '';
    }
    
    if (flashcard.example) {
        document.getElementById('example').textContent = `📝 ${flashcard.example}`;
    } else {
        document.getElementById('example').textContent = '';
    }
    
    const flashcardElement = document.getElementById('flashcard');
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
    }
}

function resetTimer() {
    timer = 15;
    document.getElementById('timer').textContent = timer;
    document.getElementById('timer').classList.remove('timer-warning');
    
    const timerBar = document.getElementById('timer-bar');
    timerBar.style.width = '100%';
    timerBar.classList.remove('warning');
    
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    timerInterval = setInterval(() => {
        timer--;
        document.getElementById('timer').textContent = timer;
        
        const percentage = (timer / 15) * 100;
        timerBar.style.width = `${percentage}%`;
        
        if (timer <= 5) {
            document.getElementById('timer').classList.add('timer-warning');
            timerBar.classList.add('warning');
        }
        
        if (timer <= 0) {
            handleTimeout();
        }
    }, 1000);
}

function flipCard() {
    const flashcard = document.getElementById('flashcard');
    flashcard.classList.toggle('flipped');
}

function selectAnswer(optionIndex) {
    clearInterval(timerInterval);
    
    const selectedAnswer = currentOptions[optionIndex];
    const currentFlashcard = currentFlashcards[currentIndex];
    const isCorrect = selectedAnswer === currentFlashcard.answer;
    
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach(btn => btn.classList.add('disabled'));
    
    flipCard();
    
    setTimeout(() => {
        if (isCorrect) {
            correctCount++;
            consecutiveCorrect++;
            
            const basePoints = Math.max(10, timer * 2);
            const multiplier = doublePointsActive ? 2 : 1;
            const earnedPoints = basePoints * multiplier;
            roundPoints += earnedPoints;
            document.getElementById('round-points').textContent = roundPoints;
            
            if (consecutiveCorrect >= 3) {
                totalPoints += 100;
                document.getElementById('total-points').textContent = totalPoints;
                consecutiveCorrect = 0;
            }
            
            document.getElementById(`option-${optionIndex}`).classList.add('correct');
            createConfetti();
        } else {
            wrongCount++;
            consecutiveCorrect = 0;
            
            const alreadyExists = wrongFlashcards.some(fc => fc.question === currentFlashcard.question);
            if (!alreadyExists) {
                wrongFlashcards.push({ ...currentFlashcard, subject: currentSubject });
            }
            
            document.getElementById(`option-${optionIndex}`).classList.add('wrong');
            
            const correctIndex = currentOptions.indexOf(currentFlashcard.answer);
            if (correctIndex !== -1) {
                document.getElementById(`option-${correctIndex}`).classList.add('correct');
            }
        }
        
        setTimeout(() => {
            nextQuestion();
        }, 2000);
    }, 500);
}

function handleTimeout() {
    clearInterval(timerInterval);
    
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach(btn => btn.classList.add('disabled'));
    
    flipCard();
    
    setTimeout(() => {
        wrongCount++;
        consecutiveCorrect = 0;
        
        const currentFlashcard = currentFlashcards[currentIndex];
        const alreadyExists = wrongFlashcards.some(fc => fc.question === currentFlashcard.question);
        if (!alreadyExists) {
            wrongFlashcards.push({ ...currentFlashcard, subject: currentSubject });
        }
        
        const correctIndex = currentOptions.indexOf(currentFlashcard.answer);
        if (correctIndex !== -1) {
            document.getElementById(`option-${correctIndex}`).classList.add('correct');
        }
        
        setTimeout(() => {
            nextQuestion();
        }, 2000);
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
    
    totalPoints += roundPoints;
    document.getElementById('total-points').textContent = totalPoints;
    
    document.getElementById('correct-count').textContent = correctCount;
    document.getElementById('wrong-count').textContent = wrongCount;
    
    const totalQuestions = correctCount + wrongCount;
    const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    document.getElementById('accuracy').textContent = `${accuracy}%`;
    document.getElementById('earned-points').textContent = roundPoints;
    
    updateLeaderboard(correctCount, wrongCount, accuracy, roundPoints);
    
    const redemptionBtn = document.getElementById('redemption-btn');
    const redemptionInfo = document.getElementById('redemption-info');
    
    if (wrongFlashcards.length > 0) {
        redemptionInfo.textContent = `${wrongFlashcards.length} questions need review`;
        redemptionBtn.style.display = 'inline-block';
    } else {
        redemptionInfo.textContent = '';
        redemptionBtn.style.display = 'none';
    }
    
    saveUserProgress();
    showSection('results');
}

function startRedemptionQuiz() {
    if (wrongFlashcards.length === 0) return;
    
    currentFlashcards = [...wrongFlashcards];
    shuffleArray(currentFlashcards);
    currentIndex = 0;
    roundPoints = 0;
    correctCount = 0;
    wrongCount = 0;
    consecutiveCorrect = 0;
    doublePointsActive = false;
    
    document.getElementById('game-subject').textContent = `Redemption - ${SUBJECT_NAMES[currentSubject] || 'Review'}`;
    document.getElementById('current-question').textContent = '1';
    document.getElementById('total-questions').textContent = currentFlashcards.length;
    document.getElementById('round-points').textContent = '0';
    
    resetTimer();
    loadFlashcard();
    showSection('game');
}

function playAgain() {
    selectSubject(currentSubject);
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
    const playerName = 'Player';
    const subject = SUBJECT_NAMES[currentSubject] || 'Unknown';
    
    leaderboard.push({ name: playerName, points: points, subject: subject });
    leaderboard.sort((a, b) => b.points - a.points);
    
    if (leaderboard.length > 10) {
        leaderboard.pop();
    }
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
        try {
            wrongFlashcards = JSON.parse(savedWrongFlashcards);
        } catch (e) {
            wrongFlashcards = [];
        }
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
    
    setTimeout(() => {
        container.innerHTML = '';
    }, 5000);
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
                duration: 1,
                ease: 'power2.inOut',
                stagger: 0.1
            });
            
            gsap.to('.loading-content', {
                opacity: 0,
                y: -30,
                duration: 0.5,
                delay: 0.5
            });
            
            gsap.to(loadingScreen, {
                opacity: 0,
                duration: 0.5,
                delay: 1,
                onComplete: () => {
                    loadingScreen.style.display = 'none';
                }
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
            const sectionId = link.getAttribute('href').substring(1);
            showSection(sectionId);
        });
    });
    
    document.querySelectorAll('.subject-card').forEach(card => {
        card.addEventListener('click', () => {
            const subjectId = card.getAttribute('data-subject');
            selectSubject(subjectId);
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
            if (btn && !btn.classList.contains('disabled')) {
                selectAnswer(index);
            }
        }
    });
    
    showSection('home');
});