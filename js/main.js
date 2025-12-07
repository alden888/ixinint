document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.querySelector('.main-nav');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            // Close menu when clicking a link
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenuButton.classList.remove('active');
                    mobileMenu.classList.remove('active');
                });
            });
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Back to top button
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            if (currentScroll > 500) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }
        
        lastScroll = currentScroll;
    });
    
    // Back to top functionality
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Cookie notice
    const cookieNotice = document.getElementById('cookieNotice');
    const acceptCookies = document.getElementById('acceptCookies');
    
    if (cookieNotice && acceptCookies) {
        const cookiesAccepted = localStorage.getItem('cookiesAccepted');
        
        if (!cookiesAccepted) {
            setTimeout(() => {
                cookieNotice.classList.add('show');
            }, 2000);
        }
        
        acceptCookies.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieNotice.classList.remove('show');
        });
    }
    
    // Lazy loading images
    const lazyImages = document.querySelectorAll('img.lazy-load');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target;
                image.src = image.dataset.src;
                image.classList.remove('lazy-load');
                observer.unobserve(image);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });
    
    lazyImages.forEach(image => {
        imageObserver.observe(image);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form validation and submission
    const contactForm = document.querySelector('form#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[name="name"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const message = this.querySelector('textarea[name="message"]').value;
            
            // Basic validation
            if (!name || !email || !message) {
                alert('请填写所有必填字段');
                return;
            }
            
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('请输入有效的邮箱地址');
                return;
            }
            
            // In a real implementation, send to backend API
            // For now, show success message
            this.innerHTML = `
                <div class="form-success">
                    <div class="success-icon">✓</div>
                    <h3>感谢您的咨询！</h3>
                    <p>我们已收到您的消息，将在24小时内回复您。</p>
                    <p>如有紧急事项，请直接拨打：+86 18012669897</p>
                </div>
            `;
        });
    }
    
    // Tab functionality for business scope page
    const tabButtons = document.querySelectorAll('.category-tabs button');
    const tabContents = document.querySelectorAll('.business-section');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('tab-active'));
            // Add active class to clicked button
            this.classList.add('tab-active');
            
            // Hide all tab contents
            tabContents.forEach(content => content.style.display = 'none');
            
            // Show corresponding content based on data-tab attribute
            const tabName = this.getAttribute('data-tab');
            document.getElementById(tabName).style.display = 'block';
        });
    });
    
    // Filter functionality for products and news pages
    const filterButtons = document.querySelectorAll('.product-filters button, .news-filters button');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('filter-active'));
            // Add active class to clicked button
            this.classList.add('filter-active');
            
            // In a real implementation, filter content based on data-filter attribute
            const filterValue = this.getAttribute('data-filter');
            console.log('Filtering by:', filterValue);
        });
    });
    
    // Animation on scroll
    const animateElements = document.querySelectorAll('.service-card, .advantage-card, .category-card, .testimonial-card');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
    
    // Initialize language switcher
    const languageSwitcher = document.getElementById('languageSwitcher');
    if (languageSwitcher) {
        const currentPath = window.location.pathname;
        const isChinese = currentPath.includes('/zh/') || currentPath.endsWith('/zh.html');
        
        if (isChinese) {
            languageSwitcher.value = 'zh';
        } else {
            languageSwitcher.value = 'en';
        }
    }
});
