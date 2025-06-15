// Thêm hiệu ứng fade-in khi cuộn
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Quan sát tất cả các phần tử fade-in
document.querySelectorAll('.fade-in').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.8s ease-out';
  observer.observe(el);
});

// Xử lý form đăng ký
document.querySelector('.newsletter button').addEventListener('click', function (e) {
  e.preventDefault();
  const email = document.querySelector('.newsletter input').value;
  if (email) {
    alert('Cảm ơn bạn đã đăng ký! Chúng tôi sẽ gửi thông tin mới nhất đến email của bạn.');
    document.querySelector('.newsletter input').value = '';
  } else {
    alert('Vui lòng nhập địa chỉ email hợp lệ.');
  }
});