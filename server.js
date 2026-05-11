const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'flashdash-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

const users = [];

app.use(express.static(path.join(__dirname)));

app.get('/api/me', (req, res) => {
    res.json(req.session.user || null);
});

app.post('/api/save-progress', (req, res) => {
    if (!req.session.user) return res.status(401).json({ error: 'Login required' });
    
    const { score, progress, completedCards } = req.body;
    
    const userIndex = users.findIndex(u => u.id === req.session.user.id);
    if (userIndex !== -1) {
        users[userIndex].score = score;
        users[userIndex].flashcardProgress = progress;
        users[userIndex].totalCardsCompleted = completedCards;
        req.session.user = users[userIndex];
    }
    
    res.json({ success: true });
});

app.get('/api/leaderboard', (req, res) => {
    const leaderboard = users
        .filter(u => u.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 50)
        .map((user, index) => ({
            rank: index + 1,
            name: user.name,
            score: user.score,
            progress: user.flashcardProgress || 0
        }));
    
    res.json(leaderboard);
});

app.get('/auth/google', (req, res) => {
    const mockUser = {
        id: 'google_' + Date.now(),
        name: 'Google User',
        score: 0,
        flashcardProgress: 0,
        totalCardsCompleted: 0
    };
    
    users.push(mockUser);
    req.session.user = mockUser;
    
    res.redirect('/');
});

app.get('/auth/microsoft', (req, res) => {
    const mockUser = {
        id: 'microsoft_' + Date.now(),
        name: 'Microsoft User',
        score: 0,
        flashcardProgress: 0,
        totalCardsCompleted: 0
    };
    
    users.push(mockUser);
    req.session.user = mockUser;
    
    res.redirect('/');
});

app.get('/auth/wechat', (req, res) => {
    const mockUser = {
        id: 'wechat_' + Date.now(),
        name: 'WeChat User',
        score: 0,
        flashcardProgress: 0,
        totalCardsCompleted: 0
    };
    
    users.push(mockUser);
    req.session.user = mockUser;
    
    res.redirect('/');
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});