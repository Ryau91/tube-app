let rawdata
let stationNamesIds = new Map()

async function fetchData() {
    try {
      const response = await fetch("./src/data/rawdata.json");
      rawdata = await response.json();
  
      // Assuming rawdata contains a property called "stopPoints"
      const stopPointData = rawdata.stopPoints;
      console.log(stopPointData);

      // Now you can process stopPointData to fill the stationNames array if needed
        for (let x in stopPointData) {
            let stationName = stopPointData[x].commonName
            let stationId = stopPointData[x].icsCode
            stationName = stationName.replace(' DLR Station','')
            stationName = stationName.replace(' dlr Station','')
            stationName = stationName.replace(' Overground Station','')
            stationName = stationName.replace(' Rail Station','')
            stationName = stationName.replace(' Underground Station','')
            stationName = stationName.replace(' Station','')
            stationNamesIds.set(stationName, stationId)
            }
        
        const sortedArray = Array.from(stationNamesIds);
        console.log(sortedArray)
        sortedArray.sort((a, b) => a[0].localeCompare(b[0]));
        stationNamesIds = new Map(sortedArray);

        console.log(stationNamesIds)

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

fetchData()