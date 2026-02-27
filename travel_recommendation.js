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
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        const searchTerm = input;

        if(data.countries.find(country => country.name.toLowerCase() === input)) {
            console.log("Countries:", input);
        }
        
        // Search in all cities across all countries
        const results = [];
        
        data.countries.forEach(country => {
            const matchingCities = country.cities.filter(city => 
                city.name.toLowerCase().includes(searchTerm)
            );
            
            matchingCities.forEach(city => {
                results.push({
                    country: country.name,
                    city: city
                });
            });
        });
        
        console.log("Search results:", results);
    })
    .catch(error => console.error('Error:', error));

        //resultDiv.innerHTML += `<div id="destination-card" class="destination-card">`;
        //resultDiv.innerHTML += `<div class="destination-image">`;
        //resultDiv.innerHTML += `<img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500" alt="Paris, France - Eiffel Tower">`;
        //resultDiv.innerHTML += `<div class="image-overlay">`;
        //resultDiv.innerHTML += `<span class="location-tag">🇫🇷 Europe</span>`;
        //resultDiv.innerHTML += `</div></div>`;
        //resultDiv.innerHTML += `<div class="destination-info">`;
        //resultDiv.innerHTML += `<div class="city-header">`;
        //resultDiv.innerHTML += `<h3 class="city-name">Paris</h3>`;
        //resultDiv.innerHTML += `<span class="country">France</span>`;
        //resultDiv.innerHTML += `</div>`;
        //resultDiv.innerHTML += `<p class="city-description">The City of Light dazzles with iconic landmarks, world-class cuisine, and romantic atmosphere. Home to the Eiffel Tower, Louvre Museum, and charming cafés.</p>`;
        //resultDiv.innerHTML += `</div></div>`;
}