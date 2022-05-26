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

  let OUTPUTSTR = ".";

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

                console.log("building string for " + content.elements[0].attributes.name);
                OUTPUTSTR += "TEST SET: ";
                OUTPUTSTR += content.elements[0].attributes.name;

                OUTPUTSTR += "\r\n";

                OUTPUTSTR += "TESTS / SKIPPED / FAILED / ERRORS";

                OUTPUTSTR += "\r\n";

                OUTPUTSTR += content.elements[0].attributes.tests; 
                OUTPUTSTR += " / ";
                OUTPUTSTR += content.elements[0].attributes.skipped;
                OUTPUTSTR += " / ";
                OUTPUTSTR += content.elements[0].attributes.failures;
                OUTPUTSTR += " / ";
                OUTPUTSTR += content.elements[0].attributes.errors;
                OUTPUTSTR += " / ";
                
                OUTPUTSTR += "\r\n";
            }

        });
    });


  // SLACK STUFF
  console.log("Prepared message is: ");
  console.log("===============================================================");
  console.log(OUTPUTSTR);
  console.log("===============================================================");
  //required action parameters:
  const slackToken = core.getInput('slackToken');
  const slackChannelId = core.getInput('slackChannelId');

  const { WebClient } = require('@slack/web-api');

  const web = new WebClient(slackToken);

(async () => {
  // See: https://api.slack.com/methods/chat.postMessage
  const res = await web.chat.postMessage({ channel: slackChannelId, text: OUTPUTSTR });

  // `res` contains information about the posted message
  console.log('Message sent: ', res.ts);
})();





  // Get the JSON webhook payload for the event that triggered the workflow:
  //const payload = JSON.stringify(github.context.payload, undefined, 2)
  //console.log(`The event payload: ${payload}`);

} catch (error) {
  core.setFailed("setFailed: " + error.message);
  console.log(error.message);
}