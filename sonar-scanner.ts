// Santosh Shinde
// https://twitter.com/shindesan2012

import * as scanner from 'sonarqube-scanner';

// config the environment

// The URL of the SonarQube server. Defaults to http://localhost:9000
const serverUrl = 'http://localhost:9000';

// The token used to connect to the SonarQube/SonarCloud server. Empty by default.
const token = 'de4fd6c67c421692e1529d6cfc069554c8c38161';

// projectKey must be unique in a given SonarQube instance
const projectKey = 'sample-nest-app';

// options Map (optional) Used to pass extra parameters for the analysis.
// See the [official documentation](https://docs.sonarqube.org/latest/analysis/analysis-parameters/) for more details.
const options = {
  'sonar.projectKey': projectKey,

  // projectName - defaults to project key
  'sonar.projectName': 'node-typescript-boilerplate',

  // Path is relative to the sonar-project.properties file. Defaults to .
  'sonar.sources': 'src',

  // source language
  'sonar.language': 'ts',

  'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',

  // Encoding of the source code. Default is default system encoding
  'sonar.sourceEncoding': 'UTF-8',
};

// parameters for sonarqube-scanner
const params = {
  serverUrl,
  token,
  options,
};

const sonarScanner = async () => {
  console.log(serverUrl);

  if (!serverUrl) {
    console.log('SonarQube url not set. Nothing to do...');
    return;
  }

  //  Function Callback (the execution of the analysis is asynchronous).
  const callback = (result) => {
    console.log('Sonarqube scanner result:', result);
  };

  scanner(params, callback);
};

sonarScanner().catch((err) => console.error('Error during sonar scan', err));
