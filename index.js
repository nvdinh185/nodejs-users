const express = require('express');
const app = express();
const port = 3000;

// middleware để chuyển từ form-data sang req.body (sử dụng js để post)
app.use(express.json());

const users = [
    {
        id: "715b-52b3-5a0-4e5a",
        username: 'dinh',
        password: '123',
        fullname: 'Nguyen Van Dinh'
    },
    {
        id: "715b-52b3-5a0-4e5b",
        username: 'hoa',
        password: '456',
        fullname: 'Le Thi Hoa'
    },
    {
        id: "715b-52b3-5a0-4e5c",
        username: 'huong',
        password: '789',
        fullname: 'Nguyen Thi Huong'
    }
]

app.use(express.static(__dirname + '/client'));

app.post('/users', (req, res) => {
    var user = req.body;
    var check = false;

    // Kiểm tra xem thử user này đã tồn tại chưa?
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

app.get('/users', (req, res) => {
    res.send(users);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})