/*
  Dirty Patches Verification

  Provides verification ONLY for the patches parameter
  provided at the POST query.
*/
const basePost = {
  roomSize: [2, 2],
  coords: [0, 1],
  instructions: "",
};

const testDataAccepted = [
  {
    description: "Any Zero X",
    patches: [[0, 1], [1, 1]],
  },
  {
    description: "Any Zero Y",
    patches: [[1, 0], [1, 1]],
  },
  {
    description: "Any Zero X and Y",
    patches: [[0, 0], [1, 1]],
  },
  {
    description: "Any Frontier X",
    patches: [[2, 1], [1, 1]],
  },
  {
    description: "Any Frontier Y",
    patches: [[1, 2], [1, 1]],
  },
  {
    description: "Any Frontier X and Y",
    patches: [[2, 2], [1, 1]],
  },
]

const testDataErrors = [
  {
    description: "Any Negative X",
    patches: [[-1, 1], [1, 1]],
  },
  {
    description: "Any Negative Y",
    patches: [[1, -1], [1, 1]],
  },
  {
    description: "Any Negative X and Y",
    patches: [[-1, -1], [1, 1]],
  },
  {
    description: "Any Beyond Frontier X",
    patches: [[3, 1], [1, 1]],
  },
  {
    description: "Any Beyond Frontier Y",
    patches: [[1, 3], [1, 1]],
  },
  {
    description: "Any Beyond Frontier X and Y",
    patches: [[3, 3], [1, 1]],
  },
]

Feature('Patches Verification');

  // Testing expected accepted values
  testDataAccepted.forEach((data) => {
    const scenarioTitle = `With valid values- Scenario ${data.description}`
    Scenario(scenarioTitle, ({ I }) => {
      const query = {...data, ...basePost}
      const { patches, roomSize, coords, instructions } = query;
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
      const { patches, roomSize, coords, instructions } = query;
      I.sendPostRequest('/v1/cleaning-sessions', {
        roomSize,
        coords,
        patches,
        instructions,
      });
      I.seeResponseCodeIsClientError();
    })

  })

  // Testing 0 patches as output given no patches at the input
  Scenario('No patches', ({ I }) => {
    I.sendPostRequest('/v1/cleaning-sessions', {
      roomSize: [2, 2],
      coords: [0, 1],
      patches: [],
      instructions: "N",
    });
    I.seeResponseCodeIsSuccessful();
    I.seeResponseContainsJson({
      coords: [0, 2],
      patches: 0,
    })
  })

  // Testing 0 patches as output given no patches is cleaned
  Scenario('No intersection', ({ I }) => {
    I.sendPostRequest('/v1/cleaning-sessions', {
      roomSize: [2, 2],
      coords: [0, 1],
      patches: [[1,1]],
      instructions: "N",
    });
    I.seeResponseCodeIsSuccessful();
    I.seeResponseContainsJson({
      coords: [0, 2],
      patches: 0,
    })
  })