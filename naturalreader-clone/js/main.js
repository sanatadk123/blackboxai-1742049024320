document.addEventListener('DOMContentLoaded', function() {
    // Voice cards
    const voiceCards = document.querySelectorAll('.voice-card') || [];
    let selectedVoice = null;

    // Select voice card
    voiceCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove selection from other cards
            voiceCards.forEach(c => c.classList.remove('ring-2', 'ring-blue-500'));
            // Add selection to clicked card
            this.classList.add('ring-2', 'ring-blue-500');
            selectedVoice = this;
        });
    });

    // Text input area
    const textArea = document.querySelector('textarea');
    const uploadBtn = document.querySelector('.fa-upload')?.parentElement;
    const pasteBtn = document.querySelector('.fa-paste')?.parentElement;

    // Handle file upload
    if (uploadBtn) {
        uploadBtn.addEventListener('click', function() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.txt';
            input.onchange = function(e) {
                const file = e.target.files[0];
                if (file && textArea) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        textArea.value = e.target.result;
                    };
                    reader.readAsText(file);
                }
            };
            input.click();
        });
    }

    // Handle paste
    if (pasteBtn && textArea) {
        pasteBtn.addEventListener('click', async function() {
            try {
                const text = await navigator.clipboard.readText();
                textArea.value = text;
            } catch (err) {
                console.error('Failed to read clipboard:', err);
            }
        });
    }

    // Voice settings
    const speedSlider = document.querySelector('input[type="range"]:nth-of-type(1)');
    const pitchSlider = document.querySelector('input[type="range"]:nth-of-type(2)');
    let speed = 1;
    let pitch = 1;

    if (speedSlider) {
        speedSlider.addEventListener('input', function() {
            speed = this.value / 50; // Convert to 0-2 range
        });
    }

    if (pitchSlider) {
        pitchSlider.addEventListener('input', function() {
            pitch = this.value / 50; // Convert to 0-2 range
        });
    }

    // Reset button
    const resetBtn = document.querySelector('.fa-undo')?.parentElement;
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            if (textArea) textArea.value = '';
            if (speedSlider) speedSlider.value = 50;
            if (pitchSlider) pitchSlider.value = 50;
            speed = 1;
            pitch = 1;
            voiceCards.forEach(c => c.classList.remove('ring-2', 'ring-blue-500'));
            selectedVoice = null;
        });
    }

    // Play button
    const playBtn = document.querySelector('.gradient-bg.text-white');
    if (playBtn && textArea) {
        playBtn.addEventListener('click', function() {
            if (!textArea.value.trim()) {
                alert('कृपया पाठ लेख्नुहोस्।');
                return;
            }
            if (!selectedVoice) {
                alert('कृपया आवाज छनौट गर्नुहोस्।');
                return;
            }
            
            // Here you would integrate with a TTS service
            console.log('Playing text:', {
                text: textArea.value,
                voice: selectedVoice.querySelector('h4').textContent,
                speed: speed,
                pitch: pitch
            });
        });
    }

    // Download button
    const downloadBtn = document.querySelector('.fa-download')?.parentElement;
    if (downloadBtn && textArea) {
        downloadBtn.addEventListener('click', function() {
            if (!textArea.value.trim()) {
                alert('कृपया पाठ लेख्नुहोस्।');
                return;
            }
            if (!selectedVoice) {
                alert('कृपया आवाज छनौट गर्नुहोस्।');
                return;
            }

            // Here you would implement the download functionality
            console.log('Downloading audio for:', {
                text: textArea.value,
                voice: selectedVoice.querySelector('h4').textContent,
                speed: speed,
                pitch: pitch
            });
        });
    }
});
