// ./SRC/Login/main.js
const LOGIN_API = 'https://684981f845f4c0f5ee71c0a8.mockapi.io/DangKySG01';

document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  
  const username = document.getElementById('maSoNV').value.trim().toUpperCase();
  const message = document.getElementById('loginMessage');
  
  // Hiển thị loading
  message.textContent = '⏳ Đang kiểm tra...';
  message.className = 'mt-4 text-center text-sm text-blue-600 font-semibold';
  
  try {
    const res = await fetch(LOGIN_API);
    
    if (!res.ok) {
      throw new Error('Không thể kết nối đến server');
    }
    
    const users = await res.json();
    
    // Tìm user theo mã số nhân viên (username hoặc maSoNV)
    const user = users.find(u => 
      (u.username && u.username.toUpperCase() === username) ||
      (u.maSoNV && u.maSoNV.toUpperCase() === username)
    );
    
    if (!user) {
      message.textContent = '❌ Mã số nhân viên không tồn tại!';
      message.className = 'mt-4 text-center text-sm text-red-500 font-semibold';
    } else if (user.rejected) {
      message.textContent = '🚫 Tài khoản đã bị từ chối!';
      message.className = 'mt-4 text-center text-sm text-red-600 font-semibold';
    } else if (!user.approved) {
      message.textContent = '⏳ Tài khoản chưa được duyệt! Vui lòng chờ phê duyệt.';
      message.className = 'mt-4 text-center text-sm text-yellow-600 font-semibold';
    } else {
      message.textContent = `✅ Đăng nhập thành công! Chào mừng ${user.firstName || user.username}`;
      message.className = 'mt-4 text-center text-sm text-green-600 font-semibold';
      
      // Lưu thông tin user vào localStorage
      const userInfo = {
        id: user.id,
        username: user.username,
        maSoNV: user.maSoNV,
        firstName: user.firstName,
        fullName: user.fullName || user.firstName,
        email: user.email || user.mail,
        department: user.department,
        approved: user.approved,
        loginTime: new Date().toISOString()
      };
      
      localStorage.setItem('loggedInUser', JSON.stringify(userInfo));
      localStorage.setItem('isLoggedIn', 'true');
      
      // Reset form
      document.getElementById('loginForm').reset();
      
      // Chuyển hướng sau 1.5 giây
      setTimeout(() => {
        // Kiểm tra nếu là admin (có thể dựa vào department hoặc username)
        if (user.department === 'ADMIN' || user.username === 'ADMIN') {
          window.location.href = 'admin.html';
        } else {
          window.location.href = 'TrangChu.html';
        }
      }, 1500);
    }
    
  } catch (error) {
    message.textContent = '⚠️ Lỗi kết nối. Vui lòng kiểm tra internet và thử lại!';
    message.className = 'mt-4 text-center text-sm text-red-600 font-semibold';
    console.error('Login error:', error);
  }
});

// Hàm kiểm tra trạng thái đăng nhập (có thể dùng ở trang khác)
function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const userInfo = localStorage.getItem('loggedInUser');
  
  if (isLoggedIn === 'true' && userInfo) {
    try {
      const user = JSON.parse(userInfo);
      return {
        isLoggedIn: true,
        user: user
      };
    } catch (e) {
      // Nếu dữ liệu bị lỗi, xóa và return false
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('loggedInUser');
      return { isLoggedIn: false };
    }
  }
  
  return { isLoggedIn: false };
}

// Hàm đăng xuất
function logout() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('loggedInUser');
  window.location.href = 'login.html';
}

// Auto-fill username nếu có trong localStorage (remember me feature)
document.addEventListener('DOMContentLoaded', function() {
  const rememberedUsername = localStorage.getItem('rememberedUsername');
  if (rememberedUsername) {
    const usernameInput = document.getElementById('loginUsername');
    if (usernameInput) {
      usernameInput.value = rememberedUsername;
    }
  }
  
  // Lưu username khi người dùng nhập (remember feature)
  const usernameInput = document.getElementById('loginUsername');
  if (usernameInput) {
    usernameInput.addEventListener('blur', function() {
      if (this.value.trim()) {
        localStorage.setItem('rememberedUsername', this.value.trim().toUpperCase());
      }
    });
    
    // Auto uppercase
    usernameInput.addEventListener('input', function() {
      this.value = this.value.toUpperCase();
    });
  }
});

// Export functions for use in other files
window.checkLoginStatus = checkLoginStatus;
window.logout = logout;