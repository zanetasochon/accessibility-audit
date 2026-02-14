# QA Checklist (przed merge)

## 1) Smoke test

- [ ] Strona główna `/#/` ładuje się bez błędów w konsoli.
- [ ] Strona `/#/privacy` ładuje się poprawnie i ma link powrotu.
- [ ] Nie ma martwych linków (privacy, skip link).

## 2) Formularz — walidacja i stany

- [ ] Submit pustego formularza pokazuje błędy wymaganych pól.
- [ ] URL bez `http://` lub `https://` jest odrzucany.
- [ ] Niepoprawny e-mail jest odrzucany.
- [ ] Brak zgody kontaktowej blokuje submit.
- [ ] Po błędzie fokus trafia na pierwsze niepoprawne pole.
- [ ] W stanie wysyłki przycisk ma loading i formularz ma `aria-busy`.
- [ ] Sukces pokazuje inline `Alert` (bez przekierowania).
- [ ] Błąd endpointu pokazuje inline `Alert` błędu.
- [ ] Honeypot działa (wypełniony nie wysyła danych do endpointu).

## 3) Dostępność klawiaturą

- [ ] Skip link „Pomiń do treści” działa z klawiatury.
- [ ] Cała strona i formularz są obsługiwalne przez `TAB`/`SHIFT+TAB`.
- [ ] Checkboxy działają klawiszem `SPACE`.
- [ ] CTA formularza działa klawiszem `ENTER`.
- [ ] Focus jest widoczny na wszystkich interaktywnych elementach.

## 4) Semantyka i treść

- [ ] Na stronie jest dokładnie jedno `H1`.
- [ ] Landmarks: `header`, `main`, `footer` są obecne.
- [ ] Sekcje MVP są obecne: hero, form, co sprawdzamy, Co otrzymasz, social proof, FAQ, stopka.
- [ ] Disclaimer o wstępnym audytu jest widoczny.
- [ ] Treści RODO są spójne między formularzem i `/#/privacy`.

## 5) Analityka (placeholder)

- [ ] `submit_attempt` odpala się przy próbie wysyłki.
- [ ] `validation_error` odpala się dla błędów walidacji.
- [ ] `submit_success` i `submit_fail` odzwierciedlają wynik wysyłki.
- [ ] Eventy nie zawierają PII (bez URL i emaila użytkownika).

## 6) Automatyczne testy a11y/perf

- [ ] `npm run a11y:axe` przechodzi bez krytycznych błędów.
- [ ] `npm run a11y:lighthouse` przechodzi (`accessibility >= 0.90`).
- [ ] `npm run build` kończy się sukcesem.

## 7) Release readiness

- [ ] README jest aktualne (Formspree, uruchomienie, deploy, a11y scripts).
- [ ] Workflow Pages działa i publikuje `dist`.
- [ ] Zmiany gotowe do review/merge (bez TODO i debug code).
