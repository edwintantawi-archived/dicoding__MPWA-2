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
    // const repl = await JSON.stringify(data).replace(/http:/g, 'https:');
    // console.log(repl);
    const standings = data.standings[0].table
    let dataHTML = "";
    standings.forEach(function (standing) {
      dataHTML += `
        <div class="col s12 m6 xl4">
        <div class="standing-cards">
          
          <div class="makeToBookmark">
            <div class="infoDetail">
              Save to Bookmark
            </div>
            <i class="material-icons bookmarkicon">bookmark_border</i>
          </div>

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
      dataHTML += `
      <!-- render js -->
      <div class="col s12">
        <div class="match-cards">
          <div class="wrap">
            <div class="left">
              <h3>${match.homeTeam.name}</h3>
            </div>
            <div class="center">
              <span class="text">SCORE:</span>
              <span class="point">${match.score.fullTime.homeTeam || "0"} <span>:</span> ${match.score.fullTime.awayTeam || "0"}</span>
              <span></span>
            </div>
            <div class="right">
              <h3>${match.awayTeam.name}</h3>
            </div>
          </div>
          <div class="date">
               <span class="time">
              ${match.utcDate.slice(0,10)}
            </span>
          </div>
        </div>
      </div>
      <!-- end render js -->
      `;
    })

    document.querySelector("#match-list").innerHTML = dataHTML;
    
  } catch (error) {
    console.log(error)
    handleError();
  }
}

// const getTeamById = async idTeam => {
//   try {
//     const respond = await fetch(`${baseUrl}/teams/${idTeam}`, options);
//     const data = await respond.json();
//     return data.crestUrl;

//   } catch (error) {
//     console.log(error)
//     handleError();
//   }
// }


// // HANDLE
// const handleError = () => {
//   console.log("Opps.. Somethings Wrong !");
// }
