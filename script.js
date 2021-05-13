// To get the IP Address locations: https://geo.ipify.org/

// To generate the map: https://leafletjs.com/
var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    'Permissions-Policy': 'interest-cohort=()',
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoiam9uYXNjYXZhbGNhbnRlIiwiYSI6ImNrb21hbmpwYTBqcWIyb3J6bWR5cnR6aHcifQ.2J4eWgzyBHs6wQ0wdXDx9Q'
}).addTo(mymap);