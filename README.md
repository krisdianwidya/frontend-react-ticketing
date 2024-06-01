# How to run project
- clone this project repo
- ensure the node js version at v20.11.1 & npm version at 10.2.4
- this project use react js version 18 (the latest stable) & vite version 5
- then run npm install
- then run npm run dev

# About the project
- related to api data
    - using mockoon (https://mockoon.com/) tools, to create the dummy data
    - download mockoon portable
    - follow the step (as in the mockoon_steps folder that contains screenshoot)
    - i also already set the example data in mockoon_data.txt
    - to run the server, click the green triangle like 'play' button
- related to task
    - all requirements has not finished yet, here are points that finished
    - all ui pages
        - the login page cannot simulate properly (checking email & password), but the button can redirect to dashboard page
        - the overview page only contain hardcoded data
        - the tickets listing page can simulate the ticket data fetching using mockoon that i've been mentioned above (only get the data with sorting and pagination functionality, the create, update, delete has not finish yet)
- related to .env file
    - env file contain base url for the api url
    - VITE_BASE_URL=<mockoon_server_url>