// app/dodaj/page.js

"use client";

import Link from 'next/link';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import GamesContext from '../_Contexts/GamesContext'; 
import { AuthContext } from '../_Contexts/AuthContext';

export default function AddGamePage() {
  const { addGame } = useContext(GamesContext);
  const { user } = useContext(AuthContext); // Dane zalogowanego użytkownika
  const router = useRouter();

  // Obsługa wysyłki formularza
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Weryfikacja autoryzacji
    if (!user) {
      alert("Musisz być zalogowany, aby dodać nową grę!");
      return;
    }
    
    // Pobranie danych z pól formularza
    const formData = new FormData(e.target);
    
    // Obiekt nowej pozycji gier
    const newGame = {
      title: formData.get('title'),
      description: [formData.get('description')], 
      min_players: parseInt(formData.get('min_players'), 10),
      max_players: parseInt(formData.get('max_players'), 10),
      avg_play_time_minutes: parseInt(formData.get('avg_play_time_minutes'), 10),
      publisher: formData.get('publisher'),
      type: formData.get('type'),
      is_expansion: formData.get('is_expansion') === 'true',
      price_pln: parseFloat(formData.get('price_pln')),
      CzyjaGra: user.email // Przypisanie adresu email autora
    };

    // Zapis w kontekście aplikacji
    addGame(newGame);
    
    // Przekierowanie do strony głównej
    router.push('/');
  };

  return (
    <>
      <div className="item-middle-div">
        <div className="item-middle-description-div">
          <h2 className="item-middle-h2">Dodaj nową grę</h2>
        </div>

        <div className="item-middle-div-div">
          <form onSubmit={handleSubmit} className="item-middle-table">
            
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
    </>
  );
}