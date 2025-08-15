// Replace the theme toggle section in detector_animations.js with:

// Enhanced Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const icon = themeToggle.querySelector('i');

// Check for saved theme preference or use preferred color scheme
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function applyTheme(isDark) {
    if (isDark) {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        icon.classList.replace('fa-sun', 'fa-moon');
    } else {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
        icon.classList.replace('fa-moon', 'fa-sun');
    }
}

// Initialize theme
if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    applyTheme(true);
    localStorage.setItem('theme', 'dark');
} else {
    applyTheme(false);
    localStorage.setItem('theme', 'light');
}

themeToggle.addEventListener('click', function() {
    const isDark = !document.body.classList.contains('dark-theme');
    applyTheme(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Add animation class
    this.classList.add('theme-toggle-active');
    setTimeout(() => {
        this.classList.remove('theme-toggle-active');
    }, 300);
});

// Add media query listener for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches);
    }
});

// detector_animations.js - Focused on 3D card and file upload animations

// File Upload Handling
const uploadArea = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const selectFileBtn = document.getElementById('selectFileBtn');
const scanButton = document.getElementById('scanButton');
const clearButton = document.getElementById('clearButton');
const resultsSection = document.getElementById('resultsSection');
const resultPreview = document.getElementById('resultPreview');
const resultText = document.getElementById('resultText');
const resultMessage = document.getElementById('resultMessage');
const confidenceBar = document.getElementById('confidenceBar');
const confidenceValue = document.getElementById('confidenceValue');

// 3D Card Cursor Follow Effect
const uploadCard = document.querySelector('.upload-card');

if (uploadCard) {
    uploadCard.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = uploadCard.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        
        const rotateY = (x - 0.5) * 20; // -10 to 10 degrees
        const rotateX = (0.5 - y) * 20; // -10 to 10 degrees
        
        uploadCard.style.transform = `
            translateY(-10px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `;
        
        // Parallax effect for the glowing bar
        const glowingBar = document.querySelector('.glowing-bar');
        if (glowingBar) {
            glowingBar.style.transform = `translateX(${(x - 0.5) * 20}px)`;
        }
    });
    
    uploadCard.addEventListener('mouseleave', () => {
        uploadCard.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        
        // Reset glowing bar position
        const glowingBar = document.querySelector('.glowing-bar');
        if (glowingBar) {
            glowingBar.style.transform = 'translateX(0)';
        }
    });
}

// Cursor style for the upload area
if (uploadArea) {
    uploadArea.style.cursor = 'grab';
    
    uploadArea.addEventListener('mousedown', () => {
        uploadArea.style.cursor = 'grabbing';
    });
    
    uploadArea.addEventListener('mouseup', () => {
        uploadArea.style.cursor = 'grab';
    });
}

// Click on upload area triggers file input
if (uploadArea) {
    uploadArea.addEventListener('click', function() {
        fileInput.click();
    });
}

if (selectFileBtn) {
    selectFileBtn.addEventListener('click', function() {
        fileInput.click();
    });
}

// Handle file selection
if (fileInput) {
    fileInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            if (file.type.match('image.*')) {
                const reader = new FileReader();
                
                reader.onload = function(event) {
                    resultPreview.src = event.target.result;
                    if (scanButton) scanButton.disabled = false;
                };
                
                reader.readAsDataURL(file);
            }
        }
    });
}

// Drag and drop functionality
if (uploadArea) {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
            uploadArea.style.borderColor = '#5bc0ff';
            uploadArea.style.backgroundColor = 'rgba(91, 192, 255, 0.1)';
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
            uploadArea.style.borderColor = 'rgba(74, 144, 226, 0.3)';
            uploadArea.style.backgroundColor = 'transparent';
        });
    });

    uploadArea.addEventListener('drop', function(e) {
        if (e.dataTransfer.files.length > 0) {
            fileInput.files = e.dataTransfer.files;
            const event = new Event('change');
            fileInput.dispatchEvent(event);
        }
    });
}

// Analyze button click - simulate analysis
if (scanButton) {
    scanButton.addEventListener('click', function() {
        // Show loading state
        scanButton.disabled = true;
        scanButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
        
        // Simulate API call delay
        setTimeout(function() {
            // Random result for demo purposes
            const hasPneumonia = Math.random() > 0.5;
            const confidence = Math.floor(Math.random() * 30) + 70; // 70-100%
            
            showResult(hasPneumonia, confidence);
            
            // Reset button
            scanButton.disabled = false;
            scanButton.textContent = 'Analyze X-ray';
        }, 2000);
    });
}

// Clear button
if (clearButton) {
    clearButton.addEventListener('click', function() {
        if (fileInput) fileInput.value = '';
        if (resultPreview) resultPreview.src = '';
        if (scanButton) scanButton.disabled = true;
        if (resultsSection) resultsSection.style.display = 'none';
    });
}

// New scan button
const newScanButton = document.querySelector('.btn-newscan');
if (newScanButton) {
    newScanButton.addEventListener('click', function() {
        if (fileInput) fileInput.value = '';
        if (resultPreview) resultPreview.src = '';
        if (scanButton) scanButton.disabled = true;
        if (resultsSection) resultsSection.style.display = 'none';
    });
}

// Show analysis result
function showResult(hasPneumonia, confidence) {
    const resultIndicator = document.querySelector('.result-indicator');
    
    if (!resultIndicator) return;
    
    if (hasPneumonia) {
        resultIndicator.classList.add('pneumonia-positive');
        resultIndicator.classList.remove('pneumonia-negative');
        if (resultText) resultText.textContent = 'Pneumonia Detected';
        if (resultMessage) resultMessage.textContent = 'The analysis indicates signs of pneumonia. Please consult with a healthcare professional for further evaluation and treatment.';
    } else {
        resultIndicator.classList.add('pneumonia-negative');
        resultIndicator.classList.remove('pneumonia-positive');
        if (resultText) resultText.textContent = 'No Pneumonia Detected';
        if (resultMessage) resultMessage.textContent = 'No signs of pneumonia were detected in the X-ray. However, if symptoms persist, please consult a doctor.';
    }
    
    // Animate confidence bar
    if (confidenceBar) {
        confidenceBar.style.width = '0';
        setTimeout(() => {
            confidenceBar.style.width = confidence + '%';
            if (confidenceValue) confidenceValue.textContent = confidence + '% confidence';
        }, 100);
    }
    
    if (resultsSection) resultsSection.style.display = 'block';
}


