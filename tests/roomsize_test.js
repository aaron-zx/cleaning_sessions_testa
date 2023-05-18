/*
  Tests for Room Size verification

  Provides verification ONLY for the roomSize parameter
  provided at the POST query.
*/
const basePost = {
  coords: [1, 2],
  patches: [[1, 0],[2, 2], [2, 3]],
  instructions: "NNESEESWNWW",
};

const baseExpected = {
  expected: {
    coords: [1, 3],
  }
};

const testDataExpected = [
  {
    description: "Large number X",
    roomSize: [1000000000, 5],
  },
  {
    description: "Large number Y",
    roomSize: [5, 1000000000],
  },
  {
    description: "Large numbers X and Y",
    roomSize: [1000000000, 1000000000],
  }
]

const testDataErrors = [
  {
    description: "Negative X",
    roomSize: [-5, 5],
  },
  {
    description: "Negative Y",
    roomSize: [5, -5],
  },
  {
    description: "Negative X and Y",
    roomSize: [-5, -5],
  },
  {
    description: "Zero X",
    roomSize: [0, 5],
  },
  {
    description: "Zero Y",
    roomSize: [5, 0],
  },
  {
    description: "Zero X and Y",
    roomSize: [0, 0],
  },
]

Feature('Room Size Verification');

// Testing expected correct result independently of a big canvas
testDataExpected.forEach((data) => {
    const scenarioTitle = `With expected outputs- Scenario ${data.description}`
    Scenario(scenarioTitle, ({ I }) => {
      const query = {...data, ...basePost, ...baseExpected}
      const { roomSize, coords, patches, instructions, expected } = query;
      I.sendPostRequest('/v1/cleaning-sessions', {
        roomSize,
        coords,
        patches,
        instructions,
      });
      I.seeResponseContainsJson(expected)
    })

  })

  // Testing expected 400 Bad Request for bad data
  testDataErrors.forEach((data) => {
    const scenarioTitle = `Errors expected- Scenario ${data.description}`
    Scenario(scenarioTitle, ({ I }) => {
      const query = {...data, ...basePost}
      const { roomSize, coords, patches, instructions } = query;
      I.sendPostRequest('/v1/cleaning-sessions', {
        roomSize,
        coords,
        patches,
        instructions,
      });
      I.seeResponseCodeIsClientError();
    })

  })