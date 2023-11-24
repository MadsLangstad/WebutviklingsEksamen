import React, { useState } from 'react';
import DriverList from '../components/DriverList';
import TeamList from '../components/TeamList';
import RaceList from '../components/RaceList';
import Modal from '../components/shared/Modal';

const Home: React.FC = (props) => {
  
  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isRaceModalOpen, setIsRaceModalOpen] = useState(false);
  const [isStatusMessageModalOpen, setIsStatusMessageModalOpen] = useState(false);

  return (
    <>
      <Modal type="statusMessage" data={ null } open={isStatusMessageModalOpen} setOpen={setIsStatusMessageModalOpen} />

      <div className="flex flex-row justify-end mt-10 mr-10">
        <svg xmlns="http://www.w3.org/2000/svg" fill={ props.isLightMode ? 'none' : 'black' } viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6 mr-8${ props.isLightMode ? '' : ' cursor-pointer'}`} onClick={() => props.setLightDarkMode('light')}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>

        <svg xmlns="http://www.w3.org/2000/svg" fill={ props.isLightMode ? 'black' : 'none' } viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6${ props.isLightMode ? ' cursor-pointer' : ''}`} onClick={() => props.setLightDarkMode('dark')}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
      </div>

      <div className="flex flex-row justify-between items-center">
        <div></div>
        <div>
          <h1 className="text-5xl font-bold font-mono tracking-widest mt-10 mb-10">Drivers</h1>
        </div>
        <div>
          <svg onClick={() => setIsDriveModalOpen(true)} className="cursor-pointer mr-10 w-8 h-8 text-black dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
      </div>
      
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 p-4 justify-center place-items-center">
        <DriverList />
      </div>

      <Modal type="driver" data={ null } open={isDriveModalOpen} setOpen={setIsDriveModalOpen} />

      <div className="flex flex-row justify-between items-center">
        <div></div>
        <div>
          <h1 className="text-5xl font-bold tracking-widest text-center mt-10 mb-10 font-mono">Teams</h1>
        </div>
        <div>
          <svg onClick={() => setIsTeamModalOpen(true)} className="cursor-pointer mr-10 w-8 h-8 text-black dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
      </div>

      <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 p-4 justify-center place-items-center">
        <TeamList />
      </div>

      <Modal type="team" data={ null } open={isTeamModalOpen} setOpen={setIsTeamModalOpen} />

      <div className="flex flex-row justify-between items-center">
        <div></div>
        <div>
          <h1 className="text-5xl font-bold font-mono tracking-widest mt-10 mb-10">Races</h1>
        </div>
        <div>
          <svg onClick={() => setIsRaceModalOpen(true)} className="cursor-pointer mr-10 w-8 h-8 text-black dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
      </div>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 p-4 justify-center place-items-center">
        <RaceList />
      </div>

      <Modal type="race" data={ null } open={isRaceModalOpen} setOpen={setIsRaceModalOpen} />
    </>
  );
};

export default Home;
