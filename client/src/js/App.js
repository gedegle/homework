import React from 'react';
import '../styles/index.scss';
import axios from 'axios';
import filmIcon from "../images/movie.svg";
import filmIconBlack from "../images/movie-black.svg";

const _ = require("underscore");

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: "",
            url: "https://api.themoviedb.org/3/search/movie?api_key=d847b6fbf410655f6b71421e46883b4f&language=en-US&query=",
            movies: [],
            showSuggestions: false,
            toggle: false
        };
        this.delayedCallback = _.debounce(this.ajaxCall, 500);

        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    ajaxCall(e) {
        let tempArr = [];
        axios.get(this.state.url + e.target.value)
            .then(res => {
                res.data.results.forEach((item) => {
                    tempArr.push({
                        "name": item.title,
                        "rating": item.vote_average,
                        "year": item.release_date.slice(0,4),
                    });
                });

                tempArr = tempArr.slice(0, 8);

                this.setState({
                    movies: tempArr,
                    showSuggestions: true
                })
            })
    }
    onChange = e => {

        e.persist();
        this.setState({
            inputValue: e.target.value
        });

        if(e.target.value.length >= 3) {
            this.delayedCallback(e);
        } else if(e.target.value.length === 0) {
            this.setState({
                movies: [],
                showSuggestions: false
            })
        }
    };

    onClick = e => {
        e.preventDefault();
        this.setState({
            inputValue: e.target.innerText,
            showSuggestions: false,
            movies: [],
            toggle: false
        })
    };

    onFocus() {
        this.setState({
            toggle: true
        });
    }

    onBlur() {
        if(this.state.inputValue.length === 0) {
            this.setState({
                toggle: false
            });
        }
    }

    render() {
        return(
            <div className={"search-field"}>
                <div className={"textfield"}>
                    <div className={"textfield__search-wrapper"}>
                        <div className={"textfield__input-icon"}><img src={filmIcon} alt={""}/></div>
                        <div className={"textfield__search-field"}>
                            <div className={this.state.showSuggestions ? "textfield__input-container has-value has-value--container" : "textfield__input-container"}>
                                <div id={"focusIcon"} className={this.state.toggle ? "textfield__input-icon textfield__input-icon--black" : "textfield__input-icon textfield__input-icon--black display-none"}><img src={filmIconBlack} alt={""}/></div>
                                <div className={"textfield__input-wrapper"}>
                                    <input className={ this.state.showSuggestions ? "textfield__input has-value" : "textfield__input" } type="text" value={this.state.inputValue} onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} placeholder={"Enter a movie name"}/>
                                    <p id={"searchLowerText"} className={this.state.toggle ? "lower-text lower-text--search" : "lower-text lower-text--search display-none"} >Enter a movie name</p>
                                </div>
                            </div>
                            {this.state.showSuggestions ?
                                <div className={"list-container"}>
                                    <div className={"list-container__wrapper"}>
                                        <ul className={"list-container__list"}>
                                            {this.state.movies && this.state.movies.map((item, i)=>(
                                                <div key={i} >
                                                    <li className={"list-container__list-item"} onClick={this.onClick}>{item.name}</li>
                                                    <p className={"lower-text"}>{item.rating} Rating, {item.year} </p>
                                                </div>
                                            ))}
                                        </ul>
                                    </div>
                                </div> : ""}
                        </div>
                    </div>
                    <button id={"searchButton"} className={this.state.toggle ? "textfield__submit-button display-none" : "textfield__submit-button"}>
                    </button>
                </div>
            </div>
        );
    }
}
export default App;