# Getting Started with adee-website

## Set up Environment

Have npm installed on your system:
`npm install`

Add a `.env` file for secrets not tracked by git
- REACT_APP_GOOGLE_DRIVE_API_KEY from https://console.cloud.google.com/apis/credentials
- REACT_APP_GOOGLE_DRIVE_FOLDER_ID you can open a folder in the Google Drive UI and see the id in the url
    - i.e. https://drive.google.com/drive/folders/<folder_id>

Then run `source .env` to load the env vars into the terminal you'll be hosting the site from.

## Host the Website locally

Run `npm start`

To view on an external device, make sure the devices are connected to the same network and that the network allows peer 2 peer connections.

## Deployment

Deployment to github pages happens through GitHub actions (see [deploy.yml](./.github/workflows/deploy.yml))

Run `npm run build` to make sure the production version can be built to the `build/` folder
