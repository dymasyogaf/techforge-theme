/**
 * TechForge - Main Interactive Script
 * Optimized for 60fps animations, mobile accessibility, and responsive UX.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Functionality
    const menuToggleBtn = document.querySelector('button[aria-label="Toggle menu"]');
    const mobileSidebar = document.querySelector('.fixed.top-0.right-0.w-64');
    const overlay = document.querySelector('.fixed.inset-0.bg-black\\/50');

    if (menuToggleBtn && mobileSidebar && overlay) {
        let isMenuOpen = false;

        const setMenuState = (open) => {
            isMenuOpen = open;
            if (isMenuOpen) {
                mobileSidebar.classList.remove('translate-x-full');
                overlay.classList.remove('opacity-0', 'invisible');
                document.body.style.overflow = 'hidden';
            } else {
                mobileSidebar.classList.add('translate-x-full');
                overlay.classList.add('opacity-0', 'invisible');
                document.body.style.overflow = '';
            }
        };

        menuToggleBtn.addEventListener('click', () => setMenuState(!isMenuOpen));
        overlay.addEventListener('click', () => setMenuState(false));

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isMenuOpen) {
                setMenuState(false);
            }
        });

        // Close when clicking any link inside sidebar
        mobileSidebar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => setMenuState(false));
        });
    }

    // 2. Navbar Scroll Effect (Passive Listener for 60fps)
    const navbar = document.querySelector('nav');
    if (navbar) {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (window.scrollY > 40) {
                        navbar.classList.remove('bg-transparent');
                        navbar.classList.add('bg-black/90', 'backdrop-blur-md', 'border-b', 'border-white/10');
                    } else {
                        navbar.classList.add('bg-transparent');
                        navbar.classList.remove('bg-black/90', 'backdrop-blur-md', 'border-b', 'border-white/10');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    }

    // 3. Intersection Observer for Fade-Up Animations
    const fadeElements = document.querySelectorAll('.animate-fade-up, .opacity-0.will-change-transform');
    if (fadeElements.length > 0) {
        fadeElements.forEach(el => {
            el.style.opacity = '0';
            el.style.animationPlayState = 'paused';
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
        }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

        fadeElements.forEach(el => fadeObserver.observe(el));
    }

    // 4. Statistics Number Counters (Home Page)
    const statSection = document.querySelector('.grid-cols-3.md\\:grid-cols-3.lg\\:grid-cols-5');
    if (statSection) {
        const statHeaders = statSection.querySelectorAll('h3 span');
        const targets = [10, 50, 6, 6, 100];
        const suffixes = [' +', ' +', '', '', '+'];

        statHeaders.forEach((span, i) => {
            span.innerText = `0${suffixes[i] || ''}`;
        });

        const countUp = (el, target, suffix) => {
            let start = 0;
            const duration = 1800;
            const stepTime = 16;
            const totalSteps = duration / stepTime;
            const increment = target / totalSteps;

            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    el.innerText = `${target}${suffix}`;
                    clearInterval(timer);
                } else {
                    el.innerText = `${Math.floor(start)}${suffix}`;
                }
            }, stepTime);
        };

        const statObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statHeaders.forEach((span, i) => {
                        if (targets[i] !== undefined) {
                            countUp(span, targets[i], suffixes[i] || '');
                        }
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        statObserver.observe(statSection);
    }

    // 4b. Statistics Counters (About Page)
    const aboutStatSection = document.querySelector('.grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4.gap-4.md\\:gap-6');
    if (aboutStatSection) {
        const aboutStatHeaders = aboutStatSection.querySelectorAll('h4 span:first-child');
        const aboutTargets = [200, 99, 40, 70];

        const countUpAbout = (el, target) => {
            let start = 0;
            const duration = 2000;
            const stepTime = 16;
            const totalSteps = duration / stepTime;
            const increment = target / totalSteps;

            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    el.innerText = target;
                    clearInterval(timer);
                } else {
                    el.innerText = Math.floor(start);
                }
            }, stepTime);
        };

        const aboutStatObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    aboutStatHeaders.forEach((span, i) => {
                        if (aboutTargets[i] !== undefined) {
                            span.innerText = "0";
                            countUpAbout(span, aboutTargets[i]);
                        }
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        aboutStatObserver.observe(aboutStatSection);
    }

    // 5. Vertical Milestone Slider (About Page)
    const milestoneContainer = document.querySelector('.h-\\[400vh\\]');
    if (milestoneContainer) {
        const titleTrack = milestoneContainer.querySelector('.mb-12.md\\:mb-20.text-center.w-full.transition-transform');
        const yearTrack = milestoneContainer.querySelector('.overflow-hidden.md\\:overflow-visible.h-full > .transition-transform');
        const contentTrack = milestoneContainer.querySelector('.relative.w-full.text-center.md\\:text-left > .transition-transform');

        if (yearTrack && contentTrack) {
            let milestoneTicking = false;
            const handleMilestoneScroll = () => {
                if (!milestoneTicking) {
                    window.requestAnimationFrame(() => {
                        const rect = milestoneContainer.getBoundingClientRect();
                        const maxScroll = rect.height - window.innerHeight;
                        let progress = -rect.top / maxScroll;

                        if (progress < 0) progress = 0;
                        if (progress > 1) progress = 1;

                        const translateY = progress * 1600;

                        yearTrack.style.transform = `translateY(-${translateY}px)`;
                        contentTrack.style.transform = `translateY(-${translateY}px)`;
                        if (titleTrack) {
                            titleTrack.style.transform = `translateY(-${translateY * 0.1}px)`;
                        }

                        const textBlocks = contentTrack.querySelectorAll('.flex.flex-col.justify-center.w-full');
                        const activeIndex = Math.min(Math.round(progress * 4), textBlocks.length - 1);
                        textBlocks.forEach((block, idx) => {
                            block.style.opacity = (idx === activeIndex) ? '1' : '0';
                        });
                        milestoneTicking = false;
                    });
                    milestoneTicking = true;
                }
            };

            window.addEventListener('scroll', handleMilestoneScroll, { passive: true });
            handleMilestoneScroll();
        }
    }

    // 6. Services Slider (Services Page) with Auto-Play & Hover Pause
    const slideButtons = document.querySelectorAll('button[aria-label^="Go to slide"]');
    const slideTrack = document.querySelector('.flex.flex-col.w-full.h-full.transition-transform');
    if (slideButtons.length > 0 && slideTrack) {
        let currentSlide = 0;
        let slideTimer = null;

        const goToSlide = (idx) => {
            currentSlide = idx;
            slideTrack.style.transform = `translateY(-${idx * 100}%)`;

            slideButtons.forEach((b, i) => {
                const outerRing = b.children[0];
                const innerDot = b.children[1];
                if (outerRing && innerDot) {
                    if (i === idx) {
                        outerRing.classList.remove('scale-0', 'opacity-0');
                        outerRing.classList.add('scale-100', 'opacity-100');
                        innerDot.classList.remove('bg-white/20', 'hover:bg-white/50');
                        innerDot.classList.add('bg-[#0F67CF]', 'shadow-[0_0_10px_#0F67CF]');
                    } else {
                        outerRing.classList.add('scale-0', 'opacity-0');
                        outerRing.classList.remove('scale-100', 'opacity-100');
                        innerDot.classList.add('bg-white/20', 'hover:bg-white/50');
                        innerDot.classList.remove('bg-[#0F67CF]', 'shadow-[0_0_10px_#0F67CF]');
                    }
                }
            });
        };

        const startSlideTimer = () => {
            if (slideTimer) clearInterval(slideTimer);
            slideTimer = setInterval(() => {
                goToSlide((currentSlide + 1) % slideButtons.length);
            }, 5000);
        };

        const stopSlideTimer = () => {
            if (slideTimer) {
                clearInterval(slideTimer);
                slideTimer = null;
            }
        };

        slideButtons.forEach((btn, idx) => {
            btn.addEventListener('click', () => {
                goToSlide(idx);
                startSlideTimer();
            });
        });

        const sliderParent = slideTrack.closest('section') || slideTrack.parentElement;
        if (sliderParent) {
            sliderParent.addEventListener('mouseenter', stopSlideTimer);
            sliderParent.addEventListener('mouseleave', startSlideTimer);
        }

        startSlideTimer();
    }

    // 7. Drag to Scroll Functionality (Industries & Galleries)
    const sliders = document.querySelectorAll('.cursor-grab');
    sliders.forEach(slider => {
        let isDown = false;
        let startX = 0;
        let scrollLeft = 0;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('cursor-grabbing');
            slider.classList.remove('cursor-grab');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            slider.style.scrollSnapType = 'none';
        });

        const endDrag = () => {
            if (!isDown) return;
            isDown = false;
            slider.classList.add('cursor-grab');
            slider.classList.remove('cursor-grabbing');
            slider.style.scrollSnapType = '';
        };

        slider.addEventListener('mouseleave', endDrag);
        slider.addEventListener('mouseup', endDrag);

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 1.5;
            slider.scrollLeft = scrollLeft - walk;
        });
    });

    // 8. Typing Animation (Home Page Hero)
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

            let typeSpeed = isDeleting ? 40 : 80;

            if (!isDeleting && charIndex === currentPhrase.length) {
                typeSpeed = 2200;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 400;
            }

            setTimeout(type, typeSpeed);
        };

        setTimeout(type, 800);
    }

    // 9. Orbit Solutions Hover Interaction (Home Page)
    const orbitSections = document.querySelectorAll('.absolute.w-\\[800px\\].h-\\[800px\\]');
    orbitSections.forEach(section => {
        const orbitContainer = section.querySelector('.animate-spin-orbit');
        const uprightContainers = section.querySelectorAll('.animate-spin-upright');
        const centerText = section.querySelector('.absolute.transition-opacity.duration-700:not(.inset-2)');
        const centerImagesWrapper = section.querySelector('.absolute.inset-2.rounded-full');

        if (!orbitContainer || !centerText || !centerImagesWrapper) return;

        const images = centerImagesWrapper.querySelectorAll('img');
        const orbitItems = section.querySelectorAll('.pointer-events-auto');

        orbitItems.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                if (orbitContainer) orbitContainer.style.animationPlayState = 'paused';
                uprightContainers.forEach(c => c.style.animationPlayState = 'paused');

                centerText.classList.remove('opacity-100');
                centerText.classList.add('opacity-0');

                centerImagesWrapper.classList.remove('opacity-0');
                centerImagesWrapper.classList.add('opacity-100');

                images.forEach((img, imgIdx) => {
                    if (imgIdx === index) {
                        img.classList.remove('opacity-0');
                        img.classList.add('opacity-100');
                    } else {
                        img.classList.remove('opacity-100');
                        img.classList.add('opacity-0');
                    }
                });

                orbitItems.forEach((otherItem, otherIdx) => {
                    if (otherIdx === index) {
                        otherItem.classList.remove('scale-100');
                        otherItem.classList.add('scale-110');
                        otherItem.style.opacity = '1';
                    } else {
                        otherItem.style.opacity = '0.4';
                    }
                });
            });

            item.addEventListener('mouseleave', () => {
                if (orbitContainer) orbitContainer.style.animationPlayState = 'running';
                uprightContainers.forEach(c => c.style.animationPlayState = 'running');

                centerText.classList.remove('opacity-0');
                centerText.classList.add('opacity-100');

                centerImagesWrapper.classList.remove('opacity-100');
                centerImagesWrapper.classList.add('opacity-0');

                images.forEach(img => {
                    img.classList.remove('opacity-100');
                    img.classList.add('opacity-0');
                });

                orbitItems.forEach(otherItem => {
                    otherItem.classList.remove('scale-110');
                    otherItem.classList.add('scale-100');
                    otherItem.style.opacity = '1';
                });
            });
        });
    });

    // 10. FAQ Accordions (Home & Services)
    const faqButtons = document.querySelectorAll('button.w-full.text-left.flex.justify-between.items-center');
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const answerContainer = button.nextElementSibling;
            const icon = button.querySelector('svg');
            const spanText = button.querySelector('span');

            // Close others
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
                            otherText.classList.remove('text-[#0F67CF]');
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
                        spanText.classList.remove('text-[#0F67CF]');
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
                        spanText.classList.add('text-[#0F67CF]');
                    }
                }
            }
        });
    });

    // 11. Table of Contents Scrollspy & Smooth Scrolling
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
            let tocTicking = false;
            const updateActiveToc = () => {
                if (!tocTicking) {
                    window.requestAnimationFrame(() => {
                        let currentId = '';
                        for (let i = sections.length - 1; i >= 0; i--) {
                            const rect = sections[i].getBoundingClientRect();
                            if (rect.top <= 250) {
                                currentId = sections[i].getAttribute('id');
                                break;
                            }
                        }

                        if (!currentId && sections.length > 0) {
                            currentId = sections[0].getAttribute('id');
                        }

                        if (currentId) {
                            tocLinks.forEach(link => {
                                const linkHref = link.getAttribute('href');
                                if (linkHref && linkHref.includes('#' + currentId)) {
                                    link.className = 'text-sm transition-colors duration-300 text-[#0F67CF] font-semibold';
                                } else {
                                    link.className = 'text-sm transition-colors duration-300 text-gray-400 hover:text-white';
                                }
                            });
                        }
                        tocTicking = false;
                    });
                    tocTicking = true;
                }
            };

            window.addEventListener('scroll', updateActiveToc, { passive: true });
            updateActiveToc();

            tocLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
                    if (href && href.includes('#')) {
                        const id = href.split('#')[1];
                        const targetElement = document.getElementById(id);
                        if (targetElement) {
                            e.preventDefault();
                            const headerOffset = 90;
                            const elementPosition = targetElement.getBoundingClientRect().top;
                            const offsetPosition = elementPosition + window.scrollY - headerOffset;

                            window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                            });
                        }
                    }
                });
            });
        }
    }
});
