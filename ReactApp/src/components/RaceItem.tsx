import React, { useContext, useState } from 'react';
import { DataContext } from '../contexts/DataContext';

const RaceItem: React.FC<RaceItemProps> = ({
    race
  }) => {
    const { races, setRacesData } = useContext(DataContext);
    const context = useContext(DataContext);
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newGrandPrix, setNewGrandPrix] = useState(race.grandPrix ?? '');
    const [newWinner, setNewWinner] = useState(race.winner ?? '');
    const [newLaps, setNewLaps] = useState(race.laps ?? '');

    const handleDeleteClick = () => {
      setIsConfirmingDelete(true);
    };
  
    const confirmDelete = async () => {
      try {
        await context.deleteRace(race.id); 
        setIsConfirmingDelete(false);
        
        setRacesData(races.filter(r => r.id !== race.id));
      } catch (error) {
        console.error(`Error deleting race: ${error}`);
        // Handle error state
      }
    };

    const handleEditClick = () => {
      setIsEditing(true);
    };
  
    const confirmEdit = async () => {
      try {
        const updatedRace = {
          ...race,
          grandPrix: newGrandPrix,
          winner: newWinner,
          laps: newLaps,
        };

        await context.updateRace(updatedRace);
        setIsEditing(false);

        const updatedRaces = races.map(r => r.id === race.id ? updatedRace : r);
        setRacesData(updatedRaces);

      } catch (error) {
        console.error(`Error editing race: ${error}`);
      }
    }

    return (
      <div key={race.id} className="race-item max-w-sm rounded overflow-hidden w-[20rem] text-center shadow-lg hover:scale-110 bg-slate-100 border-2 border-black dark:bg-gray-800 p-4 mb-20"> 
          <div className="text-black dark:text-gray-400 font-bold text-2xl font-mono mb-2">{race.grandPrix}</div>
          <p className="text-black dark:text-gray-400 text-base">Winner: {race.winner}</p>
          <p className="text-black dark:text-gray-400 text-base">Laps: {race.laps}</p>
          <img src={`http://localhost:5143/images/races/${race.image}`} alt="" />
          <button onClick={handleDeleteClick} className="p-2 m-3 border-2 border-black dark:border-gray-400 rounded-lg delete-button text-black dark:text-gray-400 text-base">Delete</button>
          <button onClick={handleEditClick} className="p-2 m-3 border-2 border-black dark:border-gray-400 rounded-lg edit-button text-black dark:text-gray-400 text-base">Edit</button>

        {isConfirmingDelete && (
          <div className="confirmation-dialog text-black dark:text-gray-400 text-base">
            <p>Are you sure you want to delete this race?</p>
            <button className="p-2 m-3 border-2 border-black dark:border-gray-400 rounded-lg" onClick={confirmDelete}>Yes</button>
            <button className="p-2 m-3 border-2 border-black dark:border-gray-400 rounded-lg" onClick={() => setIsConfirmingDelete(false)}>No</button>
          </div>
        )}
        {isEditing && (
          <div className="confirmation-dialog text-black dark:text-gray-400 text-base">
            <p className="text-black dark:text-gray-400 text-base">Edit race details:</p>
            
            <input className="p-2 m-3 border-2 border-black dark:border-gray-400 rounded-lg text-base"
              type="text" 
              value={newGrandPrix} 
              onChange={(e) => setNewGrandPrix(e.target.value)} 
              placeholder="grandPrix"
            />

            <input className="p-2 m-3 border-2 border-black dark:border-gray-400 rounded-lg text-base"
              type="text" 
              value={newWinner} 
              onChange={(e) => setNewWinner(e.target.value)} 
              placeholder="winner"
            />

            <input className="p-2 m-3 border-2 border-black dark:border-gray-400 rounded-lg text-base"
              type="number" 
              value={newLaps} 
              onChange={(e) => setNewLaps(e.target.value)} 
              placeholder="laps"
            />

            <button className="p-2 m-3 border-2 border-black dark:border-gray-400 rounded-lg" onClick={confirmEdit}>Save Changes</button>
            <button className="p-2 m-3 border-2 border-black dark:border-gray-400 rounded-lg" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        )}
      </div>
    );
  };
  
  export default RaceItem;