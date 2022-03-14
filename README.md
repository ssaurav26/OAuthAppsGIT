## Login with Github
React web app which allows log-in to Github using OAuth2 and fetches users repositories list and gist of activities

### Usage and Setup
- Clone this repo. Go into the root folder and run *yarn* to install the dependencies.
- Login to your Github account and create an OAuth app by following the steps provided here (https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app). Note: For this example, while creating the OAuth app, you can set your Homepage URL to http://localhost:3000/ and Authorization callback URL to http://localhost:3000/login if you are running your app locally.
- Create a .env file in the root folder and set these variables: 
  ```
  REACT_APP_CLIENT_ID=Your Client ID from Github
  REACT_APP_CLIENT_SECRET=Your Client Secret from Github
  REACT_APP_REDIRECT_URI=http://localhost:3000/login
  REACT_APP_PROXY_URL=http://localhost:5000/authenticate
  SERVER_PORT=5000

REACT_APP_CLIENT_ID=Your Client ID from Github
REACT_APP_CLIENT_SECRET=Your Client Secret from Github
REACT_APP_REDIRECT_URI=http://localhost:3000/login
REACT_APP_PROXY_URL=http://localhost:8000/authenticate
REACT_APP_PROXY_URL_GETDETAILS = http://localhost:8000/getDetails
SERVER_PORT=8000
  ```
- Run *yarn start* to start the app
