document.getElementById("BTN__Salary").onclick = function (e) {
  e.preventDefault();
  let HT_TK = document.getElementById("HT_TK").value * 1;
  // console.log(HT_TK);
  let HT_Swap = document.getElementById("HT_Swap").value * 1;
  // console.log(HT_Swap);
  let AU = document.getElementById("AU").value * 1;
  // console.log(AU);
  let He_So = document.getElementById("He_So").value * 1;
  // console.log(He_So);
  let Bac_Nghe = document.getElementById("Bac_Nghe").value * 1;
  // console.log(Bac_Nghe);
  let checkbox = (document.getElementById("check_1").checked ? 1000000 : 0) * 1;
  // console.log(checkbox);
  let checkbox1 = (document.getElementById("check_2").checked ? 800000 : 0) * 1;
  // console.log(checkbox1);

  let S_TK = (HT_TK * 100000);
  let S_Swap = (HT_Swap * 60000);
  let S_AU = (AU * 4700);
  let S_HS = He_So;
  let S_Bac = Bac_Nghe
  let S_check = checkbox
  let S_check1 = checkbox1
  let result = (S_TK + S_Swap) + (S_AU * S_HS) + S_Bac + S_check + S_check1
  console.log(result);

  let content = `Lương Tạm Tính: ${result.toLocaleString()} VND`;
  document.getElementById("noti").innerHTML = content;
}
function openModal(src) {
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImage");

  // Gán lại src mỗi lần mở
  modalImg.src = src;

  // Hiện modal
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeModal() {
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImage");

  // Ẩn modal
  modal.classList.remove("flex");
  modal.classList.add("hidden");

  // Reset src để tránh lỗi cũ còn giữ
  modalImg.src = "";
}

function updateSubOptions() {
  const mainSelect = document.getElementById('mainSelect');
  const subSelect = document.getElementById('subSelect');
  const selectedGroup = mainSelect.value;

  // Xóa hết các option cũ
  subSelect.innerHTML = '';

  // Nếu có nhóm hợp lệ thì tạo option mới
  if (subOptions[selectedGroup]) {
    subOptions[selectedGroup].forEach(function (item) {
      const opt = document.createElement('option');
      opt.value = item;
      opt.textContent = item;
      subSelect.appendChild(opt);
    });
  } else {
    // Nếu chưa chọn nhóm thì hiện option mặc định
    const opt = document.createElement('option');
    opt.textContent = '-- Chọn nhóm trước --';
    subSelect.appendChild(opt);
  }
}

// Gọi 1 lần để load mặc định
updateSubOptions();

function mangCham() {
  const noti = document.getElementById("noti");

  if (noti.classList.contains("hidden")) // Kiểm tra thuộc tính hidden
  {
    const content = `
      <b style="color:	#FF9800">Bước 1:</b> Vào PTDocTor/ Login Modem Device Table Kiểm Tra Số Lượng Đang Truy Cập <br>
      <b style="color:	#FF9800">Bước 2:</b> Trao Đổi Cùng KHG Khai Thác Thông Tin <br>
      - Anh chị sử dụng khoảng bao nhiêu thiết bị kết nối wifi trong nhà mình ạ?<br>
      - So sánh số lượng PTDocTor/ Device Table trả về với kết quả KHG cung cấp:<br>
        + Nếu <=: Bỏ qua. Tiếp tục kiểm tra Bước 3<br>
        + Nếu >: Trao đổi KHG và tư vấn đổi passwifi/ cài đặt HIFPT hướng dẫn KHG kiểm tra. Sau đó, tiếp tục kiểm tra Bước 3<br> 
      <b style="color:	#FF9800">Bước 3:</b> Khai thác vị trí hay sử dụng<br>
      - Hạn chế sử dụng băng tần 2.4GHz và ưu tiên sử dụng 5GHz sẽ cải thiện chất lượng Wi-Fi<br> 
      - Đảm bảo cường độ sóng vị trí khách hàng sử dụng phải có công suất tối thiểu sóng 5G ≥ -65dBm <br>
      - Trường hợp không đảm bảo vùng phủ 5G tư vấn trang bị AP/ Di dời modem <br>
        + Nếu KHG không đồng ý lắp test và tạo tool SR DVKH CN <br>
        + Nếu KHG đồng ý thì tư vấn bán giá trên Sản Phẩm Dịch Vụ <a href="#SPDV"><button type="button" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2">SPDV</button></a>
    `;
    noti.innerHTML = content;
    noti.classList.remove("hidden");
  } else {
    // Nếu đang hiện => ẩn đi
    noti.classList.add("hidden");
    noti.innerHTML = "";
  }
}
function ketNoi() {
  const noti = document.getElementById("noti");

  if (noti.classList.contains("hidden")) // Kiểm tra thuộc tính hidden
  {
    const content = `
      <b style="color:	#FF9800">Bước 1:</b> Khởi động thiết bị Modem/AP <br>
      <b style="color:	#FF9800">Bước 2:</b> Vào HIFPT kiểm tra thiết bị có bị chặn không.
      <button type="button" onclick="event.preventDefault();openModal('./IMG/HIFPTchan.png')" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2">Hướng Dẫn</button>
      <br>      
      <b style="color:	#FF9800">Bước 3:</b> Vào HIFPT kiểm tra lại tên wifi và mật khẩu wifi. Tiến hành đổi nếu cần <button type="button" onclick="event.preventDefault();openModal('./IMG/HIFPTdoiMK.jpg')" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2">Hướng Dẫn</button><br>      
      <b style="color:	#FF9800">Bước 4:</b> Khai thác thông tin tư vấn thêm <br>
      - Hạn chế sử dụng băng tần 2.4GHz và ưu tiên sử dụng 5GHz sẽ cải thiện chất lượng Wi-Fi<br> 
      - Đảm bảo cường độ sóng vị trí khách hàng sử dụng phải có công suất tối thiểu sóng 5G ≥ -65dBm <br>
      - Trường hợp không đảm bảo vùng phủ 5G tư vấn trang bị AP/ Di dời modem <br>
        + Nếu KHG không đồng ý tạo tool SR DVKH CN <br>
        + Nếu KHG đồng ý thì tư vấn bán giá trên Sản Phẩm Dịch Vụ <a href="#SPDV"><button type="button" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2">SPDV</button></a>
    `;
    noti.innerHTML = content;
    noti.classList.remove("hidden");
  } else {
    // Nếu đang hiện => ẩn đi
    noti.classList.add("hidden");
    noti.innerHTML = "";
  }
}
function khongTenWifi() {
  const noti = document.getElementById("noti");

  if (noti.classList.contains("hidden")) // Kiểm tra thuộc tính hidden
  {
    const content = `
     <b style="color:	#FF9800"> Bước 1: </b> Kiểm tra thiết Bị Modem/AP đã cắm điện chưa ? <br>
      - Đã cắm điện và Modem/AP sáng đèn: Tiến hành khởi động thiết bị Modem/AP. <br>
      - Đã cắm điện và Modem/AP không sáng đèn: Cắm chặt/ Đổi ổ cắm khác/ Thay Adapter/ Thay Modem/AP <br>      
      <b style="color:	#FF9800"> Bước 2: </b> Thực hiện kiểm tra WLAN.
      Kiểm tra trực tiếp Modem/AP có đèn WLAN hoặc Đèn 2G/5G không. <br>
      <p style="color:#FFB300">🔍 Trường hợp Modem/AP có đèn WLAN: <br></p>
        + Nếu có và sáng đèn: Tiến hành Bước 3 <br>
        + Nếu có và không sáng đèn: Bám nút WLAN bên hong modem và giữ 10s bật lại <br>
      <p style="color:#FFB300">🔍 Trường hợp Modem/AP không có đèn WLAN: <br></p>
        + Vào HIFPT kiểm tra thiết bị có đang tắt Wifi không. <br> Lưu ý: Nếu KHG đang bật thì trong HiFPT sẽ gợi ý là Tắt Wifi, Ngược lại, nếu đang tắt sẽ là Bật Wifi
      <button type="button" onclick="event.preventDefault();openModal('./IMG/BatWF.jpg')" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2">Hướng Dẫn</button>
      <br>      
      <b style="color:	#FF9800"> Bước 3: </b> Nếu Wifi có Bật nhưng KHG không tìm thấy wifi hỏi thử KHG có thấy các tên wifi hàng xóm không <br>  
      <p style="color:#FFB300">🔍 Trường hợp không thấy</p> 
        + Hướng dẫn KHG tìm/ mượn 1 thiết bị khác kiểm tra. Có thể do thiết bị KHG lỗi <br>
      <p style="color:#FFB300">🔍 Trường hợp có thấy: <br> </p>
        + DVKH: Tạo Cls cho KTV* qua kiểm tra <br>
        + KTV*: Tiến hành thay đổi kênh sóng/ mode sóng kiểm tra lại  <button type="button" onclick="event.preventDefault();openModal('./IMG/BatWF.jpg')" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2">Hướng Dẫn</button>  <br>
     <b style="color:	#FF9800"> Bước 4: </b> Khai thác thông tin tư vấn thêm <br>
      - Hạn chế sử dụng băng tần 2.4GHz và ưu tiên sử dụng 5GHz sẽ cải thiện chất lượng Wi-Fi<br> 
      - Đảm bảo cường độ sóng vị trí khách hàng sử dụng phải có công suất tối thiểu sóng 5G ≥ -65dBm <br>
      - Trường hợp không đảm bảo vùng phủ 5G tư vấn trang bị AP/ Di dời modem <br>
        + Nếu KHG không đồng ý tạo tool SR DVKH CN <br>
        + Nếu KHG đồng ý thì tư vấn bán giá trên Sản Phẩm Dịch Vụ <a href="#SPDV"><button type="button" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2">SPDV</button></a>
    `;
    noti.innerHTML = content;
    noti.classList.remove("hidden");
  } else {
    // Nếu đang hiện => ẩn đi
    noti.classList.add("hidden");
    noti.innerHTML = "";
  }
}
function truyCap() {
  const noti = document.getElementById("noti");

  if (noti.classList.contains("hidden")) // Kiểm tra thuộc tính hidden
  {
    const content = `
    <b style="color:red"> Khai Thác Thông Tin Ban Đầu</b><br>
    - Dạ. Không biết anh/chị đang bắt wifi trực tiếp trên Modem hay Thiết Bị AP mà không sử dụng được ạ. <br>
    <p style="color:#FFB300">🔍 Trường Hợp Bắt Sóng Wifi Trực Tiếp Từ Modem: </p>
    <b style="color:	#FF9800"> Bước 1: </b> Kiểm Tra/ Xác Nhận KHG Đã Bắt Đúng Wifi  <br>
      - Hướng dẫn KHG truy cập HiFPT kiểm tra tên Wifi và xem điện thoại đã kết nối đúng chưa.<span style="color:red"><br> 🚨 Lưu ý: bỏ 2.4G và 5G trên HIFPT mới ra Tên Đúng</span> <button type="button" onclick="event.preventDefault();openModal('./IMG/HIFPTtenWF.jpg')" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2">Hướng Dẫn</button> <br>
    <b style="color:	#FF9800"> Bước 2: </b> Tách hết local (Tháo dây LAN đang cắm vào modem). Hướng dẫn KHG vào HIFPT Reboot Modem/ Rút Chui Cắm Điện Modem  <button type="button" onclick="event.preventDefault();openModal('./IMG/HIFPTReboot.jpg')" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2">Hướng Dẫn</button> <br>
      <span style="color:	#FF9800"> + Trường Hợp Hoạt Động Bình Thường: </span>KHG bị Loop mạng do AP/ PC-Laptop-Camera đang đặt IP Tĩnh Sai<br>
      <span style="color:	#FF9800"> + Trường Hợp Vẫn Không Sử Dụng Được: </span>Kiểm tra lại xem thiết bị KHG có đặt IP tĩnh/ Modem đặt sai DNS. <span style="color:#81C784">✅ DNS Đúng 210.245.31.220/8.8.8.8 </span> <button type="button" onclick="event.preventDefault();openModal('./IMG/DNSZTE.jpg')" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2">Hướng Dẫn ZTE</button> <button type="button" onclick="event.preventDefault();openModal('./IMG/DNSZTE.jpg')" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2">Hướng Dẫn CIG</button> <button type="button" onclick="event.preventDefault();openModal('./IMG/DNSZTE.jpg')" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2">Hướng Dẫn FoxCom/HI</button>  <br> 









     <b style="color:	#FF9800"> Bước 4: </b> Khai thác thông tin tư vấn thêm <br>
      - Hạn chế sử dụng băng tần 2.4GHz và ưu tiên sử dụng 5GHz sẽ cải thiện chất lượng Wi-Fi<br> 
      - Đảm bảo cường độ sóng vị trí khách hàng sử dụng phải có công suất tối thiểu sóng 5G ≥ -65dBm <br>
      - Trường hợp không đảm bảo vùng phủ 5G tư vấn trang bị AP/ Di dời modem <br>
        + Nếu KHG không đồng ý tạo tool SR DVKH CN <br>
        + Nếu KHG đồng ý thì tư vấn bán giá trên Sản Phẩm Dịch Vụ <a href="#SPDV"><button type="button" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2">SPDV</button></a>
    `;
    noti.innerHTML = content;
    noti.classList.remove("hidden");
  } else {
    // Nếu đang hiện => ẩn đi
    noti.classList.add("hidden");
    noti.innerHTML = "";
  }
}
