/* ============================================
   DR. THALLYS HENRIQUE ALVES
   Site Institucional - JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initPreloader();
    initNavigation();
    initScrollEffects();
    initFAQ();
    initAnimations();
    initLazyMaps();
    setCurrentYear();
});

/* ============================================
   PRELOADER
   ============================================ */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const heroImg = document.querySelector('.hero__bg img');
    
    function hidePreloader() {
        if (preloader._hidden) return;
        preloader._hidden = true;
        preloader.classList.add('hidden');
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500);
    }
    
    // Hide as soon as hero image is ready (or after 1.5s max)
    if (heroImg && heroImg.complete) {
        setTimeout(hidePreloader, 100);
    } else if (heroImg) {
        heroImg.addEventListener('load', hidePreloader);
        setTimeout(hidePreloader, 1500);
    } else {
        setTimeout(hidePreloader, 300);
    }
}

/* ============================================
   NAVIGATION
   ============================================ */
function initNavigation() {
    const header = document.getElementById('header');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close mobile menu
    if (navClose) {
        navClose.addEventListener('click', function() {
            navMenu.classList.remove('show');
            document.body.style.overflow = '';
        });
    }
    
    // Close menu when clicking on nav links
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navMenu.classList.remove('show');
            document.body.style.overflow = '';
            
            // Update active state
            navLinks.forEach(function(l) {
                l.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Update active nav link on scroll
    updateActiveNavOnScroll(navLinks);
}

/* ============================================
   SCROLL EFFECTS
   ============================================ */
function initScrollEffects() {
    const backToTopBtn = document.getElementById('backToTop');
    
    // Back to top button visibility
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Back to top click
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/* ============================================
   UPDATE ACTIVE NAV ON SCROLL
   ============================================ */
function updateActiveNavOnScroll(navLinks) {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;
        const headerHeight = document.getElementById('header').offsetHeight;
        
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                    
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

/* ============================================
   FAQ ACCORDION
   ============================================ */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq__item');
    
    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq__question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(function(faq) {
                faq.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

/* ============================================
   REVEAL ANIMATIONS (IntersectionObserver)
   ============================================ */
function initAnimations() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    
    if (!('IntersectionObserver' in window)) {
        els.forEach(function(el) { el.classList.add('revealed'); });
        return;
    }
    
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });
    
    els.forEach(function(el) { observer.observe(el); });
}

/* ============================================
   SET CURRENT YEAR
   ============================================ */
function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/* ============================================
   DEBOUNCE UTILITY
   ============================================ */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = function() {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/* ============================================
   THROTTLE UTILITY
   ============================================ */
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(function() {
                inThrottle = false;
            }, limit);
        }
    };
}

/* ============================================
   LAZY LOAD MAP IFRAMES
   ============================================ */
function initLazyMaps() {
    const mapContainer = document.querySelector('.contato__map');
    if (!mapContainer) return;
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                // Load all map iframes when section comes into view
                mapContainer.querySelectorAll('iframe[data-src]').forEach(function(iframe) {
                    iframe.src = iframe.dataset.src;
                    iframe.removeAttribute('data-src');
                });
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '200px' });
    
    observer.observe(mapContainer);
}

/* ============================================
   TOUCH DEVICE DETECTION
   ============================================ */
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.body.classList.add('touch-device');
}

/* ============================================
   COPIAR ENDEREÇO
   ============================================ */
window.copiarEndereco = function(btn) {
    var panel = btn.closest('.location-panel');
    var enderecoEl = panel.querySelector('.endereco-texto');
    var endereco = enderecoEl.getAttribute('data-endereco');
    
    navigator.clipboard.writeText(endereco).then(function() {
        var originalHTML = btn.innerHTML;
        btn.innerHTML = '<svg class="icon icon-fa-check" aria-hidden="true"><use href="#icon-fa-check"/></svg><span>Copiado!</span>';
        btn.classList.add('copied');
        
        setTimeout(function() {
            btn.innerHTML = originalHTML;
            btn.classList.remove('copied');
        }, 2000);
    }).catch(function(err) {
        var textArea = document.createElement('textarea');
        textArea.value = endereco;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        var originalHTML = btn.innerHTML;
        btn.innerHTML = '<svg class="icon icon-fa-check" aria-hidden="true"><use href="#icon-fa-check"/></svg><span>Copiado!</span>';
        btn.classList.add('copied');
        
        setTimeout(function() {
            btn.innerHTML = originalHTML;
            btn.classList.remove('copied');
        }, 2000);
    });
};

/* ============================================
   TROCAR LOCALIZAÇÃO (COLATINA / VITÓRIA)
   ============================================ */
window.trocarLocal = function(local) {
    // Toggle buttons
    document.querySelectorAll('.location-toggle__btn').forEach(function(btn) {
        btn.classList.toggle('active', btn.getAttribute('data-location') === local);
    });
    
    // Toggle panels
    document.querySelectorAll('.location-panel').forEach(function(panel) {
        panel.classList.remove('active');
    });
    document.getElementById('panel-' + local).classList.add('active');
    
    // Toggle maps + ensure iframe src is loaded
    document.querySelectorAll('.location-map').forEach(function(map) {
        map.classList.remove('active');
        map.style.display = 'none';
    });
    var activeMap = document.getElementById('map-' + local);
    if (activeMap.dataset.src && !activeMap.src) {
        activeMap.src = activeMap.dataset.src;
        activeMap.removeAttribute('data-src');
    }
    activeMap.classList.add('active');
    activeMap.style.display = 'block';
};
