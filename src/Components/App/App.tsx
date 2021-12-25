import React from "react";
import { Spotify } from "../../Utils/Spotify";
import { Playlist } from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import "./App.css";

interface AppProps {}

export interface SpotifyResponse {
  id: number;
  name: string;
  artist: string;
  album: string;
  uri: string;
}

interface AppState {
  searchResults: SpotifyResponse[]; // Songs from Spotify Search
  playListName: string;
  playListTracks: SpotifyResponse[]; // User choice of songs
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      searchResults: [
        {
          id: 1,
          name: "Peaches",
          artist: "Justin Bieber",
          album: "Justice",
          uri: "sdfsdfdsdf",
        },
        {
          id: 2,
          name: "As I am",
          artist: "Justin Bieber",
          album: "Justice",
          uri: "sdfsdfdsdf",
        },
      ],
      playListName: "TestPlaylist",
      playListTracks: [],
    };
  }

  addNewTrackToUserPlayList = (newTrack: SpotifyResponse): void => {
    const currPlayList: SpotifyResponse[] = this.state.playListTracks;
    const newTrackAlreadyExists = currPlayList.find(
      (track) => track.id === newTrack.id
    );

    if (!newTrackAlreadyExists) {
      currPlayList.push(newTrack);
      this.setState({ playListTracks: currPlayList });
    }
  };

  removeTrackFromUserPlayList = (track: SpotifyResponse): void => {
    const currPlayList: SpotifyResponse[] = this.state.playListTracks;
    const trackIdx: number = currPlayList.findIndex(
      (currTrack) => currTrack.id === track.id
    );

    if (trackIdx != -1) {
      currPlayList.splice(trackIdx, 1);
      this.setState({ playListTracks: currPlayList });
    }
  };

  updatePlayListName = (newPlayListName: string): void => {
    this.setState({ playListName: newPlayListName });
  };

  savePlayListToAccount = (): void => {
    /**
     * Creates an array of URIs of the tracks user selected and calls playlist creator.
     */
    const currPlayList = this.state.playListTracks;
    let userSelectedTracksURI: string[] = [];

    currPlayList.map((currTrack) => {
      userSelectedTracksURI.push(currTrack.uri);
    });

    Spotify.savePlayListToAccount(
      this.state.playListName,
      userSelectedTracksURI
    );
  };

  handleSearch = async (searchTerm: string) => {
    /* invokes spotify after user hits the search button */
    const spotifyResponse = await Spotify.searchOnSpotify(searchTerm);

    this.setState({
      searchResults: spotifyResponse,
    });
  };

  componentDidMount() {
    window.addEventListener("load", () => {
      Spotify.getAccessToken();
    });
    this.handleSearch("Justin Bieber");
  }

  render() {
    return (
      <div>
        <h1 className="highlight">Spotify Playlist Maker</h1>
        <div className="App">
          <SearchBar onSearch={this.handleSearch} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addNewTrackToUserPlayList}
            />
            <Playlist
              playListName={this.state.playListName}
              platListTracks={this.state.playListTracks}
              addOrRemove={this.removeTrackFromUserPlayList}
              onNameChange={this.updatePlayListName}
              onSave={this.savePlayListToAccount}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
