const apiKey = "b8a89a246bc93a94e6a43afe29a22558"; // Replace with your OpenWeatherMap API key

    const getWeather = (city) => {
      document.getElementById('cityName').textContent = city;

      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(response => {
          document.getElementById('temp2').textContent = response.main.temp;
          document.getElementById('min_temp').textContent = response.main.temp_min;
          document.getElementById('max_temp').textContent = response.main.temp_max;
          document.getElementById('humidity2').textContent = response.main.humidity;
          document.getElementById('wind_speed2').textContent = response.wind.speed;
          document.getElementById('wind_degrees').textContent = response.wind.deg;
          document.getElementById('feels_like').textContent = response.main.feels_like;
          document.getElementById('sunrise').textContent = new Date(response.sys.sunrise * 1000).toLocaleTimeString();
          document.getElementById('sunset').textContent = new Date(response.sys.sunset * 1000).toLocaleTimeString();
        })
        .catch(err => {
          console.error('Error fetching weather data:', err);
          alert("Failed to fetch weather data. Please try again later.");
        });
    };

    document.getElementById('submit').addEventListener('click', (e) => {
      e.preventDefault();
      const city = document.getElementById('city').value;
      if (city) {
        getWeather(city);
      } else {
        alert("Please enter a city name");
      }
    });

    // Fetch weather based on user’s location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
          .then(response => response.json())
          .then(response => {
            document.getElementById('cityName').textContent = "Your Location";
            document.getElementById('temp2').textContent = response.main.temp;
            document.getElementById('min_temp').textContent = response.main.temp_min;
            document.getElementById('max_temp').textContent = response.main.temp_max;
            document.getElementById('humidity2').textContent = response.main.humidity;
            document.getElementById('wind_speed2').textContent = response.wind.speed;
            document.getElementById('wind_degrees').textContent = response.wind.deg;
            document.getElementById('feels_like').textContent = response.main.feels_like;
            document.getElementById('sunrise').textContent = new Date(response.sys.sunrise * 1000).toLocaleTimeString();
            document.getElementById('sunset').textContent = new Date(response.sys.sunset * 1000).toLocaleTimeString();
          })
          .catch(err => {
            console.error('Error fetching weather data:', err);
            alert("Failed to fetch weather data. Please try again later.");
          });
      });
    }