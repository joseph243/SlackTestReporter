const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);

  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
    //end demo stuff

    //begin joev

  const dirnameString = __dirname;
  const testString = 'D:/a/_actions/joseph243/SlackTestReporter/v0.31';
  const testString2 = 'D:/a/campus_test_suite/campus_test_suite/build/test-results/test';

  const rootDir = dirnameString.split('_actions')[0];
  const outputDir = 'campus_test_suite/campus_test_suite/build/test-results/test';

  console.log('working directory: ' + __dirname);
  console.log('root directory: ' + rootDir);
  console.log('test directory: ' + rootDir + outputDir);

  var fs = require('fs');

  console.log('reading contents of test directory: ')
    fs.readdir(rootDir + outputDir, function (err, data) {
        if (err) throw err;
        console.log(data);
        });

  // Get the JSON webhook payload for the event that triggered the workflow:
  //const payload = JSON.stringify(github.context.payload, undefined, 2)
  //console.log(`The event payload: ${payload}`);

} catch (error) {
  core.setFailed("setFailed: " + error.message);
  console.log(error.message);
}