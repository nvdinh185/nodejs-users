const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
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
    var userLogin;

    for (const el of users) {
        if (user.username === el.username
            && user.password === el.password) {
            userLogin = el;
        }
    }

    if (userLogin) {
        const token = jwt.sign({ username: user.username }, 'secret_key', {
            expiresIn: '600000'//10 phút
        });
        const { password, ...userWithoutPassword } = userLogin;
        var result = {
            ...userWithoutPassword,
            token
        }
        res.status(200).send(result);
    } else {
        res.status(500).send({ status: 'NOK' });
    }
})

app.get('/users', (req, res) => {
    const token = req.headers['authorization'].slice(7);
    jwt.verify(token, 'secret_key',
        (err, decoded) => {
            if (err) {
                console.log('Lỗi xác thực:', err.message);
                res.status(500).json({ message: err.message });
            } else {
                // console.log('decoded: ', decoded);
                res.send(users);
            };
        });

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})