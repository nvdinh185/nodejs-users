// =============Hiển thị danh sách users==========================

var listUsers = [
    {
        username: 'dinh',
        password: '123',
        fullname: 'Nguyen Van Dinh'
    },
    {
        username: 'hoa',
        password: '456',
        fullname: 'Le Thi Hoa'
    },
    {
        username: 'huong',
        password: '456',
        fullname: 'Nguyen Thi Huong'
    }
]

function render(array) {
    const table = $("#table");
    var htmls = `<table>
                    <tr>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Fullname</th>
                    </tr>`

    for (let us of array) {
        htmls += `<tr>
                            <td>${us.username}</td>
                            <td>${us.password}</td>
                            <td>${us.fullname}</td>
                    </tr>`
    }
    htmls += `</table>`
    table.html(htmls);
}

render(listUsers);

// ==================Xử lý thêm 1 user==============================
var form = $('#register-form');

form.on('submit', async function (e) {
    e.preventDefault();

    // Lấy dữ liệu nhập vào từ form
    const formValue = {};
    for (const el of e.target) {
        if (el.name) {
            formValue[el.name] = el.value;
        }
    }

    // console.log(formValue);
    listUsers.push(formValue);
    render(listUsers);
})