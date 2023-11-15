import React, { useState } from 'react';

const DriverItem: React.FC<DriverItemProps> = ({
  driver,
  service
}) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(driver.name);
  const [newTeam, setNewTeam] = useState(driver.team);
  const [newCountry, setNewCountry] = useState(driver.country);

  const handleDeleteClick = () => {
    setIsConfirmingDelete(true);
  };

  const confirmDelete = async () => {
  try {
      await service.deleteDriver(driver.id);
      setIsConfirmingDelete(false);

      //TODO: Handle state update or redirection after deletion
    
    
    } catch (error) {
      console.error(`Error deleting driver: ${error}`);
      // Handle error state
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  }

  const confirmEdit = async () => {
    try {
      const updatedDriver = {
        ...driver,
        name: newName,
        team: newTeam,
        country: newCountry,
      };
  
      await service.updateDriver(driver.id, updatedDriver);
      setIsEditing(false);
      
      //TODO: Refresh the driver list or state
    
    
    } catch (error) {
      console.error(`Error editing driver: ${error}`);
    }
  }

  return (
        <div key={driver.id} className="driver-item max-w-sm rounded overflow-hidden h-[38rem] w-[20rem] text-center shadow-lg bg-slate-100 border-2 border-black hover:scale-110 dark:bg-gray-800 p-4 m-2"> 
            <div className="text-black dark:text-gray-400 font-bold text-2xl font-mono mb-2">{driver.name}</div>
                <p className="text-black dark:text-gray-400 text-base">Team: {driver.team}</p>
                <p className="text-black dark:text-gray-400 text-base">Country: {driver.country}</p>
                <img src={`http://localhost:5143/images/drivers/${driver.image}`} alt="" />
                <button onClick={handleDeleteClick} className="delete-button text-black dark:text-gray-400 text-base">Delete</button>
                <button onClick={handleEditClick} className="edit-button text-black dark:text-gray-400 text-base">Edit</button>

                {isConfirmingDelete && (
        <div className="confirmation-dialog text-black dark:text-gray-400 text-base">
          <p className="text-black dark:text-gray-400 text-base">Are you sure you want to delete this driver?</p>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={() => setIsConfirmingDelete(false)}>No</button>
        </div>
      )}
      {isEditing && (
        <div className="confirmation-dialog text-black dark:text-gray-400 text-base">
        <p className="text-black dark:text-gray-400 text-base">Edit driver details:</p>
        
        <input 
          type="text" 
          value={newName} 
          onChange={(e) => setNewName(e.target.value)} 
          placeholder="Name"
        />
    
        <input 
          type="text" 
          value={newTeam} 
          onChange={(e) => setNewTeam(e.target.value)} 
          placeholder="Team"
        />
    
        <input 
          type="text" 
          value={newCountry} 
          onChange={(e) => setNewCountry(e.target.value)} 
          placeholder="Country"
        />
    
        <button onClick={confirmEdit}>Save Changes</button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
      </div>
      )}
      </div>
    );
};
export default DriverItem;