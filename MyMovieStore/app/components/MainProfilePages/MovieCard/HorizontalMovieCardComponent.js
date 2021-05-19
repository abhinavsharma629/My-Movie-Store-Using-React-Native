import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Image
} from "react-native";
import RNBounceable from "@freakycoder/react-native-bounceable";


class HorizontalMovieCardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: {},
            img_static_url: "https://www.themoviedb.org/t/p/w220_and_h330_face",
        };
    }

    componentDidMount() {
        this.setState({ movie: this.props.movie });
    }

    render() {
        const stateMovie = this.state.movie;
        return (
            <View style={styles.movieViewContainer}>
                <RNBounceable
                    onPress={() => {
                        this.props.navigation.navigate("MovieDetail", {
                            movieId: stateMovie["id"],
                        });
                    }}
                >
                    <Image
                        style={[styles.movieImg]}
                        source={{
                            uri:
                                this.state.img_static_url +
                                stateMovie["poster_path"],
                        }}
                    />
                </RNBounceable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    movieViewContainer: {
        padding: 10,
        flexDirection: "row",
        elevation: 20,
    },
    movieImg: {
        width: 120,
        height: 130,
        borderRadius: 5,
    },
});

export default HorizontalMovieCardComponent;
