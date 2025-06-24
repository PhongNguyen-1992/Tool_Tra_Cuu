
        function toggleTable() {
            const container = document.getElementById('tableContainer');
            const guideSection = document.getElementById('guideSection');
            
            if (container.classList.contains('show')) {
                container.classList.remove('show');
                guideSection.classList.remove('show');
            } else {
                container.classList.add('show');
                setTimeout(() => {
                    guideSection.classList.add('show');
                }, 300);
            }
        }

        function showGuide() {
            const guideContent = document.getElementById('guideContent');
            guideContent.classList.add('show');
        }

        function hideGuide() {
            const guideContent = document.getElementById('guideContent');
            guideContent.classList.remove('show');
        }

        // Animation au chargement
        window.addEventListener('load', function() {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });
   