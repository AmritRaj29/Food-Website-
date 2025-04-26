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

    // Cart functionality
    const cart = {
        items: [],
        total: 0,
        addItem: function(item) {
            const existingItem = this.items.find(i => i.id === item.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.items.push({...item, quantity: 1});
            }
            this.updateCart();
        },
        removeItem: function(itemId) {
            this.items = this.items.filter(item => item.id !== itemId);
            this.updateCart();
        },
        updateQuantity: function(itemId, newQuantity) {
            const item = this.items.find(i => i.id === itemId);
            if (item) {
                item.quantity = newQuantity;
                if (item.quantity <= 0) {
                    this.removeItem(itemId);
                }
                this.updateCart();
            }
        },
        calculateTotal: function() {
            this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            return this.total;
        },
        updateCart: function() {
            this.calculateTotal();
            this.updateCartUI();
            this.updateCartCount();
        },
        updateCartUI: function() {
            const cartItemsContainer = document.querySelector('.cart-items');
            const totalAmountElement = document.querySelector('.total-amount');
            
            cartItemsContainer.innerHTML = '';
            
            if (this.items.length === 0) {
                cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
                totalAmountElement.textContent = '₹0';
                return;
            }

            this.items.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item';
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="item-image">
                    <div class="item-details">
                        <h4>${item.name}</h4>
                        <p>₹${item.price}</p>
                    </div>
                    <div class="item-quantity">
                        <button class="quantity-btn minus" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn plus" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <button class="remove-item" onclick="cart.removeItem(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                cartItemsContainer.appendChild(itemElement);
            });

            totalAmountElement.textContent = `₹${this.total}`;
        },
        updateCartCount: function() {
            const cartCount = document.querySelector('.cart-count');
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'block' : 'none';
        }
    };

    // Cart popup functionality
    const cartPopup = {
        open: function() {
            document.querySelector('.cart-popup').classList.add('active');
            document.querySelector('.cart-overlay').classList.add('active');
            document.body.style.overflow = 'hidden';
        },
        close: function() {
            document.querySelector('.cart-popup').classList.remove('active');
            document.querySelector('.cart-overlay').classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    // Event listeners
    document.addEventListener('DOMContentLoaded', function() {
        // Cart icon click
        document.querySelector('.cart-icon').addEventListener('click', cartPopup.open);
        
        // Close cart button
        document.querySelector('.close-cart').addEventListener('click', cartPopup.close);
        
        // Overlay click
        document.querySelector('.cart-overlay').addEventListener('click', cartPopup.close);
        
        // Checkout button
        document.querySelector('.checkout-btn').addEventListener('click', function() {
            if (cart.items.length > 0) {
                // Redirect to Zomato
                window.location.href = 'https://www.zomato.com';
            }
        });

        // Add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const item = {
                    id: parseInt(this.dataset.id),
                    name: this.dataset.name,
                    price: parseFloat(this.dataset.price),
                    image: this.dataset.image
                };
                cart.addItem(item);
                cartPopup.open();
            });
        });
    });
});
