document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const city = document.getElementById('cityInput').value;
    
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?city=${city}&format=json`;

    fetch(geocodeUrl)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const lat = data[0].lat;
                const lon = data[0].lon;
                const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

                return fetch(weatherUrl);
            } else {
                throw new Error('City not found');
            }
        })
        .then(response => response.json())
        .then(data => {
            const weatherResult = document.getElementById('weatherResult');
            const weather = data.current_weather;
            weatherResult.innerHTML = `
                <h2>${city}</h2>
                <p>Temperature: ${weather.temperature} °C</p>
                <p>Weather: ${weather.weathercode}</p>
                <p>Wind Speed: ${weather.windspeed} m/s</p>
            `;
        })
        .catch(error => {
            const weatherResult = document.getElementById('weatherResult');
            weatherResult.innerHTML = `<p>${error.message}</p>`;
        });
});
