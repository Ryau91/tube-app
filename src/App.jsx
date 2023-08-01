import { useState } from "react";
import Header from "./components/Header";
import Inputs from "./components/Inputs";
import CostAndTime from "./components/CostAndTime";
import Legs from "./components/Legs";
import stations from "./data/stations.js";
// api_key

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [cost, setCost] = useState("");
  const [time, setTime] = useState("");
  const [legs, setLegs] = useState([]);

  const [stationOne, setStationOne] = useState("");
  const [stationTwo, setStationTwo] = useState("");

  const handleChangeOne = (event) => {
    setStationOne(event.target.value);
    setDisplayOne(true);
  };
  const handleChangeTwo = (event) => {
    setStationTwo(event.target.value);
    setDisplayTwo(true);
  };

  const resetStationOne = () => {
    setStationOne("");
  };

  const resetStationTwo = () => {
    setStationTwo("");
  };

  const stationNamesArray = stations.map((station) => station.key);

  const [displayOne, setDisplayOne] = useState(false);
  const [displayTwo, setDisplayTwo] = useState(false);

  const [optionsOne, setOptionsOne] = useState(stationNamesArray);
  const [optionsTwo, setOptionsTwo] = useState(stationNamesArray);

  const goClick = () => {
    if (stationOne !== "" && stationTwo !== "") {
      // find the IDs to be supplied to the get request
      let stationOneId;
      let stationTwoId;
      // find the first entry in the stations array where station.key matches stationOne
      let stationEntryOne = stations.find(
        (station) => station.key === stationOne
      );
      if (stationEntryOne) {
        stationOneId = stationEntryOne.value;
        console.log(`The ID of ${stationOne} is ${stationOneId}`);
      } else {
        console.log(`${stationOne} not found.`);
      }

      let stationEntryTwo = stations.find(
        (station) => station.key === stationTwo
      );
      if (stationEntryTwo) {
        stationTwoId = stationEntryTwo.value;
        console.log(`The ID of ${stationTwo} is ${stationTwoId}`);
      } else {
        console.log(`${stationTwo} not found.`);
      }

      // fetch something

      if (
        stationOneId !== undefined &&
        stationTwoId !== undefined &&
        stationOneId !== stationTwoId
      ) {
        const url =
          "https://api.tfl.gov.uk/Journey/JourneyResults/" +
          stationOneId +
          "/to/" +
          stationTwoId;
        // "?app_key=69e37cdcfbed42158805ae25c4da58b1";
        console.log(url);
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            const rawCost = data.journeys[0].fare?.totalCost;
            setCost(rawCost ? (rawCost / 100).toFixed(2) : null);
            // console.log(cost)

            const rawDuration = data.journeys[0].duration;
            if (rawDuration > 60) {
              setTime(
                Math.floor(rawDuration / 60) +
                  "hr " +
                  (rawDuration % 60) +
                  "mins"
              );
            } else {
              setTime(rawDuration + " mins");
            }
            // console.log(duration)

            const rawLegs = data.journeys[0].legs;
            for (const x in rawLegs) {
              console.log(rawLegs[x].instruction.summary);
            }
            // maybe add button to toggle other journeys //
            setLegs(
              data.journeys[0].legs.map((leg) => leg.instruction.summary)
            );
          })
          .catch((err) => console.error(err));
      }
    }
  };

  const resetClick = () => {
    setStationOne("");
    setStationTwo("");
    setCost("");
    setTime("");
    setLegs([]);
    setDisplayOne(false);
    setDisplayTwo(false);
  };

  return (
    // if darkMode is true, then add the dark-mode class
    <div className={`${darkMode && "dark-mode"} outer-container`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Inputs
          handleChangeOne={handleChangeOne}
          handleChangeTwo={handleChangeTwo}
          stationOne={stationOne}
          stationTwo={stationTwo}
          setStationOne={setStationOne}
          setStationTwo={setStationTwo}
          resetStationOne={resetStationOne}
          resetStationTwo={resetStationTwo}
          goClick={goClick}
          resetClick={resetClick}
          optionsOne={optionsOne}
          setOptionsOne={setOptionsOne}
          displayOne={displayOne}
          setDisplayOne={setDisplayOne}
          optionsTwo={optionsTwo}
          setOptionsTwo={setOptionsTwo}
          displayTwo={displayTwo}
          setDisplayTwo={setDisplayTwo}
        />
        <div className="results">
          <CostAndTime
            cost={
              cost !== "" && (cost === null ? "Fare not found" : `£${cost}`)
            }
            time={time}
          />
          <Legs legs={legs} />
        </div>
      </div>
      <footer>created by Robert Yau</footer>
    </div>
  );
}

export default App;
