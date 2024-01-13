const table = $("#table");

async function getData() {

    try {
        var listUsers = await axios.get('http://localhost:3000/users');
        listUsers = listUsers.data;

        var htmls = `
                <table>        
                    <tr>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Fullname</th>
                    </tr>`

        for (let us of listUsers) {
            htmls += `
                    <tr>
                            <td>${us.username}</td>
                            <td>${us.password}</td>
                            <td>${us.fullname}</td>
                    </tr>`
        }
        htmls += `</table>`
        table.html(htmls);

    } catch (err) {
        console.log('Lỗi ' + err);
        table.html('<p style="color: red; font-style: italic">Xảy ra lỗi khi lấy dữ liệu!</p>');
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

var msgElement = $('#msg');
msgElement.attr('style', 'color: green; font-style: italic');
if (msg === '1') {
    msgElement.text('Đăng ký thành công!');
}