// Enhanced counter animation for the stats section
document.addEventListener('DOMContentLoaded', function() {
    // Counter animation function
    function animateCounter(element, target, duration) {
        let startTime = null;
        const startValue = 0;
        const easeOutQuart = function(t) {
            return 1 - Math.pow(1 - t, 4);
        };
        
        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const currentValue = Math.floor(startValue + (target - startValue) * easedProgress);
            
            element.textContent = currentValue.toLocaleString() + (target === 10000 ? '+' : '+');
            
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                element.textContent = target.toLocaleString() + (target === 10000 ? '+' : '+');
            }
        }
        
        requestAnimationFrame(step);
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Stats animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                const statItems = entry.target.querySelectorAll('.stat-item');
                statItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animated');
                        const statNumber = item.querySelector('.stat-number');
                        const targetValues = [150, 10000, 12];
                        animateCounter(statNumber, targetValues[index], 2000);
                    }, index * 300);
                });
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Chef cards animation
    const chefsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const chefCards = entry.target.querySelectorAll('.chef-card');
                chefCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animated');
                    }, index * 200);
                });
                chefsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe the stats section and chefs section
    const statsSection = document.querySelector('.stats-widget');
    const chefsSection = document.querySelector('.chefs-container');
    
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    if (chefsSection) {
        chefsObserver.observe(chefsSection);
    }
});