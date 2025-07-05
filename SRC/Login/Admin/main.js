
const API_URL = 'https://684981f845f4c0f5ee71c0a8.mockapi.io/DangKySG01';
let allEmployees = [];
let currentTab = 'pending';

// Initialize
window.addEventListener('DOMContentLoaded', () => {
  updateCurrentDate();
  loadEmployees();
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

async function loadEmployees() {
  showLoading(true);
  try {
    const res = await fetch(API_URL);
    allEmployees = await res.json();

    // Add mock dates if not present
    allEmployees = allEmployees.map(emp => ({
      ...emp,
      employeeCode: emp.employeeCode || emp.username || `EMP${Math.floor(Math.random() * 10000)}`,
      fullName: emp.fullName || `${emp.firstName || ''} ${emp.lastName || ''}`.trim() || emp.username,
      email: emp.email || emp.mail,
      createdAt: emp.createdAt || new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      approvedAt: emp.approved ? (emp.approvedAt || new Date().toISOString()) : null
    }));

    updateStats();
    renderCurrentTable();
  } catch (err) {
    showError("Lỗi khi tải danh sách nhân viên: " + err.message);
  } finally {
    showLoading(false);
  }
}

function updateStats() {
  const pendingEmployees = allEmployees.filter(emp => !emp.approved);
  const approvedEmployees = allEmployees.filter(emp => emp.approved);
  const today = new Date().toDateString();
  const todayEmployees = allEmployees.filter(emp => new Date(emp.createdAt).toDateString() === today);

  document.getElementById('pendingCount').textContent = pendingEmployees.length;
  document.getElementById('approvedCount').textContent = approvedEmployees.length;
  document.getElementById('totalCount').textContent = allEmployees.length;
  document.getElementById('todayCount').textContent = todayEmployees.length;
  document.getElementById('pendingTabCount').textContent = pendingEmployees.length;
  document.getElementById('approvedTabCount').textContent = approvedEmployees.length;
}

function switchTab(tab) {
  currentTab = tab;

  // Update tab buttons
  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active', 'border-blue-500', 'text-blue-600', 'bg-blue-50'));
  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.add('border-transparent', 'text-gray-500'));

  const activeTab = document.getElementById(tab + 'Tab');
  activeTab.classList.add('active', 'border-blue-500', 'text-blue-600', 'bg-blue-50');
  activeTab.classList.remove('border-transparent', 'text-gray-500');

  // Show/hide tables
  document.getElementById('pendingTable').classList.toggle('hidden', tab !== 'pending');
  document.getElementById('approvedTable').classList.toggle('hidden', tab !== 'approved');

  renderCurrentTable();
}

function renderCurrentTable() {
  if (currentTab === 'pending') {
    renderPendingEmployees();
  } else {
    renderApprovedEmployees();
  }
}

function renderPendingEmployees() {
  const pendingEmployees = allEmployees.filter(emp => !emp.approved);
  const tbody = document.getElementById('pendingTableBody');

  if (pendingEmployees.length === 0) {
    tbody.innerHTML = `
                    <tr>
                        <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                            <div class="flex flex-col items-center">
                                <i class="fas fa-inbox text-4xl mb-4 text-gray-300"></i>
                                <p class="text-lg font-medium">Không có nhân viên chờ duyệt</p>
                                <p class="text-sm">Tất cả nhân viên đã được xử lý</p>
                            </div>
                        </td>
                    </tr>
                `;
    return;
  }

  tbody.innerHTML = pendingEmployees.map(emp => `
                <tr class="table-row">
                    <td class="px-6 py-4">
                        <input type="checkbox" class="employee-checkbox rounded border-gray-300" value="${emp.id}">
                    </td>
                    <td class="px-6 py-4">
                        <div class="flex items-center">
                            <div class="h-10 w-10 flex-shrink-0">
                                <div class="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold">
                                    ${emp.employeeCode.charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">${emp.employeeCode}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="text-sm font-medium text-gray-900">${emp.fullName}</div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="text-sm text-gray-900">${emp.email}</div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="text-sm text-gray-900">${formatDate(emp.createdAt)}</div>
                        <div class="text-xs text-gray-500">${formatTime(emp.createdAt)}</div>
                    </td>
                    <td class="px-6 py-4">
                        <span class="status-badge status-pending">
                            <i class="fas fa-clock"></i>
                            Chờ duyệt
                        </span>
                    </td>
                    <td class="px-6 py-4 text-center">
                        <div class="flex justify-center space-x-2">
                            <button onclick="approveEmployee('${emp.id}')" class="btn-success text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1">
                                <i class="fas fa-check"></i>
                                Duyệt
                            </button>
                            <button onclick="rejectEmployee('${emp.id}')" class="btn-danger text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1">
                                <i class="fas fa-times"></i>
                                Từ chối
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');
}

// function renderApprovedEmployees() {
//   const approvedEmployees = allEmployees.filter(emp => emp.approved);
//   const tbody = document.getElementById('approvedTableBody');

//   if (approvedEmployees.length === 0) {
//     tbody.innerHTML = `
//                     <tr>
//                         <td colspan="6" class="px-6 py-12 text-center text-gray-500">
//                             <div class="flex flex-col items-center">
//                                 <i class="fas fa-inbox text-4xl mb-4 text-gray-300"></i>
//                                 <p class="text-lg font-medium">Chưa có nhân viên được duyệt</p>
//                             </div>
//                         </td>
//                     </tr>
//                 `;
//     return;
//   }

//   tbody.innerHTML = approvedEmployees.map(emp => `
//                 <tr class="table-row">
//                     <td class="px-6 py-4">
//                         <div class="flex items-center">
//                             <div class="h-10 w-10 flex-shrink-0">
//                                 <div class="h-10 w-10 rounded-full bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center text-white font-bold">
//                                     ${emp.employeeCode.charAt(0).toUpperCase()}
//                                 </div>
//                             </div>
//                             <div class="ml-4">
//                                 <div class="text-sm font-medium text-gray-900">${emp.employeeCode}</div>
//                             </div>
//                         </div>
//                     </td>
//                     <td class="px-6 py-4">
//                         <div class="text-sm font-medium text-gray-900">${emp.fullName}</div>
//                     </td>
//                     <td class="px-6 py-4">
//                         <div class="text-sm text-gray-900">${emp.email}</div>
//                     </td>
//                     <td class="px-6 py-4">
//                         <div class="text-sm text-gray-900">${formatDate(emp.createdAt)}</div>
//                         <div class="text-xs text-gray-500">${formatTime(emp.createdAt)}</div>
//                     </td>
//                     <td class="px-6 py-4">
//                         <div class="text-sm text-gray-900">${formatDate(emp.approvedAt)}</div>
//                         <div class="text-xs text-gray-500">${formatTime(emp.approvedAt)}</div>
//                     </td>
//                     <td class="px-6 py-4">
//                         <span class="status-badge status-approved">
//                             <i class="fas fa-check-circle"></i>
//                             Đã duyệt
//                         </span>
//                     </td>
//                 </tr>
//             `).join('');
// }
function renderApprovedEmployees() {
  const approvedEmployees = allEmployees.filter(emp => emp.approved);
  const tbody = document.getElementById('approvedTableBody');

  if (approvedEmployees.length === 0) {
    tbody.innerHTML = `
                    <tr>
                        <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                            <div class="flex flex-col items-center">
                                <i class="fas fa-inbox text-4xl mb-4 text-gray-300"></i>
                                <p class="text-lg font-medium">Chưa có nhân viên được duyệt</p>
                            </div>
                        </td>
                    </tr>
                `;
    return;
  }

  tbody.innerHTML = approvedEmployees.map(emp => `
                <tr class="table-row">
                    <td class="px-6 py-4">
                        <div class="flex items-center">
                            <div class="h-10 w-10 flex-shrink-0">
                                <div class="h-10 w-10 rounded-full bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center text-white font-bold">
                                    ${(emp.employeeCode || emp.maSoNV || emp.username || 'N').charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">${emp.employeeCode || emp.maSoNV || emp.username}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="text-sm font-medium text-gray-900">${emp.fullName || emp.firstName}</div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="text-sm text-gray-900">${emp.email || 'Chưa có email'}</div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="text-sm text-gray-900">${formatDate(emp.createdAt)}</div>
                        <div class="text-xs text-gray-500">${formatTime(emp.createdAt)}</div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="text-sm text-gray-900">${formatDate(emp.approvedAt)}</div>
                        <div class="text-xs text-gray-500">${formatTime(emp.approvedAt)}</div>
                    </td>
                    <td class="px-6 py-4">
                        <span class="status-badge status-approved">
                            <i class="fas fa-check-circle"></i>
                            Đã duyệt
                        </span>
                    </td>
                    <td class="px-6 py-4">
                        <div class="flex space-x-2">
                            <button 
                                onclick="showDeleteConfirmModal('${emp.id}', '${emp.employeeCode || emp.maSoNV || emp.username}', '${emp.fullName || emp.firstName}')" 
                                class="delete-btn text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-colors duration-200 group"
                                title="Xóa tài khoản"
                            >
                                <i class="fas fa-trash-alt group-hover:scale-110 transition-transform duration-200"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');
}

// Modal xác nhận xóa
function showDeleteConfirmModal(employeeId, employeeCode, employeeName) {
    // Tạo modal xác nhận xóa
    const modal = document.createElement('div');
    modal.id = 'deleteConfirmModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    
    modal.innerHTML = `
        <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div class="flex items-center mb-4">
                <div class="flex-shrink-0">
                    <div class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                        <i class="fas fa-exclamation-triangle text-red-600 text-xl"></i>
                    </div>
                </div>
                <div class="ml-4">
                    <h3 class="text-lg font-semibold text-gray-900">
                        Xác nhận xóa tài khoản
                    </h3>
                    <p class="text-sm text-gray-600">
                        Hành động này không thể hoàn tác
                    </p>
                </div>
            </div>
            
            <div class="mb-6">
                <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p class="text-sm text-red-800">
                        <strong>Mã nhân viên:</strong> ${employeeCode}<br>
                        <strong>Tên:</strong> ${employeeName}<br><br>
                        Bạn có chắc chắn muốn xóa tài khoản này không?
                    </p>
                </div>
            </div>
            
            <div class="flex space-x-3">
                <button 
                    onclick="deleteEmployee('${employeeId}')" 
                    class="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                    <i class="fas fa-trash-alt mr-2"></i>
                    Xóa tài khoản
                </button>
                <button 
                    onclick="closeDeleteConfirmModal()" 
                    class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                    Hủy
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Đóng modal xác nhận xóa
function closeDeleteConfirmModal() {
    const modal = document.getElementById('deleteConfirmModal');
    if (modal) {
        modal.remove();
    }
}

// Xóa nhân viên
async function deleteEmployee(employeeId) {
    const API_URL = 'https://684981f845f4c0f5ee71c0a8.mockapi.io/DangKySG01';
    
    try {
        // Hiển thị loading
        showDeleteStatus('⏳ Đang xóa tài khoản...', 'info');
        
        const response = await fetch(`${API_URL}/${employeeId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if (response.ok) {
            showDeleteStatus('✅ Xóa tài khoản thành công!', 'success');
            
            // Cập nhật danh sách local
            allEmployees = allEmployees.filter(emp => emp.id !== employeeId);
            
            // Refresh hiển thị
            setTimeout(() => {
                renderApprovedEmployees();
                updateStatistics();
                closeDeleteConfirmModal();
                
                // Hiển thị thông báo thành công
                showNotification('Đã xóa tài khoản thành công!', 'success');
            }, 1000);
            
        } else {
            throw new Error('Không thể xóa tài khoản');
        }
        
    } catch (error) {
        console.error('Delete error:', error);
        showDeleteStatus('❌ Lỗi khi xóa tài khoản: ' + error.message, 'error');
        
        // Tự động đóng modal sau 3 giây nếu có lỗi
        setTimeout(() => {
            closeDeleteConfirmModal();
        }, 3000);
    }
}

// Hiển thị trạng thái xóa trong modal
function showDeleteStatus(message, type) {
    const modal = document.getElementById('deleteConfirmModal');
    if (!modal) return;
    
    // Tìm hoặc tạo status element
    let statusDiv = modal.querySelector('.delete-status');
    if (!statusDiv) {
        statusDiv = document.createElement('div');
        statusDiv.className = 'delete-status mt-4 p-3 rounded-lg text-sm';
        
        const buttonContainer = modal.querySelector('.flex.space-x-3');
        modal.querySelector('.bg-white').insertBefore(statusDiv, buttonContainer);
    }
    
    // Cập nhật nội dung và style
    statusDiv.className = `delete-status mt-4 p-3 rounded-lg text-sm ${getStatusClass(type)}`;
    statusDiv.innerHTML = `<i class="fas ${getStatusIcon(type)} mr-2"></i>${message}`;
}

// Hàm hiển thị thông báo chung
function showNotification(message, type = 'info', duration = 3000) {
    // Tạo notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 translate-x-full ${getNotificationClass(type)}`;
    
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${getStatusIcon(type)} mr-3"></i>
            <span class="font-medium">${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-3 text-current opacity-70 hover:opacity-100">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.classList.remove('translate-x-full');
        notification.classList.add('translate-x-0');
    });
    
    // Auto remove
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, duration);
}

// Helper functions
function getNotificationClass(type) {
    switch(type) {
        case 'success': return 'bg-green-500 text-white';
        case 'error': return 'bg-red-500 text-white';
        case 'warning': return 'bg-yellow-500 text-white';
        case 'info':
        default: return 'bg-blue-500 text-white';
    }
}

function getStatusClass(type) {
    switch(type) {
        case 'success': return 'bg-green-50 text-green-800 border border-green-200';
        case 'error': return 'bg-red-50 text-red-800 border border-red-200';
        case 'warning': return 'bg-yellow-50 text-yellow-800 border border-yellow-200';
        case 'info': 
        default: return 'bg-blue-50 text-blue-800 border border-blue-200';
    }
}

function getStatusIcon(type) {
    switch(type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        case 'info':
        default: return 'fa-info-circle';
    }
}

// Hàm format date và time (nếu chưa có)
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    } catch {
        return 'N/A';
    }
}

function formatTime(dateString) {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        return date.toLocaleTimeString('vi-VN', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    } catch {
        return '';
    }
}

// Hàm cập nhật thống kê (cần implement nếu chưa có)
function updateStatistics() {
    // Implement logic cập nhật thống kê ở đây
    console.log('Updating statistics...');
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

async function approveEmployee(id) {
  if (!confirm("Bạn có chắc chắn muốn duyệt nhân viên này không?")) return;

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
      showSuccess("✅ Duyệt nhân viên thành công!");
      loadEmployees();
    } else {
      throw new Error("Không thể cập nhật");
    }
  } catch (err) {
    showError("Lỗi khi duyệt: " + err.message);
  }
}

async function rejectEmployee(id) {
  if (!confirm("Bạn có chắc chắn muốn từ chối và xóa nhân viên này không?")) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      showSuccess("❌ Nhân viên đã bị từ chối và xóa!");
      loadEmployees();
    } else {
      throw new Error("Không thể xóa");
    }
  } catch (err) {
    showError("Lỗi khi xóa nhân viên: " + err.message);
  }
}

