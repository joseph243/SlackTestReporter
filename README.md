# SlackTestReporter
Git Action:  Test Results to Slack


EXAMPLE IMPLEMENTATION:
each parameter is required.



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

![image](https://user-images.githubusercontent.com/29494997/170576710-cf25159a-9936-4b18-aad9-dcdafdafd87c.png)
