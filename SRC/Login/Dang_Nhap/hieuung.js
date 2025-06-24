 
   
        // Toggle password visibility
        function togglePassword() {
            const passwordInput = document.getElementById('loginPassword');
            const toggleIcon = document.getElementById('toggleIcon');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggleIcon.classList.remove('fa-eye');
                toggleIcon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                toggleIcon.classList.remove('fa-eye-slash');
                toggleIcon.classList.add('fa-eye');
            }
        }

        // Show message for links (since functionality is not implemented)
        function showMessage(message) {
            alert(message + ' đã có sẵn - chỉ hiển thị giao diện');
        }

        // Create floating particles
        function createParticles() {
            const particlesContainer = document.querySelector('.floating-particles');
            
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 20 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
                
                // Random colors for particles
                const colors = ['#ff6b6b', '#ffd93d', '#ff8e53', '#4ecdc4', '#45b7d1'];
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                
                particlesContainer.appendChild(particle);
            }
        }

        // Add floating effect to login card
        function addFloatingEffect() {
            const loginCard = document.querySelector('.login-card');
            let mouseX = 0;
            let mouseY = 0;
            
            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });
            
            function animate() {
                const rect = loginCard.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const deltaX = (mouseX - centerX) * 0.01;
                const deltaY = (mouseY - centerY) * 0.01;
                
                loginCard.style.transform = `perspective(1000px) rotateY(${deltaX}deg) rotateX(${-deltaY}deg)`;
                
                requestAnimationFrame(animate);
            }
            
            animate();
        }

        // Form submission handler
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username && password) {
                // Add loading effect
                const btn = document.querySelector('.login-btn');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Đang đăng nhập...';
                btn.disabled = true;
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    alert('Giao diện hoàn tất - Tính năng đăng nhập đã có sẵn!');
                }, 2000);
            }
        });

        // Initialize effects
        document.addEventListener('DOMContentLoaded', function() {
            createParticles();
            addFloatingEffect();
            
            // Add entrance animation
            const loginCard = document.querySelector('.login-card');
            loginCard.style.opacity = '0';
            loginCard.style.transform = 'translateY(50px) scale(0.9)';
            
            setTimeout(() => {
                loginCard.style.transition = 'all 0.8s ease';
                loginCard.style.opacity = '1';
                loginCard.style.transform = 'translateY(0) scale(1)';
            }, 300);
        });

        // Add dynamic background effects
        function addBackgroundEffects() {
            const background = document.querySelector('.bg-animation');
            let hue = 0;
            
            setInterval(() => {
                hue = (hue + 1) % 360;
                background.style.filter = `hue-rotate(${hue}deg)`;
            }, 50);
        }
        
        addBackgroundEffects();
    