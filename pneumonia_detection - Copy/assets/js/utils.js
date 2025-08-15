// Utility Functions

/**
 * Get CSRF token from cookies
 */
export function getCSRFToken() {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
    return cookieValue || '';
}

/**
 * Handle API response with consistent error handling
 */
export async function handleApiResponse(response) {
    if (!response.ok) {
        let errorData;
        try {
            errorData = await response.json();
        } catch (e) {
            errorData = { message: 'API request failed' };
        }
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
}

/**
 * Show/hide global loading overlay
 */
export function showLoading(show = true) {
    let loader = document.getElementById('global-loader');
    
    if (show) {
        if (!loader) {
            loader = document.createElement('div');
            loader.id = 'global-loader';
            loader.className = 'loading-overlay';
            loader.innerHTML = `
                <div class="loading-content">
                    <div class="loading-spinner"></div>
                    <p class="loading-text">Processing...</p>
                </div>
            `;
            document.body.appendChild(loader);
        }
    } else if (loader) {
        loader.remove();
    }
}

/**
 * Display API error messages
 */
export function showError(message, elementId = 'error-display') {
    let errorElement = document.getElementById(elementId);
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.id = elementId;
        errorElement.className = 'api-error';
        document.querySelector('main').prepend(errorElement);
    }
    
    errorElement.textContent = message;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        errorElement.remove();
    }, 5000);
}

/**
 * Validate file before upload
 */
export function validateFile(file) {
    if (!AppConfig.allowedFileTypes.includes(file.type)) {
        throw new Error('Unsupported file type. Please upload a JPG, PNG, or DICOM file.');
    }
    
    if (file.size > AppConfig.maxFileSize) {
        throw new Error(`File too large. Maximum size is ${AppConfig.maxFileSize / 1024 / 1024}MB.`);
    }
    
    return true;
}