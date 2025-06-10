class HRService {
    getListHRAPI() {
        const promise = axios({            
            url: "https://683dacda199a0039e9e66ead.mockapi.io/api/HRSG01",
            method: "GET",
        });
        return promise
    }

// Delete HR
    deleteHRAPI(id) {
        const promise = axios({
            url: `https://683dacda199a0039e9e66ead.mockapi.io/api/HRSG01/${id}`,
            method: "DELETE",
        });
        return promise
    }

    //Edit HR giá trị
    editHRAPI(id, nhanVien) {
        const promise = axios({
            url: `https://683dacda199a0039e9e66ead.mockapi.io/api/HRSG01/${id}`,
            method: "PUT",
            data: nhanVien,
        });
        return promise
    }

    // Thêm mới nhân viên
    addHRAPI(nhanVien) {
        const promise = axios({
            url: "https://683dacda199a0039e9e66ead.mockapi.io/api/HRSG01",
            method: "POST",
            data: nhanVien,
        });
        return promise
    }
    // Tìm kiếm dựa vào nội dung nhập của người dùng
    searchHRAPI(keyword) {
        const promise = axios({
            url: `https://683dacda199a0039e9e66ead.mockapi.io/api/HRSG01?keyword=${keyword}`,
            method: "GET",
        });
        return promise
    }

}
export default HRService