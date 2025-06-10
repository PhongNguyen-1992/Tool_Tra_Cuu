import HRService from "../Services/hr.js";
import nhanVien from "../models/nhanvien.js";
const hrService = new HRService();
const getEls = (id) => document.getElementById(id);
const getValue = () => {
  const id = getEls("idNhanVien").value; // Lấy giá trị id từ input
  // Lấy các giá trị từ form
  const MSNV = getEls("maNhanVien").value;
  const HoVaTen = getEls("TenNV").value;
  const HDLD = getEls("HDLD").value;
  const phongBan = getEls("PhongBan").value;
  const SDT = getEls("SDT").value;
  const MBX = getEls("MBX").value;
  const Mail = getEls("Mail").value;
  const thamNien = getEls("NgayVaoCT").value;
  const block = getEls("Block").value;
  const cbql = getEls("CBQL").value;
  // Tạo đối tượng nhân viên
  const nhanVienMoi = new nhanVien(id, MSNV, HoVaTen, HDLD, phongBan, SDT, MBX, Mail, thamNien, block, cbql);
  return nhanVienMoi;
}
//Style modal khi bấm nút Thêm Nhân Viên
getEls("btnThemSP").onclick = function () {
  // Hiện modal thêm nhân viên
  getEls("btnUpdate").style.display = "none";
  getEls("modalHeader").innerHTML = "Thêm Nhân Viên";
  getEls("idNhanVienContainer").style.display = "none"; // Ẩn input id
  getEls("btnAdd").style.display = "block"; // Hiện nút Thêm
  // // Reset form
  // getEls("formHR").reset();
}

const getListHR = () => {
  const promise = hrService.getListHRAPI();
  promise
    .then((result) => {
      renderHR(result.data);
    })
    .catch((error) => {
      console.error("Error fetching HR data:", error);
    })
};


