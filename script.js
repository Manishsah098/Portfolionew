document.addEventListener('DOMContentLoaded', function() {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // --- 1. Tab Switching Logic ---
    function openTab(tabName, clickedLink) {
        // 1. Hide all content sections
        tabContents.forEach(content => {
            content.classList.remove('active');
        });

        // 2. Deactivate all navigation links
        tabLinks.forEach(link => {
            link.classList.remove('active');
        });

        // 3. Show the selected content section and set the link as active
        const selectedContent = document.getElementById(tabName);
        if (selectedContent) {
            selectedContent.classList.add('active');
        }
        clickedLink.classList.add('active');
    }

    // Add click event listeners to all navigation links
    tabLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevents page jump
            
            // Get the name of the content section to show
            const tabName = this.getAttribute('data-tab');
            
            // Switch the view and set the link active
            openTab(tabName, this);
        });
    });

    // --- 2. Typing Animation Logic (for the Home section) ---
    const typingTextElement = document.querySelector('.typing-text');
    const titles = ['CSE Student'];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        if (!typingTextElement) return;

        const currentTitle = titles[titleIndex];
        let displayText = currentTitle.substring(0, charIndex);
        typingTextElement.textContent = displayText;

        if (!isDeleting) {
            // Typing forward
            charIndex++;
            if (charIndex > currentTitle.length) {
                isDeleting = true;
                setTimeout(type, 1500); // Pause before deleting
                return;
            }
        } else {
            // Deleting backward
            charIndex--;
            if (charIndex < 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length; // Next title
                setTimeout(type, 500); // Pause before typing the next title
                return;
            }
        }

        const typingSpeed = isDeleting ? 75 : 150; 
        setTimeout(type, typingSpeed);
    }
    
    // Start the typing animation
    if (typingTextElement) {
        type();
    }
    
    // Initial load: ensure the 'home-section' is visible and 'Home' link is active
    // This is handled automatically by the 'active' classes in the HTML, 
    // but this ensures consistency if the HTML structure changes.
});