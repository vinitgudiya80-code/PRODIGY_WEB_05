// script.js - simple weather app using OpenWeatherMap
// IMPORTANT: get an API key from https://openweathermap.org/ and replace API_KEY below.
const API_KEY = 'API_KEY'; // <<-- replace with your OpenWeatherMap API key

const elements = {
  cityInput: document.getElementById('cityInput'),
  searchBtn: document.getElementById('searchBtn'),
  locBtn: document.getElementById('locBtn'),
  weatherCard: document.getElementById('weatherCard'),
  locationName: document.getElementById('locationName'),
  weatherIcon: document.getElementById('weatherIcon'),
  temp: document.getElementById('temp'),
  desc: document.getElementById('desc'),
  feels: document.getElementById('feels'),
  humidity: document.getElementById('humidity'),
  wind: document.getElementById('wind'),
  pressure: document.getElementById('pressure'),
  message: document.getElementById('message'),
  more: document.getElementById('more')
};

function showMessage(text, isError=false){
  elements.message.textContent = text;
  elements.message.style.color = isError ? '#ffb4b4' : '';
}

async function fetchWeatherByCity(city){
  if(!API_KEY || API_KEY === 'API_KEY'){
    showMessage('Please set your OpenWeatherMap API key in script.js (replace API_KEY).', true);
    return;
  }
  try{
    showMessage('Fetching weather...');
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    const res = await fetch(url);
    if(!res.ok){
      const err = await res.json().catch(()=>({message:'Unknown error'}));
      throw new Error(err.message || 'Failed to fetch');
    }
    const data = await res.json();
    renderWeather(data);
  }catch(err){
    showMessage('Error: ' + err.message, true);
    elements.weatherCard.classList.add('hidden');
  }
}

async function fetchWeatherByCoords(lat, lon){
  if(!API_KEY || API_KEY === 'API_KEY'){
    showMessage('Please set your OpenWeatherMap API key in script.js (replace API_KEY).', true);
    return;
  }
  try{
    showMessage('Fetching weather for your location...');
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const res = await fetch(url);
    if(!res.ok){
      const err = await res.json().catch(()=>({message:'Unknown error'}));
      throw new Error(err.message || 'Failed to fetch');
    }
    const data = await res.json();
    renderWeather(data);
  }catch(err){
    showMessage('Error: ' + err.message, true);
    elements.weatherCard.classList.add('hidden');
  }
}

function renderWeather(data){
  if(!data || !data.weather) {
    showMessage('No weather data available', true);
    return;
  }
  elements.weatherCard.classList.remove('hidden');
  elements.locationName.textContent = `${data.name || ''}${data.sys && data.sys.country ? ', ' + data.sys.country : ''}`;
  const w = data.weather[0];
  elements.weatherIcon.src = `https://openweathermap.org/img/wn/${w.icon}@2x.png`;
  elements.weatherIcon.alt = w.description || '';
  elements.temp.textContent = Math.round(data.main.temp) + '°C';
  elements.desc.textContent = (w.main || '') + ' — ' + (w.description || '');
  elements.feels.textContent = Math.round(data.main.feels_like) + '°C';
  elements.humidity.textContent = data.main.humidity + '%';
  elements.wind.textContent = (data.wind.speed || '--') + ' m/s';
  elements.pressure.textContent = (data.main.pressure || '--') + ' hPa';
  elements.more.textContent = `Clouds: ${data.clouds ? data.clouds.all + '%' : '--'}. Sunrise: ${formatTime(data.sys.sunrise, data.timezone)} Local, Sunset: ${formatTime(data.sys.sunset, data.timezone)} Local.`;
  showMessage('');
}

function formatTime(unixSeconds, tzOffsetSeconds){
  if(!unixSeconds) return '--';
  const d = new Date((unixSeconds + (tzOffsetSeconds || 0)) * 1000);
  return d.toUTCString().replace('GMT','');
}

/* Event handlers */
elements.searchBtn.addEventListener('click', () => {
  const city = elements.cityInput.value.trim();
  if(!city){ showMessage('Please enter a city name', true); return; }
  fetchWeatherByCity(city);
});

elements.cityInput.addEventListener('keyup', (e) => {
  if(e.key === 'Enter') elements.searchBtn.click();
});

elements.locBtn.addEventListener('click', () => {
  if(!navigator.geolocation){
    showMessage('Geolocation is not supported in your browser.', true);
    return;
  }
  showMessage('Requesting location permission...');
  navigator.geolocation.getCurrentPosition(pos => {
    fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
  }, err => {
    showMessage('Geolocation error: ' + (err.message || 'permission denied'), true);
  }, {enableHighAccuracy:false, timeout:10000});
});

/* Quick demo: try to auto-get location on load (silently) */
window.addEventListener('load', () => {
  // optional auto-detect - commented out to avoid unexpected permission prompts
  // navigator.geolocation.getCurrentPosition(p => fetchWeatherByCoords(p.coords.latitude, p.coords.longitude));
});
