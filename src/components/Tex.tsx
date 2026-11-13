import katex from "katex";

function render(tex: string, displayMode: boolean) {
  return katex.renderToString(tex, {
    displayMode,
    throwOnError: false,
    strict: "ignore",
  });
}

function Maths({ text }: { text: string }) {
  const parts = text.split(/(\$\$[\s\S]+?\$\$|\$[^$]+?\$)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("$$") && part.endsWith("$$") && part.length > 4) {
          return (
            <span
              key={i}
              className="block"
              dangerouslySetInnerHTML={{ __html: render(part.slice(2, -2), true) }}
            />
          );
        }
        if (part.startsWith("$") && part.endsWith("$") && part.length > 2) {
          return (
            <span
              key={i}
              dangerouslySetInnerHTML={{ __html: render(part.slice(1, -1), false) }}
            />
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

/**
 * Renders text containing LaTeX: `$...$` for inline maths, `$$...$$` for
 * display maths, and `**...**` for bold (which may itself contain maths).
 * Works in both Server and Client Components.
 */
export function Tex({ children }: { children: string }) {
  const parts = children.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
          <strong key={i} className="font-semibold text-ink">
            <Maths text={part.slice(2, -2)} />
          </strong>
        ) : (
          <Maths key={i} text={part} />
        ),
      )}
    </>
  );
}
