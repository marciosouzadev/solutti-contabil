document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Loading Screen
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 500); // Exibição sutil do loader
    });

    // 2. Menu Fixo (Sticky Header)
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Scroll Suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // compensa o header
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Animações ao rolar a página (Intersection Observer)
    const reveals = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // 5. Checklist de Abertura de Empresa
    const checkboxes = document.querySelectorAll('.chk-abertura');
    const successMsg = document.getElementById('checklist-msg');

    checkboxes.forEach(chk => {
        chk.addEventListener('change', () => {
            const allChecked = Array.from(checkboxes).every(c => c.checked);
            if (allChecked) {
                successMsg.classList.remove('hidden');
                successMsg.style.display = 'flex';
                setTimeout(() => successMsg.style.opacity = '1', 10);
            }
        });
    });

    // 6. Accordion de FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-question');
        btn.addEventListener('click', () => {
            // Fecha as outras abas (opcional)
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // Alterna a atual
            item.classList.toggle('active');
        });
    });

    // 7. Menu Mobile (Hamburger)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if(mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.replace('ph-list', 'ph-x');
            } else {
                icon.classList.replace('ph-x', 'ph-list');
            }
        });

        // Fechar o menu ao clicar em um link (mobile)
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.replace('ph-x', 'ph-list');
            });
        });
    }
});