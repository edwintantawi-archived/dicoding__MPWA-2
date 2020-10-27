import "./components/navbar/app-navbar.js";

// X-Auth-Key : b0825830f1724f13987c4b6ffb0ab92f

const viewMode = document.querySelector(".toggle-body");
viewMode.addEventListener("click", function(){
  document.body.classList.toggle("dark-mode");
  console.log("ok")
});


// hidden nav when on top
const navBar = document.querySelector("nav");
document.addEventListener("scroll", function(){
  const pos = pageYOffset
  if(pos > 50){
    navBar.classList.add("shownav");
  } else{
    navBar.classList.remove("shownav");
  }
})