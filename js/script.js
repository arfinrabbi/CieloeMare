// Restaurant Website JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Gusto Italiano website loaded successfully');
    
    // Initialize all functionality
    initHeroSlider();
    initNavigation();
    initSmoothScrolling();
    initReviewCarousel();
    initReservationForm();
    initDishOrder();
    initAnimations();
});

// Hero Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevArrow = document.querySelector('.arrow-left');
    const nextArrow = document.querySelector('.arrow-right');
    let currentSlide = 0;
    let slideInterval;
    
    // Initialize the slider
    function initSlider() {
        // Start automatic sliding
        startSlideInterval();
        
        // Add event listeners to arrows
        prevArrow.addEventListener('click', prevSlide);
        nextArrow.addEventListener('click', nextSlide);
        
        // Add event listeners to dots
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const slideIndex = parseInt(this.getAttribute('data-slide'));
                goToSlide(slideIndex);
            });
        });
        
        // Pause sliding when hovering over slider
        const slider = document.querySelector('.hero-slider');
        slider.addEventListener('mouseenter', pauseSlideInterval);
        slider.addEventListener('mouseleave', startSlideInterval);
    }
    
    // Go to specific slide
    function goToSlide(n) {
        // Remove active class from current slide and dot
        slides[currentSlide].className = 'slide';
        dots[currentSlide].classList.remove('active');
        
        // Set new current slide
        currentSlide = (n + slides.length) % slides.length;
        
        // Add active class to new slide and dot
        slides[currentSlide].className = 'slide active';
        dots[currentSlide].classList.add('active');
        
        // Reset the interval
        resetSlideInterval();
    }
    
    // Next slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    // Previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Start automatic sliding
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Pause automatic sliding
    function pauseSlideInterval() {
        clearInterval(slideInterval);
    }
    
    // Reset the interval
    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }
    
    // Initialize the slider
    initSlider();
});

// Navigation functionality
function initNavigation() {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('nav a');
    
    if (!header) return;
    
    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'white';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Active navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Review carousel functionality
function initReviewCarousel() {
    const reviewContainer = document.querySelector('.reviews-container');
    const reviewCards = document.querySelectorAll('.review-card');
    let currentIndex = 0;
    
    // Only initialize if we have reviews
    if (reviewCards.length === 0) return;
    
    // Function to show specific review
    function showReview(index) {
        reviewCards.forEach((card, i) => {
            card.style.display = i === index ? 'block' : 'none';
        });
    }
    
    // Initially show first review
    showReview(currentIndex);
    
    // Auto-rotate reviews every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % reviewCards.length;
        showReview(currentIndex);
    }, 5000);
}

// Reservation form functionality
function initReservationForm() {
    const reservationBtn = document.querySelector('.reservation-cta .btn');
    
    if (reservationBtn) {
        reservationBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // In a real application, this would open a modal or redirect to a reservation page
            const name = prompt('Please enter your name for the reservation:');
            if (name) {
                const date = prompt('Please enter your preferred date (e.g., MM/DD/YYYY):');
                if (date) {
                    const time = prompt('Please enter your preferred time:');
                    if (time) {
                        alert(`Thank you, ${name}! Your reservation is requested for ${date} at ${time}. We will confirm shortly.`);
                    }
                }
            }
        });
    }
    
    // Book a table button in header
    const bookBtn = document.querySelector('.book-btn');
    if (bookBtn) {
        bookBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Redirecting to reservation system...');
            // In a real application, this would open a reservation modal or page
        });
    }
}

// Dish of the day order functionality
function initDishOrder() {
    const orderBtn = document.querySelector('.dish-content .btn');
    
    if (orderBtn) {
        orderBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const dishName = document.querySelector('.dish-content h2').textContent;
            alert(`Added "${dishName}" to your order!`);
        });
    }
}

// Initialize animations for elements when they come into view
function initAnimations() {
    const animatedElements = document.querySelectorAll('.dish-card, .type-card, .review-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}
