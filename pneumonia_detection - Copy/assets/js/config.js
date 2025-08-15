// API Configuration
const config = {
    apiBaseUrl: window.API_BASE_URL || 'http://localhost:5000',
    endpoints: {
        analyze: '/api/analyze',
        history: '/api/history',
        export: '/api/export',
        login: '/api/auth/login',
        signup: '/api/auth/signup',
        forgotPassword: '/api/auth/forgot-password',
        verifyOtp: '/api/auth/verify-otp'
    },
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedFileTypes: ['image/jpeg', 'image/png', 'application/dicom']
};

// Make config available globally
window.AppConfig = config;

// Helper function for full API URLs
export function getApiUrl(endpoint) {
    return `${config.apiBaseUrl}${config.endpoints[endpoint]}`;
}