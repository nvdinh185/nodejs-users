var currentUser = localStorage.getItem('currentUser');
currentUser = JSON.parse(currentUser);
if (currentUser) {
    // Nếu đã đăng nhập thì hiển thị table
    var listElement = $('#listUsers');
    listElement.attr('style', 'display: block');
    getData();

} else {
    // Nếu chưa đăng nhập thì hiển thị nút
    var btnElement = $('#btn');
    btnElement.attr('style', 'display: block');
}

async function getData() {
    const table = $("#table");

    try {
        var listUsers = await axios({
            method: "GET",
            url: "http://localhost:3000/users",
            headers: { Authorization: `Bearer ${currentUser.token}` },
        });
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
        table.html(htmls);

    } catch (err) {
        console.log('Lỗi ' + err);
        table.html('<p style="color: red; font-style: italic">Xảy ra lỗi khi lấy dữ liệu!</p>');
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    location = 'index.html';
}

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
} else if (msg === '2') {
    msgElement.text('Đăng nhập thành công!');
}