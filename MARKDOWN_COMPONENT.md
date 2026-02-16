# Markdown Component Setup

## 📦 Installation

Installieren Sie die erforderlichen Dependencies:

```bash
pnpm add react-markdown remark-gfm
```

## 📁 Dateien erstellt

```
src/components/Markdown/
├── index.tsx                 # Vollständige Markdown-Komponente
├── SimpleMarkdown.tsx        # Einfache Variante ohne Dependencies
└── README.md                 # Ausführliche Dokumentation
```

## 🚀 Schnellstart

### Option 1: Vollständige Komponente (empfohlen)

Nach der Installation der Dependencies:

```tsx
import { Markdown } from '@/components/Markdown'

export default function MyPage() {
  const content = `
# Willkommen

Dies ist **Markdown** mit _Formatierung_!

## Features
- Syntax Highlighting
- Tabellen
- Task Lists
- Und mehr...

\`\`\`typescript
const greeting = "Hello, World!"
console.log(greeting)
\`\`\`
  `

  return <Markdown content={content} />
}
```

### Option 2: Einfache Komponente (ohne Dependencies)

Falls Sie react-markdown nicht installieren möchten:

```tsx
import { SimpleMarkdown } from '@/components/Markdown/SimpleMarkdown'

export default function MyPage() {
  const content = `
# Willkommen
Dies ist **Markdown**!
  `

  return <SimpleMarkdown content={content} />
}
```

## ✨ Features

### Vollständige Komponente (`Markdown`)

✅ GitHub Flavored Markdown (GFM)
✅ Syntax Highlighting für Code-Blöcke
✅ Tabellen
✅ Task Lists
✅ Strikethrough
✅ Autolinks
✅ Custom Styling
✅ Dark Mode Support
✅ Sichere Link-Behandlung

### Einfache Komponente (`SimpleMarkdown`)

✅ Überschriften (H1, H2, H3)
✅ Fett & Kursiv
✅ Links
✅ Inline Code
✅ Code-Blöcke (ohne Syntax-Highlighting)
✅ Blockquotes
✅ Listen
✅ Keine externen Dependencies

## 📖 Verwendungsbeispiele

### In einer Page

```tsx
// src/app/(frontend)/docs/[slug]/page.tsx
import { Markdown } from '@/components/Markdown'

export default async function DocPage({ params }: { params: { slug: string } }) {
  // Von API/Datei/CMS laden
  const doc = await fetchDoc(params.slug)

  return (
    <article className="container max-w-4xl py-16">
      <h1 className="text-4xl font-bold mb-8">{doc.title}</h1>
      <Markdown content={doc.content} />
    </article>
  )
}
```

### Mit Payload CMS

```tsx
import { Markdown } from '@/components/Markdown'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const payload = await getPayload({ config: configPromise })
  
  const post = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: params.slug,
      },
    },
  })

  return (
    <article>
      <h1>{post.docs[0].title}</h1>
      {/* Falls du ein Markdown-Feld in Payload hast */}
      <Markdown content={post.docs[0].markdownContent} />
    </article>
  )
}
```

### Custom Styling

```tsx
<Markdown 
  content={content}
  className="prose-lg prose-headings:text-blue-600 prose-a:text-green-600"
/>
```

### Mit State (interaktiv)

```tsx
'use client'

import { useState } from 'react'
import { Markdown } from '@/components/Markdown'

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState('# Hallo Welt')

  return (
    <div className="grid grid-cols-2 gap-4">
      <textarea
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        className="border p-4 font-mono"
      />
      <Markdown content={markdown} />
    </div>
  )
}
```

## 🎨 Styling Anpassungen

### Tailwind Typography Klassen

```tsx
// Kleinere Schrift
<Markdown content={content} className="prose-sm" />

// Größere Schrift
<Markdown content={content} className="prose-lg prose-xl" />

// Custom Farben
<Markdown 
  content={content}
  className="prose-headings:font-bold prose-headings:text-blue-600 prose-a:text-green-600"
/>

// Maximale Breite & Zentriert
<Markdown content={content} className="max-w-4xl mx-auto" />
```

### Code Theme ändern

In `src/components/Markdown/index.tsx`:

```tsx
import { Highlight, themes } from 'prism-react-renderer'

// Ändere diese Zeile:
<Highlight
  theme={themes.github}  // oder: dracula, vsDark, vsLight, oceanicNext
  code={String(children).replace(/\n$/, '')}
  language={language}
>
```

## 🔒 Sicherheit

- **XSS-Schutz**: react-markdown escaped HTML automatisch
- **Sichere Links**: Externe Links bekommen `rel="noopener noreferrer"`
- **Kein gefährliches HTML**: Nur sichere Markdown-Features werden gerendert

## ⚠️ Wichtig: Tailwind Typography konfigurieren

Stellen Sie sicher, dass Tailwind Typography in Ihrer `tailwind.config.js` konfiguriert ist:

```js
// tailwind.config.js
module.exports = {
  // ...
  plugins: [
    require('@tailwindcss/typography'),  // ✅ Muss vorhanden sein!
  ],
}
```

Das Package ist bereits in Ihrer `package.json` als devDependency vorhanden! ✅

## 🧪 Testen

### Test-Markdown

Erstellen Sie eine Testseite unter `src/app/(frontend)/markdown-demo/page.tsx`:

```tsx
import { Markdown } from '@/components/Markdown'

export default function MarkdownDemo() {
  const testContent = `
# Markdown Demo

## Text-Formatierung
**Fett**, *kursiv*, ***beides***, ~~durchgestrichen~~

## Listen
- Item 1
- Item 2
  - Nested

## Code
\`inline code\`

\`\`\`typescript
function hello(name: string) {
  console.log(\`Hello, \${name}!\`)
}
\`\`\`

## Tabelle
| Feature | Status |
|---------|--------|
| Markdown | ✅ |
| Highlighting | ✅ |

## Quote
> Dies ist ein Zitat
  `

  return (
    <div className="container max-w-4xl py-16">
      <Markdown content={testContent} />
    </div>
  )
}
```

Dann besuchen Sie: `http://localhost:3000/markdown-demo`

## 📚 Weiterführende Informationen

- [react-markdown Dokumentation](https://github.com/remarkjs/react-markdown)
- [Tailwind Typography](https://tailwindcss.com/docs/typography-plugin)
- [Prism React Renderer](https://github.com/FormidableLabs/prism-react-renderer)
- [GitHub Flavored Markdown Spec](https://github.github.com/gfm/)

## 🐛 Troubleshooting

### Module not found: react-markdown
```bash
pnpm add react-markdown remark-gfm
```

### Prose-Klassen funktionieren nicht
Prüfen Sie, ob `@tailwindcss/typography` in den Tailwind-Plugins ist (sollte bereits vorhanden sein).

### Code-Highlighting fehlt
`prism-react-renderer` ist bereits installiert. Falls Fehler auftreten, neu installieren:
```bash
pnpm add prism-react-renderer
```
