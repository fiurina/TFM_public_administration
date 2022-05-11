# Deployment Instructions

1. Install & Run Ipfs node locally using following ports
   "API": "/ip4/127.0.0.1/tcp/5001",
   "Gateway": "/ip4/127.0.0.1/tcp/8081"

2. Install Ganache

3. Install NodeJS v16.14 or higher

4. Install packages on backend
   cd backend/
   npm install

5. Run backend & deploy contracts
   cd backend/
   In one terminal -> npm run ganache (the command uses a custom seed)
   In other terminal -> npm run deploy (compiles contracts & deploys to local blockchain)
   In other terminal when contract deployment has finished -> npm run start-dev

6. Install packages on the frontend
   cd app/
   npm install

7. Run frontend on web browser
   npm run serve-dev
   Views are optimized for mobile resolutions, so use F12 and select Pixel5
   The first time, we need to accept de backend certificate on the browser "Trust this certificate" to be able to recieve data from the API Rest.
