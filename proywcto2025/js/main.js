// ========================================
// CONFIGURACIÓN INICIAL
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupMotivationalQuotes();
    setupScrollAnimations();
    setupFormValidation();
    setupSmoothScroll();
}

// ========================================
// NAVEGACIÓN
// ========================================

function setupNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar con scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Menú hamburguesa
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Actualizar link activo
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Actualizar link activo según scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// ========================================
// FRASES MOTIVACIONALES ROTATIVAS
// ========================================

function setupMotivationalQuotes() {
    const quotes = [
        "La disciplina supera al talento",
        "Tu cuerpo puede, tu mente manda",
        "Cada día es una oportunidad para ser mejor",
        "El dolor es temporal, el orgullo es para siempre",
        "No te rindas, el comienzo es siempre lo más difícil",
        "La única mala sesión es la que no hiciste",
        "Transforma tu cuerpo, transforma tu vida",
        "Los límites solo existen en tu mente"
    ];

    const quoteElement = document.querySelector('.motivational-quote');
    let currentIndex = 0;

    function showQuote() {
        // Desvanecer la cita actual
        quoteElement.style.animation = 'none';
        
        setTimeout(() => {
            // Cambiar el texto
            quoteElement.textContent = quotes[currentIndex];
            
            // Aplicar la animación
            quoteElement.style.animation = 'fadeInOut 3s ease-in-out';
            
            // Incrementar el índice
            currentIndex = (currentIndex + 1) % quotes.length;
        }, 100);
    }

    // Mostrar la primera cita
    showQuote();

    // Cambiar cita cada 4 segundos
    setInterval(showQuote, 4000);
}

// ========================================
// ANIMACIONES AL HACER SCROLL
// ========================================

function setupScrollAnimations() {
    const scrollElements = document.querySelectorAll('[data-scroll]');

    const elementInView = (el, offset = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            (window.innerHeight || document.documentElement.clientHeight) - offset
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 100)) {
                displayScrollElement(el);
            }
        });
    };

    // Ejecutar al cargar
    handleScrollAnimation();

    // Ejecutar al hacer scroll
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Añadir delays a las animaciones si tienen el atributo data-delay
    scrollElements.forEach((el, index) => {
        const delay = el.getAttribute('data-delay');
        if (delay) {
            el.style.transitionDelay = delay + 'ms';
        }
    });
}

// ========================================
// SMOOTH SCROLL
// ========================================

function setupSmoothScroll() {
    // Scroll suave para todos los enlaces ancla
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 70; // Ajuste por navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// VALIDACIÓN Y ENVÍO DEL FORMULARIO
// ========================================

function setupFormValidation() {
    const form = document.getElementById('quoteForm');
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const telefono = document.getElementById('telefono');
    const tipoEntrenamiento = document.getElementById('tipoEntrenamiento');

    // Validación en tiempo real
    nombre.addEventListener('blur', () => validateName(nombre));
    email.addEventListener('blur', () => validateEmail(email));
    telefono.addEventListener('blur', () => validatePhone(telefono));
    tipoEntrenamiento.addEventListener('change', () => validateSelect(tipoEntrenamiento));

    // Envío del formulario
    form.addEventListener('submit', handleFormSubmit);
}

function validateName(input) {
    const errorElement = document.getElementById('errorNombre');
    const value = input.value.trim();

    if (value === '') {
        showError(input, errorElement, 'El nombre es obligatorio');
        return false;
    } else if (value.length < 3) {
        showError(input, errorElement, 'El nombre debe tener al menos 3 caracteres');
        return false;
    } else {
        clearError(input, errorElement);
        return true;
    }
}

function validateEmail(input) {
    const errorElement = document.getElementById('errorEmail');
    const value = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === '') {
        showError(input, errorElement, 'El correo electrónico es obligatorio');
        return false;
    } else if (!emailRegex.test(value)) {
        showError(input, errorElement, 'Por favor ingresa un correo válido');
        return false;
    } else {
        clearError(input, errorElement);
        return true;
    }
}

