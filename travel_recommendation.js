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
        const country = data.countries.find(item => item.name.toLowerCase() === input);
        const temple = data.temples.find(item => item.name.toLowerCase() === input);
        const beach = data.beaches.find(item => item.name.toLowerCase() === input);
    
        console.log(country);
    })
    //.catch()
}