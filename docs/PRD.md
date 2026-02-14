# PRD: Landing page „Szybki audyt dostępności” (lead magnet)

## 1) Cel biznesowy i KPI

### Cel biznesowy
Zwiększenie liczby wartościowych leadów B2B przez prosty formularz „URL + email” oraz dostarczenie wstępnego audytu dostępności jako pretekst do dalszego kontaktu sprzedażowo-konsultacyjnego.

### KPI
- **Submit rate (primary):** odsetek sesji z wysłaniem formularza, cel MVP: **>= 4%**.
- **Landing conversion (secondary):** odsetek unikalnych użytkowników, którzy trafili na stronę i zostawili lead, cel MVP: **>= 2.5%**.
- **Contact rate (quality):** odsetek leadów, z którymi udało się nawiązać kontakt (odpowiedź mail/rozmowa), cel MVP: **>= 35%**.
- **Validation error rate (guardrail):** udział prób zakończonych błędem walidacji, cel: **< 20%**.

## 2) Grupa docelowa

- **Właściciele e-commerce i usług cyfrowych** (SMB/Mid): potrzebują szybkiej oceny ryzyk.
- **Zespoły product/UX/dev:** szukają priorytetów poprawy dostępności bez pełnego audytu na start.
- **Compliance/legal/ops:** chcą oszacować ekspozycję na ryzyko i zaplanować działania.

## 3) Zakres „szybkiego audytu” + disclaimer

### Zakres
- Analiza **1-3 podstron** wskazanych przez użytkownika (typowo: home, listing/usługa, checkout/formularz kontaktowy).
- **Automatyczne skanowanie** (narzędzia klasy axe/Lighthouse) + **krótka weryfikacja manualna** kluczowych obszarów.
- Wynik: lista problemów z **priorytetami** (wysoki/sredni/niski) i krótkie **rekomendacje naprawcze**.
- Orientacyjna informacja o potencjalnym wpływie na UX/biznes.

### Disclaimer (obowiązkowy, widoczny)
To jest **wstępny audyt dostępności**, a nie pełny audyt WCAG ani opinia prawna.  
Wynik nie stanowi potwierdzenia zgodności prawnej i nie zastępuje kompleksowego audytu eksperckiego.

## 4) Sekcje strony

1. **Hero + formularz leadowy** (URL + email + zgody).
2. **Zakres szybkiego audytu** (co sprawdzamy, czego nie sprawdzamy).
3. **Co otrzymasz** (format i przykładowe elementy wyniku).
4. **Social proof** (logo klientów/opinie/case skrócony).
5. **FAQ** (zakres, czas odpowiedzi, kwestie prawne).
6. **Privacy/RODO** (minimalizacja danych, zgody, polityka prywatności).
7. **Stopka** (dane firmy, linki prawne, kontakt).

## 5) Microcopy (PL)

### Hero
- **Nagłówek H1:** „Sprawdź dostępność swojej strony w 15 minut”
- **Podtytuł:** "Otrzymasz audyt 1-3 podstron i listę najpilniejszych poprawek.”
- **CTA główne:** „Wyślij do bezpłatnego audytu"
- **Helper text:** „Za audytem Twojej strony stoi expert. Zaufaj nam.”

### Formularz
- **Etykieta pola URL:** „Adres strony (URL)”
- **Placeholder URL:** „https://twojastrona.pl”
- **Etykieta pola email:** „Email służbowy”
- **Placeholder email:** „nazwa@firma.pl”
- **Checkbox obowiązkowy (kontakt):** „Wyrażam zgodę na kontakt w sprawie wyniku audytu.”
- **Checkbox opcjonalny (marketing):** „Chcę otrzymywać materiały o dostępności i newsletter (opcjonalnie).”
- **Link:** „Polityka prywatności”

