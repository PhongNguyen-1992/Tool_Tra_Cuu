
const SIGNUP_API = 'https://684981f845f4c0f5ee71c0a8.mockapi.io/DangKySG01';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('signupForm');
  const submitBtn = document.getElementById('submitBtn');
  const submitText = document.getElementById('submitText');
  const messageArea = document.getElementById('messageArea');
  const loadingOverlay = document.getElementById('loadingOverlay');

  // Hàm hiển thị loading
  function showLoading(show) {
    loadingOverlay.style.display = show ? 'flex' : 'none';
    submitBtn.disabled = show;
    submitText.textContent = show ? 'Đang xử lý...' : 'Đăng Ký';
  }

  // Hàm hiển thị thông báo
  function showMessage(message, type = 'success') {
    const messageClass = type === 'success' ? 'success-message' : 'error-message';
    const icon = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle';

    messageArea.innerHTML = `
          <div class="${messageClass}">
            <div class="flex items-start">
              <i class="${icon} mr-3 mt-1"></i>
              <div class="flex-1">
                ${message}
              </div>
            </div>
          </div>
        `;

    // Cuộn đến thông báo
    messageArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Xử lý form submit
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Lấy dữ liệu form
    const firstName = document.getElementById('firstName').value.trim();
    const maSoNV = document.getElementById('maSoNV').value.trim().toUpperCase();
    const department = document.getElementById('department').value;
    const mail = document.getElementById('mail').value.trim().toLowerCase();

    // Validate dữ liệu
    if (!firstName || !maSoNV || !department || !mail) {
      showMessage('Vui lòng điền đầy đủ thông tin!', 'error');
      return;
    }

    if (!mail.endsWith('@fpt.net')) {
      showMessage('Email phải có đuôi @fpt.net!', 'error');
      return;
    }

    if (firstName.length < 2) {
      showMessage('Họ tên phải có ít nhất 2 ký tự!', 'error');
      return;
    }

    if (maSoNV.length < 3) {
      showMessage('Mã số nhân viên không hợp lệ!', 'error');
      return;
    }

    // Tạo username từ MSNV
    let username = maSoNV;

    // Hiển thị loading
    showLoading(true);
    messageArea.innerHTML = '';

    try {
      // Gửi request
      const response = await fetch(SIGNUP_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          firstName: firstName,
          maSoNV: maSoNV,
          department: department,
          mail: mail,
          approved: false,
          rejected: false,
          createdAt: new Date().toISOString()
        })
      });

      if (response.ok) {
        const result = await response.json();

        // Hiển thị thành công
        showMessage(`
              <div>
                <h3 class="font-bold text-lg mb-2">🎉 Đăng ký thành công!</h3>
                <div class="space-y-2 text-sm">
                  <p><strong>Tên đăng nhập:</strong> ${username}</p>
                  <p><strong>Họ tên:</strong> ${firstName}</p>
                  <p><strong>Email:</strong> ${mail}</p>
                  <p><strong>Phòng ban:</strong> ${department}</p>
                </div>
                <div class="mt-4 p-3 bg-white/20 rounded-lg">
                  <p class="text-sm">
                    <i class="fas fa-clock mr-1"></i>
                    Tài khoản đang chờ phê duyệt từ quản trị viên
                  </p>
                </div>
              </div>
            `, 'success');

        // Reset form
        form.reset();

      } else {
        throw new Error(`Lỗi ${response.status}: ${response.statusText}`);
      }

    } catch (error) {
      console.error('Signup error:', error);
      showMessage(`
            <div>
              <h3 class="font-bold mb-2">❌ Đăng ký thất bại!</h3>
              <p class="text-sm">${error.message}</p>
              <p class="text-sm mt-2">Vui lòng thử lại sau hoặc liên hệ quản trị viên.</p>
            </div>
          `, 'error');
    } finally {
      showLoading(false);
    }
  });

  // Validate email real-time
  document.getElementById('mail').addEventListener('blur', function () {
    const email = this.value.trim();
    if (email && !email.endsWith('@fpt.net')) {
      this.classList.add('border-red-400');
      this.classList.remove('border-gray-300');
    } else {
      this.classList.remove('border-red-400');
      this.classList.add('border-gray-300');
    }
  });

  // Auto uppercase cho MSNV
  document.getElementById('maSoNV').addEventListener('input', function () {
    this.value = this.value.toUpperCase();
  });
});
