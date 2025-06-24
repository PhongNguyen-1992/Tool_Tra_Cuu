const API_URL = 'https://684981f845f4c0f5ee71c0a8.mockapi.io/DangKySG01';

window.addEventListener('DOMContentLoaded', loadUsers);

async function loadUsers() {
  try {
    const res = await fetch(API_URL);
    const users = await res.json();

    const unapprovedUsers = users.filter(user => user.approved === false);
    const tbody = document.getElementById('userTableBody');
    tbody.innerHTML = '';

    unapprovedUsers.forEach(user => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${user.username}</td>
        <td>${user.lastName}</td>
        <td>${user.mail}</td>
        <td class="space-x-2">
          <button onclick="approveUser('${user.id}')" class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">✅ Duyệt</button>
          <button onclick="rejectUser('${user.id}')" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">❌ Từ chối</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    alert("Lỗi khi tải danh sách người dùng: " + err.message);
  }
}

async function approveUser(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ approved: true })
    });

    if (res.ok) {
      alert("✅ Duyệt tài khoản thành công!");
      loadUsers();
    } else {
      throw new Error("Không thể cập nhật");
    }
  } catch (err) {
    alert("Lỗi khi duyệt: " + err.message);
  }
}

async function rejectUser(id) {
  if (!confirm("Bạn có chắc chắn muốn từ chối và xóa tài khoản này không?")) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      alert("❌ Tài khoản đã bị từ chối và xóa!");
      loadUsers();
    } else {
      throw new Error("Không thể xóa");
    }
  } catch (err) {
    alert("Lỗi khi xóa tài khoản: " + err.message);
  }
}
