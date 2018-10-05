# Neighborhood Map Project
This project is a single-page web application featuring a map of Seattle with various locations around the city marked on the map. The project pulls through information about these locations from 3rd party APIs.


## Motivation
This project was created as part of the Grow With Google Front End Web Developer Nanodegree Scholarship. This is Project 7, the final project in the course.
The project was coded from scratch using React and was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


## Getting Started
View the app online - [ Neighborhood Map App](http://portfolio.threadkind.com/GWGND07-Neighborhood-Map/).

To view the app locally you can clone the repository to your computer.
[The link to the repository can be found here.](https://github.com/threadkind/GWGND07-Neighborhood-Map)

You can download the app directly by clicking on the clone or download link on the repository page.

Alternatively, you can use the command line to clone to repository.
Make sure you have git installed on your system.
Navigate to the folder where you want to clone the repository using the command line terminal.
Then type:
```
git clone https://github.com/threadkind/GWGND07-Neighborhood-Map.git
```
...and press enter.
This will create a local clone on your computer.

Navigate to the repository clone folder

In order to view the app, you will need to install all project dependencies by typing `npm install` into the command line.

After dependancies have installed, you can start the server with `npm start`

When the server is running, it should open up the app for you in the browser, or you can follow the instructions on the command line.

Service worker only registers in production build - see Progressive Web App section below.

To run a production build, make sure you are in the main app folder and type `npm start` into the command line.
Once it is built, type `serve -s build` into the command line to start the server.
Typically this will set up on `http://localhost:5000/` - navigate to this page in your browser.


## Features of the App

### Map
When the app is first loaded you will see a map that is pulled through from Google using the [Google Maps API.](https://developers.google.com/maps/documentation/)

The map is centered on Seattle and there will be markers showing various locations around the city.
These markers will 'drop in' when the map is loaded.

### Sidebar Menu
The sidebar will show as default when the app is loaded.

There is a link on the top of the sidebar menu to allow it to be collapsed to move it out of the way. When it is collapsed this link changes to say 'expand locations', to allow the menu to be expanded again if necessary.

Under the sidebar control an image is pulled through from [Unsplash.com](https://unsplash.com/), if available. Otherwise it will show an error message to advise it is not available.

All available locations will be shown on the sidebar menu. There is a dropdown to allow the markers to be filtered by category. When a category is selected, the list will filter along with the markers shown on the map.

The locations will be scrollable if they are unable to fit on the screen.

### Info Menu
The info menu will appear if a locations is clicked, either by clicking a link in the sidebar menu or clicking a marker on the map.

The info menu has 3 tabs. Tab 1, with the information icon, is shown by default and this includes some basic information about the location that has been clicked, including name and coordinates.

Tab 2 has the plate icon. When this tab is clicked the app makes a request to foursquare to pull through a recommended restaurant location in the area. If the request is successful, the name and address of the restaurant is shown in the tab. If it is unsucessful, an error message will show to advise that the infomation is unavailable.

Tab 3, the camera icon, makes a request to flickr to search for photos with the same name as the location. The tab will display up to 3 photos from the location if the request is successful and there are 3 photos available. If there are less than 3 photos available, but the request is still sucessful, all available photos will be shown.
If the request is not successful, then the tab will show an error message to advise that the photos are unable to be retrieved from Flickr.

If one of the Flickr thumbnail images is clicked, it will display and overlay over the app with a larger version of the image. The image does have an 'x' to close the overlay, but clicking anywhere on the overlay will close it, to make sure the user does not get stuck in the overlay and can easily get back to the app.

The info menu features an 'x' in the top right corner to allow the info menu to be closed and moved out of the way.


## Responsive Views
The app can be used across all screen sizes and the view will change slightly to best fit the components on the screen depending on which size screen they are being viewed. The majority of the CSS is written in a responsive manner, with a few small changes written into media queries for smaller screen sizes.

## Progressive Web App
The app registers a service worker in production if the browser is compatible. This can be seen on the [online build of the app](https://portfolio.threadkind.com/GWGND07-Neighborhood-Map/).
The app also includes a manifest to configure a custom splash screen if app is launched from homescreen.


## Dependancies
This app is written primarily in React with HTML, CSS, Javascript(JSX).

Dependancies can be found in the package.json file. I used react-google-maps package to assist with displaying the map on the page.
I also used gh-pages package to assist with deploying the app to github pages.

The social media icons found in the project were from the following links:
* [Foursquare Icon](http://icons-for-free.com/icon/four_square_foursquare_icon_386632.html)
* [Flickr Icon](http://iconbug.com/detail/icon/653/flickr/)


## Author
Amy W
