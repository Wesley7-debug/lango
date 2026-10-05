import { Lango } from "lango-i18n";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { DocsPage } from "./docs/DocsPage";
import { useRoute } from "./hooks/useRoute";
import { HomePage } from "./pages/HomePage";

/**
 * App shell (SRP: composition only). The single <Lango> provider wraps both
 * pages so language state persists across hash navigation.
 */
export default function App() {
  const route = useRoute();
  return (
    <Lango languages={["en", "fr", "es", "de", "pt"]} defaultLanguage="en">
      <div className="min-h-screen bg-[#f6f5f1] font-sans text-stone-900 antialiased dark:bg-stone-950 dark:text-stone-100">
        <SiteHeader />
        {route.page === "docs" ? <DocsPage /> : <HomePage />}
        <SiteFooter />
      </div>
    </Lango>
  );
}
