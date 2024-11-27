// src/contexts/DataContext.tsx

import React, { createContext, useState, useEffect, FC } from 'react';
import DriverService, { Driver } from '../services/DriverService';
import RaceService, { Race } from '../services/RaceService';
import TeamService, { Team } from '../services/TeamService';

// Updated Interfaces with nullable fields
export interface IDriver {
  id: number;
  name: string | null;
  team: string | null;
  country: string | null;
  image: string | null;
}

export interface IRace {
  id: number;
  grandPrix: string | null;
  winner: string | null;
  laps: number | null; // Changed to number
  image: string | null;
}

export interface ITeam {
  id: number;
  fullTeamName: string | null;
  base: string | null;
  worldChampionships: number | null; // Changed to number
  image: string | null;
}

// Extended DataContextType to include all functions and properties
interface DataContextType {
  baseUrl: string;
  drivers: IDriver[];
  races: IRace[];
  teams: ITeam[];
  setDriversData: (drivers: IDriver[]) => void;
  setRacesData: (races: IRace[]) => void;
  setTeamsData: (teams: ITeam[]) => void;
  addDriver: (driver: Partial<IDriver>, image: File | null) => Promise<IDriver | false>;
  deleteDriver: (driverId: number) => Promise<boolean | undefined>;
  updateDriver: (driver: IDriver, image: File | null) => Promise<boolean | undefined>;
  addRace: (race: Partial<IRace>, image: File | null) => Promise<IRace | false>;
  deleteRace: (raceId: number) => Promise<boolean | undefined>;
  updateRace: (race: IRace, image: File | null) => Promise<boolean | undefined>;
  addTeam: (team: Partial<ITeam>, image: File | null) => Promise<ITeam | false>;
  deleteTeam: (teamId: number) => Promise<boolean | undefined>;
  updateTeam: (team: ITeam, image: File | null) => Promise<boolean | undefined>;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: React.ReactNode;
}

export const DataProvider: FC<DataProviderProps> = ({ children }) => {
  const [drivers, setDrivers] = useState<IDriver[]>([]);
  const [races, setRaces] = useState<IRace[]>([]);
  const [teams, setTeams] = useState<ITeam[]>([]);

  const baseUrl = 'http://localhost:5001';
  const baseApiUrl = `${baseUrl}/api`;

  useEffect(() => {
    DriverService.initialize(baseApiUrl);
    RaceService.initialize(baseApiUrl);
    TeamService.initialize(baseApiUrl);

    fetchInitialData();
  }, [baseApiUrl]);

  const fetchInitialData = async () => {
    try {
      const [driversFromService, racesFromService, teamsFromService] = await Promise.all([
        DriverService.getAllDrivers(),
        RaceService.getAllRaces(),
        TeamService.getAllTeams(),
      ]);

      setDrivers(driversFromService);
      setRaces(racesFromService);
      setTeams(teamsFromService);
    } catch (error) {
      console.error('Failed to fetch initial data', error);
    }
  };

  // CRUD operations for Drivers
  const addDriver = async (driver: Partial<IDriver>, image: File | null) => {
    try {
      const result = await DriverService.addDriver(driver as IDriver, image);
      if (result) {
        setDrivers([...drivers, result]);
        return result;
      }
      return false;
    } catch (error) {
      console.error('AddDriver API call failed', error);
      return false;
    }
  };

  const deleteDriver = async (driverId: number) => {
    try {
      const success = await DriverService.deleteDriver(driverId);
      if (success) {
        setDrivers(drivers.filter(driver => driver.id !== driverId));
        return true;
      }
      return false;
    } catch (error) {
      console.error('DeleteDriver API call failed', error);
      return false;
    }
  };

  const updateDriver = async (driver: IDriver, image: File | null) => {
    try {
      const success = await DriverService.updateDriver(driver, image);
      if (success) {
        setDrivers(drivers.map(d => (d.id === driver.id ? driver : d)));
        return true;
      }
      return false;
    } catch (error) {
      console.error('UpdateDriver API call failed', error);
      return false;
    }
  };

  // CRUD operations for Races
  const addRace = async (race: Partial<IRace>, image: File | null) => {
    try {
      const result = await RaceService.addRace(race as IRace, image);
      if (result) {
        setRaces([...races, result]);
        return result;
      }
      return false;
    } catch (error) {
      console.error('AddRace API call failed', error);
      return false;
    }
  };

  const deleteRace = async (raceId: number) => {
    try {
      const success = await RaceService.deleteRace(raceId);
      if (success) {
        setRaces(races.filter(race => race.id !== raceId));
        return true;
      }
      return false;
    } catch (error) {
      console.error('DeleteRace API call failed', error);
      return false;
    }
  };

  const updateRace = async (race: IRace, image: File | null) => {
    try {
      const success = await RaceService.updateRace(race, image);
      if (success) {
        setRaces(races.map(r => (r.id === race.id ? race : r)));
        return true;
      }
      return false;
    } catch (error) {
      console.error('UpdateRace API call failed', error);
      return false;
    }
  };

  // CRUD operations for Teams
  const addTeam = async (team: Partial<ITeam>, image: File | null) => {
    try {
      const result = await TeamService.addTeam(team as ITeam, image);
      if (result) {
        setTeams([...teams, result]);
        return result;
      }
      return false;
    } catch (error) {
      console.error('AddTeam API call failed', error);
      return false;
    }
  };

  const deleteTeam = async (teamId: number) => {
    try {
      const success = await TeamService.deleteTeam(teamId);
      if (success) {
        setTeams(teams.filter(team => team.id !== teamId));
        return true;
      }
      return false;
    } catch (error) {
      console.error('DeleteTeam API call failed', error);
      return false;
    }
  };

  const updateTeam = async (team: ITeam, image: File | null) => {
    try {
      const success = await TeamService.updateTeam(team, image);
      if (success) {
        setTeams(teams.map(t => (t.id === team.id ? team : t)));
        return true;
      }
      return false;
    } catch (error) {
      console.error('UpdateTeam API call failed', error);
      return false;
    }
  };

  return (
    <DataContext.Provider
      value={{
        baseUrl,
        drivers,
        races,
        teams,
        setDriversData: setDrivers,
        setRacesData: setRaces,
        setTeamsData: setTeams,
        addDriver,
        deleteDriver,
        updateDriver,
        addRace,
        deleteRace,
        updateRace,
        addTeam,
        deleteTeam,
        updateTeam,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
