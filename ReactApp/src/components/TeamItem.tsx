import React, { useContext, useState } from 'react';
import { DataContext } from '../contexts/DataContext';

const TeamItem: React.FC<TeamItemProps> = ({
    team
  }) => {

    const { baseUrl, teams, setTeamsData } = useContext(DataContext);
    const context = useContext(DataContext);
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newFullTeamName, setNewFullTeamName] = useState(team.fullTeamName);
    const [newBase, setNewBase] = useState(team.base);
    const [newWorldChampionships, setNewWorldChampionships] = useState(team.worldChampionships);
    const [newImage, setNewImage] = useState(team.image);


    const handleDeleteClick = () => {
      setIsConfirmingDelete(true);
    };
  
    const confirmDelete = async () => {
      try {
        await context.deleteTeam(team.id);
        setIsConfirmingDelete(false);
        
        setTeamsData(teams.filter(t => t.id !== team.id));
      } catch (error) {
        console.error(`Error deleting team: ${error}`);
      }
    };

    const handleEditClick = () => {
      setIsEditing(true);
    }
  
    const confirmEdit = async () => {
      try {
        const updatedTeam = {
          id: team.id,
          fullTeamName: newFullTeamName,
          base: newBase,
          worldChampionships: newWorldChampionships,
          image: (newImage !== null ? newImage.name : '')
        };
    
        const res = await context.updateTeam(updatedTeam, newImage);

        if(res !== false) {
          setNewFullTeamName('');
          setNewBase('');
          setNewWorldChampionships('');
          setNewImage(null);
        }

        const updatedTeams = teams.map(t => t.id === updatedTeam.id ? updatedTeam : t);

        setTeamsData(updatedTeams);
      } catch (error) {
        console.error(`Error editing team: ${error}`);
      }
    }

    return (
      <div key={team.id}  className="team-item max-w-sm rounded overflow-hidden min-h-[27rem] w-[20rem] text-center shadow-lg hover:scale-110 bg-slate-100 border-2 border-black dark:bg-gray-800 p-4 mb-20"> 
          <div className="text-black dark:text-gray-400 font-bold text-2xl font-mono mb-2">{team.fullTeamName}</div>
          <p className="text-black dark:text-gray-400 text-base">Base: {team.base}</p>
          <p className="text-black dark:text-gray-400 text-base">World championships: {team.worldChampionships}</p>
          <img className="m-auto max-h-[15rem]" src={`${baseUrl}/images/teams/${team.image}`} alt="" />

          <button onClick={handleDeleteClick} className="p-2 m-3 border-2 border-black dark:border-gray-400 rounded-lg delete-button text-black dark:text-gray-400 text-base">Delete</button>
          <button onClick={handleEditClick} className="p-2 m-3 border-2 border-black dark:border-gray-400 rounded-lg edit-button text-black dark:text-gray-400 text-base">Edit</button>

        {isConfirmingDelete && (
          <div className="confirmation-dialog text-black dark:text-gray-400 text-base">
            <p>Are you sure you want to delete this team?</p>
            <button className="p-2 m-3 border-2 border-black dark:border-gray-400 rounded-lg" onClick={confirmDelete}>Yes</button>
            <button className="p-2 m-3 border-2 border-black dark:border-gray-400 rounded-lg" onClick={() => setIsConfirmingDelete(false)}>No</button>
          </div>
        )}
        {isEditing && (
          <div className="confirmation-dialog text-black dark:text-gray-400 text-base">
            <p className="text-black dark:text-gray-400 text-base">Edit team details:</p>
            
            <input className="p-2 m-3 border-2 border-black dark:border-gray-400 rounded-lg text-base"
              type="text" 
              value={newFullTeamName} 
              onChange={(e) => setNewFullTeamName(e.target.value)} 
              placeholder="FullTeamName"
            />

            <input className="p-2 m-3 border-2 border-black dark:border-gray-400 rounded-lg text-base"
              type="text" 
              value={newBase} 
              onChange={(e) => setNewBase(e.target.value)} 
              placeholder="Base"
            />

            <input className="p-2 m-3 border-2 border-black dark:border-gray-400 rounded-lg text-base"
              type="text" 
              value={newWorldChampionships} 
              onChange={(e) => setNewWorldChampionships(e.target.value)} 
              placeholder="worldChampionships"
            />

            <input
              className="p-2 m-3 border-2 border-black dark:border-gray-400 rounded-lg text-base"
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
  
  export default TeamItem;