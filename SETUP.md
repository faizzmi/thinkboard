PS C:\Users\User\thinkboard> mkdir backend


    Directory: C:\Users\User\thinkboard


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----         6/25/2026   3:30 PM                backend


PS C:\Users\User\thinkboard> mkdir frontend


    Directory: C:\Users\User\thinkboard


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----         6/25/2026   3:30 PM                frontend


PS C:\Users\User\thinkboard> cd backend
PS C:\Users\User\thinkboard\backend> npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (backend)
version: (1.0.0)                                                                                                                                           
description:
entry point: (index.js)                                                                                                                                    
test command:
git repository:                                                                                                                                            
keywords:                                                                                                                                                  
author:                                                                                                                                                    
license: (ISC)
About to write to C:\Users\User\thinkboard\backend\package.json:

{
  "name": "backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "description": ""
}


Is this OK? (yes)

PS C:\Users\User\thinkboard\backend> 
PS C:\Users\User\thinkboard\backend> npm install express@4.18.2 

added 68 packages, and audited 69 packages in 11s

12 packages are looking for funding
  run `npm fund` for details

7 vulnerabilities (3 low, 1 moderate, 3 high)

To address issues that do not require attention, run:
  npm audit fix

To address all issues, run:
  npm audit fix --force

Run `npm audit` for details.
PS C:\Users\User\thinkboard\backend> npm run server.js
npm error Missing script: "server.js"
npm error
npm error To see a list of scripts, run:
npm error   npm run
npm error A complete log of this run can be found in: C:\Users\User\AppData\Local\npm-cache\_logs\2026-06-25T07_35_00_688Z-debug-0.log
PS C:\Users\User\thinkboard\backend> npm run dev
npm error Missing script: "dev"
npm error
npm error To see a list of scripts, run:
npm error   npm run
npm error A complete log of this run can be found in: C:\Users\User\AppData\Local\npm-cache\_logs\2026-06-25T07_35_25_362Z-debug-0.log
PS C:\Users\User\thinkboard\backend> 