function setupCheckboxListeners() {
  document.getElementById('selectAllPending').addEventListener('change', function () {
    const checkboxes = document.querySelectorAll('.employee-checkbox');
    checkboxes.forEach(cb => cb.checked = this.checked);
  });
}

async function bulkApprove() {
  const selectedIds = Array.from(document.querySelectorAll('.employee-checkbox:checked')).map(cb => cb.value);

  if (selectedIds.length === 0) {
    showError("Vui lòng chọn ít nhất một nhân viên để duyệt!");
    return;
  }

  if (!confirm(`Bạn có chắc chắn muốn duyệt ${selectedIds.length} nhân viên đã chọn không?`)) return;

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
    showSuccess(`✅ Đã duyệt thành công ${selectedIds.length} nhân viên!`);
    loadEmployees();
  } catch (err) {
    showError("Lỗi khi duyệt hàng loạt: " + err.message);
  } finally {
    showLoading(false);
  }
}

async function refreshData() {
  const refreshIcon = document.getElementById('refreshIcon');
  refreshIcon.classList.add('animate-spin');

  await loadEmployees();

  setTimeout(() => {
    refreshIcon.classList.remove('animate-spin');
  }, 1000);
}

function exportToExcel() {
  if (allEmployees.length === 0) {
    showError("Không có dữ liệu để xuất!");
    return;
  }

  const exportData = allEmployees.map(emp => ({
    'Mã số nhân viên': emp.employeeCode,
    'Tên nhân viên': emp.fullName,
    'Email': emp.email,
    'Trạng thái': emp.approved ? 'Đã duyệt' : 'Chờ duyệt',
    'Thời gian đăng ký': formatDate(emp.createdAt),
    'Thời gian duyệt': emp.approvedAt ? formatDate(emp.approvedAt) : 'Chưa duyệt'
  }));

  // Tạo worksheet
  const ws = XLSX.utils.json_to_sheet(exportData);

  // Tạo workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Danh sách nhân viên");

  // Xuất file
  const fileName = `DanhSachNhanVien_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(wb, fileName);

  showSuccess("✅ Xuất dữ liệu thành công!");
}

function showSuccess(message) {
  const toast = document.createElement('div');
  toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-transform duration-300';
  toast.innerHTML = `
                <div class="flex items-center gap-2">
                    <i class="fas fa-check-circle"></i>
                    <span>${message}</span>
                </div>
            `;

  document.body.appendChild(toast);

  // Animation
  setTimeout(() => toast.classList.add('translate-x-0'), 100);

  // Auto remove
  setTimeout(() => {
    toast.classList.add('translate-x-full');
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
}

function showError(message) {
  const toast = document.createElement('div');
  toast.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-transform duration-300';
  toast.innerHTML = `
                <div class="flex items-center gap-2">
                    <i class="fas fa-exclamation-triangle"></i>
                    <span>${message}</span>
                </div>
            `;

  document.body.appendChild(toast);

  // Animation
  setTimeout(() => toast.classList.add('translate-x-0'), 100);

  // Auto remove
  setTimeout(() => {
    toast.classList.add('translate-x-full');
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 4000);
}

// Hàm tìm kiếm nhân viên
function searchEmployees() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();

  if (!searchTerm) {
    renderCurrentTable();
    return;
  }

  const filteredEmployees = allEmployees.filter(emp => {
    const matchesTab = currentTab === 'pending' ? !emp.approved : emp.approved;
    const matchesSearch =
      emp.employeeCode.toLowerCase().includes(searchTerm) ||
      emp.fullName.toLowerCase().includes(searchTerm) ||
      emp.email.toLowerCase().includes(searchTerm);

    return matchesTab && matchesSearch;
  });

  renderFilteredEmployees(filteredEmployees);
}

function renderFilteredEmployees(employees) {
  const tbody = document.getElementById(currentTab + 'TableBody');

  if (employees.length === 0) {
    tbody.innerHTML = `
                    <tr>
                        <td colspan="${currentTab === 'pending' ? '7' : '6'}" class="px-6 py-12 text-center text-gray-500">
                            <div class="flex flex-col items-center">
                                <i class="fas fa-search text-4xl mb-4 text-gray-300"></i>
                                <p class="text-lg font-medium">Không tìm thấy kết quả</p>
                                <p class="text-sm">Thử với từ khóa khác</p>
                            </div>
                        </td>
                    </tr>
                `;
    return;
  }

  if (currentTab === 'pending') {
    tbody.innerHTML = employees.map(emp => `
                    <tr class="table-row">
                        <td class="px-6 py-4">
                            <input type="checkbox" class="employee-checkbox rounded border-gray-300" value="${emp.id}">
                        </td>
                        <td class="px-6 py-4">
                            <div class="flex items-center">
                                <div class="h-10 w-10 flex-shrink-0">
                                    <div class="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold">
                                        ${emp.employeeCode.charAt(0).toUpperCase()}
                                    </div>
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-medium text-gray-900">${emp.employeeCode}</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4">
                            <div class="text-sm font-medium text-gray-900">${emp.fullName}</div>
                        </td>
                        <td class="px-6 py-4">
                            <div class="text-sm text-gray-900">${emp.email}</div>
                        </td>
                        <td class="px-6 py-4">
                            <div class="text-sm text-gray-900">${formatDate(emp.createdAt)}</div>
                            <div class="text-xs text-gray-500">${formatTime(emp.createdAt)}</div>
                        </td>
                        <td class="px-6 py-4">
                            <span class="status-badge status-pending">
                                <i class="fas fa-clock"></i>
                                Chờ duyệt
                            </span>
                        </td>
                        <td class="px-6 py-4 text-center">
                            <div class="flex justify-center space-x-2">
                                <button onclick="approveEmployee('${emp.id}')" class="btn-success text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1">
                                    <i class="fas fa-check"></i>
                                    Duyệt
                                </button>
                                <button onclick="rejectEmployee('${emp.id}')" class="btn-danger text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1">
                                    <i class="fas fa-times"></i>
                                    Từ chối
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join('');
  } else {
    tbody.innerHTML = employees.map(emp => `
                    <tr class="table-row">
                        <td class="px-6 py-4">
                            <div class="flex items-center">
                                <div class="h-10 w-10 flex-shrink-0">
                                    <div class="h-10 w-10 rounded-full bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center text-white font-bold">
                                        ${emp.employeeCode.charAt(0).toUpperCase()}
                                    </div>
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-medium text-gray-900">${emp.employeeCode}</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4">
                            <div class="text-sm font-medium text-gray-900">${emp.fullName}</div>
                        </td>
                        <td class="px-6 py-4">
                            <div class="text-sm text-gray-900">${emp.email}</div>
                        </td>
                        <td class="px-6 py-4">
                            <div class="text-sm text-gray-900">${formatDate(emp.createdAt)}</div>
                            <div class="text-xs text-gray-500">${formatTime(emp.createdAt)}</div>
                        </td>
                        <td class="px-6 py-4">
                            <div class="text-sm text-gray-900">${formatDate(emp.approvedAt)}</div>
                            <div class="text-xs text-gray-500">${formatTime(emp.approvedAt)}</div>
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
}

// Hàm lọc theo ngày
function filterByDate() {
  const dateFilter = document.getElementById('dateFilter').value;
  if (!dateFilter) {
    renderCurrentTable();
    return;
  }

  const selectedDate = new Date(dateFilter).toDateString();
  const filteredEmployees = allEmployees.filter(emp => {
    const matchesTab = currentTab === 'pending' ? !emp.approved : emp.approved;
    const matchesDate = new Date(emp.createdAt).toDateString() === selectedDate;

    return matchesTab && matchesDate;
  });

  renderFilteredEmployees(filteredEmployees);
}

// Hàm reset filter
function resetFilters() {
  document.getElementById('searchInput').value = '';
  document.getElementById('dateFilter').value = '';
  renderCurrentTable();
}

// Event listeners cho search và filter
document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', searchEmployees);
  }

  const dateFilter = document.getElementById('dateFilter');
  if (dateFilter) {
    dateFilter.addEventListener('change', filterByDate);
  }
});

// Import Excel Functions

// Mở modal import
function openImportModal() {
    document.getElementById('importModal').classList.remove('hidden');
}

// Đóng modal import
function closeImportModal() {
    document.getElementById('importModal').classList.add('hidden');
    // Reset file input
    document.getElementById('importFile').value = '';
    clearImportStatus();
}

// Xóa thông báo trạng thái import
function clearImportStatus() {
    const statusElements = document.querySelectorAll('.import-status');
    statusElements.forEach(el => el.remove());
}

// Hiển thị thông báo trạng thái
function showImportStatus(message, type = 'info') {
    clearImportStatus();
    
    const modal = document.querySelector('#importModal .bg-white');
    const statusDiv = document.createElement('div');
    statusDiv.className = `import-status p-3 rounded-lg mb-4 ${getStatusClass(type)}`;
    statusDiv.innerHTML = `
        <i class="fas ${getStatusIcon(type)} mr-2"></i>
        ${message}
    `;
    
    // Thêm status div trước nút action
    const buttonContainer = modal.querySelector('.flex.gap-3');
    modal.insertBefore(statusDiv, buttonContainer);
}

// Lấy class CSS cho trạng thái
function getStatusClass(type) {
    switch(type) {
        case 'success': return 'bg-green-50 text-green-800 border border-green-200';
        case 'error': return 'bg-red-50 text-red-800 border border-red-200';
        case 'warning': return 'bg-yellow-50 text-yellow-800 border border-yellow-200';
        case 'info': 
        default: return 'bg-blue-50 text-blue-800 border border-blue-200';
    }
}

// Lấy icon cho trạng thái
function getStatusIcon(type) {
    switch(type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        case 'info':
        default: return 'fa-info-circle';
    }
}

// Xử lý import Excel
async function processImport() {
    const fileInput = document.getElementById('importFile');
    const file = fileInput.files[0];
    
    if (!file) {
        showImportStatus('Vui lòng chọn file Excel!', 'warning');
        return;
    }
    
    // Kiểm tra định dạng file
    const validExtensions = ['.xlsx', '.xls'];
    const fileName = file.name.toLowerCase();
    const isValidFile = validExtensions.some(ext => fileName.endsWith(ext));
    
    if (!isValidFile) {
        showImportStatus('File không hợp lệ! Chỉ chấp nhận file Excel (.xlsx, .xls)', 'error');
        return;
    }
    
    showImportStatus('⏳ Đang xử lý file Excel...', 'info');
    
    try {
        // Đọc file Excel
        const data = await readExcelFile(file);
        
        if (!data || data.length === 0) {
            showImportStatus('File Excel trống hoặc không có dữ liệu!', 'error');
            return;
        }
        
        // Validate và xử lý dữ liệu
        const processedData = validateAndProcessData(data);
        
        if (processedData.errors.length > 0) {
            showImportStatus(
                `Có ${processedData.errors.length} lỗi trong dữ liệu:<br>` + 
                processedData.errors.slice(0, 3).join('<br>') +
                (processedData.errors.length > 3 ? '<br>...' : ''),
                'error'
            );
            return;
        }
        
        // Import dữ liệu lên server
        const result = await importDataToServer(processedData.validData);
        
        showImportStatus(
            `✅ Import thành công ${result.success} nhân viên!` +
            (result.failed > 0 ? ` (${result.failed} thất bại)` : ''),
            result.failed > 0 ? 'warning' : 'success'
        );
        
        // Refresh data sau khi import thành công
        setTimeout(() => {
            if (typeof refreshEmployeeList === 'function') {
                refreshEmployeeList();
            }
            closeImportModal();
        }, 2000);
        
    } catch (error) {
        console.error('Import error:', error);
        showImportStatus('❌ Lỗi khi xử lý file: ' + error.message, 'error');
    }
}

// Đọc file Excel bằng FileReader và thư viện XLSX
function readExcelFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                // Sử dụng XLSX library để đọc file
                // Cần include thư viện: <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
                
                if (typeof XLSX === 'undefined') {
                    reject(new Error('Thư viện XLSX chưa được tải. Vui lòng thêm thư viện XLSX vào trang.'));
                    return;
                }
                
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                
                // Lấy sheet đầu tiên
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                
                // Chuyển đổi thành JSON
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
                    header: 1,  // Sử dụng array thay vì object
                    defval: ''  // Giá trị mặc định cho ô trống
                });
                
                resolve(jsonData);
            } catch (error) {
                reject(new Error('Không thể đọc file Excel: ' + error.message));
            }
        };
        
        reader.onerror = function() {
            reject(new Error('Lỗi khi đọc file'));
        };
        
        reader.readAsArrayBuffer(file);
    });
}

// Validate và xử lý dữ liệu từ Excel
function validateAndProcessData(rawData) {
    const validData = [];
    const errors = [];
    
    // Bỏ qua dòng header (dòng đầu tiên)
    const dataRows = rawData.slice(1);
    
    dataRows.forEach((row, index) => {
        const rowNum = index + 2; // +2 vì bỏ header và index bắt đầu từ 0
        
        // Kiểm tra dòng trống
        if (!row || row.length === 0 || row.every(cell => !cell || cell.toString().trim() === '')) {
            return; // Bỏ qua dòng trống
        }
        
        const [maSoNV, ten, email] = row;
        
        // Validate các trường bắt buộc
        if (!maSoNV || maSoNV.toString().trim() === '') {
            errors.push(`Dòng ${rowNum}: Thiếu mã số nhân viên`);
            return;
        }
        
        if (!ten || ten.toString().trim() === '') {
            errors.push(`Dòng ${rowNum}: Thiếu tên nhân viên`);
            return;
        }
        
        // Validate email (nếu có)
        const cleanEmail = email ? email.toString().trim() : '';
        if (cleanEmail && !isValidEmail(cleanEmail)) {
            errors.push(`Dòng ${rowNum}: Email không hợp lệ (${cleanEmail})`);
            return;
        }
        
        // Validate mã số nhân viên
        const cleanMaSoNV = maSoNV.toString().trim().toUpperCase();
        if (cleanMaSoNV.length < 3) {
            errors.push(`Dòng ${rowNum}: Mã số nhân viên quá ngắn (${cleanMaSoNV})`);
            return;
        }
        
        // Thêm vào dữ liệu hợp lệ
        validData.push({
            maSoNV: cleanMaSoNV,
            firstName: ten.toString().trim(),
            fullName: ten.toString().trim(),
            email: cleanEmail || `${cleanMaSoNV}@company.com`,
            username: cleanMaSoNV,
            department: 'IMPORTED',
            approved: false,
            rejected: false,
            importedAt: new Date().toISOString()
        });
    });
    
    return { validData, errors };
}

// Kiểm tra email hợp lệ
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Import dữ liệu lên server
async function importDataToServer(employeeData) {
    const API_URL = 'https://684981f845f4c0f5ee71c0a8.mockapi.io/DangKySG01';
    let successCount = 0;
    let failedCount = 0;
    
    // Import từng nhân viên một cách tuần tự
    for (const employee of employeeData) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employee)
            });
            
            if (response.ok) {
                successCount++;
            } else {
                failedCount++;
                console.error(`Failed to import employee: ${employee.maSoNV}`);
            }
            
            // Thêm delay nhỏ để tránh spam API
            await new Promise(resolve => setTimeout(resolve, 100));
            
        } catch (error) {
            failedCount++;
            console.error(`Error importing employee ${employee.maSoNV}:`, error);
        }
    }
    
    return {
        success: successCount,
        failed: failedCount,
        total: employeeData.length
    };
}

// Hàm helper để refresh danh sách nhân viên (cần implement ở file khác)
function refreshEmployeeList() {
    // Implement hàm này ở file chính để refresh danh sách nhân viên
    console.log('Refreshing employee list...');
    if (typeof loadEmployees === 'function') {
        loadEmployees();
    }
}

// Export functions để sử dụng ở file khác
window.openImportModal = openImportModal;
window.closeImportModal = closeImportModal;
window.processImport = processImport;
