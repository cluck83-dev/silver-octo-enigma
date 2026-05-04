# Hebrew From Scratch - Vokabel-App

Eine Progressive Web App (PWA) zum Lernen von hebräischen Vokabeln aus den Lehrbüchern "Hebrew From Scratch Part 1" und "Part 2".

## Disclaimer

This project is a personal learning tool and is not affiliated with, endorsed by, or connected to the publishers or authors of the "Hebrew From Scratch" textbook series. All vocabulary data is used for educational purposes only. If you are the copyright holder and have concerns, please contact me.

## Features

- 📚 Unterstützung für beide Lehrbücher (Part 1 & Part 2)
- 🎯 Drei Lernmodi: Lektionen, Wortarten, Mix
- 🔄 Interaktive Flashcards (Hebräisch ↔ Deutsch)
- 🔊 Audio-Aussprache für Hebräisch und Deutsch
- 📱 Installierbar als App auf Handy/Tablet
- 🚫 Offline-Nutzung möglich
- 🐛 Fehler-Meldung direkt an Google Forms

## Installation auf dem Handy

### iOS (iPhone/iPad)
1. Öffne die App-URL in Safari
2. Tippe auf das "Teilen"-Symbol (Quadrat mit Pfeil nach oben)
3. Wähle "Zum Home-Bildschirm"
4. Tippe auf "Hinzufügen"
5. Die App erscheint als Icon auf deinem Home-Bildschirm

### Android
1. Öffne die App-URL in Chrome
2. Tippe auf die drei Punkte (⋮) oben rechts
3. Wähle "App installieren" oder "Zum Startbildschirm hinzufügen"
4. Bestätige mit "Installieren"
5. Die App erscheint in deiner App-Liste


## Technologie

- React + TypeScript
- Vite (Build-Tool)
- Tailwind CSS v4
- React Router
- Vite PWA Plugin
- ResponsiveVoice API (Text-to-Speech)
- Browser Web Speech API (Fallback)

## Entwicklung

```bash
# Dependencies installieren
pnpm install

# Dev-Server starten
pnpm run dev

# Production Build
pnpm run build

# Production Preview
pnpm run preview
```

## Datenstruktur

- **Part 1:** 1127 Vokabeln (Einheit I-VII, Auszeit א, Lektionen 1-28)
- **Part 2:** 537 Vokabeln (16 Lektionen)

Alle Vokabeln enthalten:
- Hebräisch (mit Audio-Link)
- Deutsch (Übersetzung)
- Lektion
- Wortart

## Fehler melden

Nutzer können Fehler direkt in der App melden über den roten Flaggen-Button. Die Vokabel-Info wird automatisch in ein Google Form vorausgefüllt.
