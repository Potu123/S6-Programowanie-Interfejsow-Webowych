// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import { GamesProvider } from "./_Contexts/GamesContext";
import { AuthProvider } from "./_Contexts/AuthContext";
import AuthButton from "./_components/AuthButton";
import "./globals.css";
import Link from 'next/link';
import { KoszykProvider } from "./_Contexts/KoszykContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sklep z grami",
  description: "Platforma sprzedażowa",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Zapewnienie dostępu do kontekstu użytkownika w całym układzie strony */}
        <AuthProvider>
          <header>
            <div className="shop-header-search-div">
              <input type="text" className="shop-header-search-textInput" aria-label="Wyszukaj w sklepie" />
              <button className="shop-header-search-lupka-btn" aria-label="Szukaj"></button>
            </div>

            <Link href="/"  className="shop-header-log_in_out-btn">
              Strona główna
            </Link>
            
            <Link href="/Koszyk" className="shop-header-koszyk-link">
              <img src="/../images/koszyk.png" className="shop-header-koszyk-img" alt="Przejdź do koszyka" />
            </Link>

            <AuthButton />
          </header>

          <GamesProvider>
            <KoszykProvider>
            {children}
            </KoszykProvider>
          </GamesProvider>

          <footer>
            <p>stopka sobie stopa</p>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}