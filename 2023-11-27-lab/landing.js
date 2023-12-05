document.addEventListener('DOMContentLoaded', function () {
    const getFactsBtn = document.getElementById('getFactsBtn');
    const getWeatherBtn = document.getElementById('getWeatherBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const factsUl = document.getElementById('factsUl');
    const weather =  document.getElementById('weather');

    getFactsBtn.addEventListener('click', function () {
        fetch('https://api.ipgeolocation.io/ipgeo?apiKey=f3412e61a4684467a8230ddac363794f')
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip;
            const location = `You are from ${data.country_name}, ${data.continent_name}.`;
            const latLong = `Your location co-ordinates are latitude: ${data.latitude}, longitude: ${data.longitude}`
            const nearestCity = `${data.city} is one of the closest places for you.`;
            const currency = `Your currency is ${data.currency.name} and it's code - ${data.currency.code}.`;
            console.log(ipAddress)
            const facts = [
                location,
                latLong,
                nearestCity,
                currency
            ];
    
            // Generate the list items dynamically
            const listItems = facts.map(fact => `<li>${fact}</li>`).join('');
    
            // Set the innerHTML of the factsUl element
            factsUl.innerHTML = listItems;
    
            // Display the factsList
            factsList.style.display = 'block';
        })
        .catch(error => {
            alert(`error fetching facts about user location - ${error}`)
            window.location.href = 'landing.html';
        });
    });

    getWeatherBtn.addEventListener('click', function () {
        fetch('https://api.ipgeolocation.io/ipgeo?apiKey=f3412e61a4684467a8230ddac363794f')
        .then(response => response.json())
        .then(data => {
            const latitude = data.latitude;
            const longitude = data.longitude;
            let tempData = '';
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`)
                .then(response => response.json())
                .then(tempDat => {
                    const number = Number(tempDat?.current?.temperature_2m);
                    let advice = "";
                    if (number < 10) {
                        advice = ", it is too cold, if you are leaving home carry a jacket with you \u2603"
                    } else if (number > 30) {
                        advice = ", it is sunny, apply sunscreen \uE04A"
                    }
                    tempData = `Current temperature at your location is ${tempDat?.current?.temperature_2m} ${tempDat?.current_units?.temperature_2m}`
                    console.log(tempData)
                    // Set the innerHTML of the weather element
                    weather.innerHTML = `<h2>Weather Information</h2> ${tempData + advice}`;
                    // Display the weather
                    weather.style.display = 'block';
                })
        })
        .catch(error => {
            alert(`error fetching facts about user location - ${error}`)
            window.location.href = 'landing.html';
        });
    });

    logoutBtn.addEventListener('click', function () {
        // Redirect to the logout page
        window.location.href = 'index.html';
    });
});