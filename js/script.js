/**
 * Omar Ashraf - Professional Portfolio Scripts
 * ----------------------------------------------------
 * Custom Interactive Dynamics & Responsive Animations
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. PRELOADER SCREEN HANDLER
    // ==========================================================================
    const preloader = document.getElementById('preloader');
    if (preloader) {
        const removePreloader = () => {
            if (!preloader.classList.contains('fade-out')) {
                setTimeout(() => {
                    preloader.classList.add('fade-out');
                }, 600); // Small delay for premium feel
            }
        };

        // If page is already loaded, remove preloader immediately
        if (document.readyState === 'complete') {
            removePreloader();
        } else {
            window.addEventListener('load', removePreloader);

            // Fail-safe: remove preloader after a timeout in case load event was missed
            setTimeout(removePreloader, 3000);
        }
    }


    // ==========================================================================
    // 2. CANVAS INTERACTIVE PARTICLES BACKGROUND (NETWORKING CONSTELLATION)
    // ==========================================================================
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationFrameId;

        // Resize Canvas
        function resizeCanvas() {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
            initParticles();
        }

        // Particle Class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.4; // Slow drift velocity
                this.vy = (Math.random() - 0.5) * 0.4;
                this.radius = Math.random() * 2.5 + 1;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            draw() {
                // Get theme primary color dynamically
                const isLight = document.body.classList.contains('light-theme');
                ctx.fillStyle = isLight ? `rgba(2, 132, 199, ${this.opacity})` : `rgba(14, 165, 233, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off boundaries
                if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
                if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
            }
        }

        // Initialize particles based on screen size
        function initParticles() {
            particles = [];
            const count = Math.min(Math.floor((canvas.width * canvas.height) / 18000), 75);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        }

        // Draw network connection lines between nodes
        function connectParticles() {
            const isLight = document.body.classList.contains('light-theme');
            const maxDistance = 140;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDistance) {
                        const alpha = (1 - dist / maxDistance) * 0.12;
                        ctx.strokeStyle = isLight ? `rgba(2, 132, 199, ${alpha})` : `rgba(14, 165, 233, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        // Animating Loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            connectParticles();
            animationFrameId = requestAnimationFrame(animate);
        }

        // Event listeners for window changes
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        animate();
    }

    // ==========================================================================
    // 3. HERO TYPING TEXT EFFECT
    // ==========================================================================
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        const words = ['Senior IT Specialist', 'Network Administrator', 'Systems Engineer'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                typingText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 40; // Faster backspace
            } else {
                typingText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100; // Normal typing speed
            }

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000; // Hold full word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Pause before typing next word
            }

            setTimeout(type, typeSpeed);
        }

        // Kick off typing loop
        setTimeout(type, 1000);
    }

    // ==========================================================================
    // 4. DARK / LIGHT THEME TOGGLE
    // ==========================================================================
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Check for local storage save
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
        }

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            if (document.body.classList.contains('light-theme')) {
                localStorage.setItem('theme', 'light');
            } else {
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // ==========================================================================
    // 5. STICKY NAV HEADER & TOP SCROLL PROGRESS BAR
    // ==========================================================================
    const header = document.getElementById('header');
    const scrollProgress = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Sticky navigation triggers at 50px of scroll
        if (header) {
            if (scrollTop > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Horizontal scroll progress bar
        if (scrollProgress && docHeight > 0) {
            const scrollPercentage = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = `${scrollPercentage}%`;
        }
    });

    // ==========================================================================
    // 6. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
    // ==========================================================================
    const revealElements = document.querySelectorAll('.scroll-reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');

                    // Trigger skills progress bars expansion if inside skills section
                    if (entry.target.id === 'skills') {
                        animateSkillsProgress();
                    }

                    // Stop observing once animation triggers
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('revealed'));
        animateSkillsProgress();
    }

    // Animate skill bar percentages
    function animateSkillsProgress() {
        const progressBars = document.querySelectorAll('.skill-progress');
        progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        });
    }

    // ==========================================================================
    // 7. STATS COUNT-UP NUMERICAL COUNTER ANIMATION
    // ==========================================================================
    const statNumbers = document.querySelectorAll('.stat-number');

    if (statNumbers.length > 0 && 'IntersectionObserver' in window) {
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const endVal = parseInt(target.getAttribute('data-target'), 10);
                    countUp(target, endVal);
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.8 });

        statNumbers.forEach(num => statsObserver.observe(num));
    } else {
        // Fallback if observer not supported
        statNumbers.forEach(num => {
            num.textContent = num.getAttribute('data-target');
        });
    }

    function countUp(element, endValue) {
        let startValue = 0;
        const duration = 2000; // 2 seconds total count time
        const frameRate = 1000 / 60; // 60 FPS
        const totalFrames = Math.round(duration / frameRate);
        let frame = 0;

        function animateCount() {
            frame++;
            const progress = frame / totalFrames;
            // Ease out cubic logic for deceleration
            const currentVal = Math.round(endValue * (1 - Math.pow(1 - progress, 3)));
            element.textContent = currentVal;

            if (frame < totalFrames) {
                requestAnimationFrame(animateCount);
            } else {
                element.textContent = endValue;
            }
        }
        animateCount();
    }

    // ==========================================================================
    // 8. PROJECTS FILTERING LOGIC WITH SMOOTH ANIMATION
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active classes
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');

                    if (filter === 'all' || category === filter) {
                        card.classList.remove('fade-out');
                    } else {
                        card.classList.add('fade-out');
                    }
                });
            });
        });
    }

    // Skills subcategory tabs filtering inside skills layout
    const skillTabs = document.querySelectorAll('.skill-tab-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    if (skillTabs.length > 0 && skillCards.length > 0) {
        skillTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                skillTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const filter = tab.getAttribute('data-filter');

                skillCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'flex';
                        // Small opacity transition triggers bar width layout
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 200);
                    }
                });
            });
        });
    }

    // ==========================================================================
    // 9. ACTIVE MENU LINK INDICATOR ON SCROLL
    // ==========================================================================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSection = '';
        const scrollPos = window.scrollY + 120; // Offset for header trigger

        sections.forEach(sec => {
            const secTop = sec.offsetTop;
            const secHeight = sec.offsetHeight;
            if (scrollPos >= secTop && scrollPos < secTop + secHeight) {
                currentSection = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================================================
    // 10. MOBILE MENU TOGGLE & HAMBURGER TRANSFORMATION
    // ==========================================================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navMenuLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        // Close menu when a navigation item is clicked
        navMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    // ==========================================================================
    // 11. INTERACTIVE CONTACT FORM SUBMISSION WITH SIMULATED TRANSMISSION
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const toast = document.getElementById('toast-message');

    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validate inputs
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');

            let hasError = false;

            // Reset error states
            const resetError = (input) => {
                input.parentElement.classList.remove('error');
            };

            const setError = (input) => {
                input.parentElement.classList.add('error');
                hasError = true;
            };

            [nameInput, emailInput, subjectInput, messageInput].forEach(resetError);

            // Text checking
            if (!nameInput.value.trim()) setError(nameInput);
            if (!subjectInput.value.trim()) setError(subjectInput);
            if (!messageInput.value.trim()) setError(messageInput);

            // Email checking
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
                setError(emailInput);
            }

            if (hasError) return; // Exit if validation fails

            // Start simulated network transmission
            const btnText = submitBtn.querySelector('.btn-text');
            const spinner = submitBtn.querySelector('.spinner-inline');

            btnText.classList.add('hidden');
            spinner.classList.remove('hidden');
            submitBtn.disabled = true;

            setTimeout(() => {
                // Success State
                spinner.classList.add('hidden');
                btnText.classList.remove('hidden');
                submitBtn.disabled = false;

                // Clear form
                contactForm.reset();

                // Trigger Success Toast Popup
                if (toast) {
                    toast.classList.remove('hidden');
                    setTimeout(() => {
                        toast.classList.add('hidden');
                    }, 5000); // Auto hide after 5 seconds
                }
            }, 2000); // 2-second simulation latency
        });
    }

    // ==========================================================================
    // 12. BACK TO TOP BUTTON LOGIC
    // ==========================================================================
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (backToTopBtn) {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
