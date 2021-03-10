# Hotel Over It

Hotel Over It is a web app used to book fictional rooms at a fictional hotel. The name of the hotel was changed midway through the project from Hotel Overlook to Hotel Over It. The reason for this change was purely a joke and play on words due to the fact that the creator was simply "over it" with the project. 

## Installation

To run the front-end:
1. Clone the repo 
2. `npm install`
3. `npm start`
4. In a browser, go to `http://localhost:8080/`

To run the back-end APIs: 
1. Clone `git@github.com:turingschool-examples/overlook-api.git`
2. `npm install`
3. `npm start`

## Project Goals
1. Make and understand network requests to API endpoints: GET, POST, and eventually DELETE. (DELETE was not quite completed in time)
2. Use SASS to create and implement DRY css.
3. Make web app responsive and UI/UX was seamless across all screens. 
4. Ensure app was accessible by keyboard. 

## Overview

On page load the user will be prompted to login. 
Once logged in the user will see a page with all of their past and future reservations. They will also see a total dollar amount of the money spent on reservations 

THERE IS A GIF HERE THAT REFUSES TO SHOW UP EVEN THOUGH IT IS FORMATTED EXACTLY LIKE THE ONE BELOW>
<img src="https://gyazo.com/e410c6f6950fe3ae8f0056b7dc030dad.gif" >

When navigating to the 'Book a Room' page the user will be prompted with a search box. From there the user will be asked to select a date for their stay, the room type they wish to stay in, and if the room has a bidet. If any of the feilds are left blank there is an error message that shows up prompting the user to fill the entire form out. 

If in the unfortunate circumstance there are no rooms available then an apology message shows on the users screen asking them to select a different date or room type. 

<img src="https://gyazo.com/930c88c9bdecb97443d32a0fffc2f83a.gif" >

After the rooms have been filtered and displayed for the user they then have the option to book any of the available rooms. Once the book room is clicked the user will be brought back to the user reservation view - this is where they will see all of their reservations. 

<img src="https://gyazo.com/c4ea10d6f7ace34100fab67bead47790.gif" >

## Contributing

[Julia Iwinski](https://github.com/jgiwinski)
