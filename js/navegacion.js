// js/navegacion.js - Funcionalidades específicas de navegación
// Autor: INNOVA Soluções Imobiliárias
// Versión: 1.0

// Animaciones con Scroll Reveal
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar ScrollReveal si está disponible
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal({ 
            distance: '60px',
            duration: 1000,
            delay: 200,
            reset: false,
            easing: 'cubic-bezier(0.165, 0.84, 0.44, 1)'
        });
        
        // Configurar animaciones para cada sección
        ScrollReveal().reveal('.hero-content', { 
            origin: 'left',
            delay: 300 
        });
        
        ScrollReveal().reveal('.service-card', { 
            origin: 'bottom',
            interval: 150,
            scale: 0.9
        });
        
        ScrollReveal().reveal('.differential-item', { 
            origin: 'bottom',
            interval: 150
        });
        
        ScrollReveal().reveal('.feedback-box', { 
            origin: 'top',
            scale: 0.95
        });
        
        ScrollReveal().reveal('.simulate-content', { 
            origin: 'bottom',
            delay: 300
        });
        
        ScrollReveal().reveal('.faq-container', { 
            origin: 'bottom',
            delay: 300 
        });
    }
    
    // ===== ANIMACIONES ESPECÍFICAS PARA "QUEM SOMOS" =====
    if (document.querySelector('.hero-about')) {
        // Animaciones para elementos que aparecen con scroll
        function checkScroll() {
            const elements = document.querySelectorAll('.partner-image, .partner-content, .mvv-item');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.classList.add('in-view');
                }
            });
        }
        
        // Animación para CTA de "Quem Somos"
        function animateCTA() {
            const ctaSection = document.querySelector('.cta-about');
            if (!ctaSection) return;
            
            const ctaTop = ctaSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (ctaTop < windowHeight - 200) {
                const ctaTitle = ctaSection.querySelector('h2');
                const ctaText = ctaSection.querySelector('p');
                const ctaButton = ctaSection.querySelector('.cta-about-btn');
                
                if (ctaTitle) {
                    ctaTitle.style.opacity = '1';
                    ctaTitle.style.transform = 'translateY(0)';
                    ctaTitle.style.transition = 'all 1s cubic-bezier(0.165, 0.84, 0.44, 1) 0.3s';
                }
                
                if (ctaText) {
                    ctaText.style.opacity = '1';
                    ctaText.style.transform = 'translateY(0)';
                    ctaText.style.transition = 'all 1s cubic-bezier(0.165, 0.84, 0.44, 1) 0.6s';
                }
                
                if (ctaButton) {
                    ctaButton.style.opacity = '1';
                    ctaButton.style.transform = 'translateY(0)';
                    ctaButton.style.transition = 'all 1s cubic-bezier(0.165, 0.84, 0.44, 1) 0.9s';
                }
            }
        }
        
        // Inicializar animaciones
        window.addEventListener('scroll', () => {
            checkScroll();
            animateCTA();
        });
        
        // Ejecutar una vez al cargar
        window.addEventListener('load', () => {
            checkScroll();
            animateCTA();
        });
    }
});