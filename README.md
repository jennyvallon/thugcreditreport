# thugcreditreport<br>
MEAN stack application. Credit reporting system for the criminal enterprise. Reputation beyond word of mouth.<br>
<br>
Config<br>
Project currently configured to work on localhost:3000.<br>
Uses mongo db also on localhost:27010 <br>
application defaults to development mode if process.env.NODE_ENV variable is not set.<br>
<br>
<br>
Setup<br> 
0. If setting to production change process.env.NODE_ENV in CLI.<br>
1.go to application root folder in CLI<br>
2.type "npm install", press enter to download dependencies<br>
3. type "node server", press enter to run application.<br>
<br>
Note<br>
Make sure you have no projects running on localhost:3000 and nothing on port 27010(for mongodb instance)<br>
As of 6.21.2016 mongo is running on localhost<br>
db will be relocated to jennyvallon.com while in development.<br>
<br>
Troubleshooting tools<br>
1."top" in CLI to check for ports collision or multiple instances of app<br>
2. special characters accidentally make it into the code-console will show them. Delete them.<br>
3. make sure queries run on model are introduced in the schema.<br>
4. Make sure configs are correct as app architecture changes<br>
5. If not above, you fucked something up with the code--may God bless your soul.<br>



