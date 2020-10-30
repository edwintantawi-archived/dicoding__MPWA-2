const baseUrl = "https://api.football-data.org/v2";
const apiKey = "b0825830f1724f13987c4b6ffb0ab92f";
const options = {headers: {
  "X-Auth-Token": apiKey
}}
const league = "2021" //liga inggris / Premier League


const preLoader = ()=>{
  document.querySelector("#loader").innerHTML = `
  <div class="preloader-wrapper active">
  <div class="spinner-layer spinner-blue-only">
    <div class="circle-clipper left">
      <div class="circle"></div>
    </div><div class="gap-patch">
      <div class="circle"></div>
    </div><div class="circle-clipper right">
      <div class="circle"></div>
    </div>
  </div>
</div>
  `;
}

const closePreLoader = ()=>{
  document.querySelector("#loader").innerHTML = "";
}


const status = response => {
  if(response.status !== 200){
    return Promise.reject(new Error(response.statusText));
  }else{
    return Promise.resolve(response);
  }
}

const json = response => {
  return response.json();
}

// HANDLE
const handleError = error => {
  console.log(`Opps.. Somethings Wrong ! ${error}`);
}



const getStandings =() => {
  preLoader();

  if("caches" in window){
    caches.match(`${baseUrl}/competitions/${league}/standings?standingType=TOTAL`)
      .then(function(response){
        if(response){
          response.json().then(function(data){
            const standings = data.standings[0].table;
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
          });
          document.querySelector("#standing-list").innerHTML = dataHTML;
          closePreLoader();
          // end
          })
        }
      })
  } //else {

    fetch(`${baseUrl}/competitions/${league}/standings?standingType=TOTAL`, options)
    .then(status)
    .then(json)
    .then(function(data){
      const standings = data.standings[0].table;
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
      closePreLoader();

    })


  //}
}

const getMatches = async () => {
  preLoader();
  try {
    const respond = await fetch(`${baseUrl}/competitions/${league}/matches`, options);
    const stat = await status(respond);
    const data = await json(stat);
    const matches = data.matches;
    let dataHTML = "";
    matches.forEach(function(match){
      dataHTML += `
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
      `;
    })

    document.querySelector("#match-list").innerHTML = dataHTML;
    closePreLoader();
    
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


