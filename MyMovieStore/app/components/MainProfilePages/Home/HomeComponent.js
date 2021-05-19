import React, { Component } from "react";
import CommonMovieScreenComponent from "../CommonMoviesScreen/CommonMovieScreenComponent";

class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api_key: "afc4e3645add4e5a7eeafe8e855518bf",
            api_url:
                "https://api.themoviedb.org/3/movie/top_rated?api_key=afc4e3645add4e5a7eeafe8e855518bf&language=en-US&page=",
        };
    }

    render() {
        return (
            <CommonMovieScreenComponent
                heading={"Top 10 (& more)"}
                isHome={true}
                api_url={this.state.api_url}
                navigation={this.props.navigation}
            />
        );
    }
}

export default HomeComponent;
