class NavBar extends HTMLElement{

  connectedCallback(){
    this.render();
  }

  render(){
    this.innerHTML = `
      <nav>
        <div class="container">
          <div class="nav-wrapper">
            <a href="#home" class="left brand-logo">
              <div class="wrap">
                <img src="src/assets/logo/logo-full.png" alt="Football Laeague">
              </div>
            </a>


            <div class="dark-mode right">
                <div class="toggle-body">
                  <div class="toggle-dot">
                  </div>
                </div>
            </div>

            <ul id="navigation" class="right hide-on-med-and-down">
              <li><a href="#standings" class="standings"><i class="material-icons">equalizer</i> Standing's</a></li>
              <li><a href="#teams" class="teams"><i class="material-icons">people</i> Team's</a></li>
              <li><a href="#bookmark" class="bookmark"><i class="material-icons">bookmark</i> Bookmark</a></li>
            </ul>



          </div>
        </div>
      </nav>
      <ul id="mobile-nav">
        <li><a href="#teams" class="teams waves-effect waves-dark">
          <i class="material-icons">people</i>
          <small>Team's</small>
          </a></li>
          <li><a href="#standings" class=" standingswaves-effect waves-dark">
          <i class="material-icons">equalizer</i>
          <small>Standing's</small>
          </a></li>
          <li><a href="#bookmark" class="bookmark waves-effect waves-dark">
          <i class="material-icons">bookmark</i>
          <small>Bookmark</small>
        </a></li>
      </ul>

    `;
  }

}

customElements.define("app-navbar", NavBar);


