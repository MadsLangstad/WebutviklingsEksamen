import React, { useState, useEffect } from 'react';
import DriverService from '../services/DriverService';
import DriverItem from './DriverItem';

const DriverList: React.FC = () => {
  const [drivers, setDrivers] = useState<DriverItem[]>([]);

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

  return (
    <>
      {drivers.map(driver => (
        <DriverItem
          key={driver.id}
          driver={driver}
          service={DriverService}
        />
      ))}
    </>
  );
};

export default DriverList;
