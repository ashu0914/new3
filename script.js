document.addEventListener("DOMContentLoaded", () => {
    // DOM Node Elements References
    const enterBtn = document.getElementById("enter-btn");
    const introOverlay = document.getElementById("intro-overlay");
    const mainContent = document.getElementById("main-content");
    const bgMusic = document.getElementById("bg-music");
    const muteBtn = document.getElementById("mute-btn");
    
    const mascotContainer = document.getElementById("cartoon-container");
    const mascotSvg = document.getElementById("mascot-svg");
    const speechBubble = document.getElementById("speech-bubble");
    const mouthPath = document.getElementById("mouth");

    // Dynamic SVG Morphing paths for cartoon expressions
    const expressions = {
        happy: "M44,54 Q50,62 56,54",
        shy: "M44,56 Q50,56 56,56",
        excited: "M42,52 Q50,66 58,52 Z",
        love: "M43,53 Q50,64 57,53"
    };

    // Centralized safe expression switching state manager
    function changeMascotVibe(expressionType, messageText) {
        if (!mouthPath || !speechBubble || !mascotContainer) return; 
        
        if (expressions[expressionType]) {
            mouthPath.setAttribute("d", expressions[expressionType]);
        }
        
        speechBubble.innerText = messageText;
        speechBubble.classList.add("show-bubble");
        
        if (expressionType === 'shy' || expressionType === 'love') {
            mascotContainer.classList.add("shy-state");
        } else {
            mascotContainer.classList.remove("shy-state");
        }
    }

    // Interactive Core Entrance Transition Handler
    if (enterBtn && introOverlay && mainContent) {
        enterBtn.addEventListener("click", () => {
            if (bgMusic) {
                bgMusic.play().catch(err => console.log("Audio contextual lock bypass running:", err));
            }

            introOverlay.style.opacity = "0";
            
            setTimeout(() => {
                introOverlay.style.display = "none";
                mainContent.classList.remove("hidden");
                mainContent.classList.add("visible");
                
                if (mascotContainer) {
                    mascotContainer.classList.remove("hidden-mascot");
                    mascotContainer.classList.add("visible-mascot");
                    
                    setTimeout(() => {
                        changeMascotVibe("happy", "Look down, Jaya! ✨");
                    }, 1000);
                }

                // Initialize the direct viewport listener animations 
                initScrollObserver();
            }, 1000);
        });
    }

    // Direct Click interaction handler for Mascot
    if (mascotSvg) {
        mascotSvg.addEventListener("click", () => {
            changeMascotVibe("excited", "You are magical! ❤️");
            setTimeout(() => {
                changeMascotVibe("happy", "Hehe 🌸");
            }, 3000);
        });
    }

    // Scroll Position Listener to alter Mascot's responses
    window.addEventListener("scroll", () => {
        let scrollPos = window.scrollY;
        
        if (scrollPos > 250 && scrollPos < 1100) {
            changeMascotVibe("shy", "Stunning... 😍");
        } else if (scrollPos >= 1100) {
            changeMascotVibe("love", "Made for you! ❤️");
        } else if (scrollPos <= 250) {
            changeMascotVibe("happy", "Keep reading... ✨");
        }
    });

    // Integrated Media Stream Mute Control Architecture
    if (muteBtn && bgMusic) {
        muteBtn.addEventListener("click", () => {
            if (bgMusic.muted) {
                bgMusic.muted = false;
                muteBtn.innerText = "🔊 Pause Melody";
            } else {
                bgMusic.muted = true;
                muteBtn.innerText = "🔇 Play Melody";
            }
        });
    }

    // NATIVE INTERSECTION OBSERVER (Replaces external ScrollReveal script to guarantee safety)
    function initScrollObserver() {
        const revealElements = document.querySelectorAll('.reveal-element');
        
        const observerOptions = {
            root: null,
            threshold: 0.15, // Triggers when 15% of the element is inside viewport screen window
            rootMargin: "0px"
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Stops tracking once displayed to optimize performance
                }
            });
        }, observerOptions);

        revealElements.forEach(element => {
            observer.observe(element);
        });
    }
});