document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.querySelector('.search-container input');
    const searchBtn = document.querySelector('.search-btn');

    searchBtn.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            console.log('Searching for:', searchTerm);
            // Implement search functionality here
        }
    });

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                console.log('Searching for:', searchTerm);
                // Implement search functionality here
            }
        }
    });

    // Category card click handler
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.querySelector('h3').textContent;
            console.log('Selected category:', category);
            // Implement category filtering here
        });
    });

    // Restaurant card click handler
    const restaurantCards = document.querySelectorAll('.restaurant-card');
    restaurantCards.forEach(card => {
        card.addEventListener('click', function() {
            const restaurantName = this.querySelector('.restaurant-info h3').textContent;
            console.log('Selected restaurant:', restaurantName);
            // Implement restaurant page navigation here
        });
    });

    // Cart icon click handler
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.addEventListener('click', function() {
        console.log('Cart clicked');
        // Implement cart functionality here
    });

    // User profile click handler
    const userProfile = document.querySelector('.user-profile');
    userProfile.addEventListener('click', function() {
        console.log('Profile clicked');
        // Implement profile menu here
    });

    // Offer button click handler
    const offerButtons = document.querySelectorAll('.offer-btn');
    offerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const offer = this.textContent;
            console.log('Offer selected:', offer);
            // Implement offer application here
        });
    });

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });

    // Add hover effect for cards
    const cards = document.querySelectorAll('.category-card, .restaurant-card, .offer-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});