import React, { useState, useEffect } from 'react';
import RaceService from '../services/RaceService';
import RaceItem from './RaceItem';

const RaceList: React.FC = () => {
  const [races, setRaces] = useState<RaceItem[]>([]);

  useEffect(() => {
    getRacesFromService();
  }, []);

  const getRacesFromService = async () => {
    try {
      const racesFromService = await RaceService.getAllRaces();
      setRaces(racesFromService);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

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
