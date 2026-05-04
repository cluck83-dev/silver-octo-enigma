import { useNavigate, useSearchParams } from "react-router";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { getVocabularyModule, getBookTitle } from "../data/vocabulary-helper";

export function LessonSelection() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const book = searchParams.get("book") || "part2";
  const bookTitle = getBookTitle(book as "part1" | "part2");
  const vocabModule = getVocabularyModule(book as "part1" | "part2");
  const lessons = vocabModule.getLessons();

  return (
    <div className="min-h-screen flex flex-col px-6 py-12 relative overflow-y-auto" style={{
      background: 'linear-gradient(to bottom, #F1F5F9 0%, #E2E8F0 100%)'
    }}>
      <button
        onClick={() => navigate(`/menu?book=${book}`)}
        className="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        style={{ fontSize: '0.875rem', fontWeight: 500 }}
      >
        <ArrowLeft size={18} />
        Zurück
      </button>

      <div className="mb-8 text-center">
        <h1 className="mb-2" style={{ fontSize: '1.75rem', fontWeight: 600, color: '#1E3A8A' }}>
          Hebrew From Scratch {bookTitle}
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#64748B' }}>
          Wähle eine Lektion
        </p>
      </div>

      <div className="flex flex-col gap-3 w-full pb-8">
        {lessons.map((lesson) => (
          <button
            key={lesson}
            onClick={() => navigate(`/flashcards?book=${book}&mode=lesson&value=${encodeURIComponent(lesson)}`)}
            className="py-4 px-6 rounded-xl transition-all flex items-center justify-between group"
            style={{
              background: '#F8FAFB',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              fontSize: '0.95rem',
              fontWeight: 600,
              color: '#1E3A8A'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#3B82F6';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(59, 130, 246, 0.25)';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#F8FAFB';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
              e.currentTarget.style.color = '#1E3A8A';
            }}
          >
            {lesson}
            <ChevronRight size={18} className="opacity-40 group-hover:opacity-100 transition-all group-hover:text-white" style={{ color: '#2563EB' }} />
          </button>
        ))}
      </div>
    </div>
  );
}
