const TeamItem: React.FC<TeamItemProps> = ({
    team
  }) => {
    return (
      <div key={team.id} className="max-w-sm rounded overflow-hidden h-[28rem] w-[20rem] text-center shadow-lg hover:scale-110 bg-slate-100 border-2 border-black dark:bg-gray-800 p-4 m-2"> 
          <div className="text-black dark:text-gray-400 font-bold text-2xl font-mono mb-2">{team.fullTeamName}</div>
          <p className="text-black dark:text-gray-400 text-base">Base: {team.base}</p>
          <p className="text-black dark:text-gray-400 text-base">World championships: {team.worldChampionships}</p>
          <img src={`http://localhost:5143/images/teams/${team.image}`} alt="" />
          {/* <p className="text-black dark:text-gray-400 text-base">Team chief: {team.teamChief}</p>
          <p className="text-black dark:text-gray-400 text-base">Technical chief: {team.technicalChief}</p>
          <p className="text-black dark:text-gray-400 text-base">Chassis: {team.chassis}</p>
          <p className="text-black dark:text-gray-400 text-base">Power unit: {team.powerUnit}</p>
          <p className="text-black dark:text-gray-400 text-base">First team entry: {team.firstTeamEntry}</p>
          <p className="text-black dark:text-gray-400 text-base">Highest race finish: {team.highestRaceFinish}</p>
          <p className="text-black dark:text-gray-400 text-base">Pole positions: {team. polePositions }</p>
          <p className="text-black dark:text-gray-400 text-base">Fastest laps: {team.fastestLaps}</p> */}
        </div>
    );
  };
  
  export default TeamItem;