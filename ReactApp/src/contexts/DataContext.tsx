import React, { createContext, useState, useEffect, FC } from 'react';
import DriverService from '../services/DriverService';
import RaceService from '../services/RaceService';
import TeamService from '../services/TeamService';

interface IDriver {
  id: number;
  name: string;
  team: string;
  country: string;
  image: string;
}

interface IRace {
  id: number;
  grandPrix: string;
  winner: string;
  laps: number;
  image: string;
}

interface ITeam {
  id: number;
  fullTeamName: string;
  base: string;
  worldChampionships: number;
  image: string;
}

interface DataContextType {
  drivers: IDriver[];
  races: IRace[];
  teams: ITeam[];
}

export const DataContext = createContext<DataContextType | null>(null);

interface DataProviderProps {
  children: React.ReactNode;
}

export const DataProvider: FC<DataProviderProps> = ({ children }) => {
  const [drivers, setDrivers] = useState<IDriver[]>([]);
  const [races, setRaces] = useState<IRace[]>([]);
  const [teams, setTeams] = useState<ITeam[]>([]);

  const baseUrl = 'http://localhost:5001';
  const baseApiUrl = baseUrl + '/api';

  const statusCodes = {
    OK: [
      200,
      202,
      204
    ],
    Missing: [
      404
    ]
  };

  useEffect(() => {
    DriverService.initialize(baseApiUrl);
    RaceService.initialize(baseApiUrl);
    TeamService.initialize(baseApiUrl);

    fetchInitialData();
  }, [baseApiUrl]);

  const fetchInitialData = async () => {
    const driversFromService = await DriverService.getAllDrivers();
    const racesFromService = await RaceService.getAllRaces();
    const teamsFromService = await TeamService.getAllTeams();

    setDrivers(driversFromService);
    setRaces(racesFromService);
    setTeams(teamsFromService);
  };

  const setDriversData = (drivers: IDriver[]) => {
    setDrivers(drivers);
  }

  const setRacesData = (races: IRace[]) => {
    setRaces(races);
  }

  const setTeamsData = (teams: ITeam[]) => {
    setTeams(teams);
  }

  // Driver CRUD
  const addDriver = async (driver: IDriver, image: HTMLInputElement) => {
    try {
      const result = await DriverService.addDriver(driver, image);

      if(statusCodes.OK.includes(result.status)) {
        return result.data;
      }
    } catch (error) {
      console.error('Api call failed', error)
      return false;
    }
  }

  const deleteDriver = async (driverId) => {
    try {
      const result = await DriverService.deleteDriver(driverId);
      if(statusCodes.OK.includes(result.status)) {
        return true;
      }
    } catch (error) {
      console.error('Api call failed', error);
    }
  }

  const updateDriver = async (driver: IDriver, image: HTMLInputElement) => {
    try {
      const result = await DriverService.updateDriver(driver, image);
      if(statusCodes.OK.includes(result.status)) {
        return true;
      }
    } catch (error) {
      console.error('Api call failed', error)
    }
  }


  // Race CRUD
  const addRace = async (race: IRace, image: HTMLInputElement) => {
    try {
      const result = await RaceService.addRace(race, image);
      if(statusCodes.OK.includes(result.status)) {
        return result.data;
      }
    }catch(error) {
      console.error('Api call failed', error)
      return false;
    }
  }

  const deleteRace = async (raceId) => {
    try {
      const result = await RaceService.deleteRace(raceId);
      if(statusCodes.OK.includes(result.status)) {
        return true;
      }
    } catch(error) {
      console.error('Api call failed', error)
    }
  }

  const updateRace = async (race) => {
    try {
      const result = await RaceService.updateRace(race);
      if(statusCodes.OK.includes(result.status)) {
        return true;
      }
    } catch(error) {
      console.error('Api call failed', error)
    }
  }

  // Team CRUD

  const addTeam = async (team: ITeam, image: HTMLInputElement) => {
    try {
      const result = await TeamService.addTeam(team, image);
      if(statusCodes.OK.includes(result.status)) {
        return result.data;
      }
    }catch(error) {
      console.error('Api call failed', error)
      return false;
    }
  }

  const deleteTeam = async (teamId) => {
    try {
      const result = await TeamService.deleteTeam(teamId);
      if(statusCodes.OK.includes(result.status)) {
        return true;
      }
    } catch(error) {
      console.error('Api call failed', error)
    }
  }

  const updateTeam = async (team: ITeam, image: HTMLInputElement) => {
    try {
      const result = await TeamService.updateTeam(team, image);
      console.log("result: ", result)
      if(statusCodes.OK.includes(result.status)) {
        return true;
      }
    } catch(error) {
      console.error('Api call failed', error)
    }
  }



  return (
    <DataContext.Provider value={{
      baseUrl,
      drivers, 
      setDriversData,
      addDriver, 
      deleteDriver, 
      updateDriver, 
      races, 
      setRacesData, 
      addRace, 
      deleteRace, 
      updateRace,  
      teams, 
      setTeamsData, 
      addTeam, 
      deleteTeam, 
      updateTeam 
    }}>
      {children}  
    </DataContext.Provider>
  );
};