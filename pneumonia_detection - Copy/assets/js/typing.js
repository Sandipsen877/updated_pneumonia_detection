document.addEventListener('DOMContentLoaded', function() {
    // This will now be updated by language.js
    const typingText = document.getElementById('typing-text');
    
    if (typingText) {
        let i = 0;
        const text = typingText.textContent;
        typingText.textContent = '';
        
        function typeWriter() {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                typingText.style.borderRight = '3px solid transparent';
                typingText.style.animation = 'blink 0.75s step-end infinite';
            }
        }
        
        // Start typing animation after slight delay
        setTimeout(() => {
            typingText.style.borderRight = '3px solid white';
            typeWriter();
        }, 500);
    }
});