import React, { FC, useContext, useState, useRef, useEffect } from 'react';
import { DataContext } from '../../contexts/DataContext';

interface ModalProps  {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const Modal: FC<ModalProps> = ({type, open, setOpen}) => {

  const modalRef = useRef<HTMLDivElement>(null);
  const { drivers, setDriversData, teams, setTeamsData, races, setRacesData } = useContext(DataContext);
  const context = useContext(DataContext);

  // Driver
  const [driverName, setDriverName] = useState("");
  const [driverTeam, setDriverTeam] = useState("");
  const [driverCountry, setDriverCountry] = useState("");

  // Team
  const [teamName, setTeamName] = useState("");
  const [teamBase, setTeamBase] = useState("");
  const [teamWorldChampionships, setTeamWorldChampionships] = useState(0);

  // Race
  const [raceGrandPrix, setRaceGrandPrix] = useState("");
  const [raceWinner, setRaceWinner] = useState("");
  const [raceLaps, setRaceLaps] = useState(0);
  
  // status 
  const [success, setSuccess] = useState(false);

  const addDriver = async () => {
    try {
      const driver = {
        name: driverName,
        team: driverTeam,
        country: driverCountry
      };

      const res = await context.addDriver(driver);

      if(res !== false) {
        setSuccess(res);
        setDriverName("");
        setDriverTeam("");
        setDriverCountry("");

        driver.id = res.id;

        setDriversData([...drivers, driver]);
      }
    } catch (error) {
      console.error('AddDriver api call failed', error)
    }
  }

  const addTeam = async () => {
    try {
      const team = {
        fullTeamName: teamName,
        base: teamBase,
        worldChampionships: teamWorldChampionships
      };

      const res = await context.addTeam(team);
      
      if(res !== false) {
        setSuccess(res);
        setTeamName("");
        setTeamBase("");
        setTeamWorldChampionships(0);

        team.id = res.id;

        setTeamsData([...teams, team]);
      }
    } catch (error) {
      console.error('AddTeam api call failed', error)
    }
  }
      
  const addRace = async () => {
    try {
      const race = {
        grandPrix: raceGrandPrix,
        winner: raceWinner,
        laps: raceLaps
      };

      const res = await context.addRace(race);
      
      if(res !== false) {
        setSuccess(res);
        setRaceGrandPrix("");
        setRaceWinner("");
        setRaceLaps(0);

        race.id = res.id;

        setRacesData([...races, race]);
      }
    } catch (error) {
      console.error('AddRace api call failed', error)
    }
  }

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setOpen(false);
        setSuccess(false);
      }
      
    };

    if (success) {
      const timer = setTimeout(() => {
        setOpen(false);
        setSuccess(false);
      }, 2000);

      return () => clearTimeout(timer);

    } else if (success === false) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 2000);

      return () => clearTimeout(timer);
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setOpen, success, setSuccess]);

  if(!open) return null;

  if (type === 'driver' && !success) {
    return (
      <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-75">
        <div ref={modalRef} className="relative transform overflow-hidden rounded-lg bg-white p-6 shadow-xl">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Add Driver</h3>          
          <div className="mt-2">

            <label className="block text-sm font-medium text-gray-700" htmlFor="driver-name">Driver Name</label>
            <input id="driver-name" type="text" value={driverName} onChange={event => {setDriverName(event.target.value);}} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />

            <label className="block text-sm font-medium text-gray-700" htmlFor="driver-team">Driver Team</label>
            <input id="driver-team" type="text" value={driverTeam} onChange={event => {setDriverTeam(event.target.value);}} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
            
            <label className="block text-sm font-medium text-gray-700" htmlFor="driver-country">Country</label>
            <input id="driver-country" type="text" value={driverCountry} onChange={event => {setDriverCountry(event.target.value);}} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
          
          </div>
          
          <div className="mt-4">
            <button onClick={() => addDriver()} className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
              Add
            </button>
            <button onClick={() => setOpen(false)} className="ml-3 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  } else if (type === 'team'  && !success) {
    return (
      <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-75">
        <div ref={modalRef} className="relative transform overflow-hidden rounded-lg bg-white p-6 shadow-xl">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Add Team</h3>
          <div className="mt-2">
            
            <label className="block text-sm font-medium text-gray-700" htmlFor="driver-name">Team Name</label>
            <input id="team-name" type="text" value={teamName} onChange={event => {setTeamName(event.target.value);}} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />

            <label className="block text-sm font-medium text-gray-700" htmlFor="team-name">Team Base</label>
            <input id="team-base" type="text" value={teamBase} onChange={event => {setTeamBase(event.target.value);}} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
            
            <label className="block text-sm font-medium text-gray-700" htmlFor="team-world-championships">Team world-championships</label>
            <input id="team-world-championships" type="number" value={teamWorldChampionships} onChange={event => {setTeamWorldChampionships(event.target.value);}} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
          
          </div>
          <div className="mt-4">
            <button onClick={() => addTeam()} className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
              Add
            </button>
            <button onClick={() => setOpen(false)} className="ml-3 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  } else if (type === 'race'  && !success) {
    return (
      <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-75">
        <div ref={modalRef} className="relative transform overflow-hidden rounded-lg bg-white p-6 shadow-xl">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Add Race</h3>
          <div className="mt-2">
            
            <label className="block text-sm font-medium text-gray-700" htmlFor="race-grand-prix">Grand Prix</label>
            <input id="race-grand-prix" type="text" value={raceGrandPrix} onChange={event => {setRaceGrandPrix(event.target.value);}} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
            
            <label className="block text-sm font-medium text-gray-700" htmlFor="race-winner">Winner</label>
            <input id="race-winner" type="text" value={raceWinner} onChange={event => {setRaceWinner(event.target.value);}} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
          
            <label className="block text-sm font-medium text-gray-700" htmlFor="race-laps">Number Of Laps</label>
            <input id="race-laps" type="number" value={raceLaps} onChange={event => {setRaceLaps(event.target.value);}} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
          
          </div>
          <div className="mt-4">
            <button onClick={() => addRace()} className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
              Add
            </button>
            <button onClick={() => setOpen(false)} className="ml-3 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }
  else if (success) {
    return(
      <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-75">
        <div ref={modalRef} className="relative transform overflow-hidden rounded-lg bg-white p-6 shadow-xl">
          <h3>Model successfully added!</h3>
        </div>
      </div>
    )
  }
  else if (!success) {
    return(
      <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-75">
        <div ref={modalRef} className="relative transform overflow-hidden rounded-lg bg-white p-6 shadow-xl">
          <h3>Failed! Model not added!</h3>
        </div>
      </div>
    )
  }

  return (
    <div>No type found</div>
  )
}

export default Modal;