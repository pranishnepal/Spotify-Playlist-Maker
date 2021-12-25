import { SpotifyResponse } from "../Components/App/App";

const clientID: string = process.env.REACT_APP_SPOTIFY_CLIENT_ID!;
const redirectURI: string = "http://localhost:3000/";
let sessionExpirationTime: number;
let userAccessToken: any;

export const Spotify = {
  getAccessToken() {
    if (userAccessToken) {
      return userAccessToken;
    }

    // Save the auth token and expiration that is stored in the URL
    const accessTokenRetrieved =
      window.location.href.match(/access_token=([^&]*)/);

    const expirationTimeRetrieved =
      window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenRetrieved && expirationTimeRetrieved) {
      userAccessToken = accessTokenRetrieved[1];
      sessionExpirationTime = Number(expirationTimeRetrieved[1]);

      /* Clear access token after expiration time */
      window.setTimeout(
        () => (userAccessToken = ""),
        sessionExpirationTime * 1000
      );

      /* Clear the parameters in the URL */
      window.history.pushState("Access Token", null as any, "/");
      return userAccessToken;
    } else {
      /* Redirect User to Authorize */
      const redirectURL: string = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = redirectURL as any;
    }
  },

  async searchOnSpotify(userSearchTerm: string) {
    const requestURL: string = `https://api.spotify.com/v1/search?type=track&q=${userSearchTerm}`;
    const accessToken = Spotify.getAccessToken();

    const response = await fetch(requestURL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const responseJSON = await response.json();
    if (responseJSON.tracks.items) {
      // @ts-ignore
      return responseJSON.tracks.items.map((track) => {
        return {
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        } as SpotifyResponse;
      });
    } else {
      return [];
    }
  },

  async savePlayListToAccount(playListName: string, trackURIs: string[]) {
    if (!playListName || !trackURIs.length) {
      return;
    }

    const requestUserIDURL: string = "https://api.spotify.com/v1/me";
    const currUserAccessToken: string = Spotify.getAccessToken();
    const requestHeader = {
      Authorization: `Bearer ${currUserAccessToken}`,
    };

    /* Get user ID */
    const responseID = await fetch(requestUserIDURL, {
      method: "GET",
      headers: requestHeader,
    });
    const responseIDJSON = await responseID.json();
    const userID = responseIDJSON.id;

    /* Create a new playlist */
    const createPlayListURL: string = `https://api.spotify.com/v1/users/${userID}/playlists`;
    const newPlayList = await fetch(createPlayListURL, {
      method: "POST",
      headers: requestHeader,
      body: JSON.stringify({
        name: playListName,
        public: true,
      }),
    });
    const playListJSON = await newPlayList.json();
    const playListID = playListJSON.id;

    try {
      /* Add songs to the newly created playlist */
      const addSongsToPlayListURL: string = `https://api.spotify.com/v1/users/${userID}/playlists/${playListID}/tracks`;
      const playListWithNewSongs = await fetch(addSongsToPlayListURL, {
        method: "POST",
        headers: requestHeader,
        body: JSON.stringify({ uris: trackURIs }),
      });
      const playListWithNewSongsJSON = await playListWithNewSongs.json();
      const playListWithNewSongsID = playListWithNewSongsJSON.id;
      console.log(playListWithNewSongsID);
      alert("Playlist created, check your account!");
      window.location.reload();
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  },
};
