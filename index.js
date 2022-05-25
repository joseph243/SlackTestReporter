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
  console.log('working directory: ' + dirnameString);

  const rootDir = dirnameString.split('_actions')[0];
  console.log('root directory: ' + rootDir);

  const outputDir = core.getInput('testOutputPath');
  const testDir = rootDir + outputDir;
  console.log('test directory: ' + testDir);

  var fs = require('fs');
  console.log('reading contents of test directory: ')
    fs.readdir(testDir, function (err, data) {
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