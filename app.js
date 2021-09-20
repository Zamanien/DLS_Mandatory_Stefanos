const crypto = require('crypto')
const express = require('express')
const app = express()

const users = [];


app.get('/newUser', (req, res) => {
    let username = req.query.username || '';
    const password = req.query.password || '';

    username = username.replace(/[!@#$%^&*]/g, '');

    if (!username || !password || users[username]) {
        return res.sendStatus(400);
    }

    const salt = crypto.randomBytes(128).toString('base64');
    const hash = crypto.pbkdf2Sync(password, salt, 100000, 512, 'sha512');

    users[username] = { salt, hash };

    res.sendStatus(200);
});

// this is the synchronous version, this will makse the program slow
app.get('/auth', (req, res) => {
    let username = req.query.username || '';
    const password = req.query.password || '';

    username = username.replace(/[!@#$%^&*]/g, '');

    if (!username || !password || users[username]) {
        return res.sendStatus(400);
    }

    const { salt, hash } = users[username];
    const encryptHash = crypto.pbkdf2Sync(password, salt, 100000, 512, 'sha512');

    if (crypto.timingSafeEqual(hash, encryptHash)) {
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
});

// this is the async version, should be faster
// app.get('/auth', (req, res) => {
//     let username = req.query.username || '';
//     const password = req.query.password || '';

//     username = username.replace(/[!@#$%^&*]/g, '');

//     if (!username || !password || users[username]) {
//         return res.sendStatus(400);
//     }

//     crypto.pbkdf2(password, users[username].salt, 100000, 512, 'sha512', (err, hash) => {
//         if (users[username].hash.toString() === hash.toString()) {
//             res.sendStatus(200);
//         } else {
//             res.sendStatus(401);
//         }
//     });
// });

app.listen(8080);