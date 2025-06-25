
const API_URL = 'https://684981f845f4c0f5ee71c0a8.mockapi.io/DangKySG01';
let allUsers = [];
let currentTab = 'pending';

// Initialize
window.addEventListener('DOMContentLoaded', () => {
  updateCurrentDate();
  loadUsers();
  setupCheckboxListeners();
});

function updateCurrentDate() {
  const now = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  document.getElementById('currentDate').textContent = now.toLocaleDateString('vi-VN', options);
}

function showLoading(show = true) {
  const overlay = document.getElementById('loadingOverlay');
  overlay.classList.toggle('hidden', !show);
}

async function loadUsers() {
  showLoading(true);
  try {
    const res = await fetch(API_URL);
    allUsers = await res.json();

    // Add mock dates if not present
    allUsers = allUsers.map(user => ({
      ...user,
      createdAt: user.createdAt || new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      approvedAt: user.approved ? (user.approvedAt || new Date().toISOString()) : null
    }));

    updateStats();
    renderCurrentTable();
  } catch (err) {
    showError("Lỗi khi tải danh sách người dùng: " + err.message);
  } finally {
    showLoading(false);
  }
}

function updateStats() {
  const pendingUsers = allUsers.filter(user => !user.approved);
  const approvedUsers = allUsers.filter(user => user.approved);
  const today = new Date().toDateString();
  const todayUsers = allUsers.filter(user => new Date(user.createdAt).toDateString() === today);

  document.getElementById('pendingCount').textContent = pendingUsers.length;
  document.getElementById('approvedCount').textContent = approvedUsers.length;
  document.getElementById('totalCount').textContent = allUsers.length;
  document.getElementById('todayCount').textContent = todayUsers.length;
  document.getElementById('pendingTabCount').textContent = pendingUsers.length;
  document.getElementById('approvedTabCount').textContent = approvedUsers.length;
}

function switchTab(tab) {
  currentTab = tab;

  // Update tab buttons
  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
  document.getElementById(tab + 'Tab').classList.add('active');

  // Show/hide tables
  document.getElementById('pendingTable').classList.toggle('hidden', tab !== 'pending');
  document.getElementById('approvedTable').classList.toggle('hidden', tab !== 'approved');

  renderCurrentTable();
}

function renderCurrentTable() {
  if (currentTab === 'pending') {
    renderPendingUsers();
  } else {
    renderApprovedUsers();
  }
}

