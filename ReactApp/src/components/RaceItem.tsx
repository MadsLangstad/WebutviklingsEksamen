const RaceItem: React.FC<RaceItemProps> = ({
    race
  }) => {
    return (
      <div key={race.id} className="max-w-sm rounded overflow-hidden h-[28rem] w-[20rem] text-center shadow-lg hover:scale-110 bg-slate-100 border-2 border-black dark:bg-gray-800 p-4 m-2"> 
          <div className="text-black dark:text-gray-400 font-bold text-2xl font-mono mb-2">{race.grandPrix}</div>
          <p className="text-black dark:text-gray-400 text-base">Winner: {race.winner}</p>
          <p className="text-black dark:text-gray-400 text-base">Laps: {race.laps}</p>
          <img src={`http://localhost:5143/images/races/${race.image}`} alt="" />
          {/* <p className="text-black dark:text-gray-400 text-base">Date: {race.date}</p>
          <p className="text-black dark:text-gray-400 text-base">Car: {race.car}</p>
          <p className="text-black dark:text-gray-400 text-base">Time: {race.time}</p> */}
        </div>
    );
  };
  
  export default RaceItem;