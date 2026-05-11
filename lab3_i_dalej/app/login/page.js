// app/login/page.js
"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./../../firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Logowanie standardowe (e-mail i hasło)
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/"); // Przekierowanie na stronę główną
    } catch (err) {
      setError("Nieprawidłowy e-mail lub hasło.");
    }
  };

  // Autoryzacja za pomocą konta Google
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/"); // Przekierowanie na stronę główną
    } catch (err) {
      setError("Wystąpił błąd podczas logowania przez Google.");
    }
  };

  return (
    <div className="login-wrapper">
      <section className="login-section">
        <h2 className="login-header">Zaloguj się</h2>
        
        <button type="button" onClick={handleGoogleLogin} className="login-btn google-btn">
          Kontynuuj z Google
        </button>

        <hr className="login-divider" />

        {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}

        <form onSubmit={handleEmailLogin}>
          <label className="login-label">
            <input
              type="email"
              className="login-input"
              placeholder="E-mail"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <div className="login-label">
            <input
              type="password"
              className="login-input"
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">Zaloguj się</button>
        </form>
      </section>
    </div>
  );
}