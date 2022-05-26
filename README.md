# SlackTestReporter
Git Action:  Test Results to Slack


EXAMPLE IMPLEMENTATION:
each parameter is required.



===================================

    steps:
    
    - MY JUNIT TEST SUITE
    
    - name: Test Report - Slack
      id: hello
      uses: joseph243/SlackTestReporter@v0.95
      with:
        who-to-greet: 'Slack and Junit Tester'
        testOutputPath: 'repository/repository/build/test-results/test'
        slackToken: 'xoxb-BOTTOKENRECOMMENDED24234322354235243'
        slackChannelId: 'C01234567'
        
===================================
