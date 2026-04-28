// app/gra/[id]/page.tsx
import Link from 'next/link';
// Import komponentu galerii obrazów
import ImageGallery from './ImageGallery'; 

// Główny komponent strony szczegółów gry
export default async function GamePage({ params }: { params: Promise<{ id: string }> }) {
  // Pobranie identyfikatora gry z parametrów ścieżki
  const { id } = await params;
  const response = await fetch('https://szandala.github.io/piwo-api/board-games.json');
  // Konwersja odpowiedzi na format JSON
  const data = await response.json();
  // Wyszukanie konkretnego obiektu gry na podstawie ID
  const game = data.board_games?.find((g: any) => g.id.toString() === id);

  // Obsługa przypadku braku gry w bazie danych
  if (!game) return <div>Nie znaleziono gry</div>;

  return (
    <>
      <div className="item-middle-div">
        <div className="item-middle-div-div">
          
          {game.images && game.images.length > 0 ? (
            <ImageGallery images={game.images} title={game.title} />
          ) : (
            <img src="/images/placeholder.png" className="item-middle-img" alt="Brak zdjęcia" />
          )}

          <table className="item-middle-table">
            <tbody>
              
              {(game.min_players || game.max_players) && (
                <tr>
                  <th scope="row">Liczba graczy</th>
                  <td>{game.min_players}{game.max_players ? ` - ${game.max_players}` : ''}</td>
                </tr>
              )}

              {game.avg_play_time_minutes && (
                <tr>
                  <th scope="row">Czas zabawy</th>
                  <td>{game.avg_play_time_minutes} min</td>
                </tr>
              )}

              {game.publisher && (
                <tr>
                  <th scope="row">Wydawca</th>
                  <td>{game.publisher}</td>
                </tr>
              )}

              {game.type && (
                <tr>
                  <th scope="row">Typ gry</th>
                  <td>{game.type}</td>
                </tr>
              )}
              {game.is_expansion !== undefined && (
                <tr>
                  <th scope="row">Dodatek</th>
                  <td>{game.is_expansion ? 'Tak' : 'Nie (podstawka)'}</td>
                </tr>
              )}
              {game.price_pln && (
                <tr>
                  <th scope="row">Cena</th>
                  <td>{game.price_pln} PLN</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="item-middle-description-div">
          <h2 className="item-middle-h2">{game.title}</h2>
          <p>{game.description.join(' ')}</p>
        </div>
      </div>
    </>
  );
}