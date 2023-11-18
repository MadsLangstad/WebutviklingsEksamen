import React, { useContext  } from 'react';
import { DataContext } from '../contexts/DataContext';
import RaceItem from './RaceItem';

const RaceList: React.FC = () => {
    const { races } = useContext(DataContext);

  return (
    <>
      {races.map(race => (
        <RaceItem
          key={race.id}
          race={race}
        />
      ))}
    </>
  );
};

export default RaceList;
