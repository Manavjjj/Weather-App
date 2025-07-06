// API Configuration
const API_KEY = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}'; // Replace with your actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// DOM Elements
const searchBtn = document.getElementById('search-btn');
const locationInput = document.getElementById('location-input');
const weatherCard = document.getElementById('weather-card');
const errorElement = document.getElementById('error');
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const weatherDesc = document.getElementById('weather-desc');
const humidity = document.getElementById('humidity');

// Fetch Weather Data
async function fetchWeather(city) {
  try {
    const response = await fetch(`${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`);
    
    if (!response.ok) {
      throw new Error('Location not found');
    }
    
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    showError();
  }
}

// Display Weather Data
function displayWeather(data) {
  const { name, main, weather } = data;
  
  cityName.textContent = name;
  temperature.textContent = `${Math.round(main.temp)}°C`;
  weatherDesc.textContent = weather[0].description;
  humidity.textContent = `Humidity: ${main.humidity}%`;
  weatherIcon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  weatherIcon.alt = weather[0].main;
  
  weatherCard.classList.remove('hidden');
  errorElement.classList.add('hidden');
}

// Show Error Message
function showError() {
  weatherCard.classList.add('hidden');
  errorElement.classList.remove('hidden');
}

// Event Listeners
searchBtn.addEventListener('click', () => {
  const location = locationInput.value.trim();
  if (location) {
    fetchWeather(location);
  }
});

locationInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const location = locationInput.value.trim();
    if (location) {
      fetchWeather(location);
    }
  }
});