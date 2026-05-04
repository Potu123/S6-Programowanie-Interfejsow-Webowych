// app/edytuj/page.js
"use client";

import { useContext } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import GamesContext from '../../_Contexts/GamesContext';

export default function EditGamePage() {
  const { id } = useParams();
  const router = useRouter(); // Inicjalizacja routera

  // Pobranie danych i funkcji z kontekstu
  const { games, isLoading, editGame } = useContext(GamesContext);
  
  if (isLoading) return <div>Ładowanie danych...</div>;

  const game = games?.find((g) => g.id.toString() === id);

  if (!game) return <div>Nie znaleziono gry do edycji</div>;

  // Obsługa wysyłania formularza edycji
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    const updatedData = {
      title: formData.get('title'),
      // Konwersja opisu na tablicę linii
      description: formData.get('description').split('\n').filter(line => line.trim() !== ''),
      min_players: parseInt(formData.get('min_players'), 10),
      max_players: parseInt(formData.get('max_players'), 10),
      avg_play_time_minutes: parseInt(formData.get('avg_play_time_minutes'), 10),
      publisher: formData.get('publisher'),
      type: formData.get('type'),
      is_expansion: formData.get('is_expansion') === 'true',
      price_pln: parseFloat(formData.get('price_pln'))
    };

    // Parsowanie ID i aktualizacja danych w kontekście
    const gameId = isNaN(id) ? id : parseInt(id, 10); 
    editGame(gameId, updatedData);
    
    // Przekierowanie do strony głównej
    router.push('/');
  };

  return (
    <>
      <div className="item-middle-div">
        <div className="item-middle-description-div">
          <h2 className="item-middle-h2">Edycja gry: {game.title}</h2>
        </div>
          <p>cos</p>
        <div className="item-middle-div-div">
          {/* Formularz edycji danych gry */}
          <form onSubmit={handleSubmit} className="item-middle-table">
            
            <label className="item-middle-form-label"><strong>Tytuł:</strong><br/>
              <input type="text" name="title" defaultValue={game.title} className="item-middle-input item-middle-input-full" />
            </label>

            <label className="item-middle-form-label"><strong>Opis:</strong><br/>
              <textarea name="description" defaultValue={game.description?.join('\n')} rows={5} className="item-middle-textarea" />
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
    </>
  );
}