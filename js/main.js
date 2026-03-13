/* ============================================
   DR. THALLYS HENRIQUE ALVES
   Redesign v3 — Simplified JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollEffects();
    initFAQ();
    initScrollAnimations();
    setCurrentYear();
});

/* ============ NAVIGATION ============ */
function initNavigation() {
    const header = document.getElementById('header');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show');
            document.body.style.overflow = '';
        });
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
            document.body.style.overflow = '';
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    // Header scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        if (y > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = y;
    }, { passive: true });

    // Active nav on scroll
    const sections = document.querySelectorAll('section[id]');
    const headerH = () => header.offsetHeight;
    
    window.addEventListener('scroll', () => {
        const y = window.pageYOffset;
        sections.forEach(section => {
            const top = section.offsetTop - headerH() - 100;
            const h = section.offsetHeight;
            const id = section.getAttribute('id');
            if (y >= top && y < top + h) {
                navLinks.forEach(l => {
                    l.classList.remove('active');
                    if (l.getAttribute('href') === '#' + id) l.classList.add('active');
                });
            }
        });
    }, { passive: true });
}

/* ============ SCROLL EFFECTS ============ */
function initScrollEffects() {
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const href = a.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offset = document.getElementById('header').offsetHeight;
                    const pos = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top: pos, behavior: 'smooth' });
                }
            }
        });
    });
}

/* ============ FAQ ============ */
function initFAQ() {
    const items = document.querySelectorAll('.faq__item');
    items.forEach(item => {
        const question = item.querySelector('.faq__question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            items.forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });
}

/* ============ SCROLL ANIMATIONS ============ */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });
        
        elements.forEach(el => observer.observe(el));
    } else {
        // Fallback: show all
        elements.forEach(el => el.classList.add('visible'));
    }
}

/* ============ YEAR ============ */
function setCurrentYear() {
    const el = document.getElementById('current-year');
    if (el) el.textContent = new Date().getFullYear();
}

/* ============ COPIAR ENDEREÇO ============ */
function copiarEndereco() {
    const endereco = document.getElementById('endereco-completo').innerText;
    const btn = document.getElementById('btn-copiar');
    
    navigator.clipboard.writeText(endereco).then(() => {
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
        btn.style.borderColor = '#10b981';
        btn.style.color = '#10b981';
        
        setTimeout(() => {
            btn.innerHTML = original;
            btn.style.borderColor = '';
            btn.style.color = '';
        }, 2000);
    }).catch(() => {
        // Fallback
        const ta = document.createElement('textarea');
        ta.value = endereco;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
        setTimeout(() => { btn.innerHTML = original; }, 2000);
    });
}

/* ============ CONSOLE ============ */
console.log('%c Dr. Thallys Henrique Alves ', 'background: #0a3d2e; color: #fff; font-size: 14px; padding: 8px 16px; border-radius: 4px;');
