document.addEventListener('DOMContentLoaded', function() {
    // Voice cards container
    const voiceContainer = document.querySelector('.flex.justify-center');
    const voices = Array.from(voiceContainer.children);
    
    // Navigation buttons
    const prevButton = document.querySelector('.fas.fa-chevron-left').parentElement;
    const nextButton = document.querySelector('.fas.fa-chevron-right').parentElement;
    
    // Play buttons
    const playButtons = document.querySelectorAll('.fa-play');
    
    // Handle play button clicks
    playButtons.forEach(button => {
        button.parentElement.addEventListener('click', function() {
            // Here would be the actual audio playback logic
            console.log('Playing voice sample...');
        });
    });
    
    // Handle navigation clicks
    let currentPosition = 0;
    
    prevButton.addEventListener('click', () => {
        if (currentPosition > 0) {
            currentPosition--;
            updateCarousel();
        }
    });
    
    nextButton.addEventListener('click', () => {
        if (currentPosition < voices.length - 4) {
            currentPosition++;
            updateCarousel();
        }
    });
    
    function updateCarousel() {
        const offset = -currentPosition * (128 + 32); // card width + gap
        voiceContainer.style.transform = `translateX(${offset}px)`;
    }
    
    // Add smooth transition to the container
    voiceContainer.style.transition = 'transform 0.3s ease-in-out';
    
    // Handle language selector
    const languageSelect = document.querySelector('select');
    languageSelect.addEventListener('change', function() {
        console.log('Selected language:', this.value);
    });
    
    // Handle next button
    const nextPageButton = document.querySelector('.bg-\\[\\#0088ff\\]');
    nextPageButton.addEventListener('click', function() {
        console.log('Proceeding to next step...');
    });
});
