// app/page.js
"use client";

import { useContext } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import GamesContext from "./_Contexts/GamesContext";
import { AuthContext } from "./_Contexts/AuthContext";
import { useKoszyk } from "./_Contexts/KoszykContext";

export default function HomePage() {
  const { addToKoszyk, isInKoszyk } = useKoszyk();
  const { games, isLoading, deleteGame, editGame, toggleWyszarzenie } = useContext(GamesContext);
  const { user } = useContext(AuthContext);
  
  const searchParams = useSearchParams();

  if (isLoading) {
    return <img src="../images/loading.gif" alt="ładowanie" className="loadingIMG"></img>;
  }

  const itemsPerPage = 10;
  const pageParam = searchParams.get("page");
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  const currentGames = games.slice(startIndex, endIndex);
  const totalPages = Math.ceil(games.length / itemsPerPage);

  return (
    <>
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
          
          {currentGames.map((game, index) => {
            // Ujednolicenie formatu statusu wyszarzenia
            const isGrayedOut = game.czyWyszarzone === true || game.czyWyszarzone === "true";

            return (
              <div 
                key={game.id || index} 
                className="shop-middle-content-item-div"
                style={isGrayedOut ? {
                  backgroundColor: 'rgba(128, 128, 128, 0.2)',
                  filter: 'grayscale(100%)',
                  opacity: 0.5,
                  pointerEvents: 'none',
                  position: 'relative'
                } : { position: 'relative' }}
              >
                
                <div className="shop-middle-content-item-actions" style={{ display: 'flex', gap: '10px', marginBottom: '10px', pointerEvents: 'auto' }}>
                  {user && game.CzyjaGra && user.email.toLowerCase() === game.CzyjaGra.toLowerCase() && (
                    <>
                      <Link href={`/edytuj/${game.id}`}>
                        <button className="shop-middle-content-item-editBtn">edytuj</button>
                      </Link>

                      <button 
                        className="shop-middle-content-item-deleteBtn"
                        style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}
                        onClick={() => {
                          if(window.confirm(`Czy na pewno chcesz usunąć grę "${game.title}"?`)) {
                            deleteGame(game.id);
                          }
                        }}
                      >
                        usuń
                      </button>

                      {/* Przełącznik statusu sprzedaży właściciela */}
                      <button 
                        onClick={() => toggleWyszarzenie(game.id, isGrayedOut)}
                        style={{ backgroundColor: '#6c757d', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}
                      >
                        {isGrayedOut ? "Odznacz jako sprzedane" : "Oznacz jako sprzedane"}
                      </button>
                    </>
                  )}

                  {!isGrayedOut && (
                    <div className="shop-middle-content-item-actions">
                      <button 
                        className="shop-middle-content-item-buyBtn"
                        onClick={(e) => {
                            e.preventDefault();
                            editGame(game.id, { czyWyszarzone: true });
                        }}
                      >
                        Kup teraz
                      </button>

                      <button 
                        className="shop-middle-content-item-cartBtn"
                        onClick={(e) => {
                            e.preventDefault();
                            addToKoszyk(game);
                            alert(`Dodano do koszyka!`); 
                        }}
                      >
                        Do koszyka
                      </button>
                    </div>
                  )}
                </div>

                <Link href={`/gra/${game.id}`} className="shop-middle-content-item-link">
                  <img 
                    className="shop-middle-content-item-img" 
                    // Pierwsze zdjęcie lub placeholder
                    src={game.images && game.images.length > 0 ? game.images[0] : '/images/placeholder.png'} 
                    alt={`Okładka gry ${game.title}`} 
                  />
                </Link>
                
                <div className="shop-middle-content-item-info">
                  <h2 className="shop-middle-content-item-text" style={{ textDecoration: isGrayedOut ? 'line-through' : 'none' }}>
                    <Link href={`/gra/${game.id}`}> {game.title}</Link>
                  </h2>
                  <p>{game.description?.join(' ')}</p>
                  {isGrayedOut && (
                      <p style={{ color: 'red', fontWeight: 'bold', margin: '5px 0 0 0' }}>SPRZEDANE</p>
                  )}
                </div>
              </div>
            );
          })}

          <div className="pagination-container">
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
        </div>
      </div>
    </>
  );
}