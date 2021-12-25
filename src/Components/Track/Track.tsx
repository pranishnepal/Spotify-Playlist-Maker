import React from "react";
import { SpotifyResponse } from "../App/App";
import "./Track.css";

interface TrackProps {
  track: SpotifyResponse;
  addOrRemove: (track: SpotifyResponse) => void;
  isRemoval: boolean;
}

export class Track extends React.Component<TrackProps> {
  addNewSong = (track: SpotifyResponse): void => {
    this.props.addOrRemove(track);
  };

  removeASong = (track: SpotifyResponse): void => {
    this.props.addOrRemove(track);
  };

  render() {
    const { id, name, artist, album, uri } = this.props.track;
    const { isRemoval } = this.props;

    if (isRemoval) {
      /* Show - button */
      return (
        <div className="Track">
          <div className="Track-information">
            <h3>{name}</h3>
            <p>
              {artist} | {album}
            </p>
          </div>
          <button
            className="Track-action"
            onClick={() => this.removeASong(this.props.track)}
          >
            💔
          </button>
        </div>
      );
    } else {
      /* Show + button */
      return (
        <div className="Track">
          <div className="Track-information">
            <h3>{name}</h3>
            <p>
              {artist} | {album}
            </p>
          </div>
          <button
            className="Track-action"
            onClick={() => this.addNewSong(this.props.track)}
          >
            💓
          </button>
        </div>
      );
    }
  }
}
