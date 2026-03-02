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
        const searchTerm = input.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim().toLowerCase();
        
        // Search in all cities across all countries
        const results = [];

        if (searchTerm === "beach" || searchTerm === "beaches") {
            data.beaches.forEach(beach => {
                //console.log('Found temple:', beach.name);
                results.push({
                    type: "beach",
                    properties: beach
                });
            });
            //console.log(results);
        } else if (searchTerm === "temple" || searchTerm === "temples") {
            data.temples.forEach(temple => {
                //console.log('Found temple:', beach.name);
                results.push({
                    type: "temple",
                    properties: temple
                });
            });
        } else if (searchTerm === "country" || searchTerm === "countries") {
            data.countries.forEach(country => {
                country.cities.forEach(city => {
                    results.push({
                        //country: country.name,
                        type: "city",
                        properties: city
                    });
                });
            });
        }
        
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
    const input = document.getElementById('search_input').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    resultDiv.innerHTML += `<div class="mySidePanel_header"><div style="padding-right: 8px;"><a href="javascript:void(0)" class="close" onclick="closeNav()">×</a></div><div><p>Search results: <strong>${input}</strong></p></div></div>`;
    //console.log(results.length);
    for (let i = 0; i < results.length; i++) {
        //console.log(results[i].type);
        //console.log(results[i].properties.name);
        resultDiv.innerHTML += `<div class="destination-card"><div class="destination-image"><img src="${results[i].properties.imageUrl}" alt="${results[i].properties.name}"><div class="image-overlay"><span class="location-tag">${results[i].type}</span></div></div><div class="destination-info"><div class="city-header"><h3 class="city-name">${results[i].properties.name}</h3></div><p class="city-description">${results[i].properties.description}</p></div></div>`;
    }
}