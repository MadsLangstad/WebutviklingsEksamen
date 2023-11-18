import React, { useContext, useState } from 'react';
import { DataContext } from '../contexts/DataContext';

const DriverItem: React.FC<DriverItemProps> = ({
  driver
}) => {
  const { drivers, setDriversData } = useContext(DataContext);
  const context = useContext(DataContext);
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
      await context.deleteDriver(driver.id);
      setIsConfirmingDelete(false);

      setDriversData(drivers.filter(d => d.id !== driver.id));
    } catch (error) {
      console.error(`Error deleting driver: ${error}`);
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
  
      await context.updateDriver(updatedDriver);
      setIsEditing(false);
      
      const updatedDrivers = drivers.map(d => d.id === driver.id ? updatedDriver : d);
      setDriversData(updatedDrivers);
    } catch (error) {
      console.error(`Error editing driver: ${error}`);
    }
  }

  return (
        <div key={driver.id} className="driver-item max-w-sm rounded overflow-hidden w-[20rem] text-center shadow-lg bg-slate-100 border-2 border-black hover:scale-110 dark:bg-gray-800 p-4 mb-20"> 
            <div className="text-black dark:text-gray-400 font-bold text-2xl font-mono mb-2">{driver.name}</div>
                <p className="text-black dark:text-gray-400 text-base">Team: {driver.team}</p>
                <p className="text-black dark:text-gray-400 text-base">Country: {driver.country}</p>
                <img src={`http://localhost:5143/images/drivers/${driver.image}`} alt="" />
                <button onClick={handleDeleteClick} className="p-2 m-3 border-2 border-black dark:border-gray-400 rounded-lg delete-button text-black dark:text-gray-400 text-base">Delete</button>
                <button onClick={handleEditClick} className="p-2 m-3 border-2 border-black dark:border-gray-400 rounded-lg edit-button text-black dark:text-gray-400 text-base">Edit</button>

                {isConfirmingDelete && (
        <div className="confirmation-dialog text-black dark:text-gray-400 text-base">
          <p className="text-black dark:text-gray-400 text-base">Are you sure you want to delete this driver?</p>
          <button className="p-2 m-3 border-2 border-black dark:border-gray-400 rounded-lg" onClick={confirmDelete}>Yes</button>
          <button className="p-2 m-3 border-2 border-black dark:border-gray-400 rounded-lg" onClick={() => setIsConfirmingDelete(false)}>No</button>
        </div>
      )}
      {isEditing && (
        <div className="confirmation-dialog text-black dark:text-gray-400 text-base">
        <p className="text-black dark:text-gray-400 text-base">Edit driver details:</p>
        
        <input className="p-2 m-3 border-2 border-black dark:border-gray-400 rounded-lg text-base"
          type="text" 
          value={newName} 
          onChange={(e) => setNewName(e.target.value)} 
          placeholder="Name"
        />
    
        <input className="p-2 m-3 border-2 border-black dark:border-gray-400 rounded-lg text-base"
          type="text" 
          value={newTeam} 
          onChange={(e) => setNewTeam(e.target.value)} 
          placeholder="Team"
        />
    
        <input className="p-2 m-3 border-2 border-black dark:border-gray-400 rounded-lg text-base"
          type="text" 
          value={newCountry} 
          onChange={(e) => setNewCountry(e.target.value)} 
          placeholder="Country"
        />
    
        <button className="p-2 m-3 border-2 border-black dark:border-gray-400 rounded-lg" onClick={confirmEdit}>Save Changes</button>
        <button className="p-2 m-3 border-2 border-black dark:border-gray-400 rounded-lg" onClick={() => setIsEditing(false)}>Cancel</button>
      </div>
      )}
      </div>
    );
};
export default DriverItem;