import React, { useState, useEffect } from 'react';
import RaceService from '../services/RaceService';

// Define an interface for the race object
interface Race {
  id: string;
  GrandPrix: string;
  // Add other race properties with their types here
}

const RaceList: React.FC = () => {
  const [races, setRaces] = useState<Race[]>([]);

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

  const getRacesJSX = () => {
    const racesJSX = races.map((race) => (
      <li key={race.id}>{race.GrandPrix}</li>
    ));
    return racesJSX; 
  };

  return (
    <section>
      <h3>F1 Races</h3>
      <p>Number of Formula 1 Races: {races.length}</p>
      <ul>{getRacesJSX()}</ul>
    </section>
  );
};

export default RaceList;
