document.addEventListener("DOMContentLoaded", function() {
  // Mobile navigation toggle
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const header = document.getElementById('header');
  
  if (mobileNavToggle && header) {
    const mobileNavIcon = mobileNavToggle.querySelector('i');
    mobileNavToggle.addEventListener('click', function() {
      header.classList.toggle('mobile-nav-active');
      if (mobileNavIcon) {
        mobileNavIcon.classList.toggle('fa-bars');
        mobileNavIcon.classList.toggle('fa-times');
      }
    });
  }

  // Close mobile menu when clicking on a nav link
  const navLinks = document.querySelectorAll('.nav-menu a');
  const mobileNavIcon = mobileNavToggle ? mobileNavToggle.querySelector('i') : null;
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (header && header.classList.contains('mobile-nav-active')) {
        header.classList.remove('mobile-nav-active');
        if (mobileNavIcon) {
          mobileNavIcon.classList.add('fa-bars');
          mobileNavIcon.classList.remove('fa-times');
        }
      }
    });
  });

  // Typing effect
  const typedTextSpan = document.querySelector(".typed");
  const textArray = ["a Full Stack Developer", "a Software Engineer", "a Problem Solver", "a Tech Enthusiast"];
  const typingDelay = 100;
  const erasingDelay = 50;
  const newTextDelay = 1000;
  let textArrayIndex = 0;
  let charIndex = 0;
  let isTyping = true;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      if (!typedTextSpan.textContent) {
        typedTextSpan.textContent = "";
      }
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      isTyping = false;
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      isTyping = true;
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 1100);
    }
  }

  // Start typing effect if element exists
  if (typedTextSpan && textArray.length) {
    setTimeout(type, newTextDelay + 250);
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
        
        // Update URL without page jump
        if (history.pushState) {
          history.pushState(null, null, targetId);
        } else {
          window.location.hash = targetId;
        }
      }
    });
  });
  
  // Active nav link highlighting
  const sections = document.querySelectorAll('section');
  
  function updateActiveNavLink() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop - 300) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink(); // Run once on load
  
  // Form submission handling is done via EmailJS (see bottom of file)
  
  // Back to top button
  const backToTopButton = document.querySelector('.back-to-top');
  
  if (backToTopButton) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('active');
      } else {
        backToTopButton.classList.remove('active');
      }
    });
    
    backToTopButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Update copyright year
  const currentYearElement = document.getElementById('currentYear');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
  
  // Lazy loading for images
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.removeAttribute('loading');
          observer.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // ─── Certificate Lightbox ───────────────────────────────────────────────────
  const lightbox      = document.getElementById('certificateLightbox');
  const lightboxImg   = document.getElementById('lightboxImg');
  const lightboxCap   = document.getElementById('lightboxCaption');
  const lightboxClose = document.querySelector('.lightbox-close');

  function openLightbox(src, caption) {
    lightboxImg.src = src;
    lightboxCap.textContent = caption || '';
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // slight delay so the fade-out is visible before src reset
    setTimeout(() => { lightboxImg.src = ''; }, 300);
  }

  // Attach click to every certificate card
  document.querySelectorAll('.certificate-card').forEach(card => {
    card.addEventListener('click', function () {
      const img     = this.querySelector('.certificate-img-container img');
      const title   = this.querySelector('.certificate-details h4');
      const issuer  = this.querySelector('.certificate-details .issuer');
      if (img) openLightbox(img.src, (title ? title.textContent : '') + (issuer ? ' — ' + issuer.textContent : ''));
    });
  });

  // Close via × button
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

  // Close when clicking outside the image
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Close with Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
  // ───────────────────────────────────────────────────────────────────────────

  // ─── Theme Toggle Logic ────────────────────────────────────────────────────
  const themeToggleBtn = document.getElementById('themeToggle');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

  // Initialize theme from local storage or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.body.classList.add('dark-theme');
    if (themeIcon) {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }
  } else {
    document.body.classList.remove('dark-theme');
    if (themeIcon) {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    }
  }

  // Handle click on theme toggle button
  if (themeToggleBtn && themeIcon) {
    themeToggleBtn.addEventListener('click', function() {
      document.body.classList.toggle('dark-theme');
      
      if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      } else {
        localStorage.setItem('theme', 'light');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
    });
  }
  // ───────────────────────────────────────────────────────────────────────────

  // ─── EmailJS Contact Form ──────────────────────────────────────────────────
  // Initialize EmailJS with public key
  if (typeof emailjs !== 'undefined') {
    emailjs.init('OOQgdRnqlBLdGTwif');
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalText = submitBtn.innerHTML;

      // Show loading state
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';

      // Prepare template parameters matching the EmailJS template
      const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
      };

      emailjs.send('service_qtyvj16', 'template_40uqacj', templateParams)
        .then(function() {
          // Success
          submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent!';
          submitBtn.style.background = '#28a745';
          submitBtn.style.opacity = '1';
          contactForm.reset();

          // Reset button after 3 seconds
          setTimeout(function() {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
          }, 3000);
        }, function(error) {
          // Error
          console.error('EmailJS Error:', error);
          submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to Send';
          submitBtn.style.background = '#dc3545';
          submitBtn.style.opacity = '1';

          // Reset button after 3 seconds
          setTimeout(function() {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
          }, 3000);
        });
    });
  }
  
  // ─── Stats Counter Animation ──────────────────────────────────────────────
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const targetValue = parseInt(target.getAttribute('data-target'), 10) || 0;
          let currentValue = 0;
          const duration = 1200; // Total count-up duration in ms
          const frameDuration = 1000 / 60; // 60 FPS
          const totalFrames = Math.round(duration / frameDuration);
          const increment = targetValue / totalFrames;
          let frame = 0;
          
          const counter = setInterval(() => {
            frame++;
            currentValue = Math.round(increment * frame);
            
            if (frame >= totalFrames) {
              target.textContent = targetValue + '+';
              clearInterval(counter);
            } else {
              target.textContent = currentValue;
            }
          }, frameDuration);
          
          observer.unobserve(target); // Animate only once
        }
      });
    }, { threshold: 0.15 });
    
    statNumbers.forEach(num => statsObserver.observe(num));
  } else if (statNumbers.length) {
    // Fallback if IntersectionObserver is not supported
    statNumbers.forEach(num => {
      const targetValue = num.getAttribute('data-target');
      num.textContent = targetValue + '+';
    });
  }

  // ─── Custom Scroll Reveal Animation ───────────────────────────────────────
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    revealElements.forEach(el => revealObserver.observe(el));
  } else if (revealElements.length) {
    // Fallback: make all visible instantly if IntersectionObserver is unsupported
    revealElements.forEach(el => el.classList.add('active'));
  }
});