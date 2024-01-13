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

    // Hàm tạo id là một chuỗi ngẫu nhiên
    function generateUuid() {
        return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

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
        const formValue = {};
        formValue["id"] = generateUuid();

        // Lấy dữ liệu nhập vào từ form
        for (const el of e.target) {
            if (el.name) {
                formValue[el.name] = el.value;
            }
        }


        // console.log(formValue);
        try {
            await axios({
                method: "POST",
                url: 'http://localhost:3000/users',
                data: formValue
            });

            // chuyển hướng về lại trang index.html
            location = 'index.html?msg=1';
        } catch (error) {
            var errorElement = $('.error');
            errorElement.html('<p style="color: red; ; font-style: italic">Xảy ra lỗi khi thêm!</p>');
        }
    }
})