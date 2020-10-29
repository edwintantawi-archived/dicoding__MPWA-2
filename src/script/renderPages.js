let page = window.location.hash.substr(1);
const root = document.querySelector("#root");

if ( page === "" ) {
  page = "home";
} else if(page === "standings"){
  document.querySelectorAll(".standings").forEach(function(item){
    item.classList.add("active")
  })
} else if(page === "matches"){
  document.querySelectorAll(".matches").forEach(function(item){
    item.classList.add("active")
  })
} else if(page === "bookmark"){
  document.querySelectorAll(".bookmark").forEach(function(item){
    item.classList.add("active")
  })
}

loadPage(page);

if( page === "standings" ){
  
}

const navigationMenu = document.querySelectorAll("#navigation li a, #mobile-nav li a, .brand-logo");

navigationMenu.forEach(function(navigationLink){
  navigationLink.addEventListener("click", function(){
    const hashLink = navigationLink.getAttribute("href").substr(1);
    
    navigationMenu.forEach(function(item){
      item.classList.remove("active");
    });
    navigationLink.classList.add("active");

    loadPage(hashLink);
  })
})


function loadPage (page) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){

    if(this.readyState === 4){

      if(page === "standings"){
        getStandings();
      }

      if(this.status === 200){
        root.innerHTML = this.responseText;
      } else if(this.status === 404){
        root.innerHTML = "<p>ERROR 404</p>";
      } else{
        root.innerHTML = "<p>Opss.. Somethings Wrong</p>";
      }
    }
  };

  xhr.open("GET", `src/pages/${page}.html`, true);
  xhr.send();

}