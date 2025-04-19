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