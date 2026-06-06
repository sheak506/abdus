// Global JavaScript for GreenHarvest Farm Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeForms();
    initializeModals();
    initializeAnimations();
    initializeUtilities();
});

// Navigation functionality
function initializeNavigation() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active navigation highlighting
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(40, 167, 69, 0.95)';
        } else {
            navbar.style.backgroundColor = '';
        }
    });
}

// Form handling and validation
function initializeForms() {
    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateContactForm()) {
                showSuccessMessage('Message sent successfully! We will respond within 24 hours.');
                contactForm.reset();
                contactForm.classList.remove('was-validated');
            }
        });
    }

    // Real-time validation
    addRealTimeValidation();
}

// Contact form validation
function validateContactForm() {
    const form = document.getElementById('contactForm');
    const isValid = form.checkValidity();
    
    // Custom validation for phone number (optional)
    const phone = document.getElementById('contactPhone');
    const phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
    if (phone && phone.value && !phonePattern.test(phone.value)) {
        phone.setCustomValidity('Please enter a valid phone number');
        phone.classList.add('is-invalid');
    } else if (phone) {
        phone.setCustomValidity('');
        phone.classList.remove('is-invalid');
    }

    form.classList.add('was-validated');
    return isValid && form.checkValidity();
}

// Real-time validation
function addRealTimeValidation() {
    // Email validation
    document.querySelectorAll('input[type="email"]').forEach(input => {
        input.addEventListener('blur', function() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailPattern.test(this.value)) {
                this.setCustomValidity('Please enter a valid email address');
                this.classList.add('is-invalid');
            } else {
                this.setCustomValidity('');
                this.classList.remove('is-invalid');
                if (this.value) this.classList.add('is-valid');
            }
        });
    });

    // Required field validation
    document.querySelectorAll('input[required], select[required], textarea[required]').forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.classList.add('is-invalid');
            } else {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            }
        });
    });
}

// Modal functionality
function initializeModals() {
    // Crop details modal
    window.showCropDetails = function(cropName) {
        const modalTitle = document.getElementById('modalTitle');
        const modalContent = document.getElementById('modalContent');
        
        if (modalTitle && modalContent) {
            modalTitle.textContent = cropName + ' - Care Tips';
            modalContent.innerHTML = getCropDetails(cropName);
        }
    };
}

