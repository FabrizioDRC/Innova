// js/main.js - Funcionalidades principales compartidas entre páginas
// Autor: INNOVA Soluções Imobiliárias
// Versión: 1.1 (WhatsApp funcionando como original)

// ===== MOBILE MENU =====
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');
    
    if (mobileMenu && navbar) {
        mobileMenu.addEventListener('click', () => {
            navbar.classList.toggle('active');
        });
        
        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
            });
        });
    }
    
    // ===== WHATSAPP MODAL =====
    const whatsappModal = document.getElementById('whatsapp-modal');
    const whatsappFloat = document.getElementById('whatsapp-float');
    const whatsappModalClose = document.getElementById('whatsapp-modal-close');
    
    // Función para abrir modal de WhatsApp
    function abrirModalWhatsApp(e) {
        if (e) e.preventDefault();
        if (whatsappModal) {
            whatsappModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Función para cerrar modal de WhatsApp
    function cerrarModalWhatsApp() {
        if (whatsappModal) {
            whatsappModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
    
    // Configurar eventos del botón flotante de WhatsApp (ABRE MODAL)
    if (whatsappFloat) {
        whatsappFloat.addEventListener('click', abrirModalWhatsApp);
    }
    
    if (whatsappModalClose) {
        whatsappModalClose.addEventListener('click', cerrarModalWhatsApp);
    }
    
    // Cerrar modal al hacer clic fuera
    if (whatsappModal) {
        whatsappModal.addEventListener('click', (e) => {
            if (e.target === whatsappModal) {
                cerrarModalWhatsApp();
            }
        });
    }
    
    // Configurar todos los botones de WhatsApp que deben abrir el MODAL
    const botonesWhatsAppModal = [
        'header-whatsapp',
        'faq-whatsapp', 
        'footer-whatsapp',
        'cta-whatsapp',
        'result-whatsapp',
        'final-whatsapp'
    ];
    
    botonesWhatsAppModal.forEach(id => {
        const button = document.getElementById(id);
        if (button) {
            button.addEventListener('click', abrirModalWhatsApp);
        }
    });
    
    // NOTA: Los botones dentro del modal (whatsapp-option-michele y whatsapp-option-fabrizio)
    // NO tienen event listeners porque tienen href directo a WhatsApp
    
    // ===== HEADER SCROLL EFFECT =====
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.12)';
                header.style.backdropFilter = 'blur(15px)';
            } else {
                header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.08)';
                header.style.backdropFilter = 'blur(10px)';
            }
        }
    });
    
    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== FAQ ACCORDION =====
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            
            // Cerrar todos los demás items
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Alternar el item actual
            item.classList.toggle('active');
        });
    });
    
    // ===== FEEDBACK ROTATIVO (solo para index.html) =====
    if (document.getElementById('f-text')) {
        const feedback = [
            ["A INNOVA transformou completamente minha experiência imobiliária. Profissionalismo, agilidade e resultados excepcionais!", "Marcos Silva", "Investidor Imobiliário"],
            ["Uma empresa moderna, organizada e extremamente confiável. Recomendo a todos que buscam segurança em transações imobiliárias.", "Fernanda Costa", "Arquiteta"],
            ["Gestão clara e comprometida com resultados. A INNOVA superou todas as minhas expectativas na venda do meu apartamento.", "Ricardo Almeida", "Cliente"],
            ["Atendimento personalizado e soluções sob medida. Encontrei o imóvel perfeito graças à assessoria especializada da INNOVA.", "Carolina Santos", "Compradora"]
        ];
        
        let currentFeedback = 0;
        const textElement = document.getElementById("f-text");
        const nameElement = document.getElementById("f-name");
        const roleElement = document.getElementById("f-role");
        
        function showFeedback() {
            const [text, name, role] = feedback[currentFeedback];
            
            // Efecto de fade out
            textElement.style.opacity = 0;
            nameElement.style.opacity = 0;
            roleElement.style.opacity = 0;
            
            setTimeout(() => {
                textElement.textContent = text;
                nameElement.textContent = name;
                roleElement.textContent = role;
                
                // Efecto de fade in
                textElement.style.transition = 'opacity 0.5s ease';
                nameElement.style.transition = 'opacity 0.5s ease';
                roleElement.style.transition = 'opacity 0.5s ease';
                
                textElement.style.opacity = 1;
                nameElement.style.opacity = 1;
                roleElement.style.opacity = 1;
                
                currentFeedback = (currentFeedback + 1) % feedback.length;
            }, 500);
        }
        
        // Iniciar ciclo de feedback
        showFeedback();
        setInterval(showFeedback, 5000);
    }
    
    // ===== MARCAR LINK ACTIVO EN NAVEGACIÓN =====
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        // Verificar si es la página actual
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage.includes('quem-somos') && linkPage === 'quem-somos.html') ||
            (currentPage.includes('simulacao') && linkPage === 'simulacao.html')) {
            
            // Remover clase activa de todos los enlaces
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Agregar clase activa al enlace actual
            link.classList.add('active');
            
            // También agregar estilos en línea para compatibilidad
            link.style.color = 'var(--purple)';
            link.style.fontWeight = '700';
        }
    });
});