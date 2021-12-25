import React from "react";
import "./SearchBar.css";

interface SearchBarState {
  userInput: string;
}

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = {
      userInput: "",
    };
  }

  handleSearchBarInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userSearchTerm = event.target.value;
    this.setState({ userInput: userSearchTerm });
  };

  handleSearchClick = (event: React.MouseEvent<HTMLElement>) => {
    this.props.onSearch(this.state.userInput);
  };

  render() {
    return (
      <div className="SearchBar">
        <input
          type="text"
          placeholder="Enter a song/aritst/album"
          onChange={this.handleSearchBarInput}
        />
        <button className="SearchButton" onClick={this.handleSearchClick}>
          Search
        </button>
      </div>
    );
  }
}

export default SearchBar;
