# Markdown Component

Eine wiederverwendbare React-Komponente zum Rendern von Markdown mit Syntax-Highlighting und Custom-Styling.

## Installation

Installieren Sie die erforderlichen Dependencies:

```bash
pnpm add react-markdown remark-gfm
```

## Features

- ✅ **GitHub Flavored Markdown** (GFM) Support
  - Tabellen
  - Strikethrough
  - Task Lists
  - Autolinks
- ✅ **Syntax Highlighting** für Code-Blöcke (mit Prism)
- ✅ **Tailwind Typography** Styling
- ✅ **Dark Mode** Support
- ✅ **Automatisches `target="_blank"`** für externe Links
- ✅ **Responsive Tabellen**
- ✅ **Custom Styling** für Blockquotes, Links, etc.

## Verwendung

### Einfaches Beispiel

```tsx
import { Markdown } from '@/components/Markdown'

export default function MyPage() {
  const markdownContent = `
# Willkommen

Dies ist ein **Beispiel** mit *Markdown*.

## Features

- Listen
- **Fett** und _kursiv_
- [Links](https://example.com)
- \`Inline Code\`

### Code Block

\`\`\`typescript
const greeting = (name: string) => {
  return \`Hello, \${name}!\`
}
\`\`\`

### Tabelle

| Feature | Status |
|---------|--------|
| Markdown | ✅ |
| Syntax Highlighting | ✅ |

> Dies ist ein Zitat
  `

  return (
    <div className="container py-8">
      <Markdown content={markdownContent} />
    </div>
  )
}
```

### Mit Custom Styling

```tsx
<Markdown 
  content={markdownContent} 
  className="prose-lg prose-headings:text-blue-600"
/>
```

### Aus API/CMS laden

```tsx
import { Markdown } from '@/components/Markdown'

interface BlogPost {
  title: string
  content: string
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post: BlogPost = await fetchPost(params.slug)

  return (
    <article className="container py-16">
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
      <Markdown content={post.content} />
    </article>
  )
}
```

## Unterstützte Markdown-Features

### Überschriften

```markdown
# H1
## H2
### H3
#### H4
##### H5
###### H6
```

### Text-Formatierung

```markdown
**Fett**
*Kursiv*
***Fett und Kursiv***
~~Durchgestrichen~~
`Inline Code`
```

### Listen

```markdown
- Unnummerierte Liste
- Item 2
  - Verschachtelt

1. Nummerierte Liste
2. Item 2
   1. Verschachtelt

- [ ] Task Liste
- [x] Erledigt
```

### Links und Bilder

```markdown
[Link Text](https://example.com)
[Link mit Titel](https://example.com "Titel")

![Alt Text](https://example.com/image.jpg)
```

### Code

````markdown
Inline: `const x = 42`

Code Block:
```javascript
function hello() {
  console.log('Hello, World!')
}
```
````

### Tabellen

```markdown
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

### Blockquotes

```markdown
> Dies ist ein Zitat
> Über mehrere Zeilen
```

### Horizontale Linie

```markdown
---
```

## Styling Anpassen

Die Komponente nutzt Tailwind Typography. Sie können das Styling über die `className` Prop anpassen:

```tsx
<Markdown 
  content={content}
  className="prose-sm"              // Kleinere Schrift
/>

<Markdown 
  content={content}
  className="prose-lg"              // Größere Schrift
/>

<Markdown 
  content={content}
  className="prose-headings:font-bold prose-a:text-green-600"
/>

<Markdown 
  content={content}
  className="max-w-4xl mx-auto"    // Maximale Breite & zentriert
/>
```

## Code-Highlighting Themes

Die Komponente verwendet standardmäßig das `nightOwl` Theme. Sie können dies in der Komponente ändern:

```tsx
// In src/components/Markdown/index.tsx
import { themes } from 'prism-react-renderer'

// Verfügbare Themes:
themes.nightOwl          // Dark (Standard)
themes.github            // Light
themes.dracula           // Dark
themes.vsDark            // Dark (VS Code)
themes.vsLight           // Light (VS Code)
themes.oceanicNext       // Dark
```

## TypeScript Support

Die Komponente ist vollständig typisiert:

```tsx
interface MarkdownProps {
  content: string      // Der Markdown-String
  className?: string   // Optionale Tailwind-Klassen
}
```

## Performance-Tipps

1. **Memoization**: Für große Markdown-Inhalte:
   ```tsx
   const MemoizedMarkdown = React.memo(Markdown)
   ```

2. **Dynamic Import**: Für Code-Splitting:
   ```tsx
   const Markdown = dynamic(() => import('@/components/Markdown'), {
     loading: () => <div>Lade...</div>,
   })
   ```

## Sicherheit

- **XSS-Schutz**: `react-markdown` escaped HTML standardmäßig
- **Sichere Links**: Externe Links bekommen automatisch `rel="noopener noreferrer"`
- **Keine gefährlichen HTML-Tags**: Standardmäßig werden nur sichere Markdown-Features gerendert

## Troubleshooting

### "Module not found: react-markdown"

```bash
pnpm add react-markdown remark-gfm
```

### Styling funktioniert nicht

Stellen Sie sicher, dass Tailwind Typography konfiguriert ist:

```js
// tailwind.config.js
module.exports = {
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
```

### Code-Highlighting funktioniert nicht

`prism-react-renderer` sollte bereits installiert sein. Falls nicht:

```bash
pnpm add prism-react-renderer
```
