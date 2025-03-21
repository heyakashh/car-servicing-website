// JavaScript for interactive elements
document.addEventListener('DOMContentLoaded', () => {
    const testimonials = document.querySelectorAll('.testimonial-item');
    let currentIndex = 0;
    let autoSlideInterval;

    // Function to display the testimonial at the given index
    const showTestimonial = (index) => {
        testimonials.forEach((item, i) => {
            item.style.transform = `translateX(${(i - index) * 100}%)`;
        });
    };

    // Function to start automatic sliding
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 5000); // Change testimonial every 5 seconds
    };

    // Function to stop automatic sliding
    const stopAutoSlide = () => {
        clearInterval(autoSlideInterval);
    };

    // Initialize testimonials
    showTestimonial(currentIndex);
    startAutoSlide();

    // Pause auto-slide on hover and resume on mouse leave
    const sliderContainer = document.querySelector('.testimonial-slider');
    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);
});
// Highlight the active navigation link
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop(); // Get the current page filename
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
// Back-to-top button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    backToTopButton.style.display = window.scrollY > 200 ? 'block' : 'none';
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
// Testimonial Carousel
const testimonialCarousel = () => {
    const testimonials = document.querySelectorAll('.testimonial-item');
    let currentIndex = 0;

    const showTestimonial = (index) => {
        testimonials.forEach((item, i) => {
            item.style.display = i === index ? 'block' : 'none';
        });
    };

    const nextTestimonial = () => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    };

    // Automatically cycle testimonials every 5 seconds
    setInterval(nextTestimonial, 5000);

    // Show the first testimonial initially
    showTestimonial(currentIndex);
};

