// ./SRC/Login/main.js
const LOGIN_API = 'https://684981f845f4c0f5ee71c0a8.mockapi.io/DangKySG01';

document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value.trim();
  const message = document.getElementById('loginMessage');

  try {
    const res = await fetch(LOGIN_API);
    const users = await res.json();

    const user = users.find(u =>
      u.username === username &&
      u.password === password
    );

    if (!user) {
      message.textContent = '❌ Sai tên đăng nhập hoặc mật khẩu!';
      message.className = 'mt-4 text-center text-sm text-red-500 font-semibold';
    } else if (!user.approved) {
      message.textContent = '⏳ Tài khoản chưa được duyệt!';
      message.className = 'mt-4 text-center text-sm text-yellow-600 font-semibold';
    } else {
      message.textContent = '✅ Đăng nhập thành công!';
      message.className = 'mt-4 text-center text-sm text-green-600 font-semibold';

      // Lưu thông tin nếu cần (localStorage hoặc sessionStorage)
      localStorage.setItem('loggedInUser', JSON.stringify(user));

      setTimeout(() => {
        window.location.href = 'TrangChu.html'; // hoặc trang admin nếu phân quyền
      }, 1000);
    }
  } catch (error) {
    message.textContent = '⚠️ Lỗi kết nối. Vui lòng thử lại!';
    message.className = 'mt-4 text-center text-sm text-red-600 font-semibold';
    console.error('Login error:', error);
  }
});
