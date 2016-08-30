# thugcreditreport<br>
MEAN stack application. Credit reporting system for the criminal enterprise. Reputation beyond word of mouth.<br>
<br>
Config<br>
Project currently configured to launch on localhost:3000.<br>
Uses a remote mongodb instance<br>
App ENV variable defaults to development mode if process.env.NODE_ENV variable is not set.<br>
<br>
<br>
To Dos<br>
Thug Report is still in development. Here is what needs to happen to bring it to completion.<br>
1. Style-CURRENTLY IT STILL LOOKS LIKE CRAP. DO NOT BE ALARMED.<br>
2. create version using react and create an ENV variable for that version<br>
3. mongod auth<br>
4. Finish unit express unit testing<br>
5. Angular testing<br>
6. Separate Users from other collections in MongoD<br>
7. Create local instances of mongo to launch<br>
8. Create scoring API<br>
9. Finish score simulator<br>
10. Finalize content<br>
11. Facebook oauth<br>
<br>
<br>
How to Get Started<br> 
0.Fork<br>
1.go to application root folder in CLI<br>
2.$ npm install<br>
3.$ bower install<br>
4.$ gulp <br>
5. Project will launch in development environment by default. This is fine.
<br>
<br>
What You can expect<br>
1. Create user<br>
2. Answer some questions<br>
3. Get a score<br>
4. Simulate actions that would change score<br>
5. Sign out with localhost:3000/signout<br>
6. Sign in<br>
<br>
<br> 
Tasks<br>
1.$ gulp clean-sessions<br>
2.$ gulp clean-db <br>
3.$ gulp styles <br>
3.$ gulp start <br>
<br>
<br>
Testing<br>
1.$ NODE_ENV=test mocha --reporter spec app/tests <br>
<br>
<br>
Note<br>
Make sure you have no projects running on localhost:3000 <br>
<br>
<br>
Troubleshooting tools<br>
1."top" in CLI to check for ports collision or multiple instances of app<br>
2. special characters accidentally make it into the code-console will show them. Delete them.<br>
3. make sure queries run on model are introduced in the schema.<br>
4. Make sure configs are correct as app architecture changes<br>
5. If not above, you fucked something up with the code--may God bless your soul.<br>