import { MdDelete } from "react-icons/md";

const Inputs = ({
  handleChangeOne,
  handleChangeTwo,
  stationOne,
  stationTwo,
  setStationOne,
  setStationTwo,
  resetStationOne,
  resetStationTwo,
  goClick,
  resetClick,
  optionsOne,
  setOptionsOne,
  displayOne,
  setDisplayOne,
  optionsTwo,
  setOptionsTwo,
  displayTwo,
  setDisplayTwo,
}) => {
  const setFromList = (entry, setStation, setDisplay) => {
    setStation(entry);
    setDisplay(false);
  };

  return (
    <div className="main-container">
      <div className="input-container">
        <div className="station station-one">
          <input
            type="text"
            placeholder="From"
            value={stationOne}
            onChange={handleChangeOne}
            onClick={() => (setDisplayOne(!displayOne), setDisplayTwo(false))}
          />
          <MdDelete className="delete-icon" onClick={resetStationOne} />
        </div>
        <div className="station station-two">
          <input
            type="text"
            placeholder="To"
            value={stationTwo}
            onChange={handleChangeTwo}
            onClick={() => (setDisplayTwo(!displayTwo), setDisplayOne(false))}
          />
          <MdDelete className="delete-icon" onClick={resetStationTwo} />
        </div>
        {displayOne && (
          <div className="autoContainer autoConOne">
            {optionsOne
              .filter(
                (entry) =>
                  entry.toLowerCase().indexOf(stationOne.toLowerCase()) > -1
              )
              .map((entry) => {
                return (
                  <div
                    onClick={() =>
                      setFromList(entry, setStationOne, setDisplayOne)
                    }
                    className="option"
                    key={entry}
                  >
                    <div>{entry}</div>
                  </div>
                );
              })}
          </div>
        )}
        {displayTwo && (
          <div className="autoContainer autoConTwo">
            {optionsTwo
              .filter(
                (entry) =>
                  entry.toLowerCase().indexOf(stationTwo.toLowerCase()) > -1
              )
              .map((entry) => {
                return (
                  <div
                    onClick={() =>
                      setFromList(entry, setStationTwo, setDisplayTwo)
                    }
                    className="option"
                    key={entry}
                  >
                    <div>{entry}</div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
      <div className="buttons">
        <button className="button go" onClick={goClick}>
          GO
        </button>
        <button className="button reset" onClick={resetClick}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Inputs;
