import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { StartScreen } from "./components/StartScreen";
import { MenuScreen } from "./components/MenuScreen";
import { LessonSelection } from "./components/LessonSelection";
import { WordTypeSelection } from "./components/WordTypeSelection";
import { FlashcardScreen } from "./components/FlashcardScreen";

export default function App() {
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // PWA Meta-Tags hinzufügen
    const metaThemeColor = document.createElement('meta');
    metaThemeColor.name = 'theme-color';
    metaThemeColor.content = '#3B82F6';
    document.head.appendChild(metaThemeColor);

    const metaAppleMobile = document.createElement('meta');
    metaAppleMobile.name = 'apple-mobile-web-app-capable';
    metaAppleMobile.content = 'yes';
    document.head.appendChild(metaAppleMobile);

    const metaAppleStatus = document.createElement('meta');
    metaAppleStatus.name = 'apple-mobile-web-app-status-bar-style';
    metaAppleStatus.content = 'default';
    document.head.appendChild(metaAppleStatus);

    const linkAppleIcon = document.createElement('link');
    linkAppleIcon.rel = 'apple-touch-icon';
    linkAppleIcon.href = '/icon-192.png';
    document.head.appendChild(linkAppleIcon);

    // Titel setzen
    document.title = 'Hebrew From Scratch';

    // Lade ResponsiveVoice für bessere TTS-Unterstützung
    const script = document.createElement('script');
    script.src = 'https://code.responsivevoice.org/responsivevoice.js?key=jQZ2zStp';
    script.async = true;
    document.body.appendChild(script);

    // Prüfe ob App als PWA installiert ist
    const checkStandalone = () => {
      const standalone = window.matchMedia('(display-mode: standalone)').matches
        || (window.navigator as any).standalone
        || document.referrer.includes('android-app://');
      setIsStandalone(standalone);
    };

    checkStandalone();
    window.matchMedia('(display-mode: standalone)').addEventListener('change', checkStandalone);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Wenn als PWA installiert: Vollbild-Modus ohne Phone-Frame
  if (isStandalone) {
    return (
      <div className="min-h-screen w-full bg-white">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StartScreen />} />
            <Route path="/menu" element={<MenuScreen />} />
            <Route path="/lektionen" element={<LessonSelection />} />
            <Route path="/wortarten" element={<WordTypeSelection />} />
            <Route path="/flashcards" element={<FlashcardScreen />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }

  // Im Browser: Phone-Frame für Preview
  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ background: '#E5E7EB' }}>
      {/* Mobile Container */}
      <div
        className="relative bg-white overflow-hidden"
        style={{
          width: '390px',
          height: '844px',
          borderRadius: '40px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          border: '12px solid #1F2937'
        }}
      >
        {/* Notch (iPhone-Style) */}
        <div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-black rounded-b-3xl z-50"
          style={{
            width: '150px',
            height: '30px'
          }}
        />

        {/* App Content */}
        <div className="w-full h-full overflow-y-auto">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<StartScreen />} />
              <Route path="/menu" element={<MenuScreen />} />
              <Route path="/lektionen" element={<LessonSelection />} />
              <Route path="/wortarten" element={<WordTypeSelection />} />
              <Route path="/flashcards" element={<FlashcardScreen />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}