import React from 'react';
import '../styles/index.scss';
import axios from 'axios';
import filmIcon from "../images/movie.svg";
import filmIconBlack from "../images/movie-black.svg";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      url: "https://api.themoviedb.org/3/search/movie?api_key=d847b6fbf410655f6b71421e46883b4f&language=en-US&query=",
      movies: [],
      showSuggestions: false
    }
  }

  onChange = e => {
    let tempArr = [];
    e.preventDefault;
    this.setState({
      inputValue: e.target.value,
      showSuggestions: true
    });

    if(e.target.value.length >= 3) {
      axios.get(this.state.url + e.target.value)
          .then(res => {

            console.log(res.data);

            res.data.results.forEach((item, i) => {
              tempArr.push({
                  "name": item.title,
                  "rating": item.vote_average,
                  "year": item.release_date.slice(0,4),
              });
            });

            tempArr = tempArr.slice(0, 8);

            console.log(tempArr);

            this.setState({
              movies: tempArr
            })
          })
    } else if(e.target.value.length === 0) {
      this.setState({
        movies: []
      })
    }
  };

  onClick = e => {
    e.preventDefault();
    this.setState({
      inputValue: e.target.innerText,
      showSuggestions: false
    })
  };

  onFocus() {
      document.getElementById("searchLowerText").classList.toggle("display-none");
      document.getElementById("focusIcon").classList.toggle("display-none");
      document.getElementById("searchButton").classList.toggle("display-none");
  }

  render() {
    return(
        <div className={"search-field"}>
            <div className={"textfield"}>
                <div className={"textfield__search-wrapper"}>
                    <div className={"textfield__input-icon"}><img src={filmIcon} alt={""}/></div>
                    <div className={"textfield__search-field"}>
                        <div className={"textfield__input-container"}>
                            <div id={"focusIcon"} className={"textfield__input-icon textfield__input-icon--black display-none"}><img src={filmIconBlack} alt={""}/></div>
                            <div className={"textfield__input-wrapper"}>
                                <input className={"textfield__input"} type="text" value={this.state.inputValue} onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onFocus} placeholder={"Enter movie name"}/>
                                <p id={"searchLowerText"} className={"lower-text lower-text--search display-none"} >Enter a movie name</p>
                            </div>
                        </div>
                        {this.state.showSuggestions ?
                            <div className={"list-container"}>
                                <div className={"list-container__wrapper"}>
                                    <ul className={"list-container__list"}>
                                        {this.state.movies && this.state.movies.map((item, i)=>(
                                            <div>
                                                <li key={i} className={"list-container__list-item"} onClick={this.onClick}>{item.name}</li>
                                                <p className={"lower-text"}>{item.rating} Rating, {item.year} </p>
                                            </div>
                                        ))}
                                    </ul>
                                </div>
                            </div> : ""}
                    </div>
                </div>
                <button id={"searchButton"} className={"textfield__submit-button"}>
                </button>
            </div>
        </div>
    );
  }
}
export default App;