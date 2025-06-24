const SIGNUP_API = 'https://684981f845f4c0f5ee71c0a8.mockapi.io/DangKySG01';

    document.getElementById('signupForm').addEventListener('submit', async function(e) {
      e.preventDefault();

      const firstName = document.getElementById('firstName').value.trim();
      const lastName = document.getElementById('lastName').value.trim().toUpperCase();
      const password = document.getElementById('signupPassword').value.trim();
      const department = document.getElementById('department').value;

      if (!firstName || !lastName || !department) {
        alert("Vui lòng điền đầy đủ thông tin.");
        return;
      }

      if (password.length < 6) {
        alert("Mật khẩu phải từ 6 ký tự trở lên.");
        return;
      }

      // Tạo username: ví dụ SG01.USER1 → PNC01.LASTNAME
      let username = '';
      if (department === 'SG01.USER1') {
        username = `PNC01.${lastName}`;
      } else if (department === 'SG01.USER2') {
        username = `PNC02.${lastName}`;
      } else {
        alert("Phòng ban không hợp lệ!");
        return;
      }

      try {
        const res = await fetch(SIGNUP_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username,
            firstName,
            lastName,
            password,
            department,
            mail,
            approved: false
          })
        });

        if (res.ok) {
          document.getElementById('signupMessage').textContent = `Đăng ký thành công! Tên đăng nhập: ${username}. Vui lòng chờ phê duyệt.`;
          document.getElementById('signupForm').reset();
        } else {
          throw new Error("Gửi dữ liệu thất bại");
        }
      } catch (err) {
        alert("Lỗi khi đăng ký: " + err.message);
      }
    });
 