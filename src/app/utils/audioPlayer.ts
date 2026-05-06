// Audio-Player 

export function playAudio(hebrewText: string, audioPath?: string): void {
  console.log("🔊 Audio wird abgespielt:", hebrewText);

  if (audioPath) {
    // Option 1: Eigene Audio-Datei abspielen
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
    // Option 2: Text-to-Speech
    playTextToSpeech(hebrewText);
  }
}
function playTextToSpeech(text: string): void {
  console.log("🗣️ Browser-TTS wird verwendet für:", text);

  if (!('speechSynthesis' in window)) {
    console.log("Text-to-Speech wird von diesem Browser nicht unterstützt");
    return;
  }

  // Vorherige Wiedergabe stoppen
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  // Hebräisch
  utterance.lang = 'he-IL';

  utterance.rate = 0.8;
  utterance.pitch = 1;
  utterance.volume = 1;

  // Stimmen laden
  const voices = window.speechSynthesis.getVoices();

  console.log("Verfügbare Stimmen:", voices);

  // Hebräische Stimme suchen
  const hebrewVoice = voices.find(
    (voice) =>
      voice.lang === 'he-IL' ||
      voice.lang === 'he' ||
      voice.lang.startsWith('he')
  );

  if (hebrewVoice) {
    console.log("Hebräische Stimme gefunden:", hebrewVoice.name);
    utterance.voice = hebrewVoice;
  } else {
    console.log("Keine hebräische Stimme gefunden");
  }

  utterance.onerror = (event) => {
    console.log("TTS Fehler:", event.error);
  };

  window.speechSynthesis.speak(utterance);
}
function playBrowserTTS(text: string): void {
  console.log("🗣️ Browser-TTS wird verwendet für:", text);

  if (!('speechSynthesis' in window)) {
    console.log("ℹ️ Text-to-Speech wird von diesem Browser nicht unterstützt");
    return;
  }

  // Vorherige Wiedergabe stoppen
  window.speechSynthesis.cancel();

  // Kleine Verzögerung für bessere Kompatibilität
  setTimeout(() => {
    const utterance = new SpeechSynthesisUtterance(text);

    // Hebräische Sprache einstellen
    utterance.lang = 'he-IL';
    utterance.rate = 0.75;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Event-Listener - nur wichtige Events loggen
    utterance.onstart = () => {
      console.log("✅ Browser-TTS gestartet");
    };

    utterance.onend = () => {
      console.log("✅ Browser-TTS beendet");
    };

    // Fehlerbehandlung ohne störende Logs
    utterance.onerror = (event) => {
      // Nur loggen wenn es ein echter Fehler ist (nicht "interrupted" oder "canceled")
      if (event.error !== 'interrupted' && event.error !== 'canceled') {
        console.log("ℹ️ Browser-TTS Info:", event.error);
      }
    };

    // Stimmen laden
    const voices = window.speechSynthesis.getVoices();

    // Hebräische Stimme finden
    const hebrewVoice = voices.find(voice =>
      voice.lang === 'he-IL' || voice.lang === 'he' || voice.lang.startsWith('he')
    );

    if (hebrewVoice) {
      console.log("✅ Hebräische Stimme gefunden:", hebrewVoice.name);
      utterance.voice = hebrewVoice;
    } else {
      console.log("ℹ️ Keine hebräische Stimme - verwende Standard-Stimme");
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
