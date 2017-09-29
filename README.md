Movie Locations Project.

This movie is hosted on Heroku at https://powerful-tundra-44048.herokuapp.com/

A service that allows users to see where their favorite movies and TV Shows are filmed around San Francisco.

## Table of Contents

- [App Run-through](#app-run-through)
- [Dependencies](#dependencies)
- [Architecture](#architecture)
- [Things still to come](#things-still-to-come)


## App Run-through

This app consists of a single page. There are 4 ways to filter the results:

  1. Filter results by Place using the Search Bar at the top of the page.

  The use of autocomplete makes it easy to find all the movies shot in your neighbourhood for example. The bounds of the map are limited to San Francisco, therefore only searches in this area are possible

  2. Filter results by using the Map.
  Curious to see which movies were shot around Fisherman's Wharf? Just zoom into the area and see all the movies and TV-shows filmed in the area currently shown on the map.

  3. Filter results by movie.
  To the left of the page, you will see a list of all the movies filmed around SF. To find out where in SF these movies were shot, simply hover on their title.

  4. Filter results by clicking on Markers.
  To find out what movie was shot at a particular location, simply click the marker. You can now also see the other film locations for this movie in the info window on the right. Simply hover on them to locate them on the Map.

## Dependencies

  Google Maps: [React Google Maps](https://github.com/tomchentw/react-google-maps)

    - Prior to settling with this one, I played around with other react google map packages but quickly felt like there were limitations especially regarding the available documentation

  Autocomplete Search: [React Places Autocomplete](https://github.com/kenny-hibino/react-places-autocomplete)

    - A package that was very easy to implement and use.

  Data manipulation: normalizr and lodash

  Geocoder: node-geocoder

  Other packages:

  body-parser

  axios

  concurrently  

  cors  

  express

  mongoose

  morgan  

  nodemon


## Architecture  

For this project I chose to combine front-end and back-end into one app, rather than creating a separate app for the back-end API.

## Things still to come

Regrettably, due to time constraints, I was not able to implement thorough testing. This will be my priority going forward.

The UI is in dire need of attention.

To avoid marker overlaps I will be implementing something like Marker Spiderfier.
