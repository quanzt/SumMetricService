# Sum Metric Service

Sum Metric Service is a logging and reporting service that sums up the metric's values with the most recent hour. This application included scripts for deployment and testing.
We will use Node.js and Express framework to deploy the webserver. Then interact with the APIs via Postman and Newman.

## Table of contents
---
1) [Requirements](#requirements)
2) [Usage Intructions](#usage-instructions)
3) [Tests](#tests)
4) [References](#references)

## Requirements
---
To run Sum Metric Service, ensure to have the following:
  * Node.js version 12 or greater. Download: [Node.js](https://nodejs.org/en/download/)
  * Postman version 7.25 or greater. Download: [Postman](https://www.postman.com/downloads/)

## Usage Instructions
---

0) Running from command line:
    * Install dependencies:
      ```sh
      npm install
      ```
    * Start the server:
       ```sh
       npm run startserver
       ```
       The service is active and running with the following output message: "app listening on port 8888"

1) Open Postman and create a new HTTP Request set to POST with the following url:
    ```sh
    http://localhost:8888/metric/{key}
    ```
    Note: {key} can be strings or/and numbers. For example:
    ```sh 
    http://localhost:8888/metric/active_vistors
    ```

2) Tab "Headers": Ensure key "Content-Type" and value "application/json" is selected.
   
3) Tab "Body": select raw JSON with the following format: 
   ```sh 
   {
       "value": {value}
   }
   ```
   Note: {value} must be numbers data type.

4) Next, 
   1) Click Send
   2) Status:200 Created should be displayed
   3) Posted data will show up as empty in the body
   4) Command line will show: "POST /metric/{key} { "value" = {value} }
   
5) Users may submit as many HTTP POST requests with variance {key} and {value}.
6) Set your HTTP request to GET
7) Input this link: 
   ```sh
   http://localhost:8888/metric/{key}/sum
   ```
   Note: replace {key} with your key. For example:
    ```sh 
    http://localhost:8888/metric/active_vistors/sum
    ```
8) Next,
   1) Click Send
   2) Status:200 Created should be displayed
   3) GET data will show up in the body.
    ```sh
    {
        "value": {value}
    }
    ```
    This {value} should be the total sum values of your metric key within the last hour

## Tests
---
Contract testing included Postman, Node.js, Express, and Newman. The code is testable and comprehensive. Furthermore, the unit tests did test the code for its performing intended functionality. 

To run scripts test suite:
```sh
npm run contractTests
```

Testing can be improved by running multiple Postman Collection in parallel for stress test.

## References
---
* https://www.npmjs.com/package/express
* https://www.npmjs.com/package/body-parser
* https://stackoverflow.com/questions/19700283/how-to-convert-time-milliseconds-to-hours-min-sec-format-in-javascript
* https://expressjs.com/en/guide/error-handling.html
* https://medium.com/@adnanrahic/hello-world-app-with-node-js-and-express-c1eb7cfa8a30
* https://medium.com/@gururajhm/contract-api-testing-with-postman-node-js-express-newman-d91f3cd51fd4
