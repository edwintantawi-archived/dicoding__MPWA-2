const dbPromised = idb.open("football-league", 1, function(upgradeDb){
  const standingsObjectStore = upgradeDb.createObjectStore("standings", {
    keyPath: "ID"
  });
  standingsObjectStore.createIndex("standing_team", "standing_team", {unique: true});
});


// save to bookmark
const saveToBookmark = standing =>{
  dbPromised
    .then(function(db){
      const tx = db.transaction("standings", "readwrite");
      const store = tx.objectStore("standings");
      console.log(standing);
      store.add(standing);
    })
    .then(function(){
      showToast("Standing Team has been successfully added to the bookmark")
    });
};

// toast
const showToast = text => {
  M.toast({
    html: text
  });
}