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
  return new Promise(function(resolve, reject){

    if("caches" in window){
      caches.match(`${baseUrl}/competitions/${league}/standings?standingType=TOTAL`)
        .then(function(response){
          if(response){
            response.json().then(function(data){
              const standings = data.standings[0].table;
              let dataHTML = "";
  
            standings.forEach(function (standing) {
              const logo = standing.team.crestUrl.replace(/^http:\/\//i, 'https://');

              dataHTML += `
                <div class="col s12 m6 xl4">
                <div class="standing-cards">
                  
                  <div class="makeToBookmark">
                    <div class="infoDetail">
                      Save to Bookmark
                    </div>
                    <i
                  class="material-icons bookmarkicon"
                  data-id="${standing.team.id}"
                 
                  >
                  bookmark_border
                  </i>
                  </div>
        
                    <div class="logo">
                    <img src="${logo}" alt="${standing.team.name}">
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

              
              checkBookmarked(standing.team.id);
            });
            document.querySelector("#standing-list").innerHTML = dataHTML;
            const btnBookmark = document.querySelectorAll(".bookmarkicon");

              btnBookmark.forEach(function(bookmark){
                bookmark.addEventListener("click", function(){
                  standings.forEach(function(standing){
                    if(standing.team.id == bookmark.dataset.id){
                      saveToBookmark(standing);
                    }
                  })
                  // bookmarked(bookmark.dataset.id);
                })
              })
// 
            closePreLoader();
            resolve(standings);
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
  
        // id = standings.team.id
  
        standings.forEach(function (standing) {
          const logo = standing.team.crestUrl.replace(/^http:\/\//i, 'https://');
          
          dataHTML += `
            <div class="col s12 m6 xl4">
            <div class="standing-cards">
              
              <div class="makeToBookmark">
                <div class="infoDetail">
                  Save to Bookmark
                </div>
                  <i
                  class="material-icons bookmarkicon"
                  data-id="${standing.team.id}"
                 
                  >
                  bookmark_border
                  </i>
              </div>
    
                <div class="logo">
                <img src="${logo}" alt="${standing.team.name}">
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
          checkBookmarked(standing.team.id);
         
          
        })
        document.querySelector("#standing-list").innerHTML = dataHTML;
        const btnBookmark = document.querySelectorAll(".bookmarkicon");
        btnBookmark.forEach(function(bookmark){
          bookmark.addEventListener("click", function(){
            standings.forEach(function(standing){
            
              if(standing.team.id == bookmark.dataset.id){
                saveToBookmark(standing);
              }
            })
            // bookmarked(bookmark.dataset.id);
          })
        })
        // 
        closePreLoader();
        resolve(standings);
  
      
        
      })
      


  }).then(function(standing){

      })
      
      //}
}

// const btnBookmark = document.querySelectorAll(".bookmarkicon");
// console.log(btnBookmark)
// btnBookmark.forEach(function(bookmark){
//   bookmark.addEventListener("click", function(){
//     console.log(bookmark);
//   })
// })

const bookmarked = id => {
  console.log(id)
}


const getMatches = () => {
  preLoader();

  if("caches" in window){
    caches.match(`${baseUrl}/competitions/${league}/matches`)
      .then(function(response){
        if(response){
          response.json().then(function(data){
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

          })
        }
      })
  }

    fetch(`${baseUrl}/competitions/${league}/matches`, options)
    .then(status)
    .then(json)
    .then(function(data){
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
    })
}

const getBookmarks = (bookmarkItems) =>{
  let dataHTML = "";
  if(bookmarkItems == 0){
    dataHTML = `<img src="/src/assets/images/empty.svg" alt="empty bookmark" class="emptyicon"><p>Bookmark is Empty</p>`;
  } else{
    console.log("empty")
    bookmarkItems.forEach(function(bookmarkItem){

      checkBookmarked(bookmarkItem.team.id);
  
  
      dataHTML += `
              <div class="col s12 m6 xl4">
              <div class="standing-cards">
                
                <div class="makeToBookmark">
                  <div class="infoDetail">
                    Save to Bookmark
                  </div>
                    <i
                    class="material-icons bookmarkicon"
                    data-id="${bookmarkItem.team.id}"
                   
                    >
                    bookmark_border
                    </i>
                </div>
      
                  <div class="logo">
                  <img src="${bookmarkItem.team.crestUrl}" alt="${bookmarkItem.team.name}">
                  </div>
                <h3>${bookmarkItem.team.name}</h3>
                <hr>
                <div class="detail">
                    <div class="line">
                      <span>
                      <i class="fas fa-hashtag"></i> Position
                      </span>
                      ${bookmarkItem.position}
                    </div>
                    <div class="line">
                      <span>
                      <i class="fas fa-play"></i> Play
                      </span>
                      ${bookmarkItem.playedGames}
                    </div>
                    <div class="line">
                      <span>
                        <i class="fas fa-trophy"></i> Won
                      </span>
                      ${bookmarkItem.won}
                    </div>
                    <div class="line">
                      <span>
                        <i class="fas fa-window-close"></i> Lost
                      </span>
                      ${bookmarkItem.lost}
                    </div>
                    <div class="line">
                      <span>
                        <i class="fas fa-equals"></i> Draw
                      </span>
                      ${bookmarkItem.draw}
                    </div>
                    <div class="line">
                      <span>
                        <i class="fas fa-coins"></i> Points
                      </span>
                      ${bookmarkItem.points}
                    </div>
                    <div class="line">
                      <span>
                        <i class="fas fa-futbol"></i> Goals
                      </span>
                      ${bookmarkItem.goalsFor}
                    </div>
                </div>
                </div>
              </div>
            `;
    })
  }
  
  document.querySelector("#bookmark-list").innerHTML = dataHTML;
  const btnBookmark = document.querySelectorAll(".bookmarkicon");
  btnBookmark.forEach(function(bookmark){
    bookmark.addEventListener("click", function(){
      bookmarkItems.forEach(function(standing){
        checkBookmarked(standing.team.id);
        if(standing.team.id == bookmark.dataset.id){
          removeFromBookmark(standing.team.id);
          getSavedBookmark();
        }
      })
      // bookmarked(bookmark.dataset.id);
    })
  })
}

