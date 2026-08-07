document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Functionality
    const menuToggleBtn = document.querySelector('button[aria-label="Toggle menu"]');
    const mobileSidebar = document.querySelector('.fixed.top-0.right-0.w-64'); // Sidebar
    const overlay = document.querySelector('.fixed.inset-0.bg-black\\/50'); // Overlay

    if (menuToggleBtn && mobileSidebar && overlay) {
        let isMenuOpen = false;

        const toggleMenu = () => {
            isMenuOpen = !isMenuOpen;
            if (isMenuOpen) {
                mobileSidebar.classList.remove('translate-x-full');
                overlay.classList.remove('opacity-0', 'invisible');
            } else {
                mobileSidebar.classList.add('translate-x-full');
                overlay.classList.add('opacity-0', 'invisible');
            }
        };

        menuToggleBtn.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
    }

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('nav');
    if (navbar) {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                navbar.classList.remove('bg-transparent');
                navbar.classList.add('bg-black/90', 'backdrop-blur-md');
                // The border-b was originally missing, but we'll just add background
            } else {
                navbar.classList.add('bg-transparent');
                navbar.classList.remove('bg-black/90', 'backdrop-blur-md');
            }
        };
        window.addEventListener('scroll', handleScroll);
        // Trigger once on load
        handleScroll();
    }

    // 3. Intersection Observer for Fade-Up Animations
    const fadeElements = document.querySelectorAll('.animate-fade-up, .opacity-0.will-change-transform');
    if (fadeElements.length > 0) {
        // Since animate-fade-up is a CSS animation that plays on load, 
        // we'll pause them initially, and play them when they intersect.
        fadeElements.forEach(el => {
            // Apply initial state to prevent them from showing before scrolling
            el.style.opacity = '0';
            el.style.animationPlayState = 'paused';
            
            // Fix some weird jumping issues if the element isn't hidden
            // Actually, fadeUp animation handles opacity: 0 to 1, but we need it to NOT run.
            // A better way is to remove the class and add it back, but Tailwind's class has the animation definition.
            // Let's use a small trick:
            el.classList.remove('animate-fade-up');
        });

        const fadeObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-up');
                    entry.target.style.opacity = '';
                    entry.target.style.animationPlayState = 'running';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

        fadeElements.forEach(el => {
            fadeObserver.observe(el);
        });
    }

    // 4. Number Counters
    // We target the h3 elements in the statistics section
    // They have structure like <h3><span>0 +</span></h3>
    const statSection = document.querySelector('.grid-cols-3.md\\:grid-cols-3.lg\\:grid-cols-5');
    if (statSection) {
        const statHeaders = statSection.querySelectorAll('h3 span');
        // Define targets based on index or text content. 
        // Index 0: Years (10+), 1: Clients (50+), 2: Countries (6), 3: Offices (6), 4: Developers (100+)
        const targets = [10, 50, 6, 6, 100]; 
        const suffixes = [' +', ' +', '', '', '+'];

        // Reset initially
        statHeaders.forEach((span, i) => {
            span.innerText = `0${suffixes[i]}`;
        });

        const countUp = (el, target, suffix) => {
            let start = 0;
            const duration = 2000;
            const increment = target / (duration / 16); // 60fps
            
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    el.innerText = `${target}${suffix}`;
                    clearInterval(timer);
                } else {
                    el.innerText = `${Math.floor(start)}${suffix}`;
                }
            }, 16);
        };

        const statObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statHeaders.forEach((span, i) => {
                        countUp(span, targets[i], suffixes[i]);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        statObserver.observe(statSection);
    }

    // 4b. Number Counters (about.html)
    const aboutStatSection = document.querySelector('.grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4.gap-4.md\\:gap-6');
    if (aboutStatSection) {
        // Find all the <h4> elements that contain the numbers
        const aboutStatHeaders = aboutStatSection.querySelectorAll('h4 span:first-child');
        
        // Target numbers from original react code: 200+, 99%, 40%, 70%
        const aboutTargets = [200, 99, 40, 70];
        
        // Find suffix spans to ensure they don't get overwritten, we just update the first span
        
        const countUpAbout = (el, target) => {
            let start = 0;
            const duration = 2500;
            const increment = target / (duration / 16); // 60fps
            
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    el.innerText = target;
                    clearInterval(timer);
                } else {
                    el.innerText = Math.floor(start);
                }
            }, 16);
        };

        const aboutStatObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    aboutStatHeaders.forEach((span, i) => {
                        // Reset to 0 just before counting
                        span.innerText = "0";
                        countUpAbout(span, aboutTargets[i]);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        aboutStatObserver.observe(aboutStatSection);
    }

    // 5. Vertical Slider for Milestones (about.html)
    const milestoneContainer = document.querySelector('.h-\\[400vh\\]');
    if (milestoneContainer) {
        const titleTrack = milestoneContainer.querySelector('.mb-12.md\\:mb-20.text-center.w-full.transition-transform');
        // The year track is inside overflow-hidden md:overflow-visible
        const yearTrack = milestoneContainer.querySelector('.overflow-hidden.md\\:overflow-visible.h-full > .transition-transform');
        // The content track is inside text-center md:text-left
        const contentTrack = milestoneContainer.querySelector('.relative.w-full.text-center.md\\:text-left > .transition-transform'); 
        
        if (yearTrack && contentTrack) {
            const handleMilestoneScroll = () => {
                const rect = milestoneContainer.getBoundingClientRect();
                const maxScroll = rect.height - window.innerHeight;
                let progress = -rect.top / maxScroll;
                
                if (progress < 0) progress = 0;
                if (progress > 1) progress = 1;
                
                const translateY = progress * 1600; // 5 items total -> 4 steps -> 1600px
                
                yearTrack.style.transform = `translateY(-${translateY}px)`;
                contentTrack.style.transform = `translateY(-${translateY}px)`;
                if (titleTrack) {
                    titleTrack.style.transform = `translateY(-${translateY * 0.1}px)`;
                }
                
                const textBlocks = contentTrack.querySelectorAll('.flex.flex-col.justify-center.w-full');
                const activeIndex = Math.round(progress * 4); // 0 to 4
                textBlocks.forEach((block, idx) => {
                    if (idx === activeIndex) {
                        block.style.opacity = '1';
                    } else {
                        block.style.opacity = '0';
                    }
                });
            };
            
            window.addEventListener('scroll', handleMilestoneScroll);
            handleMilestoneScroll(); // init
        }
    }

    // 6. Services Slider (services.html)
    const slideButtons = document.querySelectorAll('button[aria-label^="Go to slide"]');
    const slideTrack = document.querySelector('.flex.flex-col.w-full.h-full.transition-transform');
    if (slideButtons.length > 0 && slideTrack) {
        let currentSlide = 0;
        const goToSlide = (idx) => {
            currentSlide = idx;
            slideTrack.style.transform = `translateY(-${idx * 100}%)`;
            
            slideButtons.forEach((b, i) => {
                const outerRing = b.children[0];
                const innerDot = b.children[1];
                if (i === idx) {
                    outerRing.classList.remove('scale-0', 'opacity-0');
                    outerRing.classList.add('scale-100', 'opacity-100');
                    
                    innerDot.classList.remove('bg-white/20', 'hover:bg-white/50');
                    innerDot.classList.add('bg-[#FFC700]', 'shadow-[0_0_10px_#FFC700]');
                } else {
                    outerRing.classList.add('scale-0', 'opacity-0');
                    outerRing.classList.remove('scale-100', 'opacity-100');
                    
                    innerDot.classList.add('bg-white/20', 'hover:bg-white/50');
                    innerDot.classList.remove('bg-[#FFC700]', 'shadow-[0_0_10px_#FFC700]');
                }
            });
        };

        slideButtons.forEach((btn, idx) => {
            btn.addEventListener('click', () => {
                goToSlide(idx);
            });
        });
        
        setInterval(() => {
            goToSlide((currentSlide + 1) % slideButtons.length);
        }, 5000);
    }
    
    // 7. Drag to scroll functionality
    const sliders = document.querySelectorAll('.cursor-grab');
    sliders.forEach(slider => {
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('cursor-grabbing');
            slider.classList.remove('cursor-grab');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            slider.style.scrollSnapType = 'none';
        });
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.add('cursor-grab');
            slider.classList.remove('cursor-grabbing');
            slider.style.scrollSnapType = '';
        });
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.add('cursor-grab');
            slider.classList.remove('cursor-grabbing');
            slider.style.scrollSnapType = '';
        });
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    });

    // 8. Typing Animation for Home Page
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        const phrases = [
            "Custom Software",
            "Scalable Tech Teams",
            "Digital Transformation",
            "Cloud & Infrastructure",
            "Data Analytics"
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        const type = () => {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typingText.innerText = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.innerText = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentPhrase.length) {
                typeSpeed = 2000; // Pause at the end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500; // Pause before start typing next phrase
            }
            
            setTimeout(type, typeSpeed);
        };
        
        setTimeout(type, 1000); // Initial delay
    }

    // 9. Orbit Solutions Hover Interaction (Home Page)
    const orbitSections = document.querySelectorAll('.absolute.w-\\[800px\\].h-\\[800px\\]');
    
    orbitSections.forEach(section => {
        // Elements to animate
        const orbitContainer = section.querySelector('.animate-spin-orbit');
        const uprightContainers = section.querySelectorAll('.animate-spin-upright');
        
        // Center content
        const centerText = section.querySelector('.absolute.transition-opacity.duration-700:not(.inset-2)');
        const centerImagesWrapper = section.querySelector('.absolute.inset-2.rounded-full');
        
        if (!orbitContainer || !centerText || !centerImagesWrapper) return;
        
        const images = centerImagesWrapper.querySelectorAll('img');
        const orbitItems = section.querySelectorAll('.pointer-events-auto'); // the clickable wrappers
        
        orbitItems.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                // Pause animations
                if(orbitContainer) orbitContainer.style.animationPlayState = 'paused';
                uprightContainers.forEach(c => c.style.animationPlayState = 'paused');
                
                // Toggle center content
                if (centerText) {
                    centerText.classList.remove('opacity-100');
                    centerText.classList.add('opacity-0');
                }
                
                if (centerImagesWrapper) {
                    centerImagesWrapper.classList.remove('opacity-0');
                    centerImagesWrapper.classList.add('opacity-100');
                }
                
                // Show specific image
                images.forEach((img, imgIdx) => {
                    if (imgIdx === index) {
                        img.classList.remove('opacity-0');
                        img.classList.add('opacity-100');
                    } else {
                        img.classList.remove('opacity-100');
                        img.classList.add('opacity-0');
                    }
                });
                
                // Highlight hovered item
                orbitItems.forEach((otherItem, otherIdx) => {
                    if (otherIdx === index) {
                        otherItem.classList.remove('scale-100');
                        otherItem.classList.add('scale-110');
                        otherItem.style.opacity = '1';
                    } else {
                        otherItem.style.opacity = '0.5';
                    }
                });
            });
            
            item.addEventListener('mouseleave', () => {
                // Resume animations
                if(orbitContainer) orbitContainer.style.animationPlayState = 'running';
                uprightContainers.forEach(c => c.style.animationPlayState = 'running');
                
                // Toggle center content back
                if (centerText) {
                    centerText.classList.remove('opacity-0');
                    centerText.classList.add('opacity-100');
                }
                
                if (centerImagesWrapper) {
                    centerImagesWrapper.classList.remove('opacity-100');
                    centerImagesWrapper.classList.add('opacity-0');
                }
                
                // Hide all images
                images.forEach(img => {
                    img.classList.remove('opacity-100');
                    img.classList.add('opacity-0');
                });
                
                // Reset items
                orbitItems.forEach(otherItem => {
                    otherItem.classList.remove('scale-110');
                    otherItem.classList.add('scale-100');
                    otherItem.style.opacity = '1';
                });
            });
        });
    });

    // 7. FAQ Accordion
    const faqButtons = document.querySelectorAll('button.w-full.text-left.flex.justify-between.items-center');
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const answerContainer = button.nextElementSibling;
            const icon = button.querySelector('svg');
            const spanText = button.querySelector('span');

            // Close all other FAQs first (Optional but good UX)
            faqButtons.forEach(otherBtn => {
                if (otherBtn !== button) {
                    const otherAnswer = otherBtn.nextElementSibling;
                    const otherIcon = otherBtn.querySelector('svg');
                    const otherText = otherBtn.querySelector('span');
                    if (otherAnswer && otherAnswer.classList.contains('grid-rows-[1fr]')) {
                        otherAnswer.classList.remove('grid-rows-[1fr]', 'opacity-100');
                        otherAnswer.classList.add('grid-rows-[0fr]', 'opacity-0');
                        if (otherIcon) {
                            otherIcon.classList.remove('rotate-180');
                            otherIcon.classList.add('rotate-0');
                        }
                        if (otherText) {
                            otherText.classList.remove('text-[#FFC700]');
                            otherText.classList.add('text-white');
                        }
                    }
                }
            });

            if (answerContainer && answerContainer.classList.contains('grid')) {
                const isOpen = answerContainer.classList.contains('grid-rows-[1fr]');
                
                if (isOpen) {
                    answerContainer.classList.remove('grid-rows-[1fr]', 'opacity-100');
                    answerContainer.classList.add('grid-rows-[0fr]', 'opacity-0');
                    if (icon) {
                        icon.classList.remove('rotate-180');
                        icon.classList.add('rotate-0');
                    }
                    if (spanText) {
                        spanText.classList.remove('text-[#FFC700]');
                        spanText.classList.add('text-white');
                    }
                } else {
                    answerContainer.classList.remove('grid-rows-[0fr]', 'opacity-0');
                    answerContainer.classList.add('grid-rows-[1fr]', 'opacity-100');
                    if (icon) {
                        icon.classList.remove('rotate-0');
                        icon.classList.add('rotate-180');
                    }
                    if (spanText) {
                        spanText.classList.remove('text-white');
                        spanText.classList.add('text-[#FFC700]');
                    }
                }
            }
        });
    });

    // 8. Table of Contents Active State
    const tocLinks = document.querySelectorAll('aside nav a');
    
    if (tocLinks.length > 0) {
        const sections = Array.from(tocLinks).map(link => {
            const href = link.getAttribute('href');
            if (href && href.includes('#')) {
                const id = href.split('#')[1];
                return document.getElementById(id);
            }
            return null;
        }).filter(section => section !== null);

        if (sections.length > 0) {
            
            // Foolproof Scroll Spy Logic
            const updateActiveToc = () => {
                let currentId = '';
                
                // Find the active section by checking rect.top
                for (let i = sections.length - 1; i >= 0; i--) {
                    const rect = sections[i].getBoundingClientRect();
                    // If section is above or near the middle of the viewport
                    if (rect.top <= 350) {
                        currentId = sections[i].getAttribute('id');
                        break;
                    }
                }
                
                // Fallback to first section
                if (!currentId && sections.length > 0) {
                    currentId = sections[0].getAttribute('id');
                }

                if (currentId) {
                    tocLinks.forEach(link => {
                        const linkHref = link.getAttribute('href');
                        if (linkHref && linkHref.includes('#' + currentId)) {
                            link.className = 'text-sm transition-colors duration-300 text-[#FFC700] font-semibold';
                        } else {
                            link.className = 'text-sm transition-colors duration-300 text-gray-400 hover:text-white';
                        }
                    });
                }
            };

            window.addEventListener('scroll', updateActiveToc);
            // Call once on load to set initial state
            updateActiveToc();

            // Optional: Smooth scroll for TOC clicks
            tocLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
                    if (href && href.includes('#')) {
                        const id = href.split('#')[1];
                        const linkPath = href.split('#')[0];
                        const currentPath = window.location.pathname;
                        
                        // Prevent default if it's pointing to the same page
                        if (linkPath === '' || currentPath.endsWith(linkPath)) {
                            const targetElement = document.getElementById(id);
                            if (targetElement) {
                                e.preventDefault();
                                // Account for sticky header
                                const headerOffset = 100;
                                const elementPosition = targetElement.getBoundingClientRect().top;
                                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                                
                                window.scrollTo({
                                    top: offsetPosition,
                                    behavior: 'smooth'
                                });
                            }
                        }
                    }
                });
            });
        }
    }

});
