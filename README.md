# SlackTestReporter

Send the results of your JUnit test suite into a Slack message.  Simple test output for non-technical audience.


Required Parameters:

    testOutputPath (folder location of the JUnit XML Results)
    
    slackToken (Slack Bot-Type Token with "write" permission)
    
    slackChannelId (Slack Channel ID)
    
Optional Parameters:

    who-to-greet (name of person to greet at beginning of Slack message)
    


EXAMPLE IMPLEMENTATION:
===================================

    steps:
    
    - [JUNIT TEST SUITE STEPS]
    
    - name: Test Report - Slack
      id: hello
      uses: joseph243/SlackTestReporter@v1.0
      with:
        who-to-greet: 'Tester'
        testOutputPath: 'repository/repository/build/test-results/test'
        slackToken: 'xoxb-BOTTOKENRECOMMENDED24234322354235243'
        slackChannelId: 'C01234567'
        
===================================

![image](https://user-images.githubusercontent.com/29494997/170848566-552809c0-0a0a-4c4b-ab01-59503decdadc.png)
