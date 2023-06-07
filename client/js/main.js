const table = document.getElementById("table");

async function getData() {

    try {
        var listUsers = await axios.get('http://localhost:3000/users');
        listUsers = listUsers.data;

        var htmls = `
                <table>        
                    <tr>
                            <th>Username</th>
                            <th>Fullname</th>
                    </tr>`

        for (let us of listUsers) {
            htmls += `
                    <tr>
                            <td>${us.username}</td>
                            <td>${us.fullname}</td>
                    </tr>`
        }
        htmls += `</table>`
        table.innerHTML = htmls;

    } catch (err) {
        console.log('Lỗi ' + err);
    }
}

getData();

function getParameterByName(name, url = location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var msg = getParameterByName('msg');

var msgElement = document.querySelector('#msg');
msgElement.setAttribute('style', 'color: green; background: yellow');
if (msg === '1') {
    msgElement.innerText = 'Đăng ký thành công!';
} else if (msg === '2') {
    msgElement.innerText = 'Đăng nhập thành công!';
}