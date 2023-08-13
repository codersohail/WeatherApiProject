document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'ca89890125msh7dec868935d911bp11fe2ajsn703fc1f3c889';
    const apiHost = 'weather-by-api-ninjas.p.rapidapi.com';

    // Toggle theme function
function toggleTheme() {
  const body = document.body;
  body.classList.toggle('dark-theme');
  body.classList.toggle('light-theme');
}

document.getElementById('toggleThemeButton').addEventListener('click', toggleTheme);
  
    const cities = [
      'Chennai', 'Delhi', 'Bangalore', 'Kolkata', 'Mumbai', 'Hyderabad'
    ];
  
    const searchButton = document.getElementById('searchButton');
    const weatherDisplay = document.getElementById('weatherDisplay');
  
    searchButton.addEventListener('click', async () => {
      const cityInput = document.getElementById('cityInput').value.trim();
  
      if (cityInput === '') {
        alert('Please enter a valid city name.');
        return;
      }
  
      try {
        const response = await fetchWeatherData(cityInput);
  
        if (!response.ok) {
          throw new Error('Weather data not found.');
        }
  
        const weatherData = await response.json();
        displayWeatherData(cityInput, weatherData);
      } catch (error) {
        console.error(error);
        alert('An error occurred while fetching weather data.');
      }
    });
  
    async function fetchWeatherData(city) {
      return await fetch(`https://${apiHost}/v1/weather?city=${city}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': apiHost
        }
      });
    }
  
    function displayWeatherData(city, data) {
      const weatherCard = document.createElement('div');
      weatherCard.classList.add('col-md-6', 'mb-3');
      weatherCard.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${city}</h5>
            <p class="card-text">Temperature: ${data.temp}°C</p>
            <p class="card-text">Cloud Percentage: ${data.cloud_pct}%</p>
            <p class="card-text">Humidity: ${data.humidity}%</p>
          </div>
        </div>
      `;
      weatherDisplay.appendChild(weatherCard);
    }
  
    // Fetch and display weather for predefined cities
    async function fetchAndDisplayWeatherForCities() {
      for (const city of cities) {
        const response = await fetchWeatherData(city);
        if (response.ok) {
          const weatherData = await response.json();
          displayWeatherData(city, weatherData);
          setWeatherBackground(city, weatherData.temp);
        }
      }
    }
  
    // Set background color based on temperature
    function setWeatherBackground(city, temperature) {
      const backgroundClass = temperature >= 25 ? 'bg-warm' : 'bg-cool';
      const cityCard = document.querySelector(`[data-city="${city}"]`);
      cityCard.classList.add(backgroundClass);
    }
  
    // Call function to fetch and display weather for predefined cities
    fetchAndDisplayWeatherForCities();
  });
  