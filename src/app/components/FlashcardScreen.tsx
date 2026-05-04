import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Volume2, ArrowLeft, Flag } from "lucide-react";
import { getVocabularyModule, getBookTitle, type BookType } from "../data/vocabulary-helper";
import type { Vocabulary } from "../data/vocabulary";
import { playAudio } from "../utils/audioPlayer";
import { AudioHelper } from "./AudioHelper";

export function FlashcardScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showGerman, setShowGerman] = useState(false);
  const [vocabulary, setVocabulary] = useState<Vocabulary[]>([]);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const book = searchParams.get("book") || "part2";
  const bookTitle = getBookTitle(book as BookType);

  useEffect(() => {
    const mode = searchParams.get("mode");
    const value = searchParams.get("value");
    const vocabModule = getVocabularyModule(book as BookType);

    let filtered: Vocabulary[];

    if (mode === "lesson" && value) {
      filtered = vocabModule.filterByLesson(value);
    } else if (mode === "wordtype" && value) {
      filtered = vocabModule.filterByWordType(value);
    } else {
      filtered = book === "part1"
        ? (vocabModule as typeof import("../data/vocabulary-part1")).vocabularyDataPart1
        : (vocabModule as typeof import("../data/vocabulary")).vocabularyData;
    }

    setVocabulary(filtered);
    setCurrentIndex(0);
    setShowGerman(false);
  }, [searchParams, book]);

  const handleCardClick = () => {
    setShowGerman(!showGerman);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowGerman(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < vocabulary.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowGerman(false);
    }
  };

  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation(); // Verhindert das Umdrehen der Karte
    const vocab = vocabulary[currentIndex];

    if (showGerman) {
      // Deutsche Seite - spiele deutsches Audio
      playGermanAudio(vocab.german);
    } else {
      // Hebräische Seite - spiele hebräisches Audio
      playAudio(vocab.hebrew, vocab.audio);
    }
  };

  const playGermanAudio = (germanText: string) => {
    // Nutze ResponsiveVoice oder Browser TTS für Deutsch
    const rv = (window as any).responsiveVoice;

    if (rv && rv.voiceSupport()) {
      console.log("🎤 ResponsiveVoice wird für Deutsch verwendet");
      if (rv.isPlaying()) {
        rv.cancel();
      }
      rv.speak(germanText, "German Female", {
        rate: 0.85,
        pitch: 1,
        volume: 1
      });
    } else {
      // Fallback: Browser TTS
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();

        setTimeout(() => {
          const utterance = new SpeechSynthesisUtterance(germanText);
          utterance.lang = 'de-DE';
          utterance.rate = 0.75;
          utterance.pitch = 1.0;
          utterance.volume = 1.0;

          const voices = window.speechSynthesis.getVoices();
          const germanVoice = voices.find(voice =>
            voice.lang === 'de-DE' || voice.lang === 'de' || voice.lang.startsWith('de')
          );

          if (germanVoice) {
            utterance.voice = germanVoice;
          }

          window.speechSynthesis.speak(utterance);
        }, 100);
      }
    }
  };

  const handleReportError = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vocab = vocabulary[currentIndex];

    // Erstelle die vorbefüllte URL
    const baseUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfd0irJdHIZ-4kPUu9M1RtDHMjc8KNeN1KXygrAuWEB31SxWg/viewform';
    const params = new URLSearchParams({
      'usp': 'pp_url',
      'entry.2122403336': bookTitle, // Part
      'entry.2018732386': vocab.lesson, // Lektion
      'entry.407233407': vocab.hebrew, // Hebräisch
      'entry.1432380492': vocab.german, // Deutsch
      'entry.2002434114': vocab.wordType // Wortart
    });

    const prefillUrl = `${baseUrl}?${params.toString()}`;

    // Zeige Bestätigung
    setShowCopiedMessage(true);
    setTimeout(() => setShowCopiedMessage(false), 3000);

    // Öffne Google Form mit vorausgefüllten Feldern
    window.open(prefillUrl, '_blank');
  };

  if (vocabulary.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-8">
        <p className="text-xl text-gray-600">Keine Vokabeln gefunden</p>
        <button
          onClick={() => navigate(`/menu?book=${book}`)}
          className="mt-8 bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg"
        >
          Zurück zum Menü
        </button>
      </div>
    );
  }

  const currentVocab = vocabulary[currentIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden" style={{
      background: 'linear-gradient(to bottom, #F1F5F9 0%, #E2E8F0 100%)'
    }}>
      <AudioHelper />

      {/* Zurück-Button oben links */}
      <button
        onClick={() => navigate(`/menu?book=${book}`)}
        className="absolute top-12 left-6 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        style={{ fontSize: '0.875rem', fontWeight: 500 }}
      >
        <ArrowLeft size={18} />
        Zurück
      </button>

      <div className="mb-8 text-center">
        <h2 className="mb-1" style={{ fontSize: '1.5rem', fontWeight: 600, color: '#1E3A8A' }}>
          Hebrew From Scratch {bookTitle}
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#64748B' }}>
          Vokabel {currentIndex + 1} von {vocabulary.length}
        </p>
      </div>

      {/* Toast-Nachricht */}
      {showCopiedMessage && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
          ✓ Vokabel-Info kopiert! Füge sie ins Formular ein.
        </div>
      )}

      <div className="relative w-full mb-8">
        <button
          onClick={handleCardClick}
          className="bg-yellow-300 hover:bg-yellow-400 w-full rounded-2xl shadow-2xl flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
          style={{ height: '320px', fontSize: '2.5rem' }}
        >
          <span>
            {showGerman ? currentVocab.german : currentVocab.hebrew}
          </span>
        </button>

        <button
          onClick={handlePlayAudio}
          className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
          title="Aussprache anhören"
        >
          <Volume2 size={24} />
        </button>

        <button
          onClick={handleReportError}
          className="absolute bottom-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-full shadow-lg transition-all hover:scale-110"
          title="Fehler melden"
        >
          <Flag size={20} />
        </button>
      </div>

      <div className="flex gap-3 w-full">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-6 rounded-xl transition-all text-sm"
          style={{
            boxShadow: currentIndex === 0 ? 'none' : '0 4px 16px rgba(59, 130, 246, 0.2)',
            fontWeight: 500
          }}
        >
          ← Zurück
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === vocabulary.length - 1}
          className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-6 rounded-xl transition-all text-sm"
          style={{
            boxShadow: currentIndex === vocabulary.length - 1 ? 'none' : '0 4px 16px rgba(59, 130, 246, 0.2)',
            fontWeight: 500
          }}
        >
          Weiter →
        </button>
      </div>
    </div>
  );
}
