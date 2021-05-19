import React, { Component } from "react";
import CommonMovieScreenComponent from "../CommonMoviesScreen/CommonMovieScreenComponent";

class PopularComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api_key: "afc4e3645add4e5a7eeafe8e855518bf",
            api_url:
                "https://api.themoviedb.org/3/movie/popular?api_key=afc4e3645add4e5a7eeafe8e855518bf&language=en-US&page=",
            page: 1,
        };
    }

    render() {
        return (
            <CommonMovieScreenComponent
                heading={"Popular"}
                isHome={false}
                api_url={this.state.api_url}
                navigation={this.props.navigation}
            />
        );
    }
}

export default PopularComponent;
