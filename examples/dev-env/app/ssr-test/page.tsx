import { Translation, TranslationProvider } from '@vocoder/react';

// Mock translations for SSR testing
const SSR_TRANSLATIONS = {
  en: {
    ssr_welcome: "Welcome to SSR Test Page!",
    ssr_description: "This page tests server-side rendering.",
    ssr_locale: "Server-side locale: {locale}",
    ssr_timestamp: "Page generated at: {timestamp}"
  },
  fr: {
    ssr_welcome: "Bienvenue sur la page de test SSR!",
    ssr_description: "Cette page teste le rendu côté serveur.",
    ssr_locale: "Locale côté serveur: {locale}",
    ssr_timestamp: "Page générée à: {timestamp}"
  },
  es: {
    ssr_welcome: "¡Bienvenido a la página de prueba SSR!",
    ssr_description: "Esta página prueba el renderizado del lado del servidor.",
    ssr_locale: "Locale del lado del servidor: {locale}",
    ssr_timestamp: "Página generada en: {timestamp}"
  }
};

export default function SSRTestPage() {
  const timestamp = new Date().toISOString();

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>SSR Test Page</h1>
      
      <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <h2>Server-Side Rendering Test</h2>
        <p>This page uses pre-fetched translations to test SSR compatibility.</p>
        <p><strong>Timestamp:</strong> {timestamp}</p>
        <p><strong>Note:</strong> Check the page source to see server-rendered content.</p>
      </div>

      <TranslationProvider 
        defaultLocale="en"
        translations={SSR_TRANSLATIONS}
      >
        <div style={{ marginBottom: '2rem' }}>
          <h3>Translation Examples</h3>
          
          <div style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '4px' }}>
            <Translation 
              id="ssr_welcome" 
              text="Welcome to SSR Test Page!" 
            />
          </div>
          
          <div style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '4px' }}>
            <Translation 
              id="ssr_description" 
              text="This page tests server-side rendering." 
            />
          </div>
          
          <div style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '4px' }}>
            <Translation 
              id="ssr_locale" 
              text="Server-side locale: {locale}" 
              locale="en" 
            />
          </div>
          
          <div style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '4px' }}>
            <Translation 
              id="ssr_timestamp" 
              text="Page generated at: {timestamp}" 
              timestamp={timestamp} 
            />
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3>Testing Instructions</h3>
          <ol>
            <li><strong>View Page Source:</strong> Right-click and "View Page Source" to see server-rendered HTML</li>
            <li><strong>Check Hydration:</strong> Verify no hydration mismatch warnings in console</li>
            <li><strong>Test Locale Switching:</strong> Use the main page to test locale persistence</li>
            <li><strong>Verify SSR:</strong> Translations should be visible in the page source</li>
          </ol>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3>Expected Behavior</h3>
          <ul>
            <li>✅ Translations are visible in page source</li>
            <li>✅ No hydration mismatch errors</li>
            <li>✅ Locale switching works after hydration</li>
            <li>✅ No client-side API calls (translations pre-fetched)</li>
          </ul>
        </div>

        <div>
          <a href="/" style={{ color: '#0070f3', textDecoration: 'none' }}>
            ← Back to Main Test Page
          </a>
        </div>
      </TranslationProvider>
    </div>
  );
} 