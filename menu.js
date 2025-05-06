document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const userActions = document.querySelector('.user-actions');

    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        userActions.classList.toggle('active');
    });

    // Menu filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    // Check for URL parameters or localStorage for pre-selected category
    const urlParams = new URLSearchParams(window.location.search);
    const urlCategory = urlParams.get('category');
    const storedCategory = localStorage.getItem('selectedCategory');
    
    // Clear the stored category after using it
    if (storedCategory) {
        localStorage.removeItem('selectedCategory');
    }
    
    // Select the appropriate category
    const selectedCategory = urlCategory || storedCategory || 'all';

    // Find the button for the selected category
    const selectedButton = Array.from(filterButtons).find(btn => {
        return btn.getAttribute('data-category') === selectedCategory;
    }) || filterButtons[0]; // Default to first button if not found

    // Activate the selected category
    if (selectedButton) {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to selected button
        selectedButton.classList.add('active');
        
        // Filter the menu items
        const category = selectedButton.getAttribute('data-category');
        menuItems.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Add click handlers for filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const category = this.getAttribute('data-category');

            menuItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent navigating to product detail
            e.stopPropagation(); // Stop event from bubbling up to parent link

            const item = this.closest('.menu-item');
            const productLink = item.querySelector('.product-link');
            const productId = getProductIdFromUrl(productLink.href);
            const itemName = item.querySelector('h3').textContent;
            const itemPrice = item.querySelector('.item-price').textContent;
            const itemImage = item.querySelector('.item-image img').src;

            // Extract numeric price (remove currency symbol)
            const numericPrice = parseFloat(itemPrice.replace(/[^0-9.]/g, ''));

            // Create cart item object
            const cartItem = {
                id: productId,
                name: itemName,
                price: numericPrice,
                imageUrl: itemImage,
                quantity: 1
            };

            // Add to cart (storing in localStorage)
            addToCart(cartItem);

            // Show success message
            showToast(`${itemName} added to cart!`);
        });
    });

    // Make entire product card clickable except the Add to Cart button
    document.querySelectorAll('.product-link').forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default if the click happened on the Add to Cart button
            if (e.target.closest('.add-to-cart')) {
                e.preventDefault();
            }
        });
    });

    // Fix for event propagation issues with .menu-item clicks
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function(e) {
            // If the click is on Add to Cart button, don't navigate
            if (!e.target.closest('.add-to-cart')) {
                // Otherwise, navigate to the product detail page
                const productLink = this.querySelector('.product-link');
                if (productLink && !e.target.closest('.add-to-cart')) {
                    window.location.href = productLink.href;
                }
            }
        });
    });

    // Function to extract product ID from URL
    function getProductIdFromUrl(url) {
        const urlObj = new URL(url);
        return urlObj.searchParams.get('id');
    }

    // Function to add item to cart
    function addToCart(newItem) {
        // Get existing cart from localStorage or initialize empty cart
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if product already exists in cart
        const existingProductIndex = cart.findIndex(item => item.id === newItem.id);
        
        if (existingProductIndex !== -1) {
            // Update quantity if product already in cart
            cart[existingProductIndex].quantity += 1;
        } else {
            // Add new product to cart
            cart.push(newItem);
        }
        
        // Save cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart count in navbar
        updateCartCount();
    }

    // Function to update cart count in navbar
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const countElement = document.querySelector('.cart-count');
        
        if (countElement) {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            countElement.textContent = totalItems;
        }
    }

    // Function to show toast notification
    function showToast(message) {
        // Create toast element if it doesn't exist
        let toast = document.querySelector('.toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast';
            document.body.appendChild(toast);
            
            // Add styles for toast if not already in CSS
            const style = document.createElement('style');
            style.textContent = `
                .toast {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background-color: #4CAF50;
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 5px;
                    z-index: 1000;
                    opacity: 0;
                    transform: translateY(20px);
                    transition: opacity 0.3s, transform 0.3s;
                }
                .toast.show {
                    opacity: 1;
                    transform: translateY(0);
                }
            `;
            document.head.appendChild(style);
        }
        
        // Set message and show toast
        toast.textContent = message;
        toast.classList.add('show');
        
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}); 
