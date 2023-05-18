# Roomba Navigation Test Suite

This is a test suite for the Roomba navigation service. It includes API tests to validate the functionality of the service, including grid creation, navigation instructions, and cleaning operations.
PDF Document SDET Assignment - Aarón Patricio contains the API Testing Approach, Test Structure explanation, assumptions for the requirements and the bugs report itself. 

## Requirements

- Node.js (version 12.22.9)

## How to execute the service to test
### Requirements
- Docker v.18+

### Cloning the repository
   ```shell
    git clone https://bitbucket.org/platformscience/pltsci-sdet-assignment.git
   ```

### Building the service
From the root of this repository, run the following:

   ```shell
    sudo chmod +x service/run.sh
    docker build -t pltsci-sdet-assignment service
   ```
### Running the service
   ```shell
    docker run -d -p 8080:8080 --name pltsci-sdet-assignment pltsci-sdet-assignment
   ```

## Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/your-username/roomba-navigation-test-suite.git
   ```

2. Install the dependencies:

   ```shell
   cd roomba-navigation-test-suite
   npm install codeceptjs --save-dev
   ```

## Configuration

Before running the tests, make sure to configure the following:

1. **API endpoint:** Set the API endpoint URL in the test configuration file (`codecept.conf.js`). Update the `url` property to match your API endpoint. By default, the Docker container running the service API does it at http://localhost:8080

2. **Test data:** Customize the test data in the test files (`test/*.test.js`) according to your specific use cases. Modify the test data such as `roomSize`, `coords`, `patches`, `instructions`, and `expected` to reflect the scenarios you want to test.

## Running the Tests

To run the test suite, execute the following command:

```shell
npx codeceptjs run
```

You can add the flag --steps for printing the BDD steps taken for each scenario.

By default, all the tests in the `test` directory will be executed. If you want to run only a specific test, use the `--grep` flag followed by the test name or a part of the name.

```shell
npx codeceptjs run --grep "Roomba Navigation"
```

## Reporting

After running the tests, the test results will be displayed in the console.

## Continuous Integration (CI)

This test suite can be integrated into your CI/CD pipeline to ensure automated testing. Refer to your CI/CD tool's documentation for instructions on how to configure and execute the tests within your pipeline.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
