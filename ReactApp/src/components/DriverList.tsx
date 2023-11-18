import React, { useContext } from 'react';
import { DataContext } from '../contexts/DataContext';
import DriverItem from './DriverItem';

const DriverList: React.FC = () => {
  const { drivers } = useContext(DataContext);

  return (
    <>
      {drivers.map(driver => (
        <DriverItem
          key={driver.id}
          driver={driver}
        />
      ))}
    </>
  );
};

export default DriverList;
