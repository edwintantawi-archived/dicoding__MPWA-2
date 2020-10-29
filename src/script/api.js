const baseUrl = "https://api.football-data.org/v2";
const apiKey = "b0825830f1724f13987c4b6ffb0ab92f";
const options = {headers: {
  "X-Auth-Token": apiKey
}}
const league = "2021" //liga inggris / Premier League


const getStandings = async () => {
  try {
    const respond = await fetch(`${baseUrl}/competitions/${league}/standings?standingType=TOTAL`, options)
    const data = await respond.json();
    const standings = data.standings[0].table
    let dataHTML = "";
    standings.forEach(function (standing) {
      dataHTML += `
        <div class="col s12 m6 xl4">
          <div class="standing-cards">
            <div class="logo">
            <img src="${standing.team.crestUrl}" alt="${standing.team.name}">
            </div>
          <h3>${standing.team.name}</h3>
          <hr>
          <div class="detail">
              <div class="line">
                <span>
                <i class="fas fa-hashtag"></i> Position
                </span>
                ${standing.position}
              </div>
              <div class="line">
                <span>
                <i class="fas fa-play"></i> Play
                </span>
                ${standing.playedGames}
              </div>
              <div class="line">
                <span>
                  <i class="fas fa-trophy"></i> Won
                </span>
                ${standing.won}
              </div>
              <div class="line">
                <span>
                  <i class="fas fa-window-close"></i> Lost
                </span>
                ${standing.lost}
              </div>
              <div class="line">
                <span>
                  <i class="fas fa-equals"></i> Draw
                </span>
                ${standing.draw}
              </div>
              <div class="line">
                <span>
                  <i class="fas fa-coins"></i> Points
                </span>
                ${standing.points}
              </div>
              <div class="line">
                <span>
                  <i class="fas fa-futbol"></i> Goals
                </span>
                ${standing.goalsFor}
              </div>
          </div>
          </div>
        </div>
      `;
    })
    document.querySelector("#standing-list").innerHTML = dataHTML;

  } catch (error) {
    console.log(error)
    handleError();
  }
}

const getMatches = async () => {
  try {
    const respond = await fetch(`${baseUrl}/competitions/${league}/matches`, options);
    const data = await respond.json();
    const matches = data.matches;
    let dataHTML = "";
    matches.forEach(function(match){
      // 
    })


    
  } catch (error) {
    console.log(error)
    handleError();
  }
}

const getTeamById = async idTeam => {
  try {
    const respond = await fetch(`${baseUrl}/teams/${idTeam}`, options);
    const data = await respond.json();
  return {
    logo: data.crestUrl,
    shortName: data.tla
  }
  } catch (error) {
    console.log(error)
    handleError();
  }
}

// console.log(getTeamById(65).then(function(item){console.log(item)}));











// HANDLE
const handleError = () => {
  console.log("Opps.. Somethings Wrong !");
}