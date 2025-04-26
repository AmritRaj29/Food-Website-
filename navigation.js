document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    const contentContainer = document.getElementById('content-container');
    
    // Add click event listeners to all navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the target page from the href
            const targetPage = this.getAttribute('href');
            
            // Load the new page content
            loadPage(targetPage);
        });
    });

    // Handle mobile menu
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinksContainer.classList.toggle('active');
        });
    }
});

function loadPage(pageUrl) {
    // Create a new XMLHttpRequest
    const xhr = new XMLHttpRequest();
    
    // Configure the request
    xhr.open('GET', pageUrl, true);
    
    // Set up the callback function
    xhr.onload = function() {
        if (xhr.status === 200) {
            // Create a temporary container
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = xhr.responseText;
            
            // Get the main content from the loaded page
            const newMain = tempDiv.querySelector('main');
            const newStyles = tempDiv.querySelector('link[rel="stylesheet"]');
            
            // Get the current main content
            const currentMain = document.querySelector('main');
            
            // Fade out current content
            if (currentMain) {
                currentMain.style.opacity = '0';
                currentMain.style.transform = 'translateY(20px)';
            }
            
            // After fade out, update content
            setTimeout(() => {
                if (newMain && currentMain) {
                    // Update the content
                    currentMain.innerHTML = newMain.innerHTML;
                    
                    // Add any new styles
                    if (newStyles) {
                        document.head.appendChild(newStyles.cloneNode(true));
                    }
                    
                    // Fade in new content
                    currentMain.style.opacity = '1';
                    currentMain.style.transform = 'translateY(0)';
                    
                    // Update the page title
                    document.title = tempDiv.querySelector('title').textContent;
                    
                    // Update the URL without reloading the page
                    history.pushState({}, '', pageUrl);
                    
                    // Reinitialize any page-specific scripts
                    initializePageScripts(pageUrl);
                }
            }, 300); // Match this with the CSS transition duration
        }
    };
    
    // Send the request
    xhr.send();
}

function initializePageScripts(pageUrl) {
    // Initialize scripts based on the current page
    switch(pageUrl) {
        case 'menu.html':
            // Initialize menu page scripts
            if (typeof initializeMenuPage === 'function') {
                initializeMenuPage();
            }
            break;
        case 'about.html':
            // Initialize about page scripts
            if (typeof initializeAboutPage === 'function') {
                initializeAboutPage();
            }
            break;
        case 'contact.html':
            // Initialize contact page scripts
            if (typeof initializeContactPage === 'function') {
                initializeContactPage();
            }
            break;
        default:
            // Initialize home page scripts
            if (typeof initializeHomePage === 'function') {
                initializeHomePage();
            }
    }
}

// Handle browser back/forward buttons
window.addEventListener('popstate', function() {
    loadPage(window.location.pathname);
}); 