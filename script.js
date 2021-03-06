//data.item[i].resourceId.videoId;

const apiKey = 'AIzaSyCZuVb4_kTsIKbDBDGMM-KDRnIHyUoJyvw'
let playListUpdate = "";
let initPlaylist = "";
let max = 20;
let playlistData = [];
let timer = 0;


function authenticate() {
  playListUpdate = document.getElementById("pListB").value;
  initPlaylist = document.getElementById("pListA").value;
  max = document.getElementById("num").value;;
  return gapi.auth2.getAuthInstance()
    .signIn({ scope: "https://www.googleapis.com/auth/youtube.readonly" })
    .then(function () { console.log("Sign-in successful"); },
      function (err) { console.error("Error signing in", err); });
}
function loadClient() {
  gapi.client.setApiKey(apiKey);
  return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    .then(function () { console.log("GAPI client loaded for API"); },
      function (err) { console.error("Error loading GAPI client for API", err); });
}
// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
  return gapi.client.youtube.playlistItems.list({
    "part": [
      "snippet,contentDetails"
    ],
    "maxResults": 2000,
    "playlistId": initPlaylist
  })
    .then(function (response) {
      // Handle the results here (response.result has the parsed body).
      console.log("Response", response);

      playlistData = response;
      authenticate2().then(loadClient);


    },
      function (err) { console.error("Execute error", err); });
}
gapi.load("client:auth2", function () {
  gapi.auth2.init({ client_id: "790008202741-acjnj5f0ssjnq29pbkm47qmkhmtq04ht.apps.googleusercontent.com" });
});
////////////////////////////////////////////////////////MERGE FUNCTION////////////////////////////////////////////////
function authenticate2() {
  return gapi.auth2.getAuthInstance()
    .signIn({ scope: "https://www.googleapis.com/auth/youtube.force-ssl" })
    .then(function () { console.log("Sign-in successful"); mergePlaylist(); },
      function (err) { console.error("Error signing in", err); });
}
///////////////////////////////////////////
function mergePlaylist() {
  console.log("items Array: ", playlistData.result.items[timer]);
  console.log(playlistData.result.items[0].contentDetails.videoId);
  if (timer <= max) {

    if (playlistData.result.items[timer] == undefined) {
      console.log("NO DATA TO LOAD")
      timer++;
      mergePlaylist();
    }
    let vidId = playlistData.result.items[timer].contentDetails.videoId;

    console.log("String VidId: ", vidId);
    // Make sure the client is loaded and sign-in is complete before calling this method.
    return gapi.client.youtube.playlistItems.insert({
      "part": [
        "snippet"
      ],
      "resource": {
        "snippet": {
          "playlistId": playListUpdate,
          "position": 0,
          "resourceId": {
            "kind": "youtube#video",
            "videoId": vidId
          }
        }
      }
    })
      .then(function (response) {
        // Handle the results here (response.result has the parsed body).
        console.log("Response", response);
        console.log("Current: ", timer)
        timer++;
        console.log("Next: ", timer)
        mergePlaylist();
      },
        function (err) {
          console.error("Execute error", err);
          timer++;
          mergePlaylist();
        });

  }
  else {console.log("Done."); return; }
}