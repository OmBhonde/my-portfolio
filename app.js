// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation functionality
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');
    const header = document.querySelector('.header');
    
    // Show mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', (e) => {
            e.preventDefault();
            navMenu.classList.add('show-menu');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Hide mobile menu
    if (navClose) {
        navClose.addEventListener('click', (e) => {
            e.preventDefault();
            navMenu.classList.remove('show-menu');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('show-menu');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Enhanced smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = this.getAttribute('href');
            console.log('Navigation clicked:', targetId); // Debug log
            
            if (targetId && targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                console.log('Target section found:', targetSection); // Debug log
                
                if (targetSection) {
                    const headerHeight = header ? header.offsetHeight : 70;
                    const targetPosition = targetSection.offsetTop - headerHeight - 10;
                    
                    console.log('Scrolling to position:', targetPosition); // Debug log
                    
                    // Use both methods for better compatibility
                    window.scrollTo({
                        top: Math.max(0, targetPosition),
                        behavior: 'smooth'
                    });
                    
                    // Fallback for browsers that don't support smooth scrolling
                    setTimeout(() => {
                        if (Math.abs(window.scrollY - targetPosition) > 50) {
                            window.scrollTo(0, Math.max(0, targetPosition));
                        }
                    }, 100);
                    
                    // Update active link immediately
                    updateActiveNavLink(targetId.substring(1));
                }
            }
        });
    });
    
    // Enhanced smooth scrolling for home scroll button
    const homeScrollButton = document.querySelector('.home__scroll-button');
    if (homeScrollButton) {
        homeScrollButton.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.querySelector('#about');
            if (targetSection) {
                const headerHeight = header ? header.offsetHeight : 70;
                const targetPosition = targetSection.offsetTop - headerHeight - 10;
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
                
                // Update active nav link
                setTimeout(() => {
                    updateActiveNavLink('about');
                }, 500);
            }
        });
    }
    
    // Active navigation link highlighting
    function updateActiveNavLink(currentSection = null) {
        if (currentSection) {
            // Manually set active link
            navLinks.forEach(link => {
                link.classList.remove('active');
                const linkHref = link.getAttribute('href');
                if (linkHref === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
            return;
        }
        
        // Auto-detect active section based on scroll position
        const sections = document.querySelectorAll('.section[id]');
        const scrollPos = window.scrollY + 100; // Reduced offset for better detection
        
        let currentActiveSection = 'home'; // Default to home
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop - 150 && scrollPos < sectionTop + sectionHeight - 150) {
                currentActiveSection = sectionId;
            }
        });
        
        // Update nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            if (linkHref === `#${currentActiveSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Header background on scroll
    function updateHeaderBackground() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.boxShadow = 'none';
        }
    }
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                // Add staggered animation for multiple elements
                const siblings = Array.from(entry.target.parentNode.children);
                const index = siblings.indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll([
        '.skills__category',
        '.project__card',
        '.cert__item',
        '.volunteer__card',
        '.education__card'
    ].join(','));
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Enhanced floating shapes animation
    function createFloatingShapes() {
        const shapesContainer = document.querySelector('.home__shapes');
        if (!shapesContainer) return;
        
        // Add more dynamic movement to existing shapes
        const shapes = shapesContainer.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const randomDelay = Math.random() * 2;
            const randomDuration = 4 + Math.random() * 4;
            shape.style.animationDelay = `${randomDelay}s`;
            shape.style.animationDuration = `${randomDuration}s`;
        });
    }
    
    // Particle system for enhanced visual appeal
    function createParticleEffect() {
        const sections = document.querySelectorAll('.section');
        
        sections.forEach((section, sectionIndex) => {
            if (sectionIndex % 2 === 0) return; // Only add to alternate sections
            
            const particles = document.createElement('div');
            particles.className = 'particles';
            particles.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                overflow: hidden;
                z-index: 0;
            `;
            
            // Create individual particles
            for (let i = 0; i < 5; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: var(--color-primary);
                    border-radius: 50%;
                    opacity: 0.1;
                    animation: float ${4 + Math.random() * 4}s ease-in-out infinite;
                    animation-delay: ${Math.random() * 2}s;
                    top: ${Math.random() * 100}%;
                    left: ${Math.random() * 100}%;
                `;
                particles.appendChild(particle);
            }
            
            section.style.position = 'relative';
            section.appendChild(particles);
        });
    }
    
    // Enhanced scroll effects for performance
    let ticking = false;
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollElements);
            ticking = true;
        }
    }
    
    function updateScrollElements() {
        updateActiveNavLink();
        updateHeaderBackground();
        ticking = false;
    }
    
    // Parallax effect for hero section
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.home__shapes .shape');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    // Advanced scroll event handling with throttling
    window.addEventListener('scroll', () => {
        requestTick();
        updateParallax();
    }, { passive: true });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            navMenu.classList.remove('show-menu');
            document.body.style.overflow = 'auto';
        }
        
        // Recreate floating shapes with new dimensions
        createFloatingShapes();
    });
    
    // Enhanced external link handling
    function setupExternalLinks() {
        const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="mailto:"], a[href^="tel:"]');
        
        externalLinks.forEach(link => {
            // Add target="_blank" for external URLs (not mailto/tel)
            if (link.href.startsWith('http') && !link.href.includes(window.location.hostname)) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
            
            // Add click analytics or tracking if needed
            link.addEventListener('click', function() {
                console.log(`External link clicked: ${this.href}`);
            });
        });
    }
    
    // Enhanced keyboard navigation
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('show-menu')) {
            navMenu.classList.remove('show-menu');
            document.body.style.overflow = 'auto';
        }
        
        // Arrow key navigation through sections
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            const sections = Array.from(document.querySelectorAll('.section[id]'));
            const currentSection = sections.find(section => {
                const rect = section.getBoundingClientRect();
                return rect.top <= 100 && rect.bottom > 100;
            });
            
            if (currentSection) {
                const currentIndex = sections.indexOf(currentSection);
                let targetIndex;
                
                if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
                    targetIndex = currentIndex + 1;
                } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                    targetIndex = currentIndex - 1;
                }
                
                if (targetIndex !== undefined) {
                    e.preventDefault();
                    const targetSection = sections[targetIndex];
                    const headerHeight = header ? header.offsetHeight : 70;
                    const targetPosition = targetSection.offsetTop - headerHeight - 10;
                    
                    window.scrollTo({
                        top: Math.max(0, targetPosition),
                        behavior: 'smooth'
                    });
                }
            }
        }
    });
    
    // Accessibility improvements
    function enhanceAccessibility() {
        // Add ARIA labels and roles
        const cards = document.querySelectorAll('.project__card, .volunteer__card, .skills__category');
        cards.forEach((card, index) => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'article');
            
            const title = card.querySelector('h3, h4')?.textContent || `Card ${index + 1}`;
            card.setAttribute('aria-label', title);
        });
        
        // Add skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#home';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--color-primary);
            color: var(--color-white);
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1001;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        // Add smooth scroll functionality to skip link
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const homeSection = document.querySelector('#home');
            if (homeSection) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
    
    // Performance monitoring
    function initPerformanceMonitoring() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                    console.log(`Page load time: ${loadTime}ms`);
                }, 0);
            });
        }
    }
    
    // Enhanced error handling
    function setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('Portfolio Error:', {
                message: e.message,
                filename: e.filename,
                lineno: e.lineno,
                colno: e.colno,
                error: e.error
            });
        });
        
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled Promise Rejection:', e.reason);
        });
    }
    
    // Notification system for user feedback
    function showNotification(message, type = 'info', duration = 4000) {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        
        const colors = {
            success: 'var(--color-success)',
            error: 'var(--color-error)',
            warning: 'var(--color-warning)',
            info: 'var(--color-primary)'
        };
        
        notification.innerHTML = `
            <div class="notification__content">
                <span class="notification__message">${message}</span>
                <button class="notification__close" type="button" aria-label="Close notification">&times;</button>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-surface);
            color: var(--color-text);
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            border-left: 4px solid ${colors[type] || colors.info};
            max-width: 400px;
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            font-family: 'Inter', sans-serif;
        `;
        
        const content = notification.querySelector('.notification__content');
        content.style.cssText = `
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 12px;
        `;
        
        const closeBtn = notification.querySelector('.notification__close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            color: var(--color-text-secondary);
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        `;
        
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        document.body.appendChild(notification);
        
        // Auto remove after duration
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, duration);
    }
    
    // Initialize everything
    function initialize() {
        updateActiveNavLink();
        updateHeaderBackground();
        createFloatingShapes();
        createParticleEffect();
        setupExternalLinks();
        enhanceAccessibility();
        initPerformanceMonitoring();
        setupErrorHandling();
        
        // Add loading state management
        document.body.classList.add('loaded');
        
        console.log('✅ Portfolio initialized successfully!');
        
        // Test scroll functionality
        console.log('Navigation links found:', navLinks.length);
        console.log('Sections found:', document.querySelectorAll('.section[id]').length);
    }
    
    // CSS for notification animations
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            .skip-link:focus {
                clip: auto !important;
                height: auto !important;
                overflow: visible !important;
                position: absolute !important;
                width: auto !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Run initialization
    initialize();
    
    // Debug helpers for development
    window.portfolioDebug = {
        testNavigation: () => {
            console.log('Navigation links:', navLinks.length);
            navLinks.forEach(link => {
                console.log(`${link.textContent}: ${link.href}`);
            });
        },
        testScrolling: (sectionId) => {
            const section = document.querySelector(`#${sectionId}`);
            if (section) {
                const headerHeight = header ? header.offsetHeight : 70;
                const targetPosition = section.offsetTop - headerHeight - 10;
                console.log(`Scrolling to ${sectionId} at position ${targetPosition}`);
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
        },
        testAnimations: () => {
            const animatedElements = document.querySelectorAll('.fade-in');
            console.log(`Animated elements: ${animatedElements.length}`);
        },
        testAccessibility: () => {
            const ariaElements = document.querySelectorAll('[aria-label]');
            console.log(`Elements with ARIA labels: ${ariaElements.length}`);
        },
        showTestNotification: (type = 'info') => {
            showNotification(`This is a test ${type} notification!`, type);
        }
    };
});

// Service Worker registration for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment if you want to add a service worker
        // navigator.serviceWorker.register('/sw.js').then((registration) => {
        //     console.log('SW registered: ', registration);
        // }).catch((registrationError) => {
        //     console.log('SW registration failed: ', registrationError);
        // });
    });
}