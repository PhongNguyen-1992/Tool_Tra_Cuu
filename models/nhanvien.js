class Nhanvien {
    constructor(_id,_maNhanVien, _hoVaTen, _HDLD, _phongBan, _SDT, _MBX, _Mail, _thamNien, _block, _cbql) {
        // Khởi tạo các thuộc tính của nhân viên
        this.id = _id; // Giả sử id được cung cấp từ bên ngoài
        this.MSNV = _maNhanVien;      
        this.HoVaTen = _hoVaTen;
        this.HDLD = _HDLD;
        this.PhongBan = _phongBan;        
        this.SDT = _SDT;
        this.MBX = _MBX;
        this.Mail = _Mail;
        this.ThamNien = "";
        this.Block = _block;
        this.CBQL = _cbql;

        // Tính toán tham niên dựa trên ngày hiện tại và ngày bắt đầu làm việc
   const now = new Date();
    const start = new Date(_thamNien);

    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();

    if (days < 0) {
      months -= 1;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    this.ThamNien = `${years} năm ${months} tháng`;
  }
}
export default Nhanvien;