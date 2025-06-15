// Solutions database
const solutions = {
    'Mạng Chậm/Chập Chờn': `
        <ol>
            <li>Kiểm tra tốc độ mạng bằng speedtest</li>
            <li>Khởi động lại modem (rút điện 30 giây)</li>
            <li>Kiểm tra cáp mạng và kết nối</li>
            <li>Thay đổi kênh WiFi (2.4GHz → 5GHz)</li>
            <li>Cập nhật firmware modem</li>
            <li>Liên hệ kỹ thuật nếu vấn đề vẫn tồn tại</li>
        </ol>
    `,
    'Có Wifi Nhưng Không Kết Nối Được': `
        <ol>
            <li>Quên và kết nối lại WiFi</li>
            <li>Kiểm tra mật khẩu WiFi</li>
            <li>Khởi động lại thiết bị</li>
            <li>Reset cài đặt mạng</li>
            <li>Kiểm tra MAC filtering trên modem</li>
            <li>Thử kết nối thiết bị khác</li>
        </ol>
    `,
    'Modem Sáng Đèn Không Thấy Tên Wifi': `
        <ol>
            <li>Kiểm tra đèn Power và Internet trên modem</li>
            <li>Khởi động lại modem (rút điện 30 giây)</li>
            <li>Kiểm tra cáp nguồn và cáp mạng</li>
            <li>Reset modem về cài đặt gốc</li>
            <li>Kiểm tra cài đặt WiFi trong giao diện modem</li>
            <li>Liên hệ kỹ thuật để kiểm tra</li>
        </ol>
    `,
    'Kết Nối Được Wifi Không Vào Mạng Được': `
        <ol>
            <li>Kiểm tra DNS (8.8.8.8 hoặc 1.1.1.1)</li>
            <li>Xóa cache trình duyệt</li>
            <li>Khởi động lại modem và thiết bị</li>
            <li>Kiểm tra firewall và antivirus</li>
            <li>Thử chế độ safe mode</li>
            <li>Reset cài đặt mạng của thiết bị</li>
        </ol>
    `,
    'Không Truy Cập Được WEB/App Cụ Thể': `
        <ol>
            <li>Kiểm tra trang web có hoạt động không</li>
            <li>Thử truy cập bằng trình duyệt khác</li>
            <li>Xóa cache và cookie</li>
            <li>Thay đổi DNS</li>
            <li>Tắt VPN/Proxy nếu có</li>
            <li>Kiểm tra tường lửa</li>
        </ol>
    `,
    'Cấu Hình Gói Gia Phiền': `
        <ol>
            <li>Liên hệ tổng đài 1900.6600</li>
            <li>Cung cấp thông tin hợp đồng</li>
            <li>Chọn gói cước phù hợp</li>
            <li>Xác nhận thay đổi</li>
            <li>Chờ hệ thống cập nhật (1-2h)</li>
            <li>Khởi động lại modem</li>
        </ol>
    `,
    'Tivi Không Có Tín Hiệu': `
        <ol>
            <li>Kiểm tra kết nối cáp từ đầu thu đến TV</li>
            <li>Kiểm tra nguồn điện đầu thu và TV</li>
            <li>Thử thay cáp HDMI/AV khác</li>
            <li>Kiểm tra chọn đúng nguồn tín hiệu trên TV (HDMI1, HDMI2...)</li>
            <li>Khởi động lại đầu thu (rút điện 30 giây)</li>
            <li>Liên hệ kỹ thuật nếu vẫn không có tín hiệu</li>
        </ol>
    `,
    
    'Tivi Lỗi Kết Nối Internet': `
        <ol>
            <li>Kiểm tra cáp mạng kết nối đầu thu</li>
            <li>Kiểm tra đèn tín hiệu trên modem</li>
            <li>Khởi động lại modem và đầu thu</li>
            <li>Kiểm tra cài đặt mạng trên đầu thu</li>
            <li>Thử kết nối WiFi nếu có tính năng</li>
            <li>Reset cài đặt mạng đầu thu về mặc định</li>
        </ol>
    `,
    
    'Truyền Hình Xem Màn Hình Đen': `
        <ol>
            <li>Kiểm tra cáp kết nối đầu thu và TV</li>
            <li>Thử chuyển kênh khác</li>
            <li>Kiểm tra độ phân giải đầu ra (720p/1080p)</li>
            <li>Khởi động lại đầu thu</li>
            <li>Cập nhật danh sách kênh</li>
            <li>Kiểm tra tài khoản và gói cước</li>
        </ol>
    `,
    
    'Youtube Xem Không Được': `
        <ol>
            <li>Kiểm tra kết nối internet đầu thu</li>
            <li>Đăng xuất và đăng nhập lại YouTube</li>
            <li>Xóa cache ứng dụng YouTube</li>
            <li>Cập nhật ứng dụng YouTube</li>
            <li>Khởi động lại đầu thu</li>
            <li>Kiểm tra tốc độ mạng (tối thiểu 5Mbps)</li>
        </ol>
    `,
    
    'Không Xem Được Kho Ứng Dụng': `
        <ol>
            <li>Kiểm tra kết nối internet</li>
            <li>Đăng nhập lại tài khoản FPT Play</li>
            <li>Cập nhật firmware đầu thu</li>
            <li>Xóa cache hệ thống</li>
            <li>Khởi động lại đầu thu</li>
            <li>Liên hệ hỗ trợ cập nhật danh sách app</li>
        </ol>
    `,
    
    'Có Hình Không Có Tiếng': `
        <ol>
            <li>Kiểm tra âm lượng TV và đầu thu</li>
            <li>Kiểm tra cài đặt âm thanh (Stereo/5.1)</li>
            <li>Thử cáp âm thanh khác</li>
            <li>Kiểm tra kết nối HDMI (hỗ trợ âm thanh)</li>
            <li>Reset cài đặt âm thanh về mặc định</li>
            <li>Kiểm tra tính năng mute trên remote</li>
        </ol>
    `,
    
    // Solutions Camera
    'Hướng Dẫn Active Cloud Camera': `
        <ol>
            <li>Tải app FPT Camera trên điện thoại</li>
            <li>Đăng ký/đăng nhập tài khoản FPT</li>
            <li>Chọn "Thêm thiết bị" → Quét QR code camera</li>
            <li>Kết nối camera với WiFi nhà</li>
            <li>Đặt tên và vị trí cho camera</li>
            <li>Kích hoạt dịch vụ Cloud lưu trữ</li>
        </ol>
    `,
    
    'Hướng Dẫn Replace MAC Camera': `
        <ol>
            <li>Ghi nhận MAC address camera mới</li>
            <li>Đăng nhập portal quản lý FPT</li>
            <li>Vào mục "Quản lý thiết bị Camera"</li>
            <li>Chọn camera cần thay → "Thay thế thiết bị"</li>
            <li>Nhập MAC address mới</li>
            <li>Xác nhận và đợi hệ thống cập nhật</li>
        </ol>
    `,
    
    'Hướng Dẫn Cấu Hình Camera Đầu Ghi': `
        <ol>
            <li>Kết nối đầu ghi với màn hình qua HDMI</li>
            <li>Đăng nhập hệ thống (admin/123456)</li>
            <li>Vào "Camera Management" → "Add Camera"</li>
            <li>Nhập IP camera và thông tin đăng nhập</li>
            <li>Cấu hình độ phân giải và FPS</li>
            <li>Test kết nối và lưu cấu hình</li>
        </ol>
    `,
    
    'Không Full Record/Chuyển Động': `
        <ol>
            <li>Kiểm tra dung lượng ổ cứng/thẻ nhớ</li>
            <li>Cấu hình lại chế độ ghi hình</li>
            <li>Kiểm tra cài đặt Motion Detection</li>
            <li>Điều chỉnh độ nhạy cảm biến</li>
            <li>Kiểm tra vùng phát hiện chuyển động</li>
            <li>Restart camera và kiểm tra lại</li>
        </ol>
    `,
    
    'Không Thông Báo Chuyển Động': `
        <ol>
            <li>Bật thông báo trong app FPT Camera</li>
            <li>Cho phép notification trên điện thoại</li>
            <li>Kiểm tra cài đặt Motion Detection</li>
            <li>Cấu hình lại độ nhạy cảm biến</li>
            <li>Kiểm tra lịch thông báo (24/7 hay theo giờ)</li>
            <li>Test thông báo bằng cách vẫy tay trước camera</li>
        </ol>
    `,
    
    'Không Phát Tiếng': `
        <ol>
            <li>Kiểm tra micro camera có bị che không</li>
            <li>Bật âm thanh trong app FPT Camera</li>
            <li>Kiểm tra âm lượng thiết bị xem</li>
            <li>Cấu hình lại codec âm thanh</li>
            <li>Kiểm tra băng thông mạng</li>
            <li>Restart camera và kết nối lại</li>
        </ol>
    `
}

