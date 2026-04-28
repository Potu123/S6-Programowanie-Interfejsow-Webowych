// Import komponentu Link do nawigacji wewnątrz Next.js
import Link from 'next/link';

// Główna funkcja komponentu strony dodawania nowej gry
export default function AddGamePage() {
  return (
    <>
      <header>
        <div className="shop-header-search-div">
          <input type="text" className="shop-header-search-textInput" aria-label="Wyszukaj w sklepie" />
          <button className="shop-header-search-lupka-btn" aria-label="Szukaj"></button>
        </div>
        
        <Link href="/koszyk" className="shop-header-koszyk-link">
          <img src="/images/koszyk.png" className="shop-header-koszyk-img" alt="Przejdź do koszyka" />
        </Link>
        
        <button className="shop-header-log_in_out-btn">Log in</button>
      </header>

      <div className="item-middle-div">
        <div className="item-middle-description-div">
          <h2 className="item-middle-h2">Dodaj nową grę</h2>
        </div>

        <div className="item-middle-div-div">
          <form action="/" className="item-middle-table">
            
            <label><strong>Tytuł:</strong><br/>
              <input type="text" name="title" required />
            </label>

            <label><strong>Opis:</strong><br/>
              <textarea name="description" rows={5} required />
            </label>

            <div className="item-middle-form-row">
              <label><strong>Min. graczy:</strong><br/>
                <input type="number" name="min_players" required />
              </label>
              <label><strong>Max. graczy:</strong><br/>
                <input type="number" name="max_players" />
              </label>
            </div>

            <label><strong>Czas zabawy (minuty):</strong><br/>
              <input type="number" name="avg_play_time_minutes" />
            </label>

            <label><strong>Wydawca:</strong><br/>
              <input type="text" name="publisher" />
            </label>

            <label><strong>Typ gry:</strong><br/>
              <input type="text" name="type" />
            </label>

            <label><strong>Czy to dodatek?</strong><br/>
              <select name="is_expansion">
                <option value="false">Nie (podstawka)</option>
                <option value="true">Tak</option>
              </select>
            </label>

            <label><strong>Cena (PLN):</strong><br/>
              <input type="number" step="0.01" name="price_pln" required />
            </label>

            <div className="item-middle-form-actions">
              <button type="submit" className="item-middle-btn-save">Dodaj pozycję</button>
              
              <Link href="/">
                <button type="button" className="item-middle-btn-cancel">Anuluj</button>
              </Link>
            </div>

          </form>
        </div>
      </div>

      <footer>
        <p>stopka sobie stopa</p>
      </footer>
    </>
  );
}