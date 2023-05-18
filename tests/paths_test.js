/*
  Tests for Roomba Navigation

  Provides a set of test scenarios for achievable
  paths to test the correct operation of the endpoint
  as a blackbox
*/

testData = [
  {
    roomSize: [5, 5],
    coords: [1, 2],
    patches: [],
    instructions: "",
    expected: {
      coords: [1, 2],
      patches: 0,
    },
    description: "No patches and no movement"
  },
  {
    roomSize: [5, 5],
    coords: [2, 2],
    patches: [],
    instructions: "NNN",
    expected: {
      coords: [2, 5],
      patches: 0,
    },
    description: "Straight path and no patches"
  },
  {
    roomSize: [5, 5],
    coords: [1, 1],
    patches: [[1, 2], [3, 3], [4, 1]],
    instructions: "NESESENNW",
    expected: {
      coords: [3, 2],
      patches: 2,
    },
    description: "Complex Path 1"
  },
  {
    roomSize: [5, 5],
    coords: [1, 1],
    patches: [[1, 2], [3, 3], [4, 1]],
    instructions: "ENNESSEN",
    expected: {
      coords: [4, 2],
      patches: 2,
    },
    description: "Complex Path 2"
  },
  {
    roomSize: [5, 5],
    coords: [1, 1],
    patches: [[1, 2], [3, 3], [4, 1]],
    instructions: "NNEESWSEENN",
    expected: {
      coords: [4, 3],
      patches: 3,
    },
    description: "Complex Path 3"
  },
  {
    roomSize: [5, 5],
    coords: [1, 1],
    patches: [[1, 2], [3, 3], [4, 1]],
    instructions: "NNNEEEWWN",
    expected: {
      coords: [2, 5],
      patches: 0,
    },
    description: "Complex Path 4"
  },
  {
    roomSize: [5, 5],
    coords: [1, 1],
    patches: [[1, 2], [3, 3], [4, 1]],
    instructions: "SWNNNNNEESS",
    expected: {
      coords: [2, 3],
      patches: 0,
    },
    description: "Complex Path 5"
  }
]

Feature('Roomba Navigation');

  // Testing achievable paths against expected results
  testData.forEach((data) => {
    const scenarioTitle = `Scenario ${data.description}`
    Scenario(scenarioTitle, ({ I }) => {
      const { roomSize, coords, patches, instructions, expected } = data;
      I.sendPostRequest('/v1/cleaning-sessions', {
        roomSize,
        coords,
        patches,
        instructions,
      });
      I.seeResponseContainsJson(expected)
    })

  })