// Render data to HTML
const phongBanMap = {
  "PUSER1": "P.KT1",
  "PUSER2": "P.KT2",
  "PDVKH1": "P.DVKH1",
  "PDVKH2": "P.DVKH2",
};
const hdldMAP = {
  "thuViec": "Thử Việc",
  "12thang": "12 Tháng",
  "12den36": "12 Đến 36 Tháng",
  "khongThoiHan": "Không Thời Hạn",
};
const cbqlMap = {
  "NPH": "Nguyễn Hồng Phong",
  "NVT": "Nguyễn Văn Thuận",
  "LHC": "Lê Hữu Cảnh",
  "LVH": "Lê Văn Huyền",
};
const renderHR = (data) => {
  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .trim()
      .split(' ')
      .filter(word => word)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  let contentHTML = "";
  for (let i = 0; i < data.length; i++) {
    const hr = data[i];
    contentHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${hr.MSNV}</td>
        <td>${capitalizeWords(hr.HoVaTen)}</td>
        <td>${hdldMAP[hr.HDLD] || hr.HDLD}</td>
        <td>${phongBanMap[hr.PhongBan] || hr.PhongBan}</td> 
        <td>${hr.SDT}</td>
        <td>${hr.MBX.toUpperCase()}</td>
        <td>${hr.Mail}</td>
        <td>${hr.ThamNien}</td>
        <td>${hr.Block}</td>
        <td>${cbqlMap[hr.CBQL] || hr.CBQL}</td> 
        <td>
          <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editHR('${hr.id}')">Edit</button>        
          <button class="btn btn-danger" onclick="deleteHR('${hr.id}', '${hr.HoVaTen.replace(/'/g, "\\'")}')">Delete</button>

        </td>
      </tr>
    `;
  }
  getEls("tblDanhSachSP").innerHTML = contentHTML;
};
// Call function to get data
getListHR();


// Thêm nhân viên
getEls("btnAdd").onclick = function () {
  // Tạo đối tượng nhân viên
  const nhanVienMoi = getValue();
  // Gọi API thêm nhân viên
  hrService.addHRAPI(nhanVienMoi)
    .then(() => {
      Swal.fire('Thành công!', 'Nhân viên đã được thêm.', 'success');
      getListHR();
      // Đóng modal
      $('#myModal').modal('hide');
    })
    .catch((error) => {
      console.error("Error adding HR:", error);
      Swal.fire('Lỗi!', 'Thêm không thành công.', 'error');
    });
};

// Edit HR
const editHR = (id) => {
  getEls("btnUpdate").style.display = "block";
  getEls("modalHeader").innerHTML = "Cập Nhật Nhân Viên";
  getEls("btnAdd").style.display = "none"; // Hiện input id
  hrService.editHRAPI(id)
    .then((result) => {
      const hr = result.data;
      // Điền thông tin vào form
      getEls("idNhanVien").value = hr.id;
      getEls("maNhanVien").value = hr.MSNV;
      getEls("TenNV").value = hr.HoVaTen;
      getEls("HDLD").value = hr.HDLD;
      getEls("PhongBan").value = hr.PhongBan;
      getEls("SDT").value = hr.SDT;
      getEls("MBX").value = hr.MBX;
      getEls("Mail").value = hr.Mail;
      getEls("NgayVaoCT").value = hr.ThamNien; // Giả sử ThamNien là ngày vào công ty
      getEls("Block").value = hr.Block;
      getEls("CBQL").value = hr.CBQL;

    })
    .catch((error) => {
      console.error("Error fetching HR data for edit:", error);
    });
};
window.editHR = editHR;
// Cập nhật nhân viên
getEls("btnUpdate").onclick = function () {
  // Lấy giá trị từ form
  const nhanVienCapNhat = getValue();
  // Gọi API cập nhật nhân viên
  hrService.editHRAPI(nhanVienCapNhat.id, nhanVienCapNhat)
    .then(() => {
      Swal.fire('Thành công!', 'Nhân viên đã được cập nhật.', 'success');
      getListHR();
      // Đóng modal
      $('#myModal').modal('hide');
    })
    .catch((error) => {
      console.error("Error updating HR:", error);
      Swal.fire('Lỗi!', 'Cập nhật không thành công.', 'error');
    });
};
//Delete HR  dựa vào MSNV - Thông báo trước khi thực hiện xóa
const deleteHR = (id, HoVaTen) => {
  Swal.fire({
    title: `Bạn có chắc muốn xóa ${HoVaTen}?`,
    text: "Thao tác này không thể hoàn tác!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Xóa',
    cancelButtonText: 'Hủy',
  }).then((result) => {
    if (result.isConfirmed) {
      hrService.deleteHRAPI(id)
        .then(() => {
          Swal.fire('Đã xóa!', `Nhân viên ${HoVaTen} đã được xóa.`, 'success');
          getListHR();
        })
        .catch((error) => {
          console.error("Error deleting HR:", error);
          Swal.fire('Lỗi!', 'Xóa không thành công.', 'error');
        });
    }
  });
};

window.deleteHR = deleteHR;

// Tìm kiếm nội dung trong bảng dựa vào từ khóa nhập vào
const onSearch = () => {
    const searchValue = getEls("txtTimKiem").value.toLowerCase();
    const filteredList = hrService.array.filter(nv => nv.xeploai.toLowerCase().includes(searchValue));
    renderListNhanVien(filteredList);
};
// Gọi hàm tìm kiếm khi người dùng nhập vào ô tìm kiếm
getEls("txtTimKiem").addEventListener("input", onSearch);

// Xuất Excel tbDanh Sách SP
const onExportExcel = () => {
  hrService.getListHRAPI().then((response) => {
    const data = response.data;

    // Tạo mảng dữ liệu
    const worksheetData = [
      ['STT', 'MSNV', 'Họ Và Tên', 'Hợp Đồng Lao Động', 'Phòng Ban', 'Số Điện Thoại', 'AccountMBX', 'Mail', 'Thâm Niên', 'Block', 'CBQL'],
    ];
    data.forEach((hr, index) => {
      worksheetData.push([
        index + 1,
        hr.MSNV,
        hr.HoVaTen,
        hr.HDLD in hdldMAP ? hdldMAP[hr.HDLD] : hr.HDLD,
        hr.PhongBan in phongBanMap ? phongBanMap[hr.PhongBan] : hr.PhongBan,
        hr.SDT,
        hr.MBX,
        hr.Mail,
        hr.ThamNien,
        hr.Block,
        hr.CBQL in cbqlMap ? cbqlMap[hr.CBQL] : hr.CBQL,
      ]);
    });

    // Tạo sheet & workbook
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DanhSachSP");

    // Xuất file
    XLSX.writeFile(workbook, "list_nhan_su.xlsx");
  });
};
window.onExportExcel = onExportExcel;

