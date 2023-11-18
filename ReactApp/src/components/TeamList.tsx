import React, { useContext  } from 'react';
import { DataContext } from '../contexts/DataContext';
import TeamItem from './TeamItem';

const TeamList: React.FC = () => {
  const { teams } = useContext(DataContext);

  return (
    <>
      {teams.map(team => (
        <TeamItem
          key={team.id}
          team={team}
        />
      ))}
    </>
  );
};
export default TeamList;
