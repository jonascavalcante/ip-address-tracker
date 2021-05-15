// INICIANDO O Map
let mymap = L.map('mapid').setView([0, 0], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    'Permissions-Policy': 'interest-cohort=()',
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoiam9uYXNjYXZhbGNhbnRlIiwiYSI6ImNrb21hbmpwYTBqcWIyb3J6bWR5cnR6aHcifQ.2J4eWgzyBHs6wQ0wdXDx9Q'
}).addTo(mymap);

// REQUEST PARA IP DIGITADO
let ip = '';
let inputIp = document.querySelector('.search input');
inputIp.addEventListener('keyup', (e) => {

    let key = e.which || e.keyCode;

    if (key == 13) {
        requestInput();
    }
});

let buttonIp = document.querySelector('.search button');
buttonIp.addEventListener('click', () => requestInput());

const requestInput = () => {
    if (inputIp.value != '') {

        requestLoading();

        ip = inputIp.value;
        inputIp.value = '';

        requestLocation(ip);
    }
}

// To get the IP Address locations: https://geo.ipify.org/
const baseUrl = 'https://geo.ipify.org/api/v1';
const api_key = 'at_iDQAohLYxlYHDkhb5sV0GCwuX1YBj';

let ipAddressEl = document.getElementById('ipAddress');
let locationEl = document.getElementById('location');
let timezoneEl = document.getElementById('timezone');
let ispEl = document.getElementById('isp');

const requestLoading = () => {
    ipAddressEl.innerText = 'Loading...';
    locationEl.innerText = 'Loading...';
    timezoneEl.innerText = 'Loading...';
    ispEl.innerText = 'Loading...';
}

const resquestFailed = () => {
    ipAddressEl.innerText = 'Failed';
    locationEl.innerText = 'Failed';
    timezoneEl.innerText = 'Failed';
    ispEl.innerText = 'Failed';
}

const requestLocation = () => {

    requestLoading();

    fetch(`${baseUrl}?apiKey=${api_key}&ipAddress=${ip}`, {
        data: {
            apiKey: api_key,
            ipAddress: ip
        }
    })
        .then(response => response.json())
        .then(response => {

            if (response.code) {
                resquestFailed()
            } else {
                ipAddressEl.innerText = response.ip;
                locationEl.innerText = `${response.location.city}, ${response.location.region}-${response.location.country}`;
                timezoneEl.innerText = `UTC ${response.location.timezone}`;
                ispEl.innerText = response.isp;

                let lat = response.location.lat;
                let lng = response.location.lng;

                map(lat, lng);
            }
        })
        .catch(() => {
            resquestFailed();
        });
}

requestLocation();

// To generate the map: https://leafletjs.com/
const map = (lat, lng) => {

    mymap.remove();

    mymap = L.map('mapid').setView([lat, lng], 13);

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