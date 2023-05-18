/*
  Endpoint Connection Verification

  Verifies if the communication with the endpoint is correct
*/
Feature('API Connection');

// Testing response code 200 and expected keys in the payload
Scenario('Verifying API connection and keys', ({ I }) => {
    I.sendPostRequest('/v1/cleaning-sessions', {
        roomSize: [5, 5],
        coords: [1, 2],
        patches: [[1, 0],[2, 2], [2, 3]],
        instructions: "NNESEESWNWW",
    });
    I.seeResponseCodeIsSuccessful();
    I.seeResponseContainsKeys(['coords', 'patches']);
})