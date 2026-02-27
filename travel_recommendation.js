function togglePanel() {
  const panel = document.getElementById("mySidePanel");
  //const overlay = document.getElementById("overlay");
  
  panel.classList.toggle("open");
  //overlay.classList.toggle("show");
}

function closeNav() {
    const panel = document.getElementById("mySidePanel");
    panel.classList.remove("open");
}

function resetSearch() {
    document.getElementById("search_input").value = "";
}