// Get crop details for modal
function getCropDetails(cropName) {
    const cropDetails = {
        'Tomatoes': {
            description: 'Premium tomatoes require careful attention to soil, water, and pest management for optimal yield.',
            careTips: [
                'Plant in well-drained soil with pH 6.0-6.8',
                'Provide consistent moisture, avoid overwatering',
                'Use mulch to retain moisture and prevent weeds',
                'Support plants with stakes or cages',
                'Monitor for common pests like hornworms and aphids',
                'Harvest when fruits are fully colored but still firm'
            ],
            commonProblems: [
                'Blossom end rot - caused by calcium deficiency or inconsistent watering',
                'Cracking - due to irregular watering patterns',
                'Late blight - fungal disease in humid conditions'
            ]
        },
        'Sweet Corn': {
            description: 'Sweet corn thrives in warm weather with adequate spacing and proper fertilization.',
            careTips: [
                'Plant in blocks rather than single rows for better pollination',
                'Ensure soil temperature is at least 60°F before planting',
                'Apply nitrogen fertilizer when plants are 8 inches tall',
                'Water deeply once or twice per week',
                'Watch for corn earworm and apply appropriate controls',
                'Harvest when kernels are milky and silk is brown'
            ],
            commonProblems: [
                'Poor pollination - plant in blocks for wind pollination',
                'Corn earworm - use Bt spray or beneficial insects',
                'Nutrient deficiency - corn is a heavy feeder requiring regular fertilization'
            ]
        },
        'Winter Wheat': {
            description: 'Winter wheat is planted in fall and harvested in summer, requiring cold vernalization.',
            careTips: [
                'Plant 6-8 weeks before hard frost',
                'Ensure good seed-to-soil contact',
                'Apply phosphorus at planting time',
                'Monitor for Hessian fly and other pests',
                'Apply nitrogen in early spring',
                'Harvest when moisture content is 13-14%'
            ],
            commonProblems: [
                'Winter kill - ensure proper variety selection for your zone',
                'Rust diseases - use resistant varieties and fungicides if needed',
                'Lodging - avoid over-fertilization with nitrogen'
            ]
        },
        'Soybeans': {
            description: 'Soybeans are nitrogen-fixing legumes that improve soil health while producing protein-rich crops.',
            careTips: [
                'Inoculate seeds with rhizobia bacteria',
                'Plant when soil temperature reaches 60°F',
                'Maintain soil pH between 6.0-7.0',
                'Avoid cultivation after flowering begins',
                'Monitor for soybean aphids and spider mites',
                'Harvest when pods rattle and moisture is 13-15%'
            ],
            commonProblems: [
                'Poor nodulation - ensure proper inoculation',
                'Soybean cyst nematode - use resistant varieties',
                'White mold - ensure good air circulation and avoid overhead irrigation'
            ]
        },
        'Carrots': {
            description: 'Carrots require deep, loose soil and consistent moisture for straight, healthy root development.',
            careTips: [
                'Prepare deep, stone-free soil to 12 inches',
                'Sow seeds directly, thin to 2 inches apart',
                'Keep soil consistently moist during germination',
                'Use row covers to protect from carrot fly',
                'Hill soil around shoulders to prevent greening',
                'Harvest before roots become woody'
            ],
            commonProblems: [
                'Forked roots - caused by stones or hard soil',
                'Carrot fly - use row covers or companion planting',
                'Green shoulders - hill soil around exposed roots'
            ]
        },
        'Potatoes': {
            description: 'Potatoes grow best in cool weather with well-drained soil and proper hilling techniques.',
            careTips: [
                'Plant certified seed potatoes in early spring',
                'Hill soil around plants as they grow',
                'Water regularly but avoid overwatering',
                'Monitor for Colorado potato beetle',
                'Stop watering 2 weeks before harvest',
                'Cure potatoes in dark, ventilated area before storage'
            ],
            commonProblems: [
                'Late blight - ensure good air circulation and avoid overhead watering',
                'Colorado potato beetle - hand pick or use organic controls',
                'Scab - maintain soil pH below 5.5 and avoid fresh manure'
            ]
        }
    };

    const crop = cropDetails[cropName];
    if (!crop) return '<p>Crop details not available.</p>';

    return `
        <div class="crop-details">
            <p class="lead">${crop.description}</p>
            
            <h6><i class="fas fa-leaf text-success me-2"></i>Care Tips</h6>
            <ul class="list-unstyled">
                ${crop.careTips.map(tip => `<li class="mb-2"><i class="fas fa-check text-success me-2"></i>${tip}</li>`).join('')}
            </ul>

            <h6><i class="fas fa-exclamation-triangle text-warning me-2"></i>Common Problems</h6>
            <ul class="list-unstyled">
                ${crop.commonProblems.map(problem => `<li class="mb-2"><i class="fas fa-info-circle text-info me-2"></i>${problem}</li>`).join('')}
            </ul>

            <div class="alert alert-success">
                <h6><i class="fas fa-lightbulb me-2"></i>Pro Tip</h6>
                <p class="mb-0">For best results, always test your soil before planting and adjust pH and nutrients accordingly. Regular monitoring and preventive care are key to successful farming.</p>
            </div>
        </div>
    `;
}

// Animation functionality
function initializeAnimations() {
    // Intersection Observer for fade-in animations
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

    // Observe elements for animation
    document.querySelectorAll('.card, .category-card, .contact-card, .guide-category').forEach(el => {
        observer.observe(el);
    });

    // Counter animation for statistics
    animateCounters();
}

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.display-4');
    const speed = 200;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
            const count = parseInt(counter.getAttribute('data-count') || '0');
            const increment = target / speed;

            if (count < target) {
                counter.setAttribute('data-count', Math.ceil(count + increment));
                counter.textContent = counter.textContent.replace(/\d+/, Math.ceil(count + increment));
                setTimeout(updateCount, 1);
            } else {
                counter.textContent = counter.textContent.replace(/\d+/, target);
            }
        };

        // Start animation when element is visible
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCount();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(counter);
    });
}

// Utility functions
function initializeUtilities() {
    // Back to top button
    createBackToTopButton();

    // Loading states for forms
    addLoadingStates();

    // Initialize tooltips if Bootstrap is available
    if (typeof bootstrap !== 'undefined') {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
}

// Success message display
function showSuccessMessage(message) {
    // Create success alert
    const alert = document.createElement('div');
    alert.className = 'alert alert-success alert-dismissible fade show position-fixed';
    alert.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
    alert.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(alert);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 5000);
}

