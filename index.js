const core = require('@actions/core');
const github = require('@actions/github');

try {
  const nameToGreet = core.getInput('who-to-greet');
  //demo output to git action UI
  //const time = (new Date()).toTimeString();
  //core.setOutput("time", time);
    //end demo stuff

  const dirnameString = __dirname;
  console.log('working directory: ' + dirnameString);

  const rootDir = dirnameString.split('_actions')[0];
  console.log('root directory: ' + rootDir);

  const outputDir = core.getInput('testOutputPath');
  const testDir = rootDir + outputDir;
  console.log('test directory: ' + testDir);
  
  const slackToken = core.getInput('slackToken');
  const slackChannelId = core.getInput('slackChannelId');

  //Slack web hook init:
  const { WebClient } = require('@slack/web-api');
  const web = new WebClient(slackToken);
  slackBot(`Hello ${nameToGreet}!`);

  //file system reader init:
  var fs = require('fs');

  //read file system and handle data:
  console.log('reading contents of test directory... ');
  fs.readdir(testDir, function (err, data) {
    //error handling or lack of it:        
    if (err) throw err;
    //list files:
    console.log("Found files: ");
    console.log(data);

    data.forEach(function (fileName) {
      // per file actions here, include only TEST files:
      if (fileName.includes('TEST')) {
        //grab file and populate content to JS object:
        var convert = require('xml-js');
        var xml = require('fs').readFileSync(testDir + '/' + fileName, 'utf8');
        var options = {ignoreComment: true, alwaysChildren: true};
        var content = convert.xml2js(xml, options); // or convert.xml2json(xml, options)
        //process and output attributes:
        //if (short output stirng for passed test) else (long output string for failed test):
        console.log("calculating test results, deciding if abbreviate output");
        if ( parseInt(content.elements[0].attributes.skipped) == 0 &&
             parseInt(content.elements[0].attributes.failures) == 0 &&
             parseInt(content.elements[0].attributes.errors) == 0
           ) {
           console.log("building abbreviated string for " + content.elements[0].attributes.name);
           let SHORTOUTPUT = "" + content.elements[0].attributes.name + " ALL PASSED:";
           for (let i = 0; i < parseInt(content.elements[0].attributes.tests); i++) {
            SHORTOUTPUT += " :green_apple:";
           }
           SHORTOUTPUT += "\r\n";
           slackBot(SHORTOUTPUT);
        }
        else {
           console.log("building long string for failed test: " + content.elements[0].attributes.name);
           let OUTPUTSTR = "";
           OUTPUTSTR += ":apple: FAILURES: ";
           OUTPUTSTR += content.elements[0].attributes.name;
           OUTPUTSTR += ":apple:";
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
           OUTPUTSTR += "\r\n";
           slackBot(OUTPUTSTR);
        }
      }

    });
  });

  //function for send text to slack: 
  function slackBot(inString) {
    console.log("Sending to Slack: ");
    console.log("===============================================================");
    console.log(inString);
    console.log("===============================================================");
  (async () => {
    // See: https://api.slack.com/methods/chat.postMessage
    const res = await web.chat.postMessage({ channel: slackChannelId, text: inString });
    // `res` contains information about the posted message
    return ('Message sent: ', res.ts);
  })();

  }





  // Get the JSON webhook payload for the event that triggered the workflow:
  //const payload = JSON.stringify(github.context.payload, undefined, 2)
  //console.log(`The event payload: ${payload}`);

} catch (error) {
  core.setFailed("setFailed: " + error.message);
  console.log(error.message);
}