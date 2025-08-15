class Auth {
    constructor() {
        this.currentForm = 'login';
        this.initializeEventListeners();
        this.checkUrlParams();
        javascript
        // Add this to the Auth class constructor
        this.setupCloseButton();
    }
        // Add this method to the Auth class
    setupCloseButton() {
        const closeBtn = document.querySelector('.auth-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                // Try to go back in history, if not possible redirect to home
                if (window.history.length > 1) {
                    window.history.back();
                } else {
                    window.location.href = 'index.html';
                }
            });
        }
    }

    initializeEventListeners() {
        // Tab switching
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                this.showForm(tabName);
            });
        });

        // Form switching links
        document.querySelectorAll('.auth-switch a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const formName = e.target.getAttribute('href').substring(1);
                this.showForm(formName);
            });
        });

        // Forgot password link
        document.querySelector('.forgot-password')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showForm('forgot-password');
        });

        // Toggle password visibility
        document.querySelectorAll('.toggle-password').forEach(button => {
            button.addEventListener('click', (e) => {
                const input = e.target.closest('.form-group').querySelector('input');
                const icon = e.target.querySelector('i');
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.classList.replace('fa-eye', 'fa-eye-slash');
                } else {
                    input.type = 'password';
                    icon.classList.replace('fa-eye-slash', 'fa-eye');
                }
            });
        });

        // Password strength meter
        const passwordInput = document.getElementById('signup-password');
        if (passwordInput) {
            passwordInput.addEventListener('input', (e) => {
                this.updatePasswordStrength(e.target.value);
            });
        }

        // OTP input auto-focus
        const otpInputs = document.querySelectorAll('.otp-input');
        if (otpInputs.length) {
            otpInputs.forEach((input, index) => {
                input.addEventListener('input', (e) => {
                    if (e.target.value.length === 1 && index < otpInputs.length - 1) {
                        otpInputs[index + 1].focus();
                    }
                });
                
                input.addEventListener('keydown', (e) => {
                    if (e.key === 'Backspace' && index > 0 && !e.target.value) {
                        otpInputs[index - 1].focus();
                    }
                });
            });
        }

        // Form submissions
        document.getElementById('login-form')?.addEventListener('submit', this.handleLogin.bind(this));
        document.getElementById('signup-form')?.addEventListener('submit', this.handleSignup.bind(this));
        document.getElementById('forgot-password-form')?.addEventListener('submit', this.handleForgotPassword.bind(this));
        document.getElementById('otp-form')?.addEventListener('submit', this.handleOtpVerification.bind(this));

        // Social login buttons
        document.querySelectorAll('.social-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const provider = e.target.classList.contains('google') ? 'google' :
                               e.target.classList.contains('github') ? 'github' : 'microsoft';
                this.handleSocialLogin(provider);
            });
        });
    }

    checkUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const action = urlParams.get('action');
        if (action === 'login' || action === 'signup') {
            this.showForm(action);
        }
    }

    showForm(formName) {
        // Hide all forms
        document.querySelectorAll('.auth-form').forEach(form => {
            form.classList.remove('active');
        });

        // Deactivate all tabs
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.classList.remove('active');
        });

        // Show selected form
        const form = document.getElementById(`${formName}-form`);
        if (form) {
            form.classList.add('active');
            this.currentForm = formName;

            // Activate corresponding tab if exists
            const tab = document.querySelector(`.auth-tab[data-tab="${formName}"]`);
            if (tab) {
                tab.classList.add('active');
            }

            // Update URL without reload
            if (formName === 'login' || formName === 'signup') {
                window.history.replaceState({}, '', `?action=${formName}`);
            } else {
                window.history.replaceState({}, '', window.location.pathname);
            }
        }
    }

    updatePasswordStrength(password) {
        const strengthMeter = document.querySelector('.strength-meter');
        const strengthText = document.querySelector('.strength-text');
        const formGroup = document.querySelector('.form-group');

        if (!password) {
            strengthMeter.style.width = '0%';
            strengthText.textContent = '';
            formGroup.classList.remove('weak', 'medium', 'strong');
            return;
        }

        // Calculate strength
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        // Update UI
        formGroup.classList.remove('weak', 'medium', 'strong');
        
        if (strength <= 2) {
            formGroup.classList.add('weak');
            strengthText.textContent = 'Weak';
        } else if (strength <= 4) {
            formGroup.classList.add('medium');
            strengthText.textContent = 'Medium';
        } else {
            formGroup.classList.add('strong');
            strengthText.textContent = 'Strong';
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        
        try {
            const response = await fetch('/api/auth/login/', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': this.getCSRFToken(),
                    'Accept': 'application/json',
                },
                body: formData
            });

            const data = await response.json();
            
            if (response.ok) {
                if (data.requires_otp) {
                    this.showForm('otp');
                } else {
                    window.location.href = '/dashboard/';
                }
            } else {
                this.showFormErrors('login-form', data.errors || {});
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showAlert('An error occurred during login. Please try again.', 'error');
        }
    }

    async handleSignup(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        
        try {
            const response = await fetch('/api/auth/register/', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': this.getCSRFToken(),
                    'Accept': 'application/json',
                },
                body: formData
            });

            const data = await response.json();
            
            if (response.ok) {
                this.showForm('otp');
            } else {
                this.showFormErrors('signup-form', data.errors || {});
            }
        } catch (error) {
            console.error('Signup error:', error);
            this.showAlert('An error occurred during registration. Please try again.', 'error');
        }
    }

    async handleForgotPassword(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        
        try {
            const response = await fetch('/api/auth/password/reset/', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': this.getCSRFToken(),
                    'Accept': 'application/json',
                },
                body: formData
            });

            const data = await response.json();
            
            if (response.ok) {
                this.showAlert('Password reset link has been sent to your email.', 'success');
                this.showForm('login');
            } else {
                this.showFormErrors('forgot-password-form', data.errors || {});
            }
        } catch (error) {
            console.error('Forgot password error:', error);
            this.showAlert('An error occurred. Please try again.', 'error');
        }
    }

    async handleOtpVerification(e) {
        e.preventDefault();
        const otpInputs = document.querySelectorAll('.otp-input');
        const otp = Array.from(otpInputs).map(input => input.value).join('');
        
        try {
            const response = await fetch('/api/auth/verify-otp/', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': this.getCSRFToken(),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ otp })
            });

            const data = await response.json();
            
            if (response.ok) {
                window.location.href = data.redirect_url || '/dashboard/';
            } else {
                this.showAlert(data.message || 'Invalid OTP code. Please try again.', 'error');
            }
        } catch (error) {
            console.error('OTP verification error:', error);
            this.showAlert('An error occurred during verification. Please try again.', 'error');
        }
    }

    handleSocialLogin(provider) {
        // Redirect to social auth URL
        window.location.href = `/accounts/${provider}/login/`;
    }

    showFormErrors(formId, errors) {
        // Clear previous errors
        document.querySelectorAll(`#${formId} .error-message`).forEach(el => el.remove());
        document.querySelectorAll(`#${formId} input`).forEach(input => {
            input.classList.remove('error');
        });

        // Show new errors
        for (const [field, messages] of Object.entries(errors)) {
            const input = document.querySelector(`#${formId} [name="${field}"]`);
            if (input) {
                input.classList.add('error');
                const errorEl = document.createElement('div');
                errorEl.className = 'error-message';
                errorEl.textContent = Array.isArray(messages) ? messages.join(' ') : messages;
                errorEl.style.color = '#ff5b5b';
                errorEl.style.fontSize = '0.8rem';
                errorEl.style.marginTop = '5px';
                input.parentNode.insertBefore(errorEl, input.nextSibling);
            }
        }

        // Show general errors
        if (errors.non_field_errors) {
            this.showAlert(errors.non_field_errors.join(' '), 'error');
        }
    }

    showAlert(message, type = 'success') {
        // Remove existing alerts
        const existingAlert = document.querySelector('.auth-alert');
        if (existingAlert) existingAlert.remove();

        const alert = document.createElement('div');
        alert.className = `auth-alert auth-alert-${type}`;
        alert.textContent = message;
        alert.style.padding = '12px 20px';
        alert.style.borderRadius = '8px';
        alert.style.marginBottom = '20px';
        alert.style.color = type === 'success' ? '#4caf50' : '#ff5b5b';
        alert.style.backgroundColor = type === 'success' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 91, 91, 0.1)';
        alert.style.border = `1px solid ${type === 'success' ? '#4caf50' : '#ff5b5b'}`;

        const currentForm = document.querySelector(`#${this.currentForm}-form`);
        if (currentForm) {
            currentForm.insertBefore(alert, currentForm.firstChild);
        }
    }

    getCSRFToken() {
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('csrftoken='))
            ?.split('=')[1];
        return cookieValue || '';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Auth();
});