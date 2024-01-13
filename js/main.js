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
        password: '789',
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

// Hàm để xử lý khi blur hoặc nhập vào ô input
function handleBlurInput(input) {
    var errorElement = input.parent().children()[3];
    input.blur(function () {
        if (input.val().trim() === '') {
            $(errorElement).attr('style', 'color: red; font-style: italic;');
            $(errorElement).text('Yêu cầu nhập!');
            input.addClass('invalid');
        }
    })

    input.on('input', function () {
        $(errorElement).attr('style', 'display: none;');
        input.removeClass('invalid');
    })
}

var usernameElement = $("#username");
var passwordElement = $("#password");
var fullnameElement = $("#fullname");

handleBlurInput(usernameElement);
handleBlurInput(passwordElement);
handleBlurInput(fullnameElement);

// Xử lý submit form
form.on('submit', async function (e) {
    e.preventDefault();

    // Hàm kiểm tra yêu cầu nhập ô input
    function isRequired(input) {
        var errorElement = input.parent().children()[3];
        if (input.val().trim() === '') {
            $(errorElement).attr('style', 'color: red; font-style: italic;');
            $(errorElement).text('Yêu cầu nhập!');
            input.addClass('invalid');
            return true;
        }
    }

    var check = true;
    if (isRequired(usernameElement)) {
        check = false;
    }
    if (isRequired(passwordElement)) {
        check = false;
    }
    if (isRequired(fullnameElement)) {
        check = false;
    }

    if (check) {
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

        usernameElement.val('');
        passwordElement.val('');
        fullnameElement.val('');
    }
})