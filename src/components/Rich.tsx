// Renders a string where **double-asterisk** segments are highlighted.
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split('**').map((part, i) =>
        i % 2 === 1 ? (
          <strong
            key={i}
            className="bg-gradient-to-r from-sky-300 to-violet-300 bg-clip-text font-semibold text-transparent box-decoration-clone"
          >
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  )
}