function validatePhone(input) {
    const errorElement = document.getElementById('errorTelefono');
    const value = input.value.trim();
    const phoneRegex = /^[0-9]{7,15}$/;

    if (value === '') {
        showError(input, errorElement, 'El teléfono es obligatorio');
        return false;
    } else if (!phoneRegex.test(value)) {
        showError(input, errorElement, 'Por favor ingresa un teléfono válido (solo números, 7-15 dígitos)');
        return false;
    } else {
        clearError(input, errorElement);
        return true;
    }
}

function validateSelect(input) {
    const errorElement = document.getElementById('errorTipo');
    const value = input.value;

    if (value === '') {
        showError(input, errorElement, 'Por favor selecciona un tipo de entrenamiento');
        return false;
    } else {
        clearError(input, errorElement);
        return true;
    }
}

function showError(input, errorElement, message) {
    input.style.borderColor = '#e74c3c';
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearError(input, errorElement) {
    input.style.borderColor = '#e0e0e0';
    errorElement.textContent = '';
    errorElement.style.display = 'none';
}

function handleFormSubmit(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const telefono = document.getElementById('telefono');
    const tipoEntrenamiento = document.getElementById('tipoEntrenamiento');
    const mensaje = document.getElementById('mensaje').value;

    // Validar todos los campos
    const isNameValid = validateName(nombre);
    const isEmailValid = validateEmail(email);
    const isPhoneValid = validatePhone(telefono);
    const isSelectValid = validateSelect(tipoEntrenamiento);

    if (!isNameValid || !isEmailValid || !isPhoneValid || !isSelectValid) {
        // Mostrar mensaje de error general
        showNotification('Por favor completa todos los campos correctamente', 'error');
        return;
    }

    // Mostrar loading
    const submitBtn = e.target.querySelector('.btn-submit');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Simular envío (aquí deberías integrar con tu backend o servicio de email)
    setTimeout(() => {
        // Crear mensaje para WhatsApp
        const whatsappMessage = `
🏋️ *Nueva Cotización - Elite Training*

👤 *Nombre:* ${nombre.value}
📧 *Email:* ${email.value}
📱 *Teléfono:* ${telefono.value}
🎯 *Tipo de Entrenamiento:* ${tipoEntrenamiento.options[tipoEntrenamiento.selectedIndex].text}

💬 *Mensaje:*
${mensaje || 'Sin mensaje adicional'}
        `.trim();

        // Número de WhatsApp (cámbialo por el tuyo)
        const phoneNumber = '573001234567';
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        // Abrir WhatsApp
        window.open(whatsappURL, '_blank');

        // Mostrar mensaje de éxito
        showNotification('¡Formulario enviado! Redirigiendo a WhatsApp...', 'success');

        // Resetear formulario
        setTimeout(() => {
            e.target.reset();
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }, 2000);
    }, 1500);
}

// ========================================
// SISTEMA DE NOTIFICACIONES
// ========================================

function showNotification(message, type = 'success') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    // Estilos de la notificación
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? '#27ae60' : '#e74c3c',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '10px',
        boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
        zIndex: '10000',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        animation: 'slideInRight 0.3s ease-out',
        fontSize: '1rem',
        fontWeight: '500'
    });

    // Añadir al DOM
    document.body.appendChild(notification);

    // Remover después de 4 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Añadir estilos de animación para notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// UTILIDADES ADICIONALES
// ========================================

// Prevenir envío del formulario con Enter (excepto en textarea)
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        const form = e.target.closest('form');
        if (form && form.id === 'quoteForm') {
            e.preventDefault();
        }
    }
});

// Animación del indicador de scroll
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const benefitsSection = document.querySelector('.benefits');
        if (benefitsSection) {
            benefitsSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Performance: Throttle para scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar throttle a eventos de scroll para mejor performance
const scrollHandler = throttle(() => {
    // Código de scroll optimizado
}, 100);

window.addEventListener('scroll', scrollHandler);

console.log('🏋️ Elite Training - Website loaded successfully!');
console.log('💪 Desarrollado con pasión y dedicación');