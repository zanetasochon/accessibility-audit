type EventName =
  | "submit_attempt"
  | "validation_error"
  | "submit_success"
  | "submit_fail";

type EventPayload = Record<string, string | number | boolean | undefined>;

export function trackEvent(name: EventName, payload: EventPayload = {}): void {
  console.info("[analytics]", name, payload);
}