function renderPendingUsers() {
  const pendingUsers = allUsers.filter(user => !user.approved);
  const tbody = document.getElementById('pendingTableBody');

  if (pendingUsers.length === 0) {
    tbody.innerHTML = `
                    <tr>
                        <td colspan="6" class="px-6 py-12 text-center text-gray-500">
                            <div class="flex flex-col items-center">
                                <i class="fas fa-inbox text-4xl mb-4 text-gray-300"></i>
                                <p class="text-lg font-medium">Không có tài khoản chờ duyệt</p>
                                <p class="text-sm">Tất cả tài khoản đã được xử lý</p>
                            </div>
                        </td>
                    </tr>
                `;
    return;
  }

  tbody.innerHTML = pendingUsers.map(user => `
                <tr class="table-row">
                    <td class="px-6 py-4">
                        <input type="checkbox" class="user-checkbox rounded border-gray-300" value="${user.id}">
                    </td>
                    <td class="px-6 py-4">
                        <div class="flex items-center">
                            <div class="h-10 w-10 flex-shrink-0">
                                <div class="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                                    ${user.username.charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">${user.username}</div>
                                <div class="text-sm text-gray-500">${user.mail}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="text-sm font-medium text-gray-900">${user.lastName}</div>
                        <div class="text-sm text-gray-500">${user.firstName || 'N/A'}</div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="text-sm text-gray-900">${formatDate(user.createdAt)}</div>
                        <div class="text-xs text-gray-500">${formatTime(user.createdAt)}</div>
                    </td>
                    <td class="px-6 py-4">
                        <span class="status-badge status-pending">
                            <i class="fas fa-clock"></i>
                            Chờ duyệt
                        </span>
                    </td>
                    <td class="px-6 py-4 text-center">
                        <div class="flex justify-center space-x-2">
                            <button onclick="approveUser('${user.id}')" class="btn-success text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1">
                                <i class="fas fa-check"></i>
                                Duyệt
                            </button>
                            <button onclick="rejectUser('${user.id}')" class="btn-danger text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1">
                                <i class="fas fa-times"></i>
                                Từ chối
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');
}

function renderApprovedUsers() {
  const approvedUsers = allUsers.filter(user => user.approved);
  const tbody = document.getElementById('approvedTableBody');

  if (approvedUsers.length === 0) {
    tbody.innerHTML = `
                    <tr>
                        <td colspan="5" class="px-6 py-12 text-center text-gray-500">
                            <div class="flex flex-col items-center">
                                <i class="fas fa-inbox text-4xl mb-4 text-gray-300"></i>
                                <p class="text-lg font-medium">Chưa có tài khoản được duyệt</p>
                            </div>
                        </td>
                    </tr>
                `;
    return;
  }

  tbody.innerHTML = approvedUsers.map(user => `
                <tr class="table-row">
                    <td class="px-6 py-4">
                        <div class="flex items-center">
                            <div class="h-10 w-10 flex-shrink-0">
                                <div class="h-10 w-10 rounded-full bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center text-white font-bold">
                                    ${user.username.charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">${user.username}</div>
                                <div class="text-sm text-gray-500">${user.mail}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="text-sm font-medium text-gray-900">${user.lastName}</div>
                        <div class="text-sm text-gray-500">${user.firstName || 'N/A'}</div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="text-sm text-gray-900">${formatDate(user.createdAt)}</div>
                        <div class="text-xs text-gray-500">${formatTime(user.createdAt)}</div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="text-sm text-gray-900">${formatDate(user.approvedAt)}</div>
                        <div class="text-xs text-gray-500">${formatTime(user.approvedAt)}</div>
                    </td>
                    <td class="px-6 py-4">
                        <span class="status-badge status-approved">
                            <i class="fas fa-check-circle"></i>
                            Đã duyệt
                        </span>
                    </td>
                </tr>
            `).join('');
}

function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN');
}

function formatTime(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleTimeString('vi-VN');
}

async function approveUser(id) {
  if (!confirm("Bạn có chắc chắn muốn duyệt tài khoản này không?")) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        approved: true,
        approvedAt: new Date().toISOString()
      })
    });

    if (res.ok) {
      showSuccess("✅ Duyệt tài khoản thành công!");
      loadUsers();
    } else {
      throw new Error("Không thể cập nhật");
    }
  } catch (err) {
    showError("Lỗi khi duyệt: " + err.message);
  }
}

async function rejectUser(id) {
  if (!confirm("Bạn có chắc chắn muốn từ chối và xóa tài khoản này không?")) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      showSuccess("❌ Tài khoản đã bị từ chối và xóa!");
      loadUsers();
    } else {
      throw new Error("Không thể xóa");
    }
  } catch (err) {
    showError("Lỗi khi xóa tài khoản: " + err.message);
  }
}

function setupCheckboxListeners() {
  document.getElementById('selectAllPending').addEventListener('change', function () {
    const checkboxes = document.querySelectorAll('.user-checkbox');
    checkboxes.forEach(cb => cb.checked = this.checked);
  });
}

async function bulkApprove() {
  const selectedIds = Array.from(document.querySelectorAll('.user-checkbox:checked')).map(cb => cb.value);

  if (selectedIds.length === 0) {
    showError("Vui lòng chọn ít nhất một tài khoản để duyệt!");
    return;
  }

  if (!confirm(`Bạn có chắc chắn muốn duyệt ${selectedIds.length} tài khoản đã chọn không?`)) return;

  showLoading(true);
  try {
    const promises = selectedIds.map(id =>
      fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          approved: true,
          approvedAt: new Date().toISOString()
        })
      })
    );

    await Promise.all(promises);
    showSuccess(`✅ Đã duyệt thành công ${selectedIds.length} tài khoản!`);
    loadUsers();
  } catch (err) {
    showError("Lỗi khi duyệt hàng loạt: " + err.message);
  } finally {
    showLoading(false);
  }
}

async function refreshData() {
  const refreshIcon = document.getElementById('refreshIcon');
  refreshIcon.classList.add('animate-spin');

  await loadUsers();

  setTimeout(() => {
    refreshIcon.classList.remove('animate-spin');
  }, 1000);
}

function exportToExcel() {
  if (allUsers.length === 0) {
    showError("Không có dữ liệu để xuất!");
    return;
  }

  const exportData = allUsers.map(user => ({
    'Tên đăng nhập': user.username,
    'Họ': user.lastName,
    'Tên': user.firstName || 'N/A',
    'Email': user.mail,
    'Trạng thái': user.approved ? 'Đã duyệt' : 'Chờ duyệt',
    'Thời gian đăng ký': formatDate(user.createdAt) + ' ' + formatTime(user.createdAt),
    'Thời gian duyệt': user.approvedAt ? formatDate(user.approvedAt) + ' ' + formatTime(user.approvedAt) : 'N/A'
  }));

  const ws = XLSX.utils.json_to_sheet(exportData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Danh sách tài khoản');

  // Tự động điều chỉnh độ rộng cột
  const cols = [];
  const maxLengths = {};

  // Tính độ rộng tối đa cho mỗi cột
  Object.keys(exportData[0]).forEach(key => {
    maxLengths[key] = Math.max(
      key.length,
      ...exportData.map(row => String(row[key]).length)
    );
  });

  Object.keys(maxLengths).forEach(key => {
    cols.push({ width: Math.min(maxLengths[key] + 2, 50) });
  });

  ws['!cols'] = cols;

  // Tạo tên file với timestamp
  const now = new Date();
  const timestamp = now.toISOString().slice(0, 19).replace(/[:-]/g, '');
  const filename = `Danh_sach_tai_khoan_${timestamp}.xlsx`;

  XLSX.writeFile(wb, filename);
  showSuccess("📊 Xuất Excel thành công!");
}

function showSuccess(message) {
  // Tạo toast notification success
  const toast = document.createElement('div');
  toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
  toast.innerHTML = `
                <div class="flex items-center gap-2">
                    <i class="fas fa-check-circle"></i>
                    <span>${message}</span>
                </div>
            `;

  document.body.appendChild(toast);

  // Hiển thị toast
  setTimeout(() => {
    toast.classList.remove('translate-x-full');
  }, 100);

  // Ẩn toast sau 3 giây
  setTimeout(() => {
    toast.classList.add('translate-x-full');
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

function showError(message) {
  // Tạo toast notification error
  const toast = document.createElement('div');
  toast.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
  toast.innerHTML = `
                <div class="flex items-center gap-2">
                    <i class="fas fa-exclamation-circle"></i>
                    <span>${message}</span>
                </div>
            `;

  document.body.appendChild(toast);

  // Hiển thị toast
  setTimeout(() => {
    toast.classList.remove('translate-x-full');
  }, 100);

  // Ẩn toast sau 4 giây (lâu hơn error)
  setTimeout(() => {
    toast.classList.add('translate-x-full');
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 4000);
}

// Thêm các event listener khác
document.addEventListener('DOMContentLoaded', function () {
  // Xử lý responsive cho mobile
  const handleResize = () => {
    if (window.innerWidth < 768) {
      // Mobile: stack action buttons
      const actionButtons = document.querySelector('.flex.flex-wrap.gap-4.mb-6');
      if (actionButtons) {
        actionButtons.classList.add('flex-col');
      }
    } else {
      // Desktop: horizontal layout
      const actionButtons = document.querySelector('.flex.flex-wrap.gap-4.mb-6');
      if (actionButtons) {
        actionButtons.classList.remove('flex-col');
      }
    }
  };

  window.addEventListener('resize', handleResize);
  handleResize(); // Chạy lần đầu

  // Thêm keyboard shortcuts
  document.addEventListener('keydown', function (e) {
    // Ctrl + R: Refresh
    if (e.ctrlKey && e.key === 'r') {
      e.preventDefault();
      refreshData();
    }

    // Ctrl + E: Export
    if (e.ctrlKey && e.key === 'e') {
      e.preventDefault();
      exportToExcel();
    }

    // Ctrl + A: Select all (trong tab pending)
    if (e.ctrlKey && e.key === 'a' && currentTab === 'pending') {
      e.preventDefault();
      const selectAllCheckbox = document.getElementById('selectAllPending');
      if (selectAllCheckbox) {
        selectAllCheckbox.checked = true;
        selectAllCheckbox.dispatchEvent(new Event('change'));
      }
    }
  });
});

// Thêm auto-refresh mỗi 5 phút
setInterval(() => {
  console.log('Auto-refreshing data...');
  loadUsers();
}, 5 * 60 * 1000); // 5 phút

// Thêm function search/filter (nếu cần)
function searchUsers(searchTerm) {
  const filteredUsers = allUsers.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.mail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.firstName && user.firstName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Render filtered results
  renderFilteredUsers(filteredUsers);
}

function renderFilteredUsers(users) {
  // Logic tương tự renderPendingUsers/renderApprovedUsers nhưng với danh sách đã filter
  const pendingUsers = users.filter(user => !user.approved);
  const approvedUsers = users.filter(user => user.approved);

  if (currentTab === 'pending') {
    renderUsersInTable(pendingUsers, 'pendingTableBody', true);
  } else {
    renderUsersInTable(approvedUsers, 'approvedTableBody', false);
  }
}

function renderUsersInTable(users, tableBodyId, isPending) {
  const tbody = document.getElementById(tableBodyId);

  if (users.length === 0) {
    tbody.innerHTML = `
                    <tr>
                        <td colspan="${isPending ? '6' : '5'}" class="px-6 py-12 text-center text-gray-500">
                            <div class="flex flex-col items-center">
                                <i class="fas fa-search text-4xl mb-4 text-gray-300"></i>
                                <p class="text-lg font-medium">Không tìm thấy kết quả</p>
                                <p class="text-sm">Thử tìm kiếm với từ khóa khác</p>
                            </div>
                        </td>
                    </tr>
                `;
    return;
  }

  tbody.innerHTML = users.map(user => {
    if (isPending) {
      return `
                        <tr class="table-row">
                            <td class="px-6 py-4">
                                <input type="checkbox" class="user-checkbox rounded border-gray-300" value="${user.id}">
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex items-center">
                                    <div class="h-10 w-10 flex-shrink-0">
                                        <div class="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                                            ${user.username.charAt(0).toUpperCase()}
                                        </div>
                                    </div>                                    
                                    <div class="ml-4">
                                        <div class="text-sm font-medium text-gray-900">${user.username}</div>
                                        <div class="text-sm text-gray-500">${user.mail}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="text-sm font-medium text-gray-900">${user.lastName}</div>
                                <div class="text-sm text-gray-500">${user.firstName || 'N/A'}</div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="text-sm text-gray-900">${formatDate(user.createdAt)}</div>
                                <div class="text-xs text-gray-500">${formatTime(user.createdAt)}</div>
                            </td>
                            <td class="px-6 py-4">
                                <span class="status-badge status-pending">
                                    <i class="fas fa-clock"></i>
                                    Chờ duyệt
                                </span>
                            </td>
                            <td class="px-6 py-4 text-center">
                                <div class="flex justify-center space-x-2">
                                    <button onclick="approveUser('${user.id}')" class="btn-success text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1">
                                        <i class="fas fa-check"></i>
                                        Duyệt
                                    </button>
                                    <button onclick="rejectUser('${user.id}')" class="btn-danger text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1">
                                        <i class="fas fa-times"></i>
                                        Từ chối
                                    </button>
                                </div>
                            </td>
                        </tr>
                    `;
    } else {
      return `
                        <tr class="table-row">
                            <td class="px-6 py-4">
                                <div class="flex items-center">
                                    <div class="h-10 w-10 flex-shrink-0">
                                        <div class="h-10 w-10 rounded-full bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center text-white font-bold">
                                            ${user.username.charAt(0).toUpperCase()}
                                        </div>
                                    </div>
                                    <div class="ml-4">
                                        <div class="text-sm font-medium text-gray-900">${user.username}</div>
                                        <div class="text-sm text-gray-500">${user.mail}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="text-sm font-medium text-gray-900">${user.lastName}</div>
                                <div class="text-sm text-gray-500">${user.firstName || 'N/A'}</div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="text-sm text-gray-900">${formatDate(user.createdAt)}</div>
                                <div class="text-xs text-gray-500">${formatTime(user.createdAt)}</div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="text-sm text-gray-900">${formatDate(user.approvedAt)}</div>
                                <div class="text-xs text-gray-500">${formatTime(user.approvedAt)}</div>
                            </td>
                            <td class="px-6 py-4">
                                <span class="status-badge status-approved">
                                    <i class="fas fa-check-circle"></i>
                                    Đã duyệt
                                </span>
                            </td>
                        </tr>
                    `;
    }
  }).join('');
}

// Log để debug
console.log('📋 Hệ thống quản trị tài khoản đã được khởi tạo');
console.log('⌨️ Keyboard shortcuts:');
console.log('  - Ctrl + R: Refresh data');
console.log('  - Ctrl + E: Export to Excel');
console.log('  - Ctrl + A: Select all (trong tab pending)');
