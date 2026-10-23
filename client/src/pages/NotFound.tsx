export default function NotFound({
  language = "hi",
}: {
  language?: "hi" | "en";
}) {
  return (
    <main className="legal-page">
      <section className="legal-hero">
        <h1>
          {language === "hi" ? "404 — पृष्ठ नहीं मिला" : "404 — Page not found"}
        </h1>
        <p>
          {language === "hi"
            ? "यह पता उपलब्ध नहीं है।"
            : "This address is unavailable."}
        </p>
        <a href={language === "hi" ? "/" : "/en/"}>
          {language === "hi" ? "मुख्य गाइड पर लौटें" : "Return to the guide"}
        </a>
      </section>
    </main>
  );
}
