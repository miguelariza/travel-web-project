function togglePanel() {
  const panel = document.getElementById("mySidePanel");
  //const overlay = document.getElementById("overlay");
  
  panel.classList.toggle("open");
  //overlay.classList.toggle("show");

  panel.innerHTML += `<div id="mySidepanel" class="mySidePanel">`;
  panel.innerHTML += `<a href="javascript:void(0)" class="close" onclick="closeNav()">×</a>`;
  panel.innerHTML += `</div>`;
}

function closeNav() {
    const panel = document.getElementById("mySidePanel");
    panel.classList.toggle("close");
}