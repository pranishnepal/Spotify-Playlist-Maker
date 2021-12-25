import React from "react";
import { SpotifyResponse } from "../App/App";
import { Track } from "../Track/Track";
import "./TrackList.css";

interface TrackListProps {
  trackList: SpotifyResponse[];
  addOrRemove: (track: SpotifyResponse) => void;
  isRemoval: boolean;
}

export class TrackList extends React.Component<TrackListProps> {
  render() {
    const trackList = this.props.trackList;
    return (
      <div className="TrackList">
        {trackList.map((track) => {
          return (
            <Track
              key={track.id}
              track={track}
              addOrRemove={this.props.addOrRemove}
              isRemoval={this.props.isRemoval}
            />
          );
        })}
      </div>
    );
  }
}
