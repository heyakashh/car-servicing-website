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
