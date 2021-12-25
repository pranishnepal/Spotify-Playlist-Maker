import React from "react";
import { SpotifyResponse } from "../App/App";
import { TrackList } from "../TrackList/TrackList";
import "./Playlist.css";

interface PlayListProps {
  playListName: string;
  platListTracks: SpotifyResponse[];
  addOrRemove: (track: SpotifyResponse) => void;
  onNameChange: (newName: string) => void;
  onSave: () => void;
}

export class Playlist extends React.Component<PlayListProps> {
  handleNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newName: string = event.target.value;
    this.props.onNameChange(newName);
  };

  render() {
    return (
      <div className="Playlist">
        <input
          placeholder="Enter a playlist name"
          className="PlayList-name-heading"
          onChange={this.handleNameChange}
        />
        {/* Shows the user selected songs */}
        <TrackList
          trackList={this.props.platListTracks}
          addOrRemove={this.props.addOrRemove}
          isRemoval={true}
        />

        <button className="Playlist-save" onClick={this.props.onSave}>
          Save to Spotify
        </button>
      </div>
    );
  }
}
