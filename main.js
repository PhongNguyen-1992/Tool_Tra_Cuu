document.getElementById("BTN__Salary").onclick = function(e) {
    e.preventDefault();
    let HT_TK = document.getElementById("HT_TK").value*1;
    // console.log(HT_TK);
    let HT_Swap = document.getElementById("HT_Swap").value*1;
    // console.log(HT_Swap);
    let AU = document.getElementById("AU").value*1;
    // console.log(AU);
    let He_So = document.getElementById("He_So").value*1;
    // console.log(He_So);
    let Bac_Nghe = document.getElementById("Bac_Nghe").value*1;
    // console.log(Bac_Nghe);
    let checkbox = (document.getElementById("check_1").checked ? 1000000 : 0)*1;
    // console.log(checkbox);
    let checkbox1 = (document.getElementById("check_2").checked ? 800000 : 0)*1;
    // console.log(checkbox1);

    let S_TK = (HT_TK *100000);
    let S_Swap = (HT_Swap *60000);
    let S_AU = (AU * 4700);
    let S_HS = He_So;
    let S_Bac = Bac_Nghe
    let S_check = checkbox
    let S_check1 = checkbox1
    let result = (S_TK+S_Swap)+(S_AU*S_HS)+S_Bac+S_check+S_check1
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