// Error message display
function showErrorMessage(message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-danger alert-dismissible fade show position-fixed';
    alert.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
    alert.innerHTML = `
        <i class="fas fa-exclamation-circle me-2"></i>${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(alert);

    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 5000);
}

// Back to top button
function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'btn btn-success position-fixed';
    backToTop.style.cssText = 'bottom: 20px; right: 20px; z-index: 9999; border-radius: 50%; width: 50px; height: 50px; display: none;';
    backToTop.title = 'Back to Top';

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.body.appendChild(backToTop);

    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });
}

// Loading states for forms
function addLoadingStates() {
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function() {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing...';
                submitBtn.disabled = true;

                // Reset button after 3 seconds (simulated processing time)
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    });
}

// Crop filtering functionality
function filterCrops(category) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const badge = card.querySelector('.badge');
        if (category === 'all' || (badge && badge.textContent.toLowerCase().includes(category.toLowerCase()))) {
            card.parentElement.style.display = 'block';
        } else {
            card.parentElement.style.display = 'none';
        }
    });
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const cards = document.querySelectorAll('.card');
            
            cards.forEach(card => {
                const title = card.querySelector('.card-title');
                const text = card.querySelector('.card-text');
                const content = (title ? title.textContent : '') + (text ? text.textContent : '');
                
                if (content.toLowerCase().includes(searchTerm)) {
                    card.parentElement.style.display = 'block';
                } else {
                    card.parentElement.style.display = 'none';
                }
            });
        });
    }
}

// Weather widget (placeholder)
function initializeWeatherWidget() {
    // This would integrate with a weather API in a real application
    const weatherWidget = document.getElementById('weatherWidget');
    if (weatherWidget) {
        // Placeholder weather data
        weatherWidget.innerHTML = `
            <div class="weather-info">
                <h6><i class="fas fa-sun text-warning me-2"></i>Today's Weather</h6>
                <p class="mb-1">Temperature: 75°F</p>
                <p class="mb-1">Humidity: 65%</p>
                <p class="mb-0">Conditions: Partly Cloudy</p>
            </div>
        `;
    }
}

// Seasonal tips
function displaySeasonalTips() {
    const currentMonth = new Date().getMonth();
    const seasonalTips = {
        0: "January: Plan your crop rotation and order seeds for the upcoming season.",
        1: "February: Start seeds indoors for warm-season crops and prepare greenhouse.",
        2: "March: Begin soil preparation and plant cool-season crops outdoors.",
        3: "April: Plant warm-season crops and continue with spring maintenance.",
        4: "May: Focus on pest monitoring and ensure adequate irrigation systems.",
        5: "June: Summer crops are growing - maintain consistent watering and fertilization.",
        6: "July: Harvest early crops and plant fall vegetables.",
        7: "August: Continue harvesting and prepare for fall planting.",
        8: "September: Plant cover crops and begin fall harvest activities.",
        9: "October: Harvest root vegetables and prepare fields for winter.",
        10: "November: Complete harvest and begin winter preparation tasks.",
        11: "December: Plan for next year and maintain equipment during off-season."
    };

    const tipElement = document.getElementById('seasonalTip');
    if (tipElement) {
        tipElement.textContent = seasonalTips[currentMonth];
    }
}

// Initialize page-specific features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize search if on crops page
    if (window.location.pathname.includes('crops.html')) {
        initializeSearch();
    }

    // Initialize weather widget if present
    initializeWeatherWidget();

    // Display seasonal tips
    displaySeasonalTips();
});

// Performance optimization
function optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.onscroll = function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            if (originalScrollHandler) {
                originalScrollHandler();
            }
        }, 16); // ~60fps
    };
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    optimizePerformance();
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Could send error to logging service in production
});

// Accessibility enhancements
function enhanceAccessibility() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'visually-hidden-focusable btn btn-success position-absolute';
    skipLink.style.top = '10px';
    skipLink.style.left = '10px';
    skipLink.style.zIndex = '10000';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add main content landmark
    const mainContent = document.querySelector('main') || document.querySelector('.container').parentElement;
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
    }
}

// Initialize accessibility enhancements
document.addEventListener('DOMContentLoaded', enhanceAccessibility);