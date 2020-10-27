const baseUrl = "http://api.football-data.org/v2";
const apiKey = "b0825830f1724f13987c4b6ffb0ab92f";
const league = "2021" //liga inggris / Premier League


const getStandings = async () => {
  try{
    const respond = await fetch(`${baseUrl}/competitions/${league}/standings`, {
      headers: {
        "X-Auth-Token": apiKey
      }
    })
    const data = await respond.json();
    const standings = data.standings[0].table

    standings.forEach(function(standing){
      console.log(standing.team.id)
      console.log(standing.team.name)
      console.log(standing.team.crestUrl)
    })

  } catch(error){
    console.log(error)
    handleError();
  }
}

getStandings();










// HANDLE
const handleError = () => {
  console.log("Opps.. Somethings Wrong !");
}