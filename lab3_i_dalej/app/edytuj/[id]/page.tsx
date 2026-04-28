// Import komponentu Link do nawigacji wewnątrz aplikacji
import Link from 'next/link';

// Definicja asynchronicznego komponentu strony edycji gry
export default async function EditGamePage({ params }: { params: Promise<{ id: string }> }) {
  // Pobranie identyfikatora gry z parametrów ścieżki
  const { id } = await params;

  const response = await fetch('https://szandala.github.io/piwo-api/board-games.json');
  const data = await response.json();
  
  // Wyszukanie konkretnej gry na podstawie otrzymanego ID
  const game = data.board_games?.find((g: any) => g.id.toString() === id);

  // Obsługa przypadku braku gry w bazie danych
  if (!game) return <div>Nie znaleziono gry do edycji</div>;

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

      {/* Główna sekcja zawartości strony */}
      <div className="item-middle-div">
        <div className="item-middle-description-div">
          <h2 className="item-middle-h2">Edycja gry: {game.title}</h2>
        </div>

        <div className="item-middle-div-div">
          <form action="/" className="item-middle-table">
            
            {/* Pole edycji tytułu gry */}
            <label className="item-middle-form-label"><strong>Tytuł:</strong><br/>
              <input type="text" name="title" defaultValue={game.title} className="item-middle-input item-middle-input-full" />
            </label>

            <label className="item-middle-form-label"><strong>Opis:</strong><br/>
              <textarea name="description" defaultValue={game.description.join('\n')} rows={5} className="item-middle-textarea" />
            </label>

            <div className="item-middle-form-row">
              <label className="item-middle-form-label"><strong>Min. graczy:</strong><br/>
                <input type="number" name="min_players" defaultValue={game.min_players} className="item-middle-input" />
              </label>
              <label className="item-middle-form-label"><strong>Max. graczy:</strong><br/>
                <input type="number" name="max_players" defaultValue={game.max_players} className="item-middle-input" />
              </label>
            </div>

            <label className="item-middle-form-label"><strong>Czas zabawy (minuty):</strong><br/>
              <input type="number" name="avg_play_time_minutes" defaultValue={game.avg_play_time_minutes} className="item-middle-input" />
            </label>

            <label className="item-middle-form-label"><strong>Wydawca:</strong><br/>
              <input type="text" name="publisher" defaultValue={game.publisher} className="item-middle-input item-middle-input-full" />
            </label>

            <label className="item-middle-form-label"><strong>Typ gry:</strong><br/>
              <input type="text" name="type" defaultValue={game.type} className="item-middle-input item-middle-input-full" />
            </label>

            <label className="item-middle-form-label"><strong>Czy to dodatek?</strong><br/>
              <select name="is_expansion" defaultValue={game.is_expansion ? "true" : "false"} className="item-middle-select">
                <option value="false">Nie (podstawka)</option>
                <option value="true">Tak</option>
              </select>
            </label>

            <label className="item-middle-form-label"><strong>Cena (PLN):</strong><br/>
              <input type="number" step="0.01" name="price_pln" defaultValue={game.price_pln} className="item-middle-input" />
            </label>

            <div className="item-middle-form-actions">
              <button type="submit" className="item-middle-btn-save">Zapisz zmiany</button>
              
              <Link href="/">
                <button type="button" className="item-middle-btn-cancel">Anuluj</button>
              </Link>
            </div>

          </form>
        </div>
      </div>

      {/* Sekcja stopki strony */}
      <footer>
        <p>stopka sobie stopa</p>
      </footer>
    </>
  );
}