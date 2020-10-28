import "./components/navbar/app-navbar.js";
import "./renderPages.js"
// X-Auth-Key : b0825830f1724f13987c4b6ffb0ab92f
const page = window.location.hash.substr(1);

const navBar = document.querySelector("nav");
// if(page === "" || page === "home"){
//   navBar.style.backgroundColor = "transparent";
// } else{
//   navBar.style.backgroundColor = white;
// }

// set theme from loacal storage

  if(localStorage.getItem("theme") === "true"){
    document.body.classList.add("dark-mode");
  } else{
    document.body.classList.remove("dark-mode");
  }


const viewMode = document.querySelector(".toggle-body");
viewMode.addEventListener("click", function(){
  
  document.body.classList.toggle("dark-mode");
  // save theme mode
  if(typeof(Storage) !== undefined){
    if(document.body.classList.contains("dark-mode")){
      localStorage.setItem("theme", "true");
    } else{
      localStorage.setItem("theme", "false");
    }
  }else{
    console.log("Your Browser doesnt support Storage");
  }
});





