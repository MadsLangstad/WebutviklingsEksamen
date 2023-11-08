import React, { useState, useEffect } from 'react';
import DriverService from '../services/DriverService';

// Define an interface for the driver object
interface Driver {
  id: string;
  name: string; // The driver's name
  team: string; // The driver's team
  // Add other driver properties with their types here
}

const DriverList: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    getDriversFromService();
  }, []);

  const getDriversFromService = async () => {
    try {
      const driversFromService = await DriverService.getAllDrivers();
      setDrivers(driversFromService);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  const getDriversJSX = () => {
    const driversJSX = drivers.map((driver) => (
      <li key={driver.id}>{driver.name}</li> // Use an appropriate property of the driver object
    ));
    return driversJSX; 
  };

  return (
    <section>
      <h3>F1 Drivers</h3>
      <p>Number of Formula 1 Drivers: {drivers.length}</p>
      <ul>{getDriversJSX()}</ul>
    </section>
  );
};

export default DriverList;
