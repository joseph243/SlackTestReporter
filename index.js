const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);

  const time = (new Date()).toTimeString();
  core.setOutput("time", time);

  console.log('dirname value: ' + __dirname);

  var fs = require('fs');
  const result = fs.readdir(__dirname, function (err, data) {
    if (err) throw err;
    console.log(data);
    });


    fs.readdir('C:/', function (err, data) {
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