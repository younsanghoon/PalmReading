// Simple URL obfuscation utility
export function encryptUrl(url: string): string {
  // Using base64 encoding with additional character substitution for basic obfuscation
  const base64 = btoa(url);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

export function decryptUrl(encryptedUrl: string): string {
  // Reverse the character substitution and decode
  const base64 = encryptedUrl.replace(/-/g, '+').replace(/_/g, '/');
  const paddedBase64 = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
  return atob(paddedBase64);
}

// Encrypted model URLs for palm reading tests
export const ENCRYPTED_MODEL_URLS = {
  palmAbility: 'aHR0cHM6Ly90ZWFjaGFibGVtYWNoaW5lLndpdGhnb29nbGUuY29tL21vZGVscy80cDhmamd4VWU=', // https://teachablemachine.withgoogle.com/models/4p8fjgxUe/
  palmEmotion: 'aHR0cHM6Ly90ZWFjaGFibGVtYWNoaW5lLndpdGhnb29nbGUuY29tL21vZGVscy9xZjhhNGl4Ujk=', // https://teachablemachine.withgoogle.com/models/qf8a4ixR9/
  palmLife: 'aHR0cHM6Ly90ZWFjaGFibGVtYWNoaW5lLndpdGhnb29nbGUuY29tL21vZGVscy9aSFNNTE9ZeUo=', // https://teachablemachine.withgoogle.com/models/ZHSMLOYyJ/
  palmFate: 'aHR0cHM6Ly90ZWFjaGFibGVtYWNoaW5lLndpdGhnb29nbGUuY29tL21vZGVscy91aTh6VjhwbWk=', // https://teachablemachine.withgoogle.com/models/ui8zV8pmi/
  palmIntelligence: 'aHR0cHM6Ly90ZWFjaGFibGVtYWNoaW5lLndpdGhnb29nbGUuY29tL21vZGVscy9sTGFjcThHRXA=' // https://teachablemachine.withgoogle.com/models/lLacq8GEp/
};