import { useNavigate } from "react-router";
import { BookOpen } from "lucide-react";
import part1Cover from "../../imports/Lehrbuch_1_Cover.jpg";
import part2Cover from "../../imports/Lehrbuch_2_Cover.jpg";
import bookIcon from "../../imports/ChatGPT_Image_4._Mai_2026,_05_47_10.png";

export function StartScreen() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-8 py-8 relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #F1F5F9 0%, #E2E8F0 100%)'
      }}
    >
      {/* Dekorative Ecke links oben mit welligerem Abschluss */}
      <div className="absolute top-0 left-0">
        <svg width="160" height="160" viewBox="0 0 120 120" fill="none">
          <path
            d="M0 0 L120 0 Q105 15 95 25 Q85 35 80 45 Q75 55 65 65 Q55 75 45 80 Q35 85 25 95 Q15 105 0 120 Z"
            fill="#DBEAFE"
          />
        </svg>
      </div>

      {/* Punktmuster rechts oben - 4 Spalten x 5 Zeilen */}
      <div className="absolute top-4 right-4">
        <div className="grid grid-cols-4 gap-2.5">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#DBEAFE' }}
            />
          ))}
        </div>
      </div>

      {/* HEADER SECTION */}
      <div className="flex flex-col items-center mb-6 -mt-8">
        {/* Icon: Buch mit א - als Grafik (größer) in rundem Ausschnitt */}
        <div className="mb-0 w-36 h-36 rounded-full overflow-hidden flex items-center justify-center">
          <img
            src={bookIcon}
            alt="Hebrew Book Icon"
            className="w-44 h-auto"
          />
        </div>

        {/* Title */}
        <h1
          className="mb-1 text-center"
          style={{
            fontSize: '1.5rem',
            fontWeight: 600,
            color: '#1E3A8A',
            letterSpacing: '-0.02em'
          }}
        >
          Hebrew From Scratch
        </h1>

        {/* Subtitle */}
        <p
          className="text-center"
          style={{
            fontSize: '0.8rem',
            color: '#64748B'
          }}
        >
          Lerne Vokabeln effizient und strukturiert
        </p>
      </div>

      {/* MAIN CONTENT: Book selection cards */}
      <div className="flex gap-5 items-start justify-center mb-8">
        {/* Part 1 Card */}
        <button
          onClick={() => navigate("/menu?book=part1")}
          className="rounded-2xl p-4 transition-all hover:scale-105"
          style={{
            background: '#EEF2F6',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
            border: 'none'
          }}
        >
          <img
            src={part1Cover}
            alt="Hebrew From Scratch Part 1"
            className="w-28 h-auto mb-3 rounded-lg"
          />
          {/* Gelbliche Box für Part 1 - kräftiger */}
          <div
            className="rounded-lg py-1.5 px-3"
            style={{
              background: '#FEF3C7'
            }}
          >
            <p
              className="text-center"
              style={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#1E40AF'
              }}
            >
              Part 1
            </p>
          </div>
        </button>

        {/* Part 2 Card */}
        <button
          onClick={() => navigate("/menu?book=part2")}
          className="rounded-2xl p-4 transition-all hover:scale-105"
          style={{
            background: '#EEF2F6',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
            border: 'none'
          }}
        >
          <img
            src={part2Cover}
            alt="Hebrew From Scratch Part 2"
            className="w-28 h-auto mb-3 rounded-lg"
          />
          {/* Rötliche Box für Part 2 - kräftiger */}
          <div
            className="rounded-lg py-1.5 px-3"
            style={{
              background: '#FEE2E2'
            }}
          >
            <p
              className="text-center"
              style={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#1E40AF'
              }}
            >
              Part 2
            </p>
          </div>
        </button>
      </div>

      {/* FOOTER NOTE (ONLY ONCE) */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
        style={{
          background: '#EEF2F6',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)'
        }}
      >
        <BookOpen size={16} style={{ color: '#64748B' }} />
        <p style={{
          fontSize: '0.8rem',
          color: '#64748B'
        }}>
          Wähle ein Buch, um zu starten
        </p>
      </div>
    </div>
  );
}
