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
        //error handling or lack of it:        
        if (err) throw err;

        //list files:
        console.log(data);

        data.forEach(function (fileName) {
            // per file actions here, include only TEST files.
            if (fileName.includes('TEST')) {
                //grab file and populate content to JS object
                var convert = require('xml-js');
                var xml = require('fs').readFileSync(testDir + '/' + fileName, 'utf8');
                var options = {ignoreComment: true, alwaysChildren: true};
                var content = convert.xml2js(xml, options); // or convert.xml2json(xml, options)

                //view and output attributes.
                console.log("TEST GROUP: " + content.elements[0].attributes.name);
                console.log("tests: " + content.elements[0].attributes.tests);
                console.log("skips: " + content.elements[0].attributes.skipped);
                console.log("fails: " + content.elements[0].attributes.failures);
                console.log("error: " + content.elements[0].attributes.errors);                }
        });
    });

  // Get the JSON webhook payload for the event that triggered the workflow:
  //const payload = JSON.stringify(github.context.payload, undefined, 2)
  //console.log(`The event payload: ${payload}`);

} catch (error) {
  core.setFailed("setFailed: " + error.message);
  console.log(error.message);
}