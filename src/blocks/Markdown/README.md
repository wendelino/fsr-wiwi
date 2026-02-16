# Markdown Block

Ein Payload CMS Block zum Hinzufügen von Markdown-Inhalten zu Pages und Posts.

## Features

- ✅ **Einfache Markdown-Eingabe** im Admin Panel
- ✅ **Automatisches Rendering** im Frontend
- ✅ **Zwei Renderer-Modi**: Einfach (keine Dependencies) oder Vollständig (mit Syntax-Highlighting)
- ✅ **Verfügbar in Pages & Posts**

## Verwendung im Admin Panel

### In Pages

1. Gehe zu **Pages** im Admin Panel
2. Erstelle oder bearbeite eine Page
3. Klicke im **Content**-Tab auf **Add Block**
4. Wähle **Markdown** aus
5. Schreibe dein Markdown im Textfeld
6. Optional: Aktiviere "Use Simple Renderer" für die einfache Variante
7. Speichern & Publizieren

### In Posts

1. Gehe zu **Posts** im Admin Panel
2. Erstelle oder bearbeite einen Post
3. Im **Content**-Editor klicke auf das **+** Symbol
4. Wähle **Markdown** aus den Block-Optionen
5. Schreibe dein Markdown
6. Optional: Aktiviere "Use Simple Renderer"
7. Speichern & Publizieren

## Renderer-Modi

### Simple Renderer (Standard)

- ✅ Keine externen Dependencies erforderlich
- ✅ Grundlegende Markdown-Features
- ✅ Schnell und leichtgewichtig
- ❌ Kein Syntax-Highlighting

**Geeignet für:**
- Einfache Texte
- Dokumentation
- Wenn `react-markdown` nicht installiert ist

### Full Renderer

- ✅ GitHub Flavored Markdown Support
- ✅ Syntax-Highlighting für Code-Blöcke
- ✅ Tabellen, Task Lists, etc.
- ⚠️ Benötigt `react-markdown` und `remark-gfm`

**Geeignet für:**
- Technische Dokumentation
- Blog-Posts mit Code
- Umfangreiche Content-Seiten

## Installation für Full Renderer

Um den vollständigen Renderer mit allen Features zu nutzen:

```bash
pnpm add react-markdown remark-gfm
```

Nach der Installation werden automatisch alle Markdown-Inhalte mit dem vollständigen Renderer angezeigt.

## Markdown-Beispiele

### Überschriften

```markdown
# H1 Überschrift
## H2 Überschrift
### H3 Überschrift
```

### Text-Formatierung

```markdown
**Fett**, *kursiv*, ***beides***
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
```

### Links & Bilder

```markdown
[Link Text](https://example.com)
![Alt Text](https://example.com/image.jpg)
```

### Code-Blöcke

````markdown
```javascript
function hello() {
  console.log('Hello, World!')
}
```
````

### Tabellen (nur Full Renderer)

```markdown
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

### Blockquotes

```markdown
> Dies ist ein Zitat
> über mehrere Zeilen
```

## Frontend-Integration

Der Block wird automatisch in beiden Kontexten korrekt gerendert:

### In Pages (Layout Builder)

Die `RenderBlocks` Komponente rendert den Markdown-Block:

```tsx
// src/blocks/RenderBlocks.tsx
const blockComponents = {
  // ...
  markdown: MarkdownBlock,
  // ...
}
```

### In Posts (Lexical Editor)

Die `RichText` Komponente rendert den Markdown-Block:

```tsx
// src/components/RichText/index.tsx
blocks: {
  // ...
  markdown: ({ node }) => <MarkdownBlock className="col-start-2" {...node.fields} />,
  // ...
}
```

## Technische Details

### Block Config

```typescript
// src/blocks/Markdown/config.ts
export const MarkdownBlock: Block = {
  slug: 'markdown',
  interfaceName: 'MarkdownBlock',
  fields: [
    {
      name: 'markdown',
      type: 'textarea',
      required: true,
    },
    {
      name: 'useSimpleRenderer',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
```

### Block Component

```typescript
// src/blocks/Markdown/Component.tsx
export const MarkdownBlock: React.FC<Props> = ({ 
  markdown, 
  useSimpleRenderer 
}) => {
  // Lädt dynamisch den Full Renderer oder nutzt Simple Renderer
  // ...
}
```

## Styling

Der Block nutzt Tailwind Typography für konsistentes Styling:

```tsx
<div className="prose prose-slate max-w-none dark:prose-invert">
  {/* Markdown Content */}
</div>
```

Custom Styling kann über die `className` Prop angepasst werden.

## Best Practices

1. **Kurze Inhalte**: Nutze den Simple Renderer für einfache Texte
2. **Technische Inhalte**: Installiere `react-markdown` für Syntax-Highlighting
3. **Konsistenz**: Entscheide dich für einen Renderer-Stil pro Projekt
4. **Preview**: Nutze die Live-Preview im Admin Panel
5. **Validierung**: Teste dein Markdown vor dem Publizieren

## Troubleshooting

### Block wird nicht im Admin Panel angezeigt

- Stelle sicher, dass TypeScript-Typen generiert wurden:
  ```bash
  pnpm payload generate:types
  ```

### Full Renderer funktioniert nicht

- Installiere die Dependencies:
  ```bash
  pnpm add react-markdown remark-gfm
  ```

### Styling fehlt

- Prüfe, ob `@tailwindcss/typography` konfiguriert ist (sollte bereits vorhanden sein)

## Siehe auch

- [Markdown Komponenten-Dokumentation](../../components/Markdown/README.md)
- [MARKDOWN_COMPONENT.md](../../../MARKDOWN_COMPONENT.md)
- [Payload Blocks Dokumentation](https://payloadcms.com/docs/configuration/blocks)
