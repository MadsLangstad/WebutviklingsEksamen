// src/components/shared/Modal.tsx

import React, { FC, useContext, useState, useRef, useEffect } from 'react';
import { DataContext, IDriver, ITeam, IRace } from '../../contexts/DataContext';

interface ModalProps {
  type: string;
  open: boolean;
  data: object | null;
  setOpen: (open: boolean) => void;
}

const Modal: FC<ModalProps> = ({ type, open, setOpen }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const context = useContext(DataContext);

  if (!context) {
    // Optionally, render nothing or an error if context is not available
    return null;
  }

  const { addDriver, addTeam, addRace } = context;

  // Driver
  const [driverName, setDriverName] = useState<string>('');
  const [driverTeam, setDriverTeam] = useState<string>('');
  const [driverCountry, setDriverCountry] = useState<string>('');
  const [driverImage, setDriverImage] = useState<File | null>(null);

  // Team
  const [teamName, setTeamName] = useState<string>('');
  const [teamBase, setTeamBase] = useState<string>('');
  const [teamWorldChampionships, setTeamWorldChampionships] = useState<number>(0);
  const [teamImage, setTeamImage] = useState<File | null>(null);

  // Race
  const [raceGrandPrix, setRaceGrandPrix] = useState<string>('');
  const [raceWinner, setRaceWinner] = useState<string>('');
  const [raceLaps, setRaceLaps] = useState<number>(0);
  const [raceImage, setRaceImage] = useState<File | null>(null);

  // Status
  const [success, setSuccess] = useState<boolean | null>(null); // null indicates no attempt yet

  // Handlers for image changes
  const handleDriverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setDriverImage(file);
  };

  const handleTeamImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setTeamImage(file);
  };

  const handleRaceImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setRaceImage(file);
  };

  // CRUD Functions
  const handleAddDriver = async () => {
    try {
      const newDriver: Partial<IDriver> = {
        name: driverName,
        team: driverTeam,
        country: driverCountry,
        image: driverImage ? driverImage.name : '',
      };

      const res = await addDriver(newDriver, driverImage);

      if (res) {
        setSuccess(true);
        setDriverName('');
        setDriverTeam('');
        setDriverCountry('');
        setDriverImage(null);
      } else {
        setSuccess(false);
      }
    } catch (error) {
      console.error('AddDriver API call failed', error);
      setSuccess(false);
    }
  };

  const handleAddTeam = async () => {
    try {
      const newTeam: Partial<ITeam> = {
        fullTeamName: teamName,
        base: teamBase,
        worldChampionships: teamWorldChampionships,
        image: teamImage ? teamImage.name : '',
      };

      const res = await addTeam(newTeam, teamImage);

      if (res) {
        setSuccess(true);
        setTeamName('');
        setTeamBase('');
        setTeamWorldChampionships(0);
        setTeamImage(null);
      } else {
        setSuccess(false);
      }
    } catch (error) {
      console.error('AddTeam API call failed', error);
      setSuccess(false);
    }
  };

  const handleAddRace = async () => {
    try {
      const newRace: Partial<IRace> = {
        grandPrix: raceGrandPrix,
        winner: raceWinner,
        laps: raceLaps,
        image: raceImage ? raceImage.name : '',
      };

      const res = await addRace(newRace, raceImage);

      if (res) {
        setSuccess(true);
        setRaceGrandPrix('');
        setRaceWinner('');
        setRaceLaps(0);
        setRaceImage(null);
      } else {
        setSuccess(false);
      }
    } catch (error) {
      console.error('AddRace API call failed', error);
      setSuccess(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setOpen(false);
        setSuccess(null);
      }
    };

    if (success !== null) {
      const timer = setTimeout(() => {
        setOpen(false);
        setSuccess(null);
      }, 2000);

      return () => clearTimeout(timer);
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setOpen, success]);

  if (!open) return null;

  // Render different modals based on 'type' and 'success' state
  const renderContent = () => {
    if (success === null) {
      switch (type) {
        case 'driver':
          return (
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Add Driver</h3>
              <div className="mt-2">
                <label htmlFor="driver-name" className="block text-sm font-medium text-gray-700">Driver Name</label>
                <input
                  id="driver-name"
                  type="text"
                  value={driverName}
                  onChange={e => setDriverName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />

                <label htmlFor="driver-team" className="block text-sm font-medium text-gray-700">Driver Team</label>
                <input
                  id="driver-team"
                  type="text"
                  value={driverTeam}
                  onChange={e => setDriverTeam(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />

                <label htmlFor="driver-country" className="block text-sm font-medium text-gray-700">Driver Country</label>
                <input
                  id="driver-country"
                  type="text"
                  value={driverCountry}
                  onChange={e => setDriverCountry(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />

                <label htmlFor="driver-image" className="block text-sm font-medium text-gray-700">Driver Image</label>
                <input
                  id="driver-image"
                  type="file"
                  onChange={handleDriverImageChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
              </div>
              <div className="mt-4">
                <button
                  onClick={handleAddDriver}
                  className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Add
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="ml-3 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          );

        case 'team':
          return (
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Add Team</h3>
              <div className="mt-2">
                <label htmlFor="team-name" className="block text-sm font-medium text-gray-700">Team Name</label>
                <input
                  id="team-name"
                  type="text"
                  value={teamName}
                  onChange={e => setTeamName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />

                <label htmlFor="team-base" className="block text-sm font-medium text-gray-700">Team Base</label>
                <input
                  id="team-base"
                  type="text"
                  value={teamBase}
                  onChange={e => setTeamBase(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />

                <label htmlFor="team-world-championships" className="block text-sm font-medium text-gray-700">World Championships</label>
                <input
                  id="team-world-championships"
                  type="number"
                  value={teamWorldChampionships}
                  onChange={e => setTeamWorldChampionships(Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />

                <label htmlFor="team-image" className="block text-sm font-medium text-gray-700">Team Image</label>
                <input
                  id="team-image"
                  type="file"
                  onChange={handleTeamImageChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
              </div>
              <div className="mt-4">
                <button
                  onClick={handleAddTeam}
                  className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Add
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="ml-3 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          );

        case 'race':
          return (
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Add Race</h3>
              <div className="mt-2">
                <label htmlFor="race-grand-prix" className="block text-sm font-medium text-gray-700">Grand Prix</label>
                <input
                  id="race-grand-prix"
                  type="text"
                  value={raceGrandPrix}
                  onChange={e => setRaceGrandPrix(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />

                <label htmlFor="race-winner" className="block text-sm font-medium text-gray-700">Winner</label>
                <input
                  id="race-winner"
                  type="text"
                  value={raceWinner}
                  onChange={e => setRaceWinner(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />

                <label htmlFor="race-laps" className="block text-sm font-medium text-gray-700">Number Of Laps</label>
                <input
                  id="race-laps"
                  type="number"
                  value={raceLaps}
                  onChange={e => setRaceLaps(Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />

                <label htmlFor="race-image" className="block text-sm font-medium text-gray-700">Race Image</label>
                <input
                  id="race-image"
                  type="file"
                  onChange={handleRaceImageChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
              </div>
              <div className="mt-4">
                <button
                  onClick={handleAddRace}
                  className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Add
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="ml-3 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          );

        default:
          return <div>No type found</div>;
      }
    } else if (success) {
      return (
        <div>
          <h3 className="text-lg font-medium text-green-600">Successfully added!</h3>
        </div>
      );
    } else {
      return (
        <div>
          <h3 className="text-lg font-medium text-red-600">Failed to add!</h3>
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-75">
      <div ref={modalRef} className="relative transform overflow-hidden rounded-lg bg-white p-6 shadow-xl">
        {renderContent()}
      </div>
    </div>
  );
};

export default Modal;
