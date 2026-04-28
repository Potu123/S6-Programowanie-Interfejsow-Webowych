import Link from 'next/link';

// Import komponentu Link do nawigacji wewnątrz aplikacji
export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Oczekiwanie na rozwiązanie obietnicy parametrów z adresu URL
  const resolvedParams = await searchParams;
  
  const response = await fetch('https://szandala.github.io/piwo-api/board-games.json');
  
  // Obsługa błędu w przypadku niepowodzenia zapytania HTTP
  if (!response.ok) {
    throw new Error('Nie udało się pobrać listy gier');
  }

  // Wyodrębnienie danych w formacie JSON oraz listy gier z obiektu
  const gamesList = await response.json();
  const allGames = gamesList.board_games || [];

  // --- LOGIKA PAGINACJI ---
  // Ustalenie stałej liczby elementów wyświetlanych na jednej stronie
  const itemsPerPage = 10;
  
  // Wyznaczenie numeru bieżącej strony na podstawie parametrów URL (domyślnie strona 1)
  const currentPage = resolvedParams?.page ? parseInt(resolvedParams.page as string, 10) : 1;
  
  // Obliczenie indeksów początkowego i końcowego dla fragmentu tablicy gier
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  // Wycięcie odpowiedniego fragmentu listy gier do wyświetlenia
  const currentGames = allGames.slice(startIndex, endIndex);
  // Obliczenie całkowitej liczby stron na podstawie wszystkich dostępnych gier
  const totalPages = Math.ceil(allGames.length / itemsPerPage);
  // ------------------------

  return (
    <>
      <header>
        <div className="shop-header-search-div">
          <input type="text" className="shop-header-search-textInput" aria-label="Wyszukaj w sklepie" />
          <button className="shop-header-search-lupka-btn" aria-label="Szukaj"></button>
        </div>
        
        <Link href="/koszyk" className="shop-header-koszyk-link">
          <img src="../images/koszyk.png" className="shop-header-koszyk-img" alt="Przejdź do koszyka" />
        </Link>
        
        <button className="shop-header-log_in_out-btn">Log in</button>
      </header>

      <div className="shop-middle-div">
        
        <div className="shop-middle-filters-div">
          <div className="shop-middle-filters-div-div">
            <input id="f1" className="shop-middle-filters-checkInput" type="checkbox" />
            <label htmlFor="f1" className="shop-middle-filters-label">filtr1</label>
          </div>
          <div className="shop-middle-filters-div-div">
            <input id="f2" className="shop-middle-filters-checkInput" type="checkbox" />
            <label htmlFor="f2" className="shop-middle-filters-label">filtr2</label>
          </div>
        </div>

        <div className="shop-middle-content-div">
          <Link href="/dodaj">
            <button className="shop-middle-content-btn">dodaj pozycje</button>
          </Link>
          
          {/* Dynamiczne generowanie listy gier dla bieżącej strony */}
          {currentGames.map((game: any, index: number) => (
            <div key={game.id || index} className="shop-middle-content-item-div">
              
              <Link href={`/edytuj/${game.id}`}>
                <button className="shop-middle-content-item-editBtn">edytuj</button>
              </Link>

              <Link href={`/gra/${game.id}`} className="shop-middle-content-item-link">
                <img 
                  className="shop-middle-content-item-img" 
                  src='/images/placeholder.png' 
                  alt={`Okładka gry ${game.title}`} 
                />
              </Link>
              
              <div className="shop-middle-content-item-info">
                <h2 className="shop-middle-content-item-text">
                  <Link href={`/gra/${game.id}`}> {game.title}</Link>
                </h2>
                <p>{game.description.join(' ')}</p>
              </div>
            </div>
          ))}

          {/* --- KONTROLKI PAGINACJI --- */}
          <div className="pagination-container">
            {/* Warunkowe renderowanie przycisku "Poprzednia" (aktywny lub wyłączony) */}
            {currentPage > 1 ? (
              <Link href={`/?page=${currentPage - 1}`}>
                <button className="pagination-btn">&laquo; Poprzednia</button>
              </Link>
            ) : (
              <button disabled className="pagination-btn">&laquo; Poprzednia</button>
            )}

            <span className="pagination-info">
              Strona {currentPage} z {totalPages || 1}
            </span>

            {currentPage < totalPages ? (
              <Link href={`/?page=${currentPage + 1}`}>
                <button className="pagination-btn">Następna &raquo;</button>
              </Link>
            ) : (
              <button disabled className="pagination-btn">Następna &raquo;</button>
            )}
          </div>
          {/* --------------------------- */}

        </div>
      </div>
      <footer>
        <p>stopka sobie stopa</p>
      </footer>
    </>
  );
}