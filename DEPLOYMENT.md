# Deployment Guide - Schritt für Schritt

## Option 1: Vercel (Empfohlen - am einfachsten)

### Schritt 1: GitHub Account erstellen
- Gehe zu https://github.com
- Klicke auf "Sign up" und erstelle einen kostenlosen Account

### Schritt 2: Repository erstellen
1. Gehe zu https://github.com/new
2. Repository Name: z.B. `hebrew-vocab-app`
3. Wähle "Public" (kostenlos)
4. Klicke "Create repository"

### Schritt 3: Code hochladen
Öffne das Terminal in diesem Projekt-Ordner und führe aus:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/DEIN-USERNAME/hebrew-vocab-app.git
git push -u origin main
```

(Ersetze `DEIN-USERNAME` mit deinem GitHub-Benutzernamen)

### Schritt 4: Vercel Account
1. Gehe zu https://vercel.com
2. Klicke "Sign up"
3. Wähle "Continue with GitHub"
4. Autorisiere Vercel

### Schritt 5: Projekt deployen
1. Klicke in Vercel auf "Add New..." → "Project"
2. Wähle dein Repository `hebrew-vocab-app`
3. Vercel erkennt automatisch die Einstellungen
4. Klicke auf "Deploy"
5. Warte 1-2 Minuten...
6. ✅ Fertig! Du bekommst eine URL wie `hebrew-vocab-app.vercel.app`

### Schritt 6: URL teilen
- Kopiere die Vercel-URL
- Teile sie mit deinen Klassenkameraden
- Jeder kann die App jetzt nutzen und auf dem Handy installieren!

### Automatische Updates
Jedes Mal wenn du Code-Änderungen auf GitHub pushst, deployed Vercel automatisch neu:

```bash
git add .
git commit -m "Beschreibung der Änderung"
git push
```

---

## Option 2: Netlify (Alternative)

### Kurzanleitung:
1. GitHub Repository erstellen (wie oben)
2. Gehe zu https://netlify.com
3. Sign up mit GitHub
4. "Add new site" → "Import from Git"
5. Repository wählen → Deploy

Netlify funktioniert genauso wie Vercel, nur mit anderem Interface.

---

## Option 3: GitHub Pages

### Kurzanleitung:
1. Repository erstellen (wie oben)
2. In GitHub: Settings → Pages
3. Source: "GitHub Actions"
4. Erstelle `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

5. Pushe auf GitHub
6. Nach 2-3 Minuten: URL ist `https://DEIN-USERNAME.github.io/hebrew-vocab-app/`

**Wichtig:** Bei GitHub Pages muss `base: '/hebrew-vocab-app/'` in `vite.config.ts` gesetzt werden!

---

## Tipps

### Custom Domain (optional)
- Bei Vercel/Netlify: Settings → Domains
- Eigene Domain wie `hebrew.meinedomain.de` hinzufügen
- Kostet ca. 10€/Jahr für eine .de Domain

### Analytics (optional)
- Vercel Analytics ist kostenlos integriert
- Zeigt dir: Wie viele Nutzer, welche Seiten am beliebtesten, etc.

### SSL/HTTPS
- Wird automatisch von Vercel/Netlify/GitHub Pages eingerichtet
- Wichtig für PWA-Installation!

---

## Troubleshooting

### Build schlägt fehl?
Prüfe ob alle Dependencies installiert sind:
```bash
pnpm install
pnpm run build
```

### App funktioniert nicht nach Deploy?
- Prüfe Browser-Console auf Fehler (F12)
- Vercel Logs anschauen: Deployment → View Function Logs

### PWA installiert sich nicht?
- Stelle sicher dass die Seite über HTTPS läuft (Vercel/Netlify machen das automatisch)
- Öffne die Seite auf dem Handy in Safari (iOS) oder Chrome (Android)
