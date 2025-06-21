// Your script here.
document.addEventListener('DOMContentLoaded', function() {
  const msg = new SpeechSynthesisUtterance();
  let voices = [];
  const voicesDropdown = document.querySelector('[name="voice"]');
  const options = document.querySelectorAll('[type="range"], [name="text"]');
  const speakButton = document.querySelector('#speak');
  const stopButton = document.querySelector('#stop');
  const textarea = document.querySelector('[name="text"]');

  // Set default text
  msg.text = textarea.value;

  // Populate voices dropdown
  function populateVoices() {
    voices = speechSynthesis.getVoices();
    voicesDropdown.innerHTML = voices
      .filter(voice => voice.lang.includes('en'))
      .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
      .join('');
  }

  // Set the selected voice
  function setVoice() {
    const selectedVoice = voices.find(voice => voice.name === this.value);
    msg.voice = selectedVoice;
    toggle();
  }

  // Toggle speech (stop and start)
  function toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
      msg.text = textarea.value;
      speechSynthesis.speak(msg);
    }
  }

  // Set option for rate and pitch
  function setOption() {
    msg[this.name] = this.value;
    toggle();
  }

  // Event Listeners
  speechSynthesis.addEventListener('voiceschanged', populateVoices);
  voicesDropdown.addEventListener('change', setVoice);
  options.forEach(option => option.addEventListener('change', setOption));
  speakButton.addEventListener('click', () => toggle(true));
  stopButton.addEventListener('click', () => toggle(false));

  // Initialize voices
  populateVoices();
});