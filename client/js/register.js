if (localStorage.getItem('currentUser')) {
    location = 'index.html';
} else {
    var form = $('#register-form');

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
            await axios({
                method: "POST",
                url: 'http://localhost:3000/register',
                data: formValue
            });

            location = 'index.html?msg=1';
        } catch (error) {
            var errorElement = $('.error');
            errorElement.html('<p style="color: red; font-style: italic">Xảy ra lỗi khi đăng ký!</p>');
        }
    })
}