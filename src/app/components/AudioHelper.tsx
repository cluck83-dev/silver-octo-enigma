import { useState, useEffect } from "react";
import { Info, X } from "lucide-react";

export function AudioHelper() {
  const [showHelp, setShowHelp] = useState(false);
  const [hasHebrewVoice, setHasHebrewVoice] = useState<boolean | null>(null);

  useEffect(() => {
    // Prüfe, ob ResponsiveVoice oder hebräische Stimme verfügbar ist
    const checkVoices = () => {
      // Wenn ResponsiveVoice geladen ist, ist alles gut
      if (typeof (window as any).responsiveVoice !== 'undefined') {
        setHasHebrewVoice(true);
        return;
      }

      // Ansonsten prüfe Browser-Stimmen
      if ('speechSynthesis' in window) {
        const voices = window.speechSynthesis.getVoices();
        const hebrewVoice = voices.find(voice => voice.lang.startsWith('he'));
        setHasHebrewVoice(!!hebrewVoice);
      }
    };

    // Mehrfach prüfen, da ResponsiveVoice asynchron lädt
    checkVoices();
    const interval = setInterval(checkVoices, 1000);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = checkVoices;
    }

    return () => clearInterval(interval);
  }, []);

  if (hasHebrewVoice === null || hasHebrewVoice === true) {
    return null; // Keine Warnung anzeigen wenn alles ok ist
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!showHelp ? (
        <button
          onClick={() => setShowHelp(true)}
          className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 p-3 rounded-full shadow-lg transition-all hover:scale-110 flex items-center gap-2"
          title="Audio-Hilfe"
        >
          <Info size={24} />
          <span className="text-sm font-semibold">Audio-Tipp</span>
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-2xl p-6 max-w-md border-2 border-yellow-400">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Info className="text-yellow-600" size={24} />
              Bessere Audio-Qualität
            </h3>
            <button
              onClick={() => setShowHelp(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4 text-sm">
            <p className="text-gray-700">
              Für die beste Hebräisch-Aussprache empfehlen wir:
            </p>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="font-semibold text-blue-900 mb-2">🌐 Option 1: Chrome oder Edge verwenden</p>
              <p className="text-gray-700">
                Diese Browser haben eingebaute hebräische Stimmen und funktionieren sofort ohne Installation.
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="font-semibold text-green-900 mb-2">📁 Option 2: Eigene Audio-Dateien</p>
              <p className="text-gray-700">
                Du kannst MP3-Dateien mit korrekter Aussprache hochladen und in der Vokabelliste hinterlegen.
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <p className="font-semibold text-purple-900 mb-2">⚙️ Option 3: Windows Sprachpaket</p>
              <ol className="text-gray-700 ml-4 list-decimal space-y-1">
                <li>Einstellungen → Zeit & Sprache → Sprache</li>
                <li>"Hebräisch" hinzufügen</li>
                <li>Sprachpaket herunterladen</li>
                <li>Browser neu starten</li>
              </ol>
            </div>

            <p className="text-xs text-gray-500 italic">
              💡 Die Audio-Funktion funktioniert bereits, aber die Aussprache ist ohne hebräische Stimme eingeschränkt.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
