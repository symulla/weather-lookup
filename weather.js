document.addEventListener('DOMContentLoaded', function() {
    const cityInput = document.getElementById('cityInput');
    const searchBtn = document.getElementById('searchBtn');
    
    const cities = {
        'nairobi': { lat: -1.2864, lon: 36.8172, name: 'Nairobi' },
        'london': { lat: 51.5074, lon: -0.1278, name: 'London' }
    };
    
    searchBtn.addEventListener('click', searchWeather);
    
    async function searchWeather() {
        const city = cityInput.value.trim().toLowerCase();
        
        if (!city || !cities[city]) {
            alert(`City not found. Try: ${Object.keys(cities).join(', ')}`);
            return;
        }
        
        document.getElementById('loading').classList.remove('hidden');
        
        try {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${cities[city].lat}&longitude=${cities[city].lon}&current_weather=true`;
            const response = await fetch(url);
            const data = await response.json();
            
            const weather = data.current_weather;
            document.getElementById('cityName').textContent = cities[city].name;
            document.getElementById('temp').textContent = weather.temperature;
            document.getElementById('wind').textContent = weather.windspeed;
            document.getElementById('weatherResult').classList.remove('hidden');
            
        } catch (error) {
            alert('Error loading weather data');
        } finally {
            document.getElementById('loading').classList.add('hidden');
        }
    }
    
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchWeather();
    });
    
    cityInput.value = 'Nairobi';
});