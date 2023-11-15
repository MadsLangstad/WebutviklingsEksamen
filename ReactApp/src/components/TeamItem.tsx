import React, { useState } from 'react';

const TeamItem: React.FC<TeamItemProps> = ({
    team,
    service
  }) => {

    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newFullTeamName, setNewFullTeamName] = useState(team.fullTeamName);
    const [newBase, setNewBase] = useState(team.base);
    const [newWorldChampionships, setNewWorldChampionships] = useState(team.worldChampionships);

    const handleDeleteClick = () => {
      setIsConfirmingDelete(true);
    };
  
    const confirmDelete = async () => {
      try {
        await service.deleteTeam(team.id);
        setIsConfirmingDelete(false);
        // Handle state update or redirection after deletion
      } catch (error) {
        console.error(`Error deleting team: ${error}`);
        // Handle error state
      }
    };

    const handleEditClick = () => {
      setIsEditing(true);
    }
  
    const confirmEdit = async () => {
      try {
        const updatedTeam = {
          ...team,
          fullTeamName: newFullTeamName,
          base: newBase,
          worldChampionships: newWorldChampionships
        };

        await service.updateTeam(team.id, updatedTeam);
        setIsEditing(false);

        //TODO: Handle state update or redirection after deletion

      } catch (error) {
        console.error(`Error editing team: ${error}`);
      }
    }

    return (
      <div key={team.id}  className="team-item max-w-sm rounded overflow-hidden h-[28rem] w-[20rem] text-center shadow-lg hover:scale-110 bg-slate-100 border-2 border-black dark:bg-gray-800 p-4 m-2"> 
          <div className="text-black dark:text-gray-400 font-bold text-2xl font-mono mb-2">{team.fullTeamName}</div>
          <p className="text-black dark:text-gray-400 text-base">Base: {team.base}</p>
          <p className="text-black dark:text-gray-400 text-base">World championships: {team.worldChampionships}</p>
          <img src={`http://localhost:5143/images/teams/${team.image}`} alt="" />

          <button onClick={handleDeleteClick} className="delete-button text-black dark:text-gray-400 text-base">Delete</button>
          <button onClick={handleEditClick} className="edit-button text-black dark:text-gray-400 text-base">Edit</button>

        {isConfirmingDelete && (
          <div className="confirmation-dialog text-black dark:text-gray-400 text-base">
            <p>Are you sure you want to delete this team?</p>
            <button onClick={confirmDelete}>Yes</button>
            <button onClick={() => setIsConfirmingDelete(false)}>No</button>
          </div>
        )}
        {isEditing && (
          <div className="confirmation-dialog text-black dark:text-gray-400 text-base">
            <p className="text-black dark:text-gray-400 text-base">Edit team details:</p>
            
            <input 
              type="text" 
              value={newFullTeamName} 
              onChange={(e) => setNewFullTeamName(e.target.value)} 
              placeholder="FullTeamName"
            />

            <input 
              type="text" 
              value={newBase} 
              onChange={(e) => setNewBase(e.target.value)} 
              placeholder="Base"
            />

            <input 
              type="text" 
              value={newWorldChampionships} 
              onChange={(e) => setNewWorldChampionships(e.target.value)} 
              placeholder="worldChampionships"
            />

            <button onClick={confirmEdit}>Save Changes</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        )}
      </div>
    );
  };
  
  export default TeamItem;