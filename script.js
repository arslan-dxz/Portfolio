// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    initScrollAnimations();
    initPortfolioFilter();
    initThemeToggle();
    initSmoothScroll();
    initNavbarScroll();
});

// Theme Toggle Functionality
function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const slider = document.getElementById('theme-slider');
    const darkIcon = document.querySelector('.theme-icon-dark');
    const lightIcon = document.querySelector('.theme-icon-light');
    const darkText = document.querySelector('.theme-text-dark');
    const lightText = document.querySelector('.theme-text-light');

    toggle.addEventListener('click', function() {
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            darkIcon.classList.add('hidden');
            lightIcon.classList.remove('hidden');
            darkText.classList.add('hidden');
            lightText.classList.remove('hidden');
            
            // Update slider position and colors
            slider.style.transform = 'translateX(32px)';
            slider.style.backgroundColor = '#fbbf24';
        } else {
            html.classList.add('dark');
            darkIcon.classList.remove('hidden');
            lightIcon.classList.add('hidden');
            darkText.classList.remove('hidden');
            lightText.classList.add('hidden');
            
            // Reset slider
            slider.style.transform = 'translateX(0)';
            slider.style.backgroundColor = 'white';
        }
        
        // Add click animation
        toggle.style.transform = 'scale(0.95)';
        setTimeout(() => {
            toggle.style.transform = 'scale(1)';
        }, 150);
    });
}

// Scroll Reveal Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add stagger animation for grid items
                if (entry.target.parentElement.classList.contains('grid')) {
                    const siblings = Array.from(entry.target.parentElement.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => observer.observe(el));
}

// Portfolio Filter Functionality
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => {
                b.classList.remove('active', 'bg-neutral-800', 'text-white');
                b.classList.add('text-neutral-400');
            });
            
            // Add active class to clicked button
            this.classList.add('active', 'bg-neutral-800', 'text-white');
            this.classList.remove('text-neutral-400');

            const filterValue = this.getAttribute('data-filter');

            // Filter items with animation
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });

            // Re-trigger scroll animations for visible items
            setTimeout(() => {
                initScrollAnimations();
            }, 350);
        });
    });
}

// Smooth Scroll Navigation
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('shadow-lg', 'shadow-black/20');
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            navbar.classList.remove('shadow-lg', 'shadow-black/20');
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        }
        
        lastScroll = currentScroll;
    });
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('active');
    mobileMenu.classList.toggle('hidden');
}

// Image Modal Functions
function openModal(element) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const img = element.querySelector('img');
    
    modalImg.src = img.src;
    modal.classList.remove('hidden');
    
    // Trigger reflow
    void modal.offsetWidth;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Re-render icons in modal
    lucide.createIcons();
}

function closeModal() {
    const modal = document.getElementById('image-modal');
    modal.classList.remove('active');
    
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 300);
}

// Close modal on clicking outside
document.getElementById('image-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Parallax Effect for Background Elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.animate-float, .animate-float-reverse');
    
    parallaxElements.forEach((el, index) => {
        const speed = 0.5 + (index * 0.1);
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// TASK: Integrated functional EmailJS backend handler for the contact form
document.querySelector('#contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // TASK: Capture form elements for UI feedback
    const button = this.querySelector('button[type="submit"]');
    const originalContent = button.innerHTML;
    
    // TASK: Show loading spinner and disable button to prevent spamming
    button.innerHTML = '<span class="flex items-center gap-2"><svg class="animate-spin h-5 w-5 text-neutral-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Sending...</span>';
    button.disabled = true;

    // TASK: Send the email via EmailJS (requires valid Service/Template/Public IDs)
    emailjs.sendForm('service_se5xj6s', 'template_0yh5fax', this, 'WYvP3VolIK0PMWIHn')
        .then(() => {
            // TASK: Success UI state update
            button.innerHTML = '<span class="flex items-center gap-2"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Message Sent!</span>';
            button.classList.remove('bg-white', 'text-neutral-900');
            button.classList.add('bg-green-500', 'text-white');
            
            // TASK: Reset form and button after a short delay
            setTimeout(() => {
                this.reset();
                button.innerHTML = originalContent;
                button.classList.add('bg-white', 'text-neutral-900');
                button.classList.remove('bg-green-500', 'text-white');
                button.disabled = false;
                lucide.createIcons();
            }, 3000);
        }, (error) => {
            // TASK: Error UI state update
            console.error('EmailJS Error:', error);
            button.innerHTML = 'Error! Try Again';
            button.classList.add('bg-red-500', 'text-white');
            button.disabled = false;
            
            setTimeout(() => {
                button.innerHTML = originalContent;
                button.classList.remove('bg-red-500', 'text-white');
                lucide.createIcons();
            }, 3000);
        });
});

// Magnetic Button Effect for Social Buttons
const socialButtons = document.querySelectorAll('footer a');
socialButtons.forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.1)`;
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0) scale(1)';
    });
});

// Intersection Observer for Counting Animation
const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.text-3xl');
            counters.forEach(counter => {
                const targetText = counter.textContent;
                const targetValue = parseInt(targetText);
                if (isNaN(targetValue)) return;

                let current = 0;
                const increment = targetValue / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= targetValue) {
                        counter.textContent = targetValue + (targetText.includes('+') ? '+' : (targetText.includes('%') ? '%' : ''));
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current) + (targetText.includes('+') ? '+' : (targetText.includes('%') ? '%' : ''));
                    }
                }, 30);
            });
            countObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe stats section
const statsSection = document.querySelector('.grid.grid-cols-3');
if (statsSection) {
    countObserver.observe(statsSection);
}

// Performance Optimization: Debounce Scroll Events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized Scroll Handler
const optimizedScrollHandler = debounce(() => {
    initNavbarScroll();
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Preload Images for Better Performance
window.addEventListener('load', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'preload';
            preloadLink.as = 'image';
            preloadLink.href = src;
            document.head.appendChild(preloadLink);
        }
    });
});

// Preloader Logic
window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add("hide");
        }, 3000); // 3.0 seconds
    }
});

// TASK: Dual-Image Mouse Tracking Logic
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('custom-cursor');
    
    if (cursor) {
        // TASK: Instant 1:1 tracking
        window.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
        });

        // TASK: Elements that trigger the second cursor image
        const interactives = document.querySelectorAll('a, button, .portfolio-item, .filter-btn, #theme-toggle');
        
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-active');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-active');
            });
        });
    }
});


