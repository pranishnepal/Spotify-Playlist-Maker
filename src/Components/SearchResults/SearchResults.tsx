import React from "react";
import { SpotifyResponse } from "../App/App";
import { TrackList } from "../TrackList/TrackList";
import "./SearchResults.css";

interface SearchResultProps {
  searchResults: SpotifyResponse[];
  onAdd: (track: SpotifyResponse) => void;
}

export class SearchResults extends React.Component<SearchResultProps> {
  render() {
    return (
      <div className="SearchResults">
        <h2 className="ResultHeading">Results</h2>
        {/* Shows the songs found from Spotify API */}
        <TrackList
          trackList={this.props.searchResults}
          addOrRemove={this.props.onAdd}
          isRemoval={false}
        />
      </div>
    );
  }
}