// Initialize the carousel
testimonialCarousel();
// Validate forms
const validateForm = (formId) => {
    const form = document.getElementById(formId);
    form.addEventListener('submit', (e) => {
        const inputs = form.querySelectorAll('input, textarea, select');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        });
        if (!isValid) {
            e.preventDefault();
            alert('Please fill out all required fields.');
        }
    });
};
// Initialize validation for forms
if (document.getElementById('appointmentForm')) {
    validateForm('appointmentForm');
}
if (document.getElementById('contactForm')) {
    validateForm('contactForm');
}
// Hover Effects
const hoverEffects = () => {
    const hoverElements = document.querySelectorAll('[data-hover]');
    hoverElements.forEach(element => {
        element.addEventListener('mouseover', () => {
            element.style.transform = 'scale(1.1)';
        });

        element.addEventListener('mouseout', () => {
            element.style.transform = 'scale(1)';
        });
    });
};
// Initialize hover effects
hoverEffects();
// Video Playback Control
const videoControl = () => {
    const video = document.querySelector('video');
    const playPauseBtn = document.createElement('button');
    playPauseBtn.innerHTML = 'Play';
    playPauseBtn.classList.add('btn', 'btn-light', 'mt-3');
    document.querySelector('.video-wrapper').appendChild(playPauseBtn);

    playPauseBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playPauseBtn.innerHTML = 'Pause';
        } else {
            video.pause();
            playPauseBtn.innerHTML = 'Play';
        }
    });
};
// Initialize video control
videoControl();
// Cart functionality
document.addEventListener('DOMContentLoaded', () => {
    const addButtons = document.querySelectorAll('.add-btn');
    const bookNowButtons = document.querySelectorAll('.btn-light');
    const cartCount = document.getElementById('cart-count');

    // Update cart count
    const updateCartCount = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cartCount) {
            cartCount.textContent = cart.length;
        }
    };

    // Add service to cart with debugging logs
    const addToCart = (serviceName, servicePrice) => {
        console.log("Adding item:", serviceName, servicePrice);
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (!serviceName || !servicePrice) {
            console.error("Missing name or price:", serviceName, servicePrice);
            return;
        }
        if (!cart.some(item => item.name === serviceName)) {
            cart.push({ name: serviceName, price: servicePrice });
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            alert(`${serviceName} added to cart!`);
        } else {
            alert(`${serviceName} is already in the cart.`);
        }
    };

    // Event listeners for "Add" buttons
    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            const serviceItem = button.closest('.service-item');
            if (serviceItem) {
                const serviceName = serviceItem.querySelector('.service-name')?.textContent.trim();
                const servicePrice = serviceItem.querySelector('.service-price')?.textContent.trim();
                addToCart(serviceName, servicePrice);
            } else {
                console.error("Add button is not within a .service-item element.");
            }
        });
    });

    // Event listeners for "Book Now" buttons
    bookNowButtons.forEach(button => {
        button.addEventListener('click', () => {
            const serviceItem = button.closest('.card');
            if (serviceItem) {
                const serviceName = serviceItem.querySelector('.card-title')?.textContent.trim();
                const priceText = serviceItem.querySelector('.card-text')?.textContent;
                const servicePrice = priceText ? priceText.match(/₹\d+/)[0].trim() : '';
                addToCart(serviceName, servicePrice);
            } else {
                console.error("Book Now button is not within a .card element.");
            }
        });
    });

    updateCartCount();
});
document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const checkoutButton = document.getElementById('checkout-btn');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Display cart items
    const displayCartItems = () => {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-center text-muted">Your cart is empty.</p>';
            checkoutButton.style.display = 'none';
            return;
        }

        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="d-flex justify-content-between align-items-center border-bottom py-2">
                <span>${item.name}</span>
                <span>${item.price}</span>
            </div>
        `).join('');
    };

    // Initialize cart display
    displayCartItems();

    // Checkout button functionality
    checkoutButton.addEventListener('click', () => {
        alert('Proceeding to checkout...');
        // Redirect to a checkout page or handle checkout logic
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const cartCount = document.getElementById('cart-count');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Update cart count
    const updateCartCount = () => {
        cartCount.textContent = cart.length;
    };

    // Initialize cart count
    updateCartCount();
});
document.addEventListener('DOMContentLoaded', () => {
    const cartCount = document.getElementById('cart-count');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Update cart count
    const updateCartCount = () => {
        cartCount.textContent = cart.length;
    };

    // Initialize cart count
    updateCartCount();
});
document.addEventListener('DOMContentLoaded', () => {
    // The addToCart function
    const addToCart = (serviceName, servicePrice) => {
        console.log("Adding to cart:", serviceName, servicePrice);
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (!serviceName || !servicePrice) {
            console.error("Missing name or price:", serviceName, servicePrice);
            return;
        }
        // If this item is not in the cart already, add it
        if (!cart.some(item => item.name === serviceName)) {
            cart.push({ name: serviceName, price: servicePrice });
            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${serviceName} added to cart!`);
        } else {
            alert(`${serviceName} is already in the cart.`);
        }
    };

    // Attach event listeners to ".add-btn" buttons
    const addButtons = document.querySelectorAll('.add-btn');
    addButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            let serviceName = '';
            let servicePrice = '';

            // Check if the button is within a .card (service plan or book now) or a .service-item (other service)
            const card = button.closest('.card');
            const serviceItem = button.closest('.service-item');

            if (card) {
                // For service plans, we assume the service name is in card-title and price in h4 with text "Price:"
                const titleElement = card.querySelector('.card-title');
                const priceElement = card.querySelector('h4');
                serviceName = titleElement ? titleElement.textContent.trim() : 'Unknown Service';
                servicePrice = priceElement
                    ? priceElement.textContent.replace("Price:", "").trim()
                    : '';
            } else if (serviceItem) {
                const nameElement = serviceItem.querySelector('.service-name');
                const priceElement = serviceItem.querySelector('.service-price');
                serviceName = nameElement ? nameElement.textContent.trim() : 'Unknown Service';
                servicePrice = priceElement ? priceElement.textContent.trim() : '';
            }
            console.log("Clicked Add button:", serviceName, servicePrice);
            addToCart(serviceName, servicePrice);
        });
    });

    // Attach event listeners to Book Now buttons (assumed to be links with class "btn-light" and text "Book Now")
    const bookNowButtons = document.querySelectorAll('.btn-light');
    bookNowButtons.forEach(button => {
        if (button.textContent.trim() === "Book Now") {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                let serviceName = '';
                let servicePrice = '';

                // For Book Now, get the closest card
                const card = button.closest('.card');
                if (card) {
                    const titleElement = card.querySelector('.card-title');
                    // In our example, Book Now doesn't always provide price.
                    // If available, try to extract price from a price indicator element (e.g., h4)
                    const priceElement = card.querySelector('h4');
                    serviceName = titleElement ? titleElement.textContent.trim() : 'Unknown Service';
                    servicePrice = priceElement ? priceElement.textContent.replace("Price:", "").trim() : '';
                }
                console.log("Clicked Book Now:", serviceName, servicePrice);
                addToCart(serviceName, servicePrice);
            });
        }
    });
});
// @RestController
// @RequestMapping("/api/services")
// public class ServiceController {

//     @GetMapping
//     public List<Service> getAllServices() {
//         return List.of(
//             new Service("Basic Wash", "₹500"),
//             new Service("Premium Wash", "₹1000"),
//             new Service("Elite Wash", "₹1500")
//         );
//     }
// }

// @Entity
// public class Service {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;
//     private String name;
//     private String price;

//     // Getters and setters
// }