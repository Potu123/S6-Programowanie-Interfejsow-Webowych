// app/_AuthButton.js
"use client";

import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../_Contexts/AuthContext';

export default function AuthButton() {
  const { user, logout } = useContext(AuthContext);

  // Przycisk wylogowania dla zalogowanego użytkownika
  if (user) {
    return (
      <button onClick={logout} className="shop-header-log_in_out-btn">
        Wyloguj
      </button>
    );
  }

  // Przekierowanie do logowania dla gości
  return (
    <Link href="/login">
      <button className="shop-header-log_in_out-btn">Login</button>
    </Link>
  );
}