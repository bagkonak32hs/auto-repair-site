// Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Scroll progress bar
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            document.getElementById('scrollProgress').style.width = scrolled + '%';
        });

        // Animate elements on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all sections and cards
        document.querySelectorAll('section, .project-card, .timeline-item, .skill-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Animate skill bars when they come into view
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target.querySelector('.skill-progress');
                    if (progressBar) {
                        const width = progressBar.style.width;
                        progressBar.style.width = '0%';
                        setTimeout(() => {
                            progressBar.style.width = width;
                        }, 100);
                    }
                    skillObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.skill-item').forEach(item => {
            skillObserver.observe(item);
        });

        

        // Add active state to navigation based on scroll position
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const scrollY = window.pageYOffset;

            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                const navLink = document.querySelector(`nav a[href="#${sectionId}"]`);

                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink?.classList.add('active');
                } else {
                    navLink?.classList.remove('active');
                }
            });
        });

        // Typing effect for hero subtitle (optional enhancement)
        const subtitle = document.querySelector('.hero .subtitle');
        const text = subtitle.textContent;
        subtitle.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }

        // Start typing effect after page load
        window.addEventListener('load', () => {
            setTimeout(typeWriter, 500);
        });

        // Project card hover effect - add subtle 3D tilt
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });

        // Tech stack icons animation on hover
        document.querySelectorAll('.tech-icon').forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                icon.style.transform = 'translateY(-5px) scale(1.2) rotate(5deg)';
            });
            
            icon.addEventListener('mouseleave', () => {
                icon.style.transform = 'translateY(0) scale(1) rotate(0)';
            });
        });

        // Add parallax effect to hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero-content');
            if (hero && scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
                hero.style.opacity = 1 - (scrolled / 500);
            }
        });

        // Lazy loading for project images (if you add real images later)
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.add('loaded');
                            observer.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // Add keyboard navigation for accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close any open modals or menus
                document.querySelectorAll('.modal, .menu').forEach(el => {
                    el.classList.remove('active');
                });
            }
        });

        // Console easter egg for fellow developers
        console.log('%c👋 Hello, fellow developer!', 'color: #0ea5e9; font-size: 20px; font-weight: bold;');
        console.log('%cLike what you see? Let\'s connect!', 'color: #6366f1; font-size: 14px;');
        console.log('%c📧 alex.morgan@email.com', 'color: #10b981; font-size: 12px;');

        
  const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const hamburgerIcon = document.getElementById('hamburgerIcon');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburgerIcon.textContent = navLinks.classList.contains('active') ? '✖' : '☰';
});

document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove('active');
    hamburgerIcon.textContent = '☰';
  }
});


//CONTACKT FORM
(() => {
  const form = document.querySelector('form[action*="web3forms.com/submit"]');
  if (!form || form.dataset.web3bound === '1') return;
  form.dataset.web3bound = '1';

  const submitBtn = form.querySelector('[type="submit"]');

  // ✅ Mesaj elemanı: varsa kullan, yoksa oluşturup formun altına koy
  let msgEl = document.getElementById('form-msg') || form.querySelector('.form-msg');
  if (!msgEl) {
     msgEl = document.createElement('div');
     msgEl.id = 'form-msg';
     form.insertAdjacentElement('beforeend', msgEl); // ✅ formun içine, en alta
  }

  // Varsayılan stil (mesaj kutusu)
  msgEl.setAttribute('aria-live', 'polite');
  msgEl.style.marginTop = msgEl.style.marginTop || '10px';
  msgEl.style.fontWeight = msgEl.style.fontWeight || '700';

  // Yardımcılar: görünürlüğü ZORLA ayarla
  const showMsg = (text, color = '#16a34a') => {
    msgEl.textContent = text ?? '';
    // inline !important ile her türlü CSS’i ezer
    msgEl.style.setProperty('display', 'block', 'important');
    msgEl.hidden = false;
    msgEl.style.visibility = 'visible';
    msgEl.style.opacity = '1';
    msgEl.style.color = color;
  };
  const hideMsg = () => {
    msgEl.textContent = '';
    msgEl.style.removeProperty('display'); // inline display kaldır
    // istersen tamamen gizlemek için:
    // msgEl.style.setProperty('display', 'none', 'important');
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    if (!fd.get('access_key')) {
      fd.set('access_key', '1b17333e-6cd0-481e-ad70-7e119bcd6d39');
    }
    // (İsteğe bağlı) yönlendirmeyi iptal etmek istersen:
    // fd.delete('redirect');

    // UI kilitle
    const orig = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Gönderiliyor…'; }
    hideMsg();

    try {
      const res = await fetch(form.action || 'https://api.web3forms.com/submit', {
        method: 'POST',
        body: fd,
        headers: { 'Accept': 'application/json' }
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success !== false) {
        form.reset();                      // ✅ başarı → temizle
        showMsg('Teşekkürler! Mesajınız iletildi.', '#16a34a'); // ✅ ZORLA GÖSTER
        // İsteğe bağlı otomatik gizle:
        // setTimeout(() => { hideMsg(); }, 3000);
        // İsteğe bağlı scroll:
        // msgEl.scrollIntoView({ behavior:'smooth', block:'nearest' });
      } else {
        showMsg(data.message || 'Gönderim başarısız. Lütfen tekrar deneyin.', '#dc2626');
      }
    } catch (err) {
      showMsg('Ağ hatası. Lütfen tekrar deneyin.', '#dc2626');
    } finally {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = orig || 'Submit'; }
    }
  });
})();



