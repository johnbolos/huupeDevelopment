export default function FormField({textarea, ...props}: {textarea: boolean}) {
  return (
    <div>
      {textarea ? (
        <textarea {...props} rows={8} spellCheck={false} />
      ) : (
        <input {...props} spellCheck={false} />
      )}
    </div>
  );
}
