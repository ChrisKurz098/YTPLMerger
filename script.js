//data.item[i].resourceId.videoId;

const apiKey = 'AIzaSyCZuVb4_kTsIKbDBDGMM-KDRnIHyUoJyvw'

let playlistData = [];

function authenticate() {
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
    "maxResults": 200,
    "playlistId": "PLo6LMGdjaTzI76fH66OWjpBJw0cleQGC6"
  })
    .then(function (response) {
      // Handle the results here (response.result has the parsed body).
      console.log("Response", response);

      playlistData = response;
      mergePlaylist();

    },
      function (err) { console.error("Execute error", err); });
}
gapi.load("client:auth2", function () {
  gapi.auth2.init({ client_id: "790008202741-acjnj5f0ssjnq29pbkm47qmkhmtq04ht.apps.googleusercontent.com" });
});
////////////////////////////////////////////////////////MERGE FUNCTION////////////////////////////////////////////////

function mergePlaylist() {

  console.log(playlistData.result.items[0].contentDetails.videoId);
  for (let i = 0; i < 10; i++) {

   let vidId =  playlistData.result.items[i].contentDetails.videoId;
   
   console.log("String VidId: ", vidId);

    /**
* Sample JavaScript code for youtube.playlistItems.insert
* See instructions for running APIs Explorer code samples locally:
* https://developers.google.com/explorer-help/guides/code_samples#javascript
*/

    function authenticate() {
      return gapi.auth2.getAuthInstance()
        .signIn({ scope: "https://www.googleapis.com/auth/youtube.force-ssl" })
        .then(function () { console.log("Sign-in successful"); },
          function (err) { console.error("Error signing in", err); });
    }
    function loadClient() {
      gapi.client.setApiKey("AIzaSyCZuVb4_kTsIKbDBDGMM-KDRnIHyUoJyvw");
      return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function () { console.log("GAPI client loaded for API"); },
          function (err) { console.error("Error loading GAPI client for API", err); });
    }
    // Make sure the client is loaded and sign-in is complete before calling this method.
    function execute() {
      return gapi.client.youtube.playlistItems.insert({
        "part": [
          "snippet"
        ],
        "resource": {
          "snippet": {
            "playlistId": "PLo6LMGdjaTzKrxY2L-T3G4RnGMisOYTNF",
            "position": 0,
            "resourceId": {
              "kind": "youtube#video",
              "videoId": "M7FIvfx5J10"
            }
          }
        }
      })
        .then(function (response) {
          // Handle the results here (response.result has the parsed body).
          console.log("Response", response);
        },
          function (err) { console.error("Execute error", err); });
    }
    gapi.load("client:auth2", function () {
      gapi.auth2.init({ client_id: "790008202741-acjnj5f0ssjnq29pbkm47qmkhmtq04ht.apps.googleusercontent.com" });
    });

  }
}