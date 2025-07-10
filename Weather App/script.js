// API Configuration
const API_KEY = '88d2c1ca9ddd7fad003b66674a819a15'; 
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

async function fetchWeather(city) {
  try {
    // Show loading state
    weatherCard.classList.add('hidden');
    errorElement.classList.add('hidden');
    document.getElementById('loading').classList.remove('hidden');
    
    const response = await fetch(`${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Location not found');
    }
    
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error('Weather fetch error:', error);
    showError(error.message.includes('404') 
      ? 'City not found. Try "City,Country" format like: London,UK' 
      : error.message
    );
  } finally {
    document.getElementById('loading').classList.add('hidden');
  }
}

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

function showError(message) {
  errorElement.innerHTML = `
    <p>${message}</p>
    <small>Try formats like: "Paris,FR" or "New York,US"</small>
  `;
  weatherCard.classList.add('hidden');
  errorElement.classList.remove('hidden');
}

// Event Listeners
searchBtn.addEventListener('click', () => {
  const location = locationInput.value.trim();
  if (location) fetchWeather(location);
});

locationInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && locationInput.value.trim()) {
    fetchWeather(locationInput.value.trim());
  }
});

// Initial test
fetchWeather("London,UK");