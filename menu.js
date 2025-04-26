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
    let cartItems = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const item = this.closest('.menu-item');
            const itemName = item.querySelector('h3').textContent;
            const itemPrice = item.querySelector('.item-price').textContent;

            // Create cart item object
            const cartItem = {
                name: itemName,
                price: itemPrice
            };

            // Add to cart (you can store this in localStorage or send to server)
            console.log('Added to cart:', cartItem);

            // Update cart count
            cartItems++;
            cartCount.textContent = cartItems;

            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = `${itemName} added to cart!`;
            document.body.appendChild(successMessage);

            // Remove success message after 2 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 2000);
        });
    });

    // Add styles for success message
    const style = document.createElement('style');
    style.textContent = `
        .success-message {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #4CAF50;
            color: white;
            padding: 1rem 2rem;
            border-radius: 5px;
            animation: slideIn 0.5s ease-out;
        }

        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}); 