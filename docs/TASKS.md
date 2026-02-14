# TASKS: MVP implementacja landing page „Szybki audyt dostępności”

## Założenia

- Priorytet: szybkie uruchomienie lead magnetu na statycznym hostingu (GitHub Pages).
- Formularz wysyłany do zewnętrznego endpointu (np. Formspree).
- Kolejność poniżej jest rekomendowaną kolejnością realizacji.

## Task 1 — Setup projektu i struktury plików

Opis:
Przygotować podstawową strukturę statycznego projektu pod GitHub Pages oraz szkielet plików HTML/CSS/JS.

Acceptance criteria:

- Istnieje główny plik `index.html`.
- Istnieją katalogi `assets/css` i `assets/js`.
- Istnieją pliki `assets/css/styles.css` i `assets/js/form.js`.
- Strona renderuje się lokalnie jako statyczny HTML bez błędów konsoli.

Pliki których dotyczy:

- `index.html` (nowy)
- `assets/css/styles.css` (nowy)
- `assets/js/form.js` (nowy)

## Task 2 — Implementacja sekcji strony (content + layout)

Opis:
Zaimplementować wszystkie sekcje MVP: hero z formularzem, zakres audytu, Co otrzymasz, social proof, FAQ, privacy/RODO, stopka.

Acceptance criteria:

- W `index.html` są wszystkie sekcje z PRD i logiczna hierarchia nagłówków.
- Widoczny disclaimer, że to wstępny screening, nie pełny audyt WCAG/prawny.
- Microcopy w języku polskim zgodna z PRD (nagłówki, opisy, FAQ).
- Układ responsywny dla mobile i desktop.

Pliki których dotyczy:

- `index.html`
- `assets/css/styles.css`

## Task 3 — Formularz leadowy (UI + pola + zgody)

Opis:
Dodać formularz z polami URL i email, obowiązkową zgodą kontaktową, opcjonalną zgodą marketingową oraz honeypotem antyspam.

Acceptance criteria:

- Formularz zawiera pola: `url`, `email`, `consent_contact`, `consent_marketing`, ukryte `website` (honeypot).
- Przycisk CTA i pomocnicze teksty zgodne z PRD.
- Link do polityki prywatności jest widoczny przy formularzu.
- Honeypot nie jest widoczny dla użytkownika i nie zaburza nawigacji klawiaturą.

Pliki których dotyczy:

- `index.html`
- `assets/css/styles.css`

## Task 4 — Walidacja i stany formularza

Opis:
Zaimplementować walidację klienta (URL/email/zgody), komunikaty błędów oraz stany: idle, loading, success, error.

Acceptance criteria:

- Niepoprawny URL/email blokuje wysyłkę i pokazuje odpowiedni komunikat.
- Brak zgody kontaktowej blokuje wysyłkę.
- Stan loading: przycisk disabled + komunikat „Wysyłanie...”.
- Stan success: użytkownik widzi potwierdzenie zgodne z PRD.
- Stan error: użytkownik widzi globalny lub polowy komunikat błędu.
- Fokus po błędzie przechodzi na pierwsze błędne pole lub komunikat.

Pliki których dotyczy:

- `assets/js/form.js`
- `index.html`
- `assets/css/styles.css`

## Task 5 — Integracja z endpointem formularza (Formspree lub analog)

Opis:
Podpiąć wysyłkę formularza do zewnętrznego endpointu i obsłużyć odpowiedzi sukces/porażka.

Acceptance criteria:

- Dane formularza są wysyłane do skonfigurowanego endpointu metodą `POST`.
- Sukces odpowiedzi ustawia stan success i czyści/potwierdza formularz.
- Błąd odpowiedzi ustawia stan error z czytelnym komunikatem.
- W eventach analitycznych nie są przekazywane dane osobowe.

Pliki których dotyczy:

- `assets/js/form.js`
- `index.html`
- `README.md` (uzupełnienie instrukcji konfiguracji endpointu)

## Task 6 — Dostępność WCAG formularza i strony

Opis:
Dostosować semantykę i interakcje tak, aby formularz i strona spełniały wymagania a11y z PRD.

Acceptance criteria:

- Poprawna semantyka: `header`, `main`, `section`, `footer`.
- Pola mają poprawne `label`, checkboxy są we `fieldset` z `legend`.
- Komunikaty błędów są powiązane z polami przez `aria-describedby`.
- Widoczny i kontrastowy styl `:focus-visible`.
- Cały formularz jest obsługiwalny klawiaturą (TAB/SHIFT+TAB/ENTER/SPACE).

Pliki których dotyczy:

- `index.html`
- `assets/css/styles.css`
- `assets/js/form.js`

## Task 7 — Analityka formularza (MVP eventy)

Opis:
Dodać instrumentację zdarzeń: `submit_attempt`, `validation_error`, `submit_success`, `submit_fail` z bezpiecznym zakresem danych.

Acceptance criteria:

- Event `submit_attempt` odpala się przy próbie wysyłki.
- Event `validation_error` odpala się przy każdym błędzie walidacji.
- Eventy `submit_success` i `submit_fail` odzwierciedlają wynik requestu.
- Event payload nie zawiera URL użytkownika, emaila ani innych PII.

Pliki których dotyczy:

- `assets/js/form.js`
- `README.md` (opis eventów i integracji analytics)

## Task 8 — Finalizacja contentu RODO i linków prawnych

Opis:
Doprecyzować sekcję prywatności, retencję danych i treść zgód zgodnie z PRD.

Acceptance criteria:

- Obowiązkowa zgoda kontaktowa i opcjonalna zgoda marketingowa mają rozdzielne treści.
- Widoczna informacja o celu przetwarzania i okresie przechowywania danych.
- Link do polityki prywatności działa i jest dostępny z poziomu formularza i stopki.
- Treści RODO są spójne między formularzem i sekcją privacy.

Pliki których dotyczy:

- `index.html`
- `README.md` (jeśli polityka prywatności jest opisana repozytoryjnie)

## Task 9 — QA, testy manualne i publikacja na GitHub Pages

Opis:
Wykonać testy końcowe, poprawić wykryte problemy i opublikować MVP na GitHub Pages.

Acceptance criteria:

- Przeprowadzony test ścieżek: poprawny submit, błędy walidacji, błąd endpointu.
- Przeprowadzony test klawiatury dla całego formularza.
- Brak krytycznych błędów dostępności w narzędziu automatycznym.
- Strona działa po publikacji na GitHub Pages.

Pliki których dotyczy:

- `README.md` (instrukcja uruchomienia/publikacji/testów)
- `index.html`
- `assets/css/styles.css`
- `assets/js/form.js`

## Definition of Done

- Formularz działa end-to-end: poprawny submit, walidacje i stany `idle/loading/success/error`.
- Obowiązkowa zgoda kontaktowa blokuje wysyłkę, marketing pozostaje opcjonalny.
- Test klawiaturą przechodzi przez całą ścieżkę formularza bez pułapek focusa.
- Brak krytycznych błędów a11y w automatycznym skanie (np. axe).
- Wynik Lighthouse Accessibility na poziomie **>= 90**.
- Eventy `submit_attempt`, `validation_error`, `submit_success`, `submit_fail` działają poprawnie i bez PII.
