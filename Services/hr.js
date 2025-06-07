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
    // Tìm kiếm nhân viên theo tên
   searchHRByName(name) {
    return axios.get("https://683dacda199a0039e9e66ead.mockapi.io/api/HRSG01")
        .then(res => {
            const filtered = res.data.filter(item =>
                item.name.toLowerCase().includes(name.toLowerCase())
            );
            return { data: filtered };
        });
}


}
export default HRService