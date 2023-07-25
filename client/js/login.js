if (localStorage.getItem('currentUser')) {
    location = 'index.html';
} else {
    var form = document.forms['login-form'];

    form.addEventListener('submit', async function (e) {
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
                data: formValue,
                headers: { "Content-Type": "application/json" },
            });
            // console.log(result);
            // handle success
            localStorage.setItem('currentUser', JSON.stringify(result.data));
            location = 'index.html?msg=2';
        } catch (error) {
            var errorElement = document.querySelector('.error');
            errorElement.innerHTML = '<p style="color: red; background: yellow">Xảy ra lỗi!</p>';
        }
    })
}