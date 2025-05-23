document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show corresponding form
            forms.forEach(form => {
                form.classList.remove('active');
                if (form.id === `${targetTab}Form`) {
                    form.classList.add('active');
                }
            });
        });
    });

    // Password visibility toggle
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });

    // Phone number validation
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 10) {
                value = value.slice(0, 10);
            }
            this.value = value;
        });
    });

    // Form submission handling
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const rememberMe = document.querySelector('#loginForm input[name="remember"]').checked;

            // Basic validation
            if (!validateEmail(email)) {
                showError('Please enter a valid email address');
                return;
            }

            if (password.length < 6) {
                showError('Password must be at least 6 characters long');
                return;
            }

            // Here you would typically make an API call to your backend
            console.log('Login attempt:', { email, password, rememberMe });
            
            // Simulate successful login
            showSuccess('Login successful!');
            // Redirect to dashboard or home page
            // window.location.href = 'dashboard.html';
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const phone = document.getElementById('signupPhone').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const acceptTerms = document.getElementById('signupForm input[name="terms"]').checked;

            // Validation
            if (name.length < 3) {
                showError('Name must be at least 3 characters long');
                return;
            }

            if (!validateEmail(email)) {
                showError('Please enter a valid email address');
                return;
            }

            if (phone.length !== 10) {
                showError('Please enter a valid 10-digit phone number');
                return;
            }

            if (password.length < 6) {
                showError('Password must be at least 6 characters long');
                return;
            }

            if (password !== confirmPassword) {
                showError('Passwords do not match');
                return;
            }

            if (!acceptTerms) {
                showError('Please accept the terms and conditions');
                return;
            }

            // Here you would typically make an API call to your backend
            console.log('Signup attempt:', { name, email, phone, password });
            
            // Simulate successful signup
            showSuccess('Account created successfully!');
            // Redirect to login or dashboard
            // window.location.href = 'dashboard.html';
        });
    }

    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.classList.contains('google') ? 'Google' : 'Facebook';
            console.log(`${platform} login clicked`);
            // Implement social login logic here
        });
    });

    // Helper functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showError(message) {
        // Create error message element if it doesn't exist
        let errorElement = document.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            document.querySelector('.auth-content').prepend(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.classList.add('animate-in');
        
        // Remove error message after 3 seconds
        setTimeout(() => {
            errorElement.classList.add('animate-out');
            setTimeout(() => {
                errorElement.remove();
            }, 500);
        }, 3000);
    }

    function showSuccess(message) {
        // Create success message element if it doesn't exist
        let successElement = document.querySelector('.success-message');
        if (!successElement) {
            successElement = document.createElement('div');
            successElement.className = 'success-message';
            document.querySelector('.auth-content').prepend(successElement);
        }
        
        successElement.textContent = message;
        successElement.classList.add('animate-in');
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            successElement.classList.add('animate-out');
            setTimeout(() => {
                successElement.remove();
            }, 500);
        }, 3000);
    }
}); 
