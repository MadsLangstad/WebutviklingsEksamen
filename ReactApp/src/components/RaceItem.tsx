import React, { useState } from 'react';

const RaceItem: React.FC<RaceItemProps> = ({
    race,
    service
  }) => {

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
        await service.deleteRace(race.id);
        setIsConfirmingDelete(false);
        
        //TODO: Handle state update or redirection after deletion

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

        await service.editRace(race.id, updatedRace);
        setIsEditing(false);

        //TODO: Handle state update or redirection after deletion

      } catch (error) {
        console.error(`Error editing race: ${error}`);
      }
    }

    return (
      <div key={race.id} className="race-item max-w-sm rounded overflow-hidden h-[28rem] w-[20rem] text-center shadow-lg hover:scale-110 bg-slate-100 border-2 border-black dark:bg-gray-800 p-4 m-2"> 
          <div className="text-black dark:text-gray-400 font-bold text-2xl font-mono mb-2">{race.grandPrix}</div>
          <p className="text-black dark:text-gray-400 text-base">Winner: {race.winner}</p>
          <p className="text-black dark:text-gray-400 text-base">Laps: {race.laps}</p>
          <img src={`http://localhost:5143/images/races/${race.image}`} alt="" />
          <button onClick={handleDeleteClick} className="delete-button text-black dark:text-gray-400 text-base">Delete</button>
          <button onClick={handleEditClick} className="edit-button text-black dark:text-gray-400 text-base">Edit</button>

        {isConfirmingDelete && (
          <div className="confirmation-dialog text-black dark:text-gray-400 text-base">
            <p>Are you sure you want to delete this race?</p>
            <button onClick={confirmDelete}>Yes</button>
            <button onClick={() => setIsConfirmingDelete(false)}>No</button>
          </div>
        )}
        {isEditing && (
          <div className="confirmation-dialog text-black dark:text-gray-400 text-base">
            <p className="text-black dark:text-gray-400 text-base">Edit race details:</p>
            
            <input 
              type="text" 
              value={newGrandPrix} 
              onChange={(e) => setNewGrandPrix(e.target.value)} 
              placeholder="grandPrix"
            />

            <input 
              type="text" 
              value={newWinner} 
              onChange={(e) => setNewWinner(e.target.value)} 
              placeholder="winner"
            />

            <input 
              type="number" 
              value={newLaps} 
              onChange={(e) => setNewLaps(e.target.value)} 
              placeholder="laps"
            />

            <button onClick={confirmEdit}>Save Changes</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        )}
      </div>
    );
  };
  
  export default RaceItem;