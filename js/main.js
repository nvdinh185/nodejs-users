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

// ==================Xử lý thêm 1 user==============================
var form = $('#register-form');

form.on('submit', async function (e) {
    e.preventDefault();

})