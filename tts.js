
const textInput = document.getElementById("text-input");
const voiceSelect = document.getElementById("voice-select");
const rateInput = document.getElementById("rate");
const rateValue = document.getElementById("rate-value");
const pitchInput = document.getElementById("pitch");
const pitchValue = document.getElementById("pitch-value");
let speechSynthesisUtterance = new SpeechSynthesisUtterance();
let voices = [];
function populateVoiceList() {
    voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = '';
    voices.forEach((voice) => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        if (voice.default) {
            option.textContent += ' -- DEFAULT';
        }

        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
}

speechSynthesis.onvoiceschanged = populateVoiceList;

function speakText() {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel(); 
    }

    if (textInput.value !== '') {
    
        speechSynthesisUtterance.text = textInput.value;

        const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
        speechSynthesisUtterance.voice = voices.find((voice) => voice.name === selectedOption);

        
        speechSynthesisUtterance.rate = rateInput.value;
        speechSynthesisUtterance.pitch = pitchInput.value;

        
        speechSynthesis.speak(speechSynthesisUtterance);
    }
}


function stopSpeaking() {
    speechSynthesis.cancel();
}

rateInput.addEventListener('input', () => {
    rateValue.textContent = rateInput.value;
});

pitchInput.addEventListener('input', () => {
    pitchValue.textContent = pitchInput.value;
});
