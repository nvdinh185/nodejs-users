if (localStorage.getItem('currentUser')) {
    location = 'index.html';
} else {
    var form = $('#login-form');

    form.on('submit', async function (e) {
        e.preventDefault();

        const formValue = {};
        for (const el of e.target) {
            if (el.name) {
                formValue[el.name] = el.value;
            }
        }

        // console.log(formValue);
        try {
            var result = await axios({
                method: "POST",
                url: 'http://localhost:3000/login',
                data: formValue
            });
            // console.log(result);
            // handle success
            localStorage.setItem('currentUser', JSON.stringify(result.data));
            location = 'index.html?msg=2';
        } catch (error) {
            var errorElement = $('.error');
            errorElement.html('<p style="color: red; font-style: italic">Xảy ra lỗi khi đăng nhập!</p>');
        }
    })
}