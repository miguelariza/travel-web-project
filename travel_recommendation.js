function togglePanel() {
  const panel = document.getElementById("mySidePanel");
  //const overlay = document.getElementById("overlay");
  
  panel.classList.toggle("open");
  //overlay.classList.toggle("show");

  searchCondition();
}

function closeNav() {
    const panel = document.getElementById("mySidePanel");
    panel.classList.remove("open");
}

function resetSearch() {
    document.getElementById("search_input").value = "";
}

function searchCondition() {
    const input = document.getElementById('search_input').value;

    fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        const searchTerm = input.toLowerCase();

        if(data.countries.find(country => country.name.toLowerCase() === input)) {
            console.log("Country found!");
        } else {
            console.log("Country not found!");
        }
        
        // Search in all cities across all countries
        const results = [];
        
        data.countries.forEach(country => {
            const matchingCities = country.cities.filter(city => 
                city.name.toLowerCase().includes(searchTerm)
            );
            
            matchingCities.forEach(city => {
                results.push({
                    //country: country.name,
                    type: "city", 
                    properties: city
                });
            });
        });

        if (data.temples && Array.isArray(data.temples)) {
            data.temples.forEach(temple => {
            if (temple.name.toLowerCase().includes(searchTerm)) {
                console.log('Found temple:', temple.name);
                results.push({
                    type: "temple",
                    properties: temple
                });
            }
            });
        } else {
            console.log('Temples data not found or not in expected format');
        }

        if (data.beaches && Array.isArray(data.beaches)) {
            data.beaches.forEach(beach => {
            if (beach.name.toLowerCase().includes(searchTerm)) {
                console.log('Found temple:', beach.name);
                results.push({
                    type: "beach",
                    properties: beach
                });
            }
            });
        } else {
            console.log('Temples data not found or not in expected format');
        }

        //console.log("Search results:", results);
        displayResults(results);
    })
    .catch(error => console.error('Error:', error));
}

function displayResults(results) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    //console.log(results.length);
    for (let i = 0; i < results.length; i++) {
        //console.log(results[i].type);
        //console.log(results[i].properties.name);
        resultDiv.innerHTML += `<div id="destination-card" class="destination-card">`;
        resultDiv.innerHTML += `<div class="destination-image">`;
        resultDiv.innerHTML += `<img src="${results[i].properties.imageUrl}" alt="${results[i].properties.name}">`;
        resultDiv.innerHTML += `<div class="image-overlay">`;
        resultDiv.innerHTML += `<span class="location-tag">🇫🇷 Europe</span>`;
        resultDiv.innerHTML += `</div></div>`;
        resultDiv.innerHTML += `<div class="destination-info">`;
        resultDiv.innerHTML += `<div class="city-header">`;
        resultDiv.innerHTML += `<h3 class="city-name">${results[i].properties.name}</h3>`;
        resultDiv.innerHTML += `<span class="country">France</span>`;
        resultDiv.innerHTML += `</div>`;
        resultDiv.innerHTML += `<p class="city-description">${results[i].properties.description}</p>`;
        resultDiv.innerHTML += `</div></div>`;
    }
}