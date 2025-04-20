// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add animation to feature cards when they come into view
const featureCards = document.querySelectorAll('.feature-card');
const categoryCards = document.querySelectorAll('.category-card');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            if (entry.target.classList.contains('feature-card')) {
                entry.target.style.animation = 'glow 2s ease-in-out infinite';
            }
        }
    });
}, observerOptions);

// Add initial styles for animation
featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';
    observer.observe(card);
});

categoryCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';
    observer.observe(card);
});

// Add glow animation to feature cards
const style = document.createElement('style');
style.textContent = `
    @keyframes glow {
        0% { box-shadow: 0 0 5px rgba(0, 255, 135, 0.2); }
        50% { box-shadow: 0 0 20px rgba(0, 255, 135, 0.4); }
        100% { box-shadow: 0 0 5px rgba(0, 255, 135, 0.2); }
    }
`;
document.head.appendChild(style);

// Search functionality with typing animation
const searchInput = document.querySelector('.search-container input');
const searchBtn = document.querySelector('.search-btn');
const placeholderText = "Enter your delivery location";
let currentText = "";
let currentIndex = 0;
let isDeleting = false;

function typeWriter() {
    if (currentIndex < placeholderText.length && !isDeleting) {
        currentText += placeholderText[currentIndex];
        currentIndex++;
        searchInput.setAttribute('placeholder', currentText);
        setTimeout(typeWriter, 100);
    } else if (currentIndex > 0 && isDeleting) {
        currentText = currentText.slice(0, -1);
        currentIndex--;
        searchInput.setAttribute('placeholder', currentText);
        setTimeout(typeWriter, 50);
    } else {
        isDeleting = !isDeleting;
        setTimeout(typeWriter, 1000);
    }
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});

searchBtn.addEventListener('click', () => {
    const location = searchInput.value.trim();
    if (location) {
        // Add loading animation
        searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
        setTimeout(() => {
            alert(`Searching for restaurants in ${location}...`);
            searchBtn.innerHTML = 'Find Food';
        }, 1500);
    } else {
        searchInput.style.border = '1px solid #ff4444';
        setTimeout(() => {
            searchInput.style.border = 'none';
        }, 2000);
    }
});

// Add hover effect to category cards with particle effect
categoryCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.05)';
        createParticles(card);
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

function createParticles(element) {
    const particles = document.createElement('div');
    particles.className = 'particles';
    element.appendChild(particles);
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particles.appendChild(particle);
    }
    
    setTimeout(() => {
        particles.remove();
    }, 1000);
}

// Mobile menu toggle with animation
const createMobileMenu = () => {
    const nav = document.querySelector('nav');
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    
    nav.insertBefore(mobileMenuBtn, nav.firstChild);
    
    mobileMenuBtn.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
};

// Initialize mobile menu if screen width is small
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Add responsive behavior for window resize
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-btn')) {
        createMobileMenu();
    }
});

// Add scroll reveal animation
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.feature-card, .category-card');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// Add animation to hero stats
const statCards = document.querySelectorAll('.stat-card');
statCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';
});

// Add animation to trending cards
const trendingCards = document.querySelectorAll('.trending-card');
trendingCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(-20px)';
    card.style.transition = 'all 0.5s ease';
});

// Add animation to step cards
const stepCards = document.querySelectorAll('.step-card');
stepCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';
});

// Add animation to testimonial cards
const testimonialCards = document.querySelectorAll('.testimonial-card');
testimonialCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(20px)';
    card.style.transition = 'all 0.5s ease';
});

// Enhanced scroll reveal animation
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll(
        '.feature-card, .category-card, .stat-card, .trending-card, .step-card, .testimonial-card'
    );
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translate(0)';
            
            // Add glow effect to feature cards
            if (element.classList.contains('feature-card')) {
                element.style.animation = 'glow 2s ease-in-out infinite';
            }
            
            // Add hover effect to trending cards
            if (element.classList.contains('trending-card')) {
                element.addEventListener('mouseenter', () => {
                    element.style.transform = 'translateY(-10px)';
                });
                
                element.addEventListener('mouseleave', () => {
                    element.style.transform = 'translateY(0)';
                });
            }
        }
    });
});

// Add auto-scroll to trending slider
const trendingSlider = document.querySelector('.trending-slider');
let scrollPosition = 0;

function autoScrollTrending() {
    scrollPosition += 1;
    if (scrollPosition >= trendingSlider.scrollWidth - trendingSlider.clientWidth) {
        scrollPosition = 0;
    }
    trendingSlider.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
}

setInterval(autoScrollTrending, 3000);

// Add hover effect to app buttons
const appButtons = document.querySelectorAll('.app-store, .play-store');
appButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-5px)';
        button.style.boxShadow = '0 5px 15px rgba(0, 255, 135, 0.3)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = 'none';
    });
});

// Add parallax effect to hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
});

// Add typing animation to testimonials
const testimonialTexts = document.querySelectorAll('.testimonial-content p');
let currentTestimonial = 0;

function typeTestimonial() {
    const text = testimonialTexts[currentTestimonial];
    const fullText = text.getAttribute('data-text') || text.textContent;
    text.setAttribute('data-text', fullText);
    text.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < fullText.length) {
            text.textContent += fullText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else {
            setTimeout(() => {
                text.textContent = '';
                currentTestimonial = (currentTestimonial + 1) % testimonialTexts.length;
                typeTestimonial();
            }, 3000);
        }
    };
    
    typeWriter();
}

// Start testimonial typing animation
if (testimonialTexts.length > 0) {
    typeTestimonial();
}

// Add particle effect to step cards
stepCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        createParticles(card);
    });
});

// Enhanced particle effect
function createParticles(element) {
    const particles = document.createElement('div');
    particles.className = 'particles';
    element.appendChild(particles);
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.setProperty('--tx', (Math.random() - 0.5) * 100 + 'px');
        particle.style.setProperty('--ty', (Math.random() - 0.5) * 100 + 'px');
        particles.appendChild(particle);
    }
    
    setTimeout(() => {
        particles.remove();
    }, 1000);
}

// Add loading animation to images
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';
    
    img.onload = () => {
        img.style.opacity = '1';
    };
}); 
