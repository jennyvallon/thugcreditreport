# thugcreditreport
MEAN stack application. Credit reporting system for the criminal enterprise. Reputation beyond word of mouth.

Config
Project currently configured to work on localhost:3000.
Uses mongo db also on localhost:27010 
application defaults to development mode if process.env.NODE_ENV variable is not set.


Setup 
0. If setting to production change process.env.NODE_ENV in CLI.
1.go to application root folder in CLI
2.type "npm install", press enter to download dependencies
2. type "node server", press enter to run application.

Note
Make sure you have no projects running on localhost:3000 and nothing on port 27010(for mongodb instance)
As of 6.21.2016 mongo is running on localhost
db will be relocated to jennyvallon.com while in development.

Troubleshooting tools
1."top" in CLI to check for ports collision or multiple instances of app
2. special characters accidentally make it into the code-console will show them. Delete them.
3. make sure queries run on model are introduced in the schema.
4. Make sure configs are correct as app architecture changes
5. If not above, you fucked something up with the code--may God bless your soul.



