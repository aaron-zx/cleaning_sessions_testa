/*
  Instructions Verification

  Provides verification ONLY for the instructions parameter
  provided at the POST query.
*/
const basePost = {
  roomSize: [2, 2],
  coords: [1, 1],
  patches: [],
};


const testDataExpected = [
  {
    instructions: "",
    expected: {
      coords: [1, 1],
    },
    description: "Empty",
  },
  {
    instructions: "N",
    expected: {
      coords: [1, 2],
    },
    description: "Arriving to frontier N",
  },
  {
    instructions: "S",
    expected: {
      coords: [1, 0],
    },
    description: "Arriving to frontier S",
  },
  {
    instructions: "E",
    expected: {
      coords: [2, 1],
    },
    description: "Arriving to frontier E",
  },
  {
    instructions: "W",
    expected: {
      coords: [0, 2],
    },
    description: "Arriving to frontier W",
  },
]

const testDataErrors = [
  {
    instructions: "LO&%621uh",
    description: "Strange characters and letters",
  },
  {
    instructions: "nnewsenn",
    description: "Lowcase cardinal",
  },
  {
    instructions: " ",
    description: "Spaces",
  },
  {
    instructions: "NN",
    description: "Beyond frontier N",
  },
  {
    instructions: "SS",
    description: "Beyond frontier S",
  },
  {
    instructions: "EE",
    description: "Beyond frontier E",
  },
  {
    instructions: "WW",
    description: "Beyond frontier W",
  },
]

Feature('Instructions Verification');

  // Testing valid instructions sets
  testDataExpected.forEach((data) => {
    const scenarioTitle = `With expected outputs- Scenario ${data.description}`
    Scenario(scenarioTitle, ({ I }) => {
      const query = {...basePost, ...data}
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
      const query = {...basePost, ...data}
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