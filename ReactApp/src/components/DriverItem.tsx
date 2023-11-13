const DriverItem: React.FC<DriverItemProps> = ({
  driver
}) => {
  return (
        <div key={driver.id} className="max-w-sm rounded overflow-hidden h-[28rem] w-[20rem] text-center shadow-lg bg-slate-100 border-2 border-black hover:scale-110 dark:bg-gray-800 p-4 m-2"> 
            <div className="text-black dark:text-gray-400 font-bold text-2xl font-mono mb-2">{driver.name}</div>
                <p className="text-black dark:text-gray-400 text-base">Team: {driver.team}</p>
                <p className="text-black dark:text-gray-400 text-base">Country: {driver.country}</p>
                <img src={`http://localhost:5143/images/drivers/${driver.image}`} alt="" />
                {/* <p className="text-black dark:text-gray-400 text-base">Podiums: {driver.podiums}</p>
                <p className="text-black dark:text-gray-400 text-base">Points: {driver.points}</p>
                <p className="text-black dark:text-gray-400 text-base">Grand Prix Entered: {driver.grandPrixEntered}</p>
                <p className="text-black dark:text-gray-400 text-base">World championships: {driver.worldChampionships}</p>
                <p className="text-black dark:text-gray-400 text-base">Highest race finish: {driver.highestRaceFinish}</p>
                <p className="text-black dark:text-gray-400 text-base">Highest grid position: {driver.highestGridPosition}</p>
                <p className="text-black dark:text-gray-400 text-base">Date of birth: {driver.dateOfBirth}</p>
                <p className="text-black dark:text-gray-400 text-base">Place of birth: {driver.placeOfBirth}</p> */}
        </div>
    );
};
export default DriverItem;