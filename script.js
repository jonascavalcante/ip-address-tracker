// To get the IP Address locations: https://geo.ipify.org/
const baseUrl = 'https://geo.ipify.org/api/v1';
const api_key = 'at_iDQAohLYxlYHDkhb5sV0GCwuX1YBj';

let ip = '8.8.8.8';
let ipAddressEl = document.getElementById('ipAddress');
let locationEl = document.getElementById('location');
let timezoneEl = document.getElementById('timezone');
let ispEl = document.getElementById('isp');

fetch(`${baseUrl}?apiKey=${api_key}&ipAddress${ip}}`, {
    data: {
        apiKey: api_key,
        ipAddress: ip
    }
})
    .then(response => response.json())
    .then(response => {

        console.log(response)

        ipAddressEl.innerText = response.ip;
        locationEl.innerText = `${response.location.city}, ${response.location.region}-${response.location.country}`;
        timezoneEl.innerText = `UTC ${response.location.timezone}`;
        ispEl.innerText = response.isp;

        let lat = response.location.lat;
        let lng = response.location.lng;

        map(lat, lng);
    })

// To generate the map: https://leafletjs.com/

const map = (lat, lng) => {

    var mymap = L.map('mapid').setView([lat, lng], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        'Permissions-Policy': 'interest-cohort=()',
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoiam9uYXNjYXZhbGNhbnRlIiwiYSI6ImNrb21hbmpwYTBqcWIyb3J6bWR5cnR6aHcifQ.2J4eWgzyBHs6wQ0wdXDx9Q'
    }).addTo(mymap);
}