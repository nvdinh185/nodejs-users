var form = $('#register-form');

form.on('submit', async function (e) {
    e.preventDefault();

    // Hàm tạo id là một chuỗi ngẫu nhiên
    function generateUuid() {
        return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

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
})