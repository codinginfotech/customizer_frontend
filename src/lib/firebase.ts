import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';

/**
 * Firebase is used purely as an identity provider for Google sign-in. The
 * resulting ID token is exchanged with our API for the app's own session
 * (access token + httpOnly refresh cookie), so nothing else in the client
 * talks to Firebase directly.
 */
const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

/** True when the env carries enough config for Google sign-in to work. */
export const firebaseEnabled = Boolean(config.apiKey && config.authDomain && config.projectId && config.appId);

let app: FirebaseApp | null = null;

function getApp(): FirebaseApp {
  if (!firebaseEnabled) {
    throw new Error('Google sign-in is not configured (missing VITE_FIREBASE_* env)');
  }
  if (!app) {
    app = getApps()[0] ?? initializeApp(config);
    // Analytics is optional and only meaningful in a real browser session.
    if (config.measurementId && typeof window !== 'undefined') {
      void import('firebase/analytics')
        .then(({ getAnalytics, isSupported }) =>
          isSupported().then((ok) => (ok ? getAnalytics(app!) : undefined)),
        )
        .catch(() => undefined);
    }
  }
  return app;
}

/**
 * Opens the Google account picker and returns a Firebase ID token for the
 * chosen account. The caller sends this to `POST /auth/google`.
 */
export async function signInWithGoogle(): Promise<string> {
  const auth = getAuth(getApp());
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  const credential = await signInWithPopup(auth, provider);
  return credential.user.getIdToken();
}

/** Drop the local Firebase session; our API session is revoked separately. */
export async function signOutOfFirebase() {
  if (!app) return;
  try {
    await signOut(getAuth(app));
  } catch {
    /* best-effort */
  }
}

/** Maps Firebase popup errors to something a person can act on. */
export function firebaseErrorMessage(err: unknown, fallback = 'Google sign-in failed'): string {
  const code = (err as { code?: string } | null)?.code;
  switch (code) {
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return 'Sign-in was cancelled.';
    case 'auth/popup-blocked':
      return 'Your browser blocked the sign-in window. Allow pop-ups and try again.';
    case 'auth/network-request-failed':
      return 'Network error — check your connection and try again.';
    case 'auth/unauthorized-domain':
      return 'This domain is not authorised for Google sign-in.';
    default:
      return fallback;
  }
}
