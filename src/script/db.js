const dbPromised = idb.open("footballleague", 1, function(upgradeDb){
  const standingsObjectStore = upgradeDb.createObjectStore("standings", {
    keyPath: "team.id"
  });
  standingsObjectStore.createIndex("name", "team.name", {unique: false});
});


// save to bookmark
const saveToBookmark = standing =>{
  dbPromised
    .then(function(db){
      const tx = db.transaction('standings', 'readwrite');
      const store = tx.objectStore('standings');
      store.add(standing);
      return tx.complete;
  }).then(function() {
      checkBookmarked(standing.team.id);
      showToast(`${standing.team.name} has been added to the bookmark`);
    }).catch(function() {
      removeFromBookmark(standing.team.id);
      removeBookmark(standing.team.id);
      showToast(`${standing.team.name} has been deleted to the bookmark`);
  })
};

const removeFromBookmark = id => {
  dbPromised
    .then(function(db){
      const tx = db.transaction('standings', 'readwrite');
      const store = tx.objectStore('standings');
      store.delete(id);
      return tx.complete;
    });
}

const checkBookmarked = id =>{
  dbPromised
    .then(function(db){
      const tx = db.transaction('standings', 'readonly');
      const store = tx.objectStore('standings');
      return store.getAll();
    })
    .then(function(standings){
      standings.forEach(function(standing){
        if(standing.team.id == id){
          const btnBookmark = document.querySelector(`[data-id='${id}']`);
          btnBookmark.innerHTML = "bookmark"
        }
 
      });
    })
}

const removeBookmark = id =>{
  const btnBookmark = document.querySelector(`[data-id='${id}']`);
  btnBookmark.innerHTML = "bookmark_border"
}

// toast
const showToast = text => {
  M.toast({
    html: text
  });
}