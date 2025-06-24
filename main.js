const LOGIN_API = 'https://684981f845f4c0f5ee71c0a8.mockapi.io/DangKySG01';

  document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
      const res = await fetch(LOGIN_API);
      const users = await res.json();

      const user = users.find(u => u.username === username && u.password === password);

      if (!user) {
        document.getElementById('loginMessage').textContent = "Tài khoản hoặc mật khẩu không đúng.";
      } else if (!user.approved) {
        document.getElementById('loginMessage').textContent = "Tài khoản chưa được duyệt.";
      } else {
        // Đăng nhập thành công
        window.location.href = "index.html"; // Chuyển đến trang chính
      }
    } catch (err) {
      alert("Lỗi khi đăng nhập: " + err.message);
    }
  });
    function logout() {
      document.getElementById('loginModal').classList.remove('hidden');
      document.getElementById('mainContent').classList.add('hidden');
  

    }

document.addEventListener('DOMContentLoaded', function () {
    // Fade-in on scroll
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

    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // Newsletter form
    const newsletterBtn = document.querySelector('.newsletter button');
    const newsletterInput = document.querySelector('.newsletter input');
    if (newsletterBtn && newsletterInput) {
        newsletterBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const email = newsletterInput.value;
            if (email) {
                alert('Cảm ơn bạn đã đăng ký! Chúng tôi sẽ gửi thông tin mới nhất đến email của bạn.');
                newsletterInput.value = '';
            } else {
                alert('Vui lòng nhập địa chỉ email hợp lệ.');
            }
        });
    }

    // Modal
    const modal = document.getElementById("imgModal");
    const modalImg = document.getElementById("modalImage");

    window.openModal = function (src) {
        modalImg.src = src;
        modal.classList.remove("hidden");
        modal.classList.add("flex");
    };

    window.closeModal = function (e = null) {
        if (e && e.target.id !== "imgModal" && e.target.id !== "closeButton") return;
        modal.classList.add("hidden");
        modal.classList.remove("flex");
        modalImg.src = "";
    };

    if (modal) {
        modal.addEventListener("click", closeModal);
    }

    // Back to top
    let mybutton = document.getElementById("myBtn");

    window.onscroll = function () {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    };

    window.topFunction = function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    // Dropdown
    const salesButton = document.getElementById('salesDropdownButton');
    const salesMenu = document.getElementById('salesDropdownMenu');
    const salesArrow = salesButton?.querySelector('svg');

    const libraryButton = document.getElementById('libraryDropdownButton');
    const libraryMenu = document.getElementById('libraryDropdownMenu');
    const libraryArrow = libraryButton?.querySelector('svg');

    function closeAllDropdowns() {
        if (salesMenu) {
            salesMenu.classList.add('opacity-0', 'invisible', 'scale-95');
            salesMenu.classList.remove('opacity-100', 'visible', 'scale-100');
            if (salesArrow) salesArrow.style.transform = 'rotate(0deg)';
        }

        if (libraryMenu) {
            libraryMenu.classList.add('opacity-0', 'invisible', 'scale-95');
            libraryMenu.classList.remove('opacity-100', 'visible', 'scale-100');
            if (libraryArrow) libraryArrow.style.transform = 'rotate(0deg)';
        }
    }

    salesButton?.addEventListener('click', function (e) {
        e.stopPropagation();
        closeAllDropdowns();
        if (salesMenu.classList.contains('opacity-0')) {
            salesMenu.classList.remove('opacity-0', 'invisible', 'scale-95');
            salesMenu.classList.add('opacity-100', 'visible', 'scale-100');
            if (salesArrow) salesArrow.style.transform = 'rotate(180deg)';
        } else {
            closeAllDropdowns();
        }
    });

    libraryButton?.addEventListener('click', function (e) {
        e.stopPropagation();
        closeAllDropdowns();
        if (libraryMenu.classList.contains('opacity-0')) {
            libraryMenu.classList.remove('opacity-0', 'invisible', 'scale-95');
            libraryMenu.classList.add('opacity-100', 'visible', 'scale-100');
            if (libraryArrow) libraryArrow.style.transform = 'rotate(180deg)';
        } else {
            closeAllDropdowns();
        }
    });

    document.addEventListener('click', function () {
        closeAllDropdowns();
    });

    salesMenu?.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    libraryMenu?.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    // Mobile menu
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburgerIcon = document.getElementById('hamburgerIcon');
    const closeIcon = document.getElementById('closeIcon');

    mobileMenuButton?.addEventListener('click', function () {
        mobileMenu?.classList.toggle('hidden');
        hamburgerIcon?.classList.toggle('hidden');
        closeIcon?.classList.toggle('hidden');
    });
});
