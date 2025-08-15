document.addEventListener('DOMContentLoaded', function() {
    const translations = {
        en: {
            home: "Home",
            tutorial: "Tutorial",
            detection: "Detection",
            about: "About",
            signIn: "Sign In",
            logIn: "Log In",
            title: "AI Healthcare Detection Made Simple",
            subtitle: "Advanced AI-powered healthcare detection for detecting the pneumonia through X-ray images.",
            next: "Next",
            copyright: "VeriScan AI. All rights reserved.",
            welcomeBack: "Welcome Back",
            createAccount: "Create Account",
            email: "Email",
            password: "Password",
            rememberMe: "Remember me",
            forgotPassword: "Forgot password?",
            fullName: "Full Name",
            confirmPassword: "Confirm Password",
            agreeTerms: "I agree to the Terms of Service and Privacy Policy",
            resetPassword: "Reset Password",
            resetInstructions: "Enter your email and we'll send you a link to reset your password.",
            verifyEmail: "Verify Your Email",
            otpInstructions: "We've sent a 6-digit code to your email. Enter it below to verify.",
            resendCode: "Resend Code",
            sendResetLink: "Send Reset Link",
            verify: "Verify",
            orLoginWith: "Or log in with",
            orSignupWith: "Or sign up with",
            noAccount: "Don't have an account?",
            haveAccount: "Already have an account?",
            rememberPassword: "Remember your password?",
            signUp: "Sign Up",
            logIn: "Log In",
            terms: "Terms of Service",
            privacy: "Privacy Policy",
            weak: "weak",
            medium: "medium",
            strong: "strong"
        },
        es: {
            home: "Inicio",
            tutorial: "Tutorial",
            detection: "Detección",
            about: "Acerca de",
            signIn: "Registrarse",
            logIn: "Iniciar Sesión",
            title: "Detección de Plagio con IA Simplificada",
            subtitle: "Detección avanzada de plagio con IA para artículos académicos, código fuente y documentos con soporte multilingüe e identificación de paráfrasis.",
            next: "Siguiente",
            copyright: "VeriScan AI. Todos los derechos reservados.",
            welcomeBack: "Bienvenido de nuevo",
            createAccount: "Crear cuenta",
            email: "Correo electrónico",
            password: "Contraseña",
            rememberMe: "Recuérdame",
            forgotPassword: "¿Olvidaste tu contraseña?",
            fullName: "Nombre completo",
            confirmPassword: "Confirmar contraseña",
            agreeTerms: "Acepto los Términos de Servicio y la Política de Privacidad",
            resetPassword: "Restablecer contraseña",
            resetInstructions: "Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.",
            verifyEmail: "Verifica tu correo electrónico",
            otpInstructions: "Hemos enviado un código de 6 dígitos a tu correo electrónico. Ingrésalo a continuación para verificar.",
            resendCode: "Reenviar código",
            sendResetLink: "Enviar enlace de restablecimiento",
            verify: "Verificar",
            orLoginWith: "O inicia sesión con",
            orSignupWith: "O regístrate con",
            noAccount: "¿No tienes una cuenta?",
            haveAccount: "¿Ya tienes una cuenta?",
            rememberPassword: "¿Recuerdas tu contraseña?",
            signUp: "Registrarse",
            logIn: "Iniciar sesión",
            terms: "Términos de Servicio",
            privacy: "Política de Privacidad",
            weak: "Débil",
            medium: "Medio",
            strong: "Fuerte"
        },
        fr: {
            home: "Accueil",
            tutorial: "Tutoriel",
            detection: "Détection",
            about: "À propos",
            signIn: "S'inscrire",
            logIn: "Connexion",
            title: "Détection de Plagiat par IA Simplifiée",
            subtitle: "Détection avancée de plagiat par IA pour les articles académiques, codes source et documents avec support multilingue et identification de paraphrase.",
            next: "Suivant",
            copyright: "VeriScan AI. Tous droits réservés.",
            welcomeBack: "Content de te revoir",
            createAccount: "Créer un compte",
            email: "Courriel",
            password: "Mot de passe",
            rememberMe: "Se souvenir de moi",
            forgotPassword: "Mot de passe oublié?",
            fullName: "Nom complet",
            confirmPassword: "Confirmer le mot de passe",
            agreeTerms: "J'accepte les Conditions d'Utilisation et la Politique de Confidentialité",
            resetPassword: "Réinitialiser le mot de passe",
            resetInstructions: "Entrez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe.",
            verifyEmail: "Vérifiez votre email",
            otpInstructions: "Nous avons envoyé un code à 6 chiffres à votre email. Entrez-le ci-dessous pour vérifier.",
            resendCode: "Renvoyer le code",
            sendResetLink: "Envoyer le lien de réinitialisation",
            verify: "Vérifier",
            orLoginWith: "Ou connectez-vous avec",
            orSignupWith: "Ou inscrivez-vous avec",
            noAccount: "Vous n'avez pas de compte?",
            haveAccount: "Vous avez déjà un compte?",
            rememberPassword: "Vous vous souvenez de votre mot de passe?",
            signUp: "S'inscrire",
            logIn: "Se connecter",
            terms: "Conditions d'Utilisation",
            privacy: "Politique de Confidentialité",
            weak: "Faible",
            medium: "Moyen",
            strong: "Fort"
        }
    };

    function getPreferredLanguage() {
        const storedLang = localStorage.getItem('language');
        if (storedLang) return storedLang;
        const browserLang = navigator.language.split('-')[0];
        return Object.keys(translations).includes(browserLang) ? browserLang : 'en';
    }

    function updateContent(lang) {
        const t = translations[lang];

        // Navbar
        document.querySelectorAll('.nav-text').forEach((el, i) => {
            el.textContent = Object.values(t).slice(0, 4)[i];
        });
        // Sidebar
        document.querySelectorAll('.sidebar-link .nav-text').forEach((el, i) => {
            el.textContent = Object.values(t).slice(0, 4)[i];
        });
        // Navbar buttons
        document.querySelectorAll('.btn-signin .btn-text').forEach(el => el.textContent = t.signIn);
        document.querySelectorAll('.btn-login .btn-text').forEach(el => el.textContent = t.logIn);
        document.querySelectorAll('.btn-next-text').forEach(el => el.textContent = t.next);

        // Hero
        const typingText = document.getElementById('typing-text');
        if (typingText) typingText.textContent = t.title;
        const subtitle = document.querySelector('.intro-subtitle');
        if (subtitle) subtitle.textContent = t.subtitle;

        // Footer
        document.querySelectorAll('.copyright-text').forEach(el => el.textContent = t.copyright);

        // Auth page translations
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (t[key]) el.textContent = t[key];
        });

        // Placeholder translations
        document.querySelectorAll('[data-placeholder]').forEach(input => {
            const key = input.getAttribute('data-placeholder');
            if (t[key]) input.setAttribute('placeholder', t[key]);
        });

        // Terms text
        document.querySelectorAll('[data-translate-terms]').forEach(el => {
            el.innerHTML = t.agreeTerms
                .replace('Terms of Service', `<a href="#">${t.terms}</a>`)
                .replace('Privacy Policy', `<a href="#">${t.privacy}</a>`);
        });

        // Switch text
        document.querySelectorAll('[data-translate-switch]').forEach(el => {
            const type = el.getAttribute('data-translate-switch');
            if (type === 'login') {
                el.innerHTML = `${t.noAccount} <a href="#signup">${t.signUp}</a>`;
            } else if (type === 'signup') {
                el.innerHTML = `${t.haveAccount} <a href="#login">${t.logIn}</a>`;
            } else if (type === 'forgot-password') {
                el.innerHTML = `${t.rememberPassword} <a href="#login">${t.logIn}</a>`;
            }
        });

        // Resend OTP
        document.querySelectorAll('.resend-otp').forEach(el => el.textContent = t.resendCode);

        document.documentElement.lang = lang;
        document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';

        document.querySelectorAll('[data-translate-strength]').forEach(el => {
    const strengthValue = el.textContent.trim().toLowerCase();
    if (t.weak && (strengthValue === 'weak' || strengthValue === t.weak.toLowerCase())) el.textContent = t.weak;
    if (t.medium && (strengthValue === 'medium' || strengthValue === t.medium.toLowerCase())) el.textContent = t.medium;
    if (t.strong && (strengthValue === 'strong' || strengthValue === t.strong.toLowerCase())) el.textContent = t.strong;
});
    }

    function initLanguage() {
        const lang = getPreferredLanguage();
        document.querySelectorAll('.language-select').forEach(select => select.value = lang);
        updateContent(lang);

        document.querySelectorAll('.language-select').forEach(select => {
            select.addEventListener('change', function() {
                const newLang = this.value;
                localStorage.setItem('language', newLang);
                updateContent(newLang);
                document.querySelectorAll('.language-select').forEach(s => {
                    if (s !== this) s.value = newLang;
                });

                // Typing effect on homepage
                if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
                    const typingText = document.getElementById('typing-text');
                    if (typingText) {
                        typingText.textContent = '';
                        setTimeout(() => {
                            typingText.style.borderRight = '3px solid white';
                            const text = translations[newLang].title;
                            let i = 0;
                            (function typeWriter() {
                                if (i < text.length) {
                                    typingText.textContent += text.charAt(i);
                                    i++;
                                    setTimeout(typeWriter, 100);
                                }
                            })();
                        }, 100);
                    }
                }
            });
        });
    }

    initLanguage();
});