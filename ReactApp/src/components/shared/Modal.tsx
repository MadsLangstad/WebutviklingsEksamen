import React, { FC, useState, useRef, useEffect } from 'react';
import DriverService from '../../services/DriverService';
import TeamService from '../../services/TeamService';
import RaceService from '../../services/RaceService';

interface ModalProps  {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const Modal: FC<ModalProps> = ({type, open, setOpen}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [driverName, setDriverName] = useState("");
    const [driverCountry, setDriverCountry] = useState("");
    const [teamName, setTeamName] = useState("");
    const [teamChief, setTeamChief] = useState("");
    const [raceCircuit, setRaceCircuit] = useState("");
    const [numberOfLaps, setNumberOfLaps] = useState(0);
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);

    const addDriver = async () => {
      try {
        const res = await DriverService.addDriver(driverName, driverCountry);
        if(res.status === 200) {
          setSuccess(true);
          console.log(success)
        }
        //FIX
        else {
          setFail(true);
        }
        setDriverName("");
        setDriverCountry("");

      } catch (error) {
        setFail(true);
        console.error('Api call failed', error)
      }
    }


    const addTeam = async () => {
      try {
        const res = await TeamService.addTeam(teamName, teamChief);
      if(res.status == 200) {
        setSuccess(true);
        console.log(success)
      }
      //FIX
      else {
        setFail(true);
        console.log(fail)
      }
      setTeamName("");
      setTeamChief("");
    } catch (error) {
      setFail(true);
      console.error('Api call failed', error)
    }
}
      

    const addRace = async () => {
      try {
        const res = await RaceService.addRace(raceCircuit, numberOfLaps);
      if(res.status == 200) {
        setSuccess(true);
        console.log(success)
      }
      //FIX
      else {
        setFail(true);
        console.log(fail)
      }
      setRaceCircuit("");
      setNumberOfLaps(0);
    } catch (error) {
      setFail(true);
      console.error('Api call failed', error)
    }
}
      
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setOpen(false);
                setIsSuccess(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [setOpen]);

    if(!open) return null;

    if (type === 'driver' && !success) {
      return (
        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-75">
          <div ref={modalRef} className="relative transform overflow-hidden rounded-lg bg-white p-6 shadow-xl">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Add Driver</h3>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700" htmlFor="driver-name">Driver Name</label>
              <input id="driver-name" type="text" value={driverName} onChange={event => {setDriverName(event.target.value);}} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
              <label className="block text-sm font-medium text-gray-700" htmlFor="driver-name">Country</label>
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
              <label className="block text-sm font-medium text-gray-700" htmlFor="driver-name">Team Chief</label>
              <input id="team-chief" type="text" value={teamChief} onChange={event => {setTeamChief(event.target.value);}} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
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
              <label className="block text-sm font-medium text-gray-700" htmlFor="driver-name">Circuit Name</label>
              <input id="circuit-name" type="text" value={raceCircuit} onChange={event => {setRaceCircuit(event.target.value);}} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
              <label className="block text-sm font-medium text-gray-700" htmlFor="driver-name">Number Of Laps</label>
              <input id="number-of-laps" type="number" value={numberOfLaps} onChange={event => {setNumberOfLaps(event.target.value);}} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
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

    // FIX
    else if (fail) {
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