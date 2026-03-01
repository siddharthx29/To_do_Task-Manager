// ===== INTERACTIVE 3D CARD TILT EFFECT =====
document.addEventListener('DOMContentLoaded', function() {
    
    // 3D Tilt Effect for Cards
    const cards = document.querySelectorAll('.card-3d, .glass-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
    });
    
    function handleTilt(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    }
    
    function resetTilt(e) {
        const card = e.currentTarget;
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }
    
    // ===== ANIMATED BACKGROUND PARTICLES =====
    createParticles();
    
    function createParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
            overflow: hidden;
        `;
        
        document.body.insertBefore(particleContainer, document.body.firstChild);
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 4 + 2;
            const x = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, rgba(102, 126, 234, 0.8), rgba(0, 242, 254, 0.4));
                border-radius: 50%;
                left: ${x}%;
                bottom: -10%;
                animation: floatUp ${duration}s linear ${delay}s infinite;
                box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
            `;
            
            particleContainer.appendChild(particle);
        }
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatUp {
                0% {
                    transform: translateY(0) translateX(0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ===== SMOOTH SCROLL REVEAL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    document.querySelectorAll('.glass-card, .card-3d, .todo-item').forEach(el => {
        observer.observe(el);
    });
    
    // ===== BUTTON RIPPLE EFFECT =====
    const buttons = document.querySelectorAll('button, .btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                animation: rippleEffect 0.6s ease-out;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes rippleEffect {
            from {
                transform: scale(0);
                opacity: 1;
            }
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // ===== FORM INPUT ANIMATIONS =====
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        // Add floating label effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('input-focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('input-focused');
            }
        });
        
        // Add typing animation effect
        input.addEventListener('input', function() {
            this.style.transform = 'scale(1.01)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
    
    // ===== CURSOR GLOW EFFECT =====
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    cursorGlow.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(102, 126, 234, 0.4), transparent);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        display: none;
    `;
    document.body.appendChild(cursorGlow);
    
    document.addEventListener('mousemove', function(e) {
        cursorGlow.style.display = 'block';
        cursorGlow.style.left = e.clientX - 10 + 'px';
        cursorGlow.style.top = e.clientY - 10 + 'px';
    });
    
    // ===== PAGE LOAD ANIMATION =====
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // ===== STAGGER ANIMATION FOR MULTIPLE ELEMENTS =====
    function staggerAnimation(selector, animationClass, delay = 100) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add(animationClass);
            }, index * delay);
        });
    }
    
    // Apply stagger animations
    staggerAnimation('.todo-item', 'fade-in-up', 150);
    staggerAnimation('nav a', 'slide-in-right', 100);
    
    // ===== PARALLAX SCROLL EFFECT =====
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // ===== DYNAMIC GRADIENT SHIFT =====
    let hue = 0;
    setInterval(() => {
        hue = (hue + 1) % 360;
        document.documentElement.style.setProperty('--dynamic-hue', hue);
    }, 50);
    
    console.log('🎨 3D Animations and Effects Loaded Successfully!');
});

// ===== UTILITY FUNCTIONS =====
function createFloatingElement(text, x, y) {
    const element = document.createElement('div');
    element.textContent = text;
    element.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        color: rgba(102, 126, 234, 0.8);
        font-weight: bold;
        pointer-events: none;
        z-index: 9999;
        animation: floatAway 1s ease-out forwards;
    `;
    document.body.appendChild(element);
    
    setTimeout(() => element.remove(), 1000);
}

const floatAwayStyle = document.createElement('style');
floatAwayStyle.textContent = `
    @keyframes floatAway {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(-50px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(floatAwayStyle);