### Komunikaty błędów
- URL wymagany: „Podaj adres URL.”
- URL niepoprawny: „Wpisz poprawny adres URL (np. https://twojastrona.pl).”
- Email wymagany: „Podaj adres email.”
- Email niepoprawny: „Wpisz poprawny adres email.”
- Brak zgody kontaktowej: „Aby wysłać formularz, zaznacz zgodę na kontakt.”
- Błąd serwera: „Nie udało się wysłać formularza. Spróbuj ponownie za chwilę.”

### Success page / success state
- **Nagłówek:** „Dziękujemy! Zgłoszenie zostało wysłane.”
- **Treść:** „W ciągu 1-2 dni roboczych wyślemy wstępny wynik audytu na podany adres email.”
- **Dodatkowy CTA:** „Wróć do strony głównej”

### FAQ (krótkie)
- **Czy to pełny audyt WCAG?** Nie, to szybki audyt i lista priorytetów.
- **Ile podstron analizujecie?** Od 1 do 3 kluczowych podstron.
- **Kiedy dostanę wynik?** Zwykle w 1-2 dni robocze.
- **Czy wynik to potwierdzenie zgodności prawnej?** Nie, do tego potrzebny jest pełny audyt.

## 6) UX formularza

### Pola
- `url` (required)
- `email` (required)
- `consent_contact` (required checkbox)
- `consent_marketing` (optional checkbox)
- `website` (hidden honeypot, must stay empty)

### Walidacja
- **URL:** wymagany, poprawny format, preferowany protokół `https://`.
- **Email:** wymagany, poprawny format RFC-lite.
- **Consent contact:** wymagane zaznaczenie przed submit.
- **Honeypot:** jeśli uzupełnione -> ciche odrzucenie lub soft-fail.

### Stany
- **Idle:** CTA aktywne.
- **Loading:** CTA z tekstem „Wysyłanie...”, disabled + spinner.
- **Success:** komunikat sukcesu inline lub przekierowanie na success page.
- **Error:** komunikat globalny i/lub przy polach, fokus na pierwszym błędzie.

## 7) Dostępność (WCAG)

- Semantyczna struktura: `header`, `main`, `section`, `footer`, poprawna hierarchia nagłówków.
- Formularz oparty o `form`, pola z poprawnymi `label`.
- Checkboxy w `fieldset` + `legend`.
- Każdy błąd pola połączony przez `aria-describedby`.
- Komunikat błędu globalnego w regionie o roli `alert`/`status`.
- Pełna obsługa klawiaturą (TAB/SHIFT+TAB/ENTER/SPACE), bez pułapek focusa.
- Widoczny focus (`:focus-visible`) o kontraście zgodnym z WCAG.
- Kontrast tekst/tło i elementów UI min. zgodny z AA.
- Linki i przyciski z jednoznacznymi nazwami dostępnymi.

## 8) RODO i prywatność

- **Minimalizacja danych:** zbieramy tylko URL, email i zgody.
- **Cel przetwarzania:** obsługa zgłoszenia, kontakt ws. wyniku.
- **Obowiązkowa zgoda na kontakt** (warunek wysyłki formularza).
- **Oddzielna opcjonalna zgoda marketing/newsletter** (niezależna od zgłoszenia).
- **Link do polityki prywatności** bezpośrednio przy formularzu.
- **Informacja o retencji:** np. „Dane przechowujemy do 12 miesięcy od ostatniego kontaktu lub do czasu wycofania zgody (jeśli dotyczy).”

## 9) Analityka

### Eventy
- `submit_attempt`
- `validation_error`
- `submit_success`
- `submit_fail`

### Parametry eventów (bez danych osobowych)
- `form_version`
- `page_variant` (np. A/B)
- `error_type` (dla `validation_error` i `submit_fail`)
- `field_name` (dla błędów walidacji, bez wartości pola)
- `response_time_bucket` (np. `<1s`, `1-3s`, `>3s`)

### Zasada
Do eventów **nie wysyłamy PII** (brak URL użytkownika i brak emaila w analytics).

## 10) Założenia techniczne

- Landing page hostowany statycznie na **GitHub Pages**.
- Formularz wysyłany do zewnętrznego endpointu (np. **Formspree**) jako rozwiązanie MVP.
- Frontend bez backendu własnego na etapie MVP.
- Obsługa stanów formularza i walidacji po stronie klienta.

## 11) Backlog i Definition of Done

### MVP
- Strona z pełnymi sekcjami: hero/form, zakres, Co otrzymasz, social proof, FAQ, privacy, stopka.
- Działający formularz (URL, email, zgody, honeypot).
- Walidacja klienta + czytelne stany loading/success/error.
- Disclaimer o ograniczeniach audytu widoczny przy CTA.
- Eventy analytics: `submit_attempt`, `validation_error`, `submit_success`, `submit_fail`.

### Nice-to-have
- A/B testy nagłówka i CTA.
- Rozszerzony success page z kolejnym krokiem (np. rezerwacja konsultacji).
- Integracja CRM i automatyczny tagging leadów.
- Rozszerzone social proof (mini case study).

### Definition of Done
- Brak krytycznych błędów a11y w automatycznym skanie (np. axe).
- Lighthouse (A11y) na poziomie akceptowalnym dla MVP (target >= 90).
- Test klawiaturą przejścia przez cały formularz i stany.
- Wszystkie stany formularza (idle/loading/success/error) działają i są czytelne.
- Checkbox zgody kontaktowej blokuje submit, marketing jest opcjonalny.
- Eventy analityczne odpalają się poprawnie i bez PII.

## Ryzyka

- **Spam/boty:** mimo honeypota możliwe nadużycia formularza.
- **Niska konwersja:** zbyt słaby komunikat wartości lub za duży opór przy formularzu.
- **Niejasny disclaimer:** ryzyko błędnego oczekiwania „pełnego audytu” i frustracji leadów.
