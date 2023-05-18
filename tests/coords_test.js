/*
  Start Coordinates Verification

  Provides verification ONLY for the coords parameter
  provided at the POST query.
*/
const basePost = {
  roomSize: [2, 2],  
  patches: [[1, 1]],
  instructions: "",
};

const testDataAccepted = [
  {
    description: "Zero X",
    coords: [0, 1],
  },
  {
    description: "Zero Y",
    coords: [1, 0],
  },
  {
    description: "Zero X and Y",
    coords: [0, 0],
  },
  {
    description: "Frontier X",
    coords: [2, 1],
  },
  {
    description: "Frontier Y",
    coords: [1, 2],
  },
  {
    description: "Frontier X and Y",
    coords: [2, 2],
  },
]

const testDataErrors = [
  {
    description: "Negative X",
    coords: [-1, 1],
  },
  {
    description: "Negative Y",
    coords: [1, -1],
  },
  {
    description: "Negative X and Y",
    coords: [-1, -1],
  },
  {
    description: "Beyond Frontier X",
    coords: [3, 1],
  },
  {
    description: "Beyond Frontier Y",
    coords: [1, 3],
  },
  {
    description: "Beyond Frontier X and Y",
    coords: [3, 3],
  },
]

Feature('Origin Coordinates Verification');

  // Testing expected accepted values
  testDataAccepted.forEach((data) => {
    const scenarioTitle = `With valid values- Scenario ${data.description}`
    Scenario(scenarioTitle, ({ I }) => {
      const query = {...data, ...basePost}
      const { coords, roomSize, patches, instructions } = query;
      I.sendPostRequest('/v1/cleaning-sessions', {
        roomSize,
        coords,
        patches,
        instructions,
      });
      I.seeResponseCodeIsSuccessful();
    })

  })

  // Testing expected 400 Bad Request for bad data
  testDataErrors.forEach((data) => {
    const scenarioTitle = `Errors expected- Scenario ${data.description}`
    Scenario(scenarioTitle, ({ I }) => {
      const query = {...data, ...basePost}
      const { coords, roomSize, patches, instructions } = query;
      I.sendPostRequest('/v1/cleaning-sessions', {
        roomSize,
        coords,
        patches,
        instructions,
      });
      I.seeResponseCodeIsClientError();
    })

  })