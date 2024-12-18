import React, { useContext, useState } from 'react';
import { DataContext } from '../contexts/DataContext';

const RaceItem: React.FC<RaceItemProps> = ({
    race
  }) => {
    const { baseUrl, races, setRacesData } = useContext(DataContext);
    const context = useContext(DataContext);
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newGrandPrix, setNewGrandPrix] = useState(race.grandPrix ?? '');
    const [newWinner, setNewWinner] = useState(race.winner ?? '');
    const [newLaps, setNewLaps] = useState(race.laps ?? '');
    const [newImage, setNewImage] = useState(null);

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
      }
    };

    const handleEditClick = (race: Race) => {
      setIsEditing(true);

      setNewGrandPrix(race.grandPrix);
      setNewWinner(race.winner);
      setNewLaps(race.laps);
    };
  
    const confirmEdit = async () => {
      try {
        const updatedRace = {
          id: race.id,
          grandPrix: newGrandPrix,
          winner: newWinner,
          laps: newLaps,
          image: (newImage !== null ? newImage.name : race.image)
        };

        const res = await context.updateRace(updatedRace, newImage);

        if(res !== false) {
          setNewGrandPrix('');
          setNewWinner('');
          setNewLaps('');
          setNewImage(null);
        }

        const updatedRaces = races.map(r => r.id === race.id ? updatedRace : r);

        setRacesData(updatedRaces);
        setIsEditing(false);

      } catch (error) {
        console.error(`Error editing race: ${error}`);
      }
    }

    return (
      <div key={race.id} className="race-item max-w-sm rounded overflow-hidden min-h-[27rem] w-[20rem] text-center shadow-lg hover:scale-110 bg-slate-100 border-2 border-black dark:bg-gray-800 p-4 mb-20"> 
          <div className="text-black dark:text-gray-400 font-bold text-2xl font-mono mb-2">{race.grandPrix}</div>
          <p className="text-black dark:text-gray-400 text-base">Winner: {race.winner}</p>
          <p className="text-black dark:text-gray-400 text-base">Laps: {race.laps}</p>
          <img className="m-auto max-h-[15rem]" src={`${baseUrl}/images/races/${race.image}`} alt="" />
          <button onClick={handleDeleteClick} className="p-2 m-3 border-2 border-black dark:border-gray-400 rounded-lg delete-button text-black dark:text-gray-400 text-base">Delete</button>
          <button onClick={() => handleEditClick(race)} className="p-2 m-3 border-2 border-black dark:border-gray-400 rounded-lg edit-button text-black dark:text-gray-400 text-base">Edit</button>

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

            <input
              className="p-2 m-3 border-2 border-black dark:border-gray-400 rounded-lg text-base w-full"
              type="file"
              onChange={(e) => setNewImage(e.target.files[0])}
            />

            <button className="p-2 m-3 border-2 border-black dark:border-gray-400 rounded-lg" onClick={confirmEdit}>Save Changes</button>
            <button className="p-2 m-3 border-2 border-black dark:border-gray-400 rounded-lg" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        )}
      </div>
    );
  };
  
  export default RaceItem;