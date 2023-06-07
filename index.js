const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const users = [
    {
        username: 'dinh',
        password: '123',
        fullname: 'Nguyen Van Dinh'
    }
]

app.use(express.static(__dirname + '/client'));

app.post('/register', (req, res) => {
    var user = req.body;
    var check = false;

    for (const el of users) {
        if (user.username === el.username) {
            check = true;
        }
    }

    if (!check) {
        users.push(user);
        res.status(200).send({ status: 'OK' });
    } else {
        res.status(500).send({ status: 'NOK' });
    }
})

app.post('/login', (req, res) => {
    var user = req.body;
    var check = false;

    for (const el of users) {
        if (user.username === el.username
            && user.password === el.password) {
            check = true;
        }
    }

    if (check) {
        res.status(200).send({ status: 'OK' });
    } else {
        res.status(500).send({ status: 'NOK' });
    }
})

app.get('/users', (req, res) => {
    res.send(users);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})