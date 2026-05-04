import { useNavigate, useSearchParams } from "react-router";
import { ArrowLeft, BookOpen, List, Shuffle, ChevronRight } from "lucide-react";
import { getBookTitle } from "../data/vocabulary-helper";

export function MenuScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const book = searchParams.get("book") || "part2";
  const bookTitle = getBookTitle(book as "part1" | "part2");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden" style={{
      background: 'linear-gradient(to bottom, #F1F5F9 0%, #E2E8F0 100%)'
    }}>
      {/* Zurück-Button oben links */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-12 left-6 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        style={{ fontSize: '0.875rem', fontWeight: 500 }}
      >
        <ArrowLeft size={18} />
        Zurück
      </button>

      {/* Header mit Icon */}
      <div className="flex flex-col items-center mb-10">
        {/* Buch Icon */}
        <div className="mb-3">
          <BookOpen size={32} strokeWidth={2} style={{ color: '#3B82F6' }} />
        </div>

        {/* Titel */}
        <h1 className="mb-2 text-center" style={{ fontSize: '1.75rem', fontWeight: 600, color: '#1E3A8A' }}>
          Hebrew From Scratch {bookTitle}
        </h1>

        {/* Subtitle */}
        <p className="text-center" style={{ fontSize: '0.875rem', color: '#64748B' }}>
          Wähle eine Lernmethode
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-3 w-full">
        {/* Lektionen Card - Weiß, wird blau beim Hover */}
        <button
          onClick={() => navigate(`/lektionen?book=${book}`)}
          className="p-4 rounded-2xl transition-all flex items-start gap-3 group hover-blue-card"
          style={{
            background: '#F8FAFB',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#3B82F6';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(59, 130, 246, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#F8FAFB';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
          }}
        >
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all group-hover:bg-white/20" style={{ background: '#DBEAFE' }}>
            <BookOpen size={22} className="transition-colors group-hover:text-white" style={{ color: '#2563EB' }} />
          </div>
          <div className="flex-1 text-left">
            <h3 className="mb-0.5 transition-colors group-hover:text-white" style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1E3A8A' }}>
              Lektionen
            </h3>
            <p className="transition-colors" style={{ fontSize: '0.75rem', color: '#64748B' }}>
              <span className="group-hover:text-white group-hover:opacity-80">
                Lerne Schritt für Schritt<br/>einzelne Lektionen
              </span>
            </p>
          </div>
          <ChevronRight size={20} className="mt-2 opacity-40 group-hover:opacity-100 transition-all group-hover:text-white" style={{ color: '#2563EB' }} />
        </button>

        {/* Wortarten Card - Weiß, wird blau beim Hover */}
        <button
          onClick={() => navigate(`/wortarten?book=${book}`)}
          className="p-4 rounded-2xl transition-all flex items-start gap-3 group"
          style={{
            background: '#F8FAFB',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#3B82F6';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(59, 130, 246, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#F8FAFB';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
          }}
        >
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all group-hover:bg-white/20" style={{ background: '#DBEAFE' }}>
            <List size={22} className="transition-colors group-hover:text-white" style={{ color: '#2563EB' }} />
          </div>
          <div className="flex-1 text-left">
            <h3 className="mb-0.5 transition-colors group-hover:text-white" style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1E3A8A' }}>
              Wortarten
            </h3>
            <p className="transition-colors" style={{ fontSize: '0.75rem', color: '#64748B' }}>
              <span className="group-hover:text-white group-hover:opacity-80">
                Übe nach Wortarten:<br/>z. B. Nomen, Verben, Adjektive
              </span>
            </p>
          </div>
          <ChevronRight size={20} className="mt-2 opacity-40 group-hover:opacity-100 transition-all group-hover:text-white" style={{ color: '#2563EB' }} />
        </button>

        {/* Mix Card - Weiß, wird blau beim Hover */}
        <button
          onClick={() => navigate(`/flashcards?book=${book}&mode=all`)}
          className="p-4 rounded-2xl transition-all flex items-start gap-3 group"
          style={{
            background: '#F8FAFB',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#3B82F6';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(59, 130, 246, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#F8FAFB';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
          }}
        >
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all group-hover:bg-white/20" style={{ background: '#F3E8FF' }}>
            <Shuffle size={22} className="transition-colors group-hover:text-white" style={{ color: '#9333EA' }} />
          </div>
          <div className="flex-1 text-left">
            <h3 className="mb-0.5 transition-colors group-hover:text-white" style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1E3A8A' }}>
              Mix
            </h3>
            <p className="transition-colors" style={{ fontSize: '0.75rem', color: '#64748B' }}>
              <span className="group-hover:text-white group-hover:opacity-80">
                Zufällige Auswahl für<br/>abwechslungsreiches Lernen
              </span>
            </p>
          </div>
          <ChevronRight size={20} className="mt-2 opacity-40 group-hover:opacity-100 transition-all group-hover:text-white" style={{ color: '#9333EA' }} />
        </button>
      </div>
    </div>
  );
}