// Hàm xử lý khi click vào error item
function showSolution(errorType) {
    const solution = solutions[errorType];
    
    if (solution) {
        // Tạo modal hiển thị solution
        const modal = document.createElement('div');
        modal.className = 'solution-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${errorType}</h3>
                    <button class="close-btn" onclick="closeSolution()">&times;</button>
                </div>
                <div class="modal-body">
                    ${solution}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Thêm CSS cho modal
        if (!document.getElementById('modal-styles')) {
            const style = document.createElement('style');
            style.id = 'modal-styles';
            style.textContent = `
                .solution-modal {
                    position: fixed !important;
                    top: 0 !important;
                    left: 0 !important;
                    width: 100% !important;
                    height: 100% !important;
                    background: rgba(0, 0, 0, 0.8) !important;
                    display: flex !important;
                    justify-content: center !important;
                    align-items: center !important;
                    z-index: 9999 !important;
                }
                
                .modal-content {
                    background: #ffffff !important;
                    border-radius: 12px !important;
                    max-width: 600px !important;
                    width: 90% !important;
                    max-height: 80vh !important;
                    overflow-y: auto !important;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3) !important;
                }
                
                .modal-header {
                    display: flex !important;
                    justify-content: space-between !important;
                    align-items: center !important;
                    padding: 20px !important;
                    border-bottom: 1px solid #eee !important;
                    background: #f8f9fa !important;
                    border-radius: 12px 12px 0 0 !important;
                }
                
                .modal-header h3 {
                    margin: 0 !important;
                    color: #333 !important;
                    font-size: 18px !important;
                    font-weight: bold !important;
                }
                
                .close-btn {
                    background: none !important;
                    border: none !important;
                    font-size: 24px !important;
                    cursor: pointer !important;
                    padding: 5px !important;
                    width: 35px !important;
                    height: 35px !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    border-radius: 50% !important;
                    color: #666 !important;
                }
                
                .close-btn:hover {
                    background: #f0f0f0 !important;
                    color: #333 !important;
                }
                
                .modal-body {
                    padding: 25px !important;
                    color: #333 !important;
                    background: #ffffff !important;
                }
                
                .modal-body ol {
                    padding-left: 20px !important;
                    margin: 0 !important;
                }
                
                .modal-body li {
                    margin-bottom: 12px !important;
                    line-height: 1.6 !important;
                    color: #444 !important;
                    font-size: 15px !important;
                }
            `;
            document.head.appendChild(style);
        }
    } else {
        alert('Không tìm thấy hướng dẫn cho lỗi này!');
    }
}

// Hàm đóng modal
function closeSolution() {
    const modal = document.querySelector('.solution-modal');
    if (modal) {
        modal.remove();
    }
}

// Đóng modal khi click bên ngoài
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('solution-modal')) {
        closeSolution();
    }
});

// Đóng modal bằng phím Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeSolution();
    }
});