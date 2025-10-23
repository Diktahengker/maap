document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    const content1 = document.getElementById('content1');
    const content2 = document.getElementById('content2');
    const content3 = document.getElementById('content3');
    const toPage2 = document.getElementById('toPage2');
    const btnYes = document.getElementById('btnYes');
    const btnNo = document.getElementById('btnNo');

    // Emoji yang akan muncul saat tombol "Tidak" ditekan
    const sadEmojis = ['😢', '😭', '🥺', '😔', '💔', '😿', '😰', '😨', '🥹', '😓'];
    
    // Buka amplop
    envelope.addEventListener('click', (e) => {
        if (!envelope.classList.contains('opened')) {
            envelope.classList.add('opened');
            setTimeout(() => {
                content1.classList.add('show');
            }, 600);
        }
    });

    // Next button - ke halaman 2
    toPage2.addEventListener('click', () => {
        content1.classList.remove('show');
        setTimeout(() => {
            content1.style.display = 'none';
            content2.style.display = 'block';
            setTimeout(() => {
                content2.classList.add('show');
            }, 50);
        }, 600);
    });

    // Tombol "Iya" - ke halaman 3
    btnYes.addEventListener('click', () => {
        content2.classList.remove('show');
        setTimeout(() => {
            content2.style.display = 'none';
            content3.style.display = 'block';
            createFloatingHearts();
            setTimeout(() => {
                content3.classList.add('show');
            }, 50);
        }, 600);
    });

    // Transisi ke halaman 2
    toPage2.addEventListener('click', () => {
        page1.classList.add('hidden');
        setTimeout(() => {
            page2.classList.remove('hidden');
        }, 500);
    });

    // Tombol "Iya" - ke halaman 3
    btnYes.addEventListener('click', () => {
        page2.classList.add('hidden');
        setTimeout(() => {
            page3.classList.remove('hidden');
            startHeartAnimation();
        }, 500);
    });

    // Tombol "Tidak" - pindah posisi dan munculkan emoji saat diklik
    btnNo.addEventListener('click', (e) => {
        e.preventDefault();
        if (!btnNo.classList.contains('moving')) {
            btnNo.classList.add('moving');
        }
        moveButton();
        createEmoji();
    });

    function moveButton() {
        const container = document.querySelector('.button-container');
        const containerRect = container.getBoundingClientRect();
        
        const maxX = containerRect.width - btnNo.offsetWidth;
        const maxY = containerRect.height - btnNo.offsetHeight;
        
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        
        btnNo.style.left = randomX + 'px';
        btnNo.style.top = randomY + 'px';
    }

    function createEmoji() {
        const emoji = document.createElement('div');
        emoji.className = 'emoji';
        emoji.textContent = sadEmojis[Math.floor(Math.random() * sadEmojis.length)];
        
        // Posisi emoji muncul di sekitar posisi mouse
        const x = btnNo.getBoundingClientRect().left;
        const y = btnNo.getBoundingClientRect().top;
        
        emoji.style.left = x + 'px';
        emoji.style.top = y + 'px';
        
        document.body.appendChild(emoji);
        
        // Hapus emoji setelah animasi selesai
        setTimeout(() => {
            document.body.removeChild(emoji);
        }, 1000);
    }

    function createEmoji() {
        const emoji = document.createElement('div');
        emoji.className = 'emoji';
        emoji.textContent = sadEmojis[Math.floor(Math.random() * sadEmojis.length)];
        
        // Posisi emoji muncul di sekitar posisi mouse
        const x = btnNo.getBoundingClientRect().left;
        const y = btnNo.getBoundingClientRect().top;
        
        emoji.style.left = x + 'px';
        emoji.style.top = y + 'px';
        
        document.body.appendChild(emoji);
        
        // Hapus emoji setelah animasi selesai
        setTimeout(() => {
            emoji.remove();
        }, 1000);
    }

    function createFloatingHearts() {
        const hearts = ['❤️'];
        const heartContainer = document.createElement('div');
        heartContainer.className = 'floating-hearts-container';
        document.body.appendChild(heartContainer);
        
        // Membuat 30 hati dengan interval waktu
        let count = 0;
        const totalHearts = 30;
        
        const intervalId = setInterval(() => {
            if (count >= totalHearts) {
                clearInterval(intervalId);
                setTimeout(() => {
                    heartContainer.remove();
                }, 5000);
                return;
            }

            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            
            // Distribusi posisi merata
            const containerWidth = window.innerWidth;
            const section = count % 5; // 5 kolom untuk distribusi lebih merata
            const sectionWidth = containerWidth / 5;
            const startX = (sectionWidth * section) + (Math.random() * (sectionWidth - 30));
            
            heart.style.left = startX + 'px';
            heart.style.bottom = '-50px';
            
            heartContainer.appendChild(heart);
            
            // Animasi yang lebih halus
            const duration = 3000 + (Math.random() * 2000); // 3-5 detik
            const delay = Math.random() * 500; // Delay 0-500ms
            
            heart.animate([
                { 
                    bottom: '-50px', 
                    opacity: 0,
                    transform: 'translateX(0) rotate(0deg) scale(0.8)'
                },
                {
                    bottom: '40%',
                    opacity: 1,
                    transform: 'translateX(' + (Math.random() * 60 - 30) + 'px) rotate(' + (Math.random() * 180) + 'deg) scale(1)'
                },
                { 
                    bottom: '100%', 
                    opacity: 0,
                    transform: 'translateX(' + (Math.random() * 100 - 50) + 'px) rotate(' + (Math.random() * 360) + 'deg) scale(0.6)'
                }
            ], {
                duration: duration,
                delay: delay,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                fill: 'forwards'
            }).onfinish = () => heart.remove();
            
            count++;
        }, 100); // Interval 100ms untuk kemunculan lebih cepat
    }

    // Set posisi awal tombol No
    btnNo.style.left = '200px';
    btnNo.style.top = '0px';

});
