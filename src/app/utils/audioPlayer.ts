// Audio-Player
export function playAudio(hebrewText: string, audioPath?: string): void {
  console.log("🔊 Audio wird abgespielt:", hebrewText);
  if (audioPath) {
    try {
      const audio = new Audio(audioPath);
      audio.play().catch((error) => {
        console.warn("Audio-Datei konnte nicht abgespielt werden:", error);
        playTextToSpeech(hebrewText);
      });
    } catch (error) {
      console.warn("Fehler beim Laden der Audio-Datei:", error);
      playTextToSpeech(hebrewText);
    }
  } else {
    playTextToSpeech(hebrewText);
  }
}

function cleanHebrewText(text: string): string {
  return text
    .replace(/[\u200E\u200F\u202A-\u202E]/g, '')  // RTL-Markierungen
    .replace(/[?!.,;:"'׳״،؛]/g, '')               // Satzzeichen
    .replace(/[\/־–—]/g, ' ')                      // Slash / Bindestriche
    .replace(/\s+/g, ' ')
    .trim();
}

function playTextToSpeech(text: string): void {
  if (!('speechSynthesis' in window)) {
    console.log("Text-to-Speech wird von diesem Browser nicht unterstützt");
    return;
  }

  const cleanText = cleanHebrewText(text);
  console.log("ORIGINAL:", text);
  console.log("CLEAN:", cleanText);

  window.speechSynthesis.cancel();

  setTimeout(() => {
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'he-IL';
    utterance.rate = 0.8;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onstart = () => console.log("✅ TTS gestartet");
    utterance.onend = () => console.log("✅ TTS beendet");
    utterance.onerror = (event) => {
      if (event.error !== 'interrupted' && event.error !== 'canceled') {
        console.log("ℹ️ TTS Fehler:", event.error);
      }
    };

    const voices = window.speechSynthesis.getVoices();
    const hebrewVoice = voices.find(
      (voice) => voice.lang === 'he-IL' || voice.lang === 'he' || voice.lang.startsWith('he')
    );

    if (hebrewVoice) {
      console.log("✅ Hebräische Stimme gefunden:", hebrewVoice.name);
      utterance.voice = hebrewVoice;
    } else {
      console.log("ℹ️ Keine hebräische Stimme gefunden");
    }

    window.speechSynthesis.speak(utterance);
  }, 100);
}

// Stimmen vorladen
if ('speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}
