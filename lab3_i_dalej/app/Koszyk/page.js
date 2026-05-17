// app/koszyk/page.js
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useKoszyk } from "../_Contexts/KoszykContext";

export default function KoszykPage() {
  const { koszyk, removeFromKoszyk, totalValue } = useKoszyk();
  const searchParams = useSearchParams();

  const itemsPerPage = 10;
  const pageParam = searchParams.get("page");
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  const currentGames = koszyk.slice(startIndex, endIndex);
  const totalPages = Math.ceil(koszyk.length / itemsPerPage);

  return (
    <>
      <div className="shop-middle-div">
        <div className="shop-middle-content-div" style={{ width: "100%" }}>

          {koszyk.length === 0 ? (
            <div className="item-middle-div">
                <h2 className="item-middle-h2" style={{ textAlign: "center" }}>Twój koszyk jest pusty.</h2>
            </div>
          ) : (
            currentGames.map((game, index) => {
              const isGrayedOut = game.czyWyszarzone === true || game.czyWyszarzone === "true";

              return (
                <div 
                  key={game.id || index} 
                  className="shop-middle-content-item-div"
                  style={isGrayedOut ? { opacity: 0.5, filter: 'grayscale(100%)' } : {}}
                >
                  
                  <div className="shop-middle-content-item-actions">
                    <button 
                      className="shop-middle-content-item-deleteBtn"
                      onClick={(e) => {
                          e.preventDefault();
                          removeFromKoszyk(game);
                      }}
                    >
                      Usuń z koszyka
                    </button>
                  </div>

                  <Link href={`/gra/${game.id}`} className="shop-middle-content-item-link">
                    <img 
                      className="shop-middle-content-item-img" 
                      src={game.images && game.images.length > 0 ? game.images[0] : '/images/placeholder.png'} 
                      alt={`Okładka gry ${game.title}`} 
                    />
                  </Link>
                  
                  <div className="shop-middle-content-item-info">
                    <h2 
                      className="shop-middle-content-item-text" 
                      style={isGrayedOut ? { textDecoration: 'line-through' } : {}}
                    >
                      <Link href={`/gra/${game.id}`}> {game.title}</Link>
                    </h2>
                    <p>{game.description?.join(' ')}</p>
                    
                    {game.price_pln && (
                      <p><strong>Cena: {game.price_pln} PLN</strong></p>
                    )}

                    {isGrayedOut && (
                        <p><strong>SPRZEDANE</strong></p>
                    )}
                  </div>
                </div>
              );
            })
          )}

          {koszyk.length > 0 && (
            <div className="pagination-container">
              {currentPage > 1 ? (
                <Link href={`/koszyk?page=${currentPage - 1}`}>
                  <button className="pagination-btn">&laquo; Poprzednia</button>
                </Link>
              ) : (
                <button disabled className="pagination-btn">&laquo; Poprzednia</button>
              )}

              <span className="pagination-info">
                Strona {currentPage} z {totalPages || 1}
              </span>

              {currentPage < totalPages ? (
                <Link href={`/koszyk?page=${currentPage + 1}`}>
                  <button className="pagination-btn">Następna &raquo;</button>
                </Link>
              ) : (
                <button disabled className="pagination-btn">Następna &raquo;</button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}