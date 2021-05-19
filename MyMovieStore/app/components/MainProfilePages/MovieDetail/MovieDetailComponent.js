import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    ScrollView,
    ImageBackground,
} from "react-native";
import { Button } from "react-native-elements";
import RNBounceable from "@freakycoder/react-native-bounceable";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MovieCardComponent from "../MovieCard/MovieCardComponent";
import FilterComponent from "./FilterComponent";
import { colors } from '../../../assets/Colors/Colors';


class MovieDetailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api_key: "afc4e3645add4e5a7eeafe8e855518bf",
            api_url: "https://api.themoviedb.org/3/movie/",
            all_api_url:
                "https://api.themoviedb.org/3/movie/top_rated?api_key=afc4e3645add4e5a7eeafe8e855518bf&language=en-US&page=",
            movie: {},
            movies: [],
            img_static_url: "https://www.themoviedb.org/t/p/w220_and_h330_face",
            movieId: "",
            visible: false,
            filters: {
                name: "asc",
                date: "asc",
                popularity: "asc",
                rate: "asc",
            },
        };
    }

    componentDidMount() {
        this._getMovieData(this.props.navigation.state.params.movieId);
        this._getMoviesData(this.props.navigation.state.params.movieId);
    }

    _getMovieData = async (movieId) => {
        fetch(
            this.state.api_url +
            movieId +
            "?api_key=afc4e3645add4e5a7eeafe8e855518bf&language=en-US",
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        )
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({ movie: responseJson });
            });
    };

    _getMoviesData = async (movieId) => {
        fetch(
            "https://api.themoviedb.org/3/movie/" +
            movieId +
            "/recommendations?api_key=afc4e3645add4e5a7eeafe8e855518bf&language=en-US&page=1",
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        )
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState(
                    {
                        movies: [
                            ...this.state.movies,
                            ...responseJson["results"],
                        ],
                    }
                );
            });
    };

    formatDate(date) {
        if (date) {
            let months = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sept",
                "Oct",
                "Nov",
                "Dec",
            ];
            let days = ["st", "nd", "rd", "th"];
            let dateSplit = date.split("-");
            let mon = "th ";
            if (
                parseInt(dateSplit[2]) % 10 < 4 &&
                parseInt(dateSplit[2]) % 10 != 0
            ) {
                mon = days[(parseInt(dateSplit[2]) % 10) - 1] + " ";
            }
            return (
                dateSplit[2] +
                mon +
                months[parseInt(dateSplit[1]) - 1] +
                " " +
                new Date(date).getFullYear()
            );
        } else {
            return "Not Given";
        }
    }

    comparator(key, type) {
        if (type === "dsc") {
            return this.state.movies.sort((a, b) => {
                if (a[key] <= b[key]) {
                    return -1;
                } else {
                    return 1;
                }
            });
        } else {
            return this.state.movies.sort((a, b) => {
                if (a[key] <= b[key]) {
                    return 1;
                } else {
                    return -1;
                }
            });
        }
    }

    filterData = (key) => {
        let newDict = this.state.filters;
        if (this.state.filters[key] === "asc") {
            newDict[key] = "dsc";
        } else {
            newDict[key] = "asc";
        }
        this.setState({
            movies: this.comparator(key, this.state.filters[key]),
            visible: false,
            filters: newDict,
        });
    };

    render() {
        let movieView = [];
        let stateMovies = this.state.movies;
        for (let i = 0; i < stateMovies.length; i++) {
            movieView.push(
                <MovieCardComponent
                    key={stateMovies[i]["id"]}
                    navigation={this.props.navigation}
                    movie={stateMovies[i]}
                />
            );
        }

        return (
            <View style={styles.container}>
                <StatusBar animated={true} hidden={true} />
                <FilterComponent
                    visible={this.state.visible}
                    filters={this.state.filters}
                    close={() => {
                        this.setState({ visible: false });
                    }}
                    filterThem={this.filterData}
                />

                <View style={styles.header}>
                    <ImageBackground
                        source={{
                            uri:
                                this.state.img_static_url +
                                this.state.movie["poster_path"],
                        }}
                        style={styles.image}
                        imageStyle={{ opacity: 0.2 }}
                    >
                        <View style={styles.headerContainer}>
                            <View
                                style={[
                                    styles.headerColumnLeft,
                                    styles.headerCenterIcons,
                                    { marginTop: 15 },
                                ]}
                            >
                                <RNBounceable
                                    onPress={() => {
                                        this.props.navigation.pop();
                                    }}
                                >
                                    <Icon
                                        style={{ marginLeft: 20 }}
                                        name="keyboard-backspace"
                                        size={35}
                                        color={colors.offWhite}
                                    />
                                </RNBounceable>
                            </View>
                            <View
                                style={[
                                    styles.headerColumnMiddle,
                                    styles.headerCenterIcons,
                                ]}
                            >
                                <Text style={styles.title2}>Movie Details</Text>
                            </View>
                            <View
                                style={[
                                    styles.headerColumnRight,
                                    styles.headerCenterIcons,
                                    { flexDirection: "row", marginLeft: 10 },
                                ]}
                            >
                                <RNBounceable onPress={() => { }}>
                                    <Icon
                                        size={35}
                                        name="cloud-search-outline"
                                        style={[
                                            styles.logo,
                                            styles.headerCenterIcons,
                                            { marginLeft: 20, zIndex: -1 },
                                        ]}
                                    />
                                </RNBounceable>
                                <RNBounceable onPress={() => { }}>
                                    <Image
                                        style={[
                                            styles.profile,
                                            { marginLeft: 30 },
                                        ]}
                                        source={require("../../../assets/images/user2.png")}
                                    />
                                </RNBounceable>
                            </View>
                        </View>
                    </ImageBackground>
                    <View style={styles.profileView}>
                        <Image
                            style={[styles.overlayImage]}
                            source={{
                                uri:
                                    this.state.img_static_url +
                                    this.state.movie["poster_path"],
                            }}
                        />
                        <Text></Text>
                        <View style={{ marginLeft: "-20%" }}>
                            <Button
                                icon={
                                    <Icon
                                        name="play"
                                        size={20}
                                        color={colors.black}
                                    />
                                }
                                title="  Play    "
                                raised
                                buttonStyle={{
                                    borderRadius: 5,
                                    backgroundColor: colors.offWhite,
                                }}
                                containerStyle={{ width: 300 }}
                                titleStyle={{
                                    color: colors.black,
                                    fontWeight: "bold",
                                }}
                                onPress={() => {
                                    this.props.navigation.navigate(
                                        "VideoPlayer",
                                        {
                                            movieId: this.state.movie["id"],
                                        }
                                    );
                                }}
                            />
                        </View>
                        {Object.keys(this.state.movie).length > 0 ? (<View style={{ marginLeft: "-20%", marginTop: 10, width: 300 }}>
                            <Text style={[styles.text, { flexWrap: 'wrap' }]}>{this.state.movie.overview.substring(0, 100)}</Text>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <Text style={[styles.text, { flexWrap: 'wrap' }]}>Popularity : {parseInt(this.state.movie.popularity)} </Text>
                                <Text style={[styles.text, { flexWrap: 'wrap', marginLeft: 15 }]}>Date : {this.formatDate(
                                    this.state.movie.release_date
                                )}</Text>

                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.text, { flexWrap: 'wrap' }]}>Language : {this.state.movie.original_language.toUpperCase()}</Text>
                                <Text style={[styles.text, { flexWrap: 'wrap', marginLeft: 15 }]}>Rating : {this.state.movie.vote_average}</Text>
                                <Text style={[styles.text, { flexWrap: 'wrap', marginLeft: 15 }]}>Duration : {this.state.movie.runtime} minutes</Text>
                            </View>
                        </View>) : (<View></View>)}
                        <View style={{ marginLeft: "-20%" }}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    marginTop: 10,
                                    marginLeft: 35,
                                }}
                            >
                                <RNBounceable onPress={() => { }}>
                                    <Icon name="plus" size={35} color={colors.offWhite} />
                                </RNBounceable>
                                <RNBounceable onPress={() => { }}>
                                    <Icon
                                        name="heart-outline"
                                        size={35}
                                        color={colors.red}
                                        style={{ marginLeft: 50 }}
                                    />
                                </RNBounceable>
                                <RNBounceable onPress={() => { }}>
                                    <Icon
                                        name="share-variant"
                                        size={35}
                                        color={colors.offWhite}
                                        style={{ marginLeft: 50 }}
                                    />
                                </RNBounceable>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    marginTop: 10,
                                    marginLeft: 15,
                                }}
                            >
                                <Text style={styles.date}>My List</Text>
                                <Text style={[styles.date, { marginLeft: 30 }]}>
                                    Like
                                </Text>
                                <Text style={[styles.date, { marginLeft: 40 }]}>
                                    Share
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={[styles.middleContent, { marginTop: 5 }]}>
                    <RNBounceable
                        onPress={() => {
                            this.setState({ visible: !this.state.visible });
                        }}
                    >
                        <Icon
                            name="sort"
                            style={{ marginLeft: "90%" }}
                            size={25}
                            color={colors.offWhite}
                        />
                    </RNBounceable>
                    <ScrollView>
                        {movieView}
                        <Text></Text>
                        <Text></Text>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    item: {
        fontSize: 20,
        color: colors.black,
        fontFamily: "San Francisco",
        fontWeight: "bold",
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    header: {
        flex: 0.8,
    },
    headerContainer: {
        flex: 1,
        padding: 10,
        flexDirection: "row",
    },
    headerLogoContainer: {
        zIndex: -1,
    },
    myButton: {
        paddingLeft: 12,
        paddingTop: 5,
    },
    middleContent: {
        flex: 0.2,
        padding: 20,
    },
    movieViewContainer: {
        padding: 10,
        flexDirection: "row",
        elevation: 15,
    },
    wsLogo: {
        width: 100,
        height: 50,
    },
    overlayImage: {
        width: 200,
        height: 200,
        zIndex: 1,
        opacity: 0.9,
    },
    profileView: {
        position: "absolute",
        left: "25%",
        top: "15%",
    },

    profile: {
        width: 35,
        height: 35,
        borderRadius: 5,
        marginTop: 8,
    },
    movieImg: {
        width: 120,
        height: 150,
        borderRadius: 5,
    },
    headerColumnLeft: {
        flex: 0.2,
    },
    headerColumnRight: {
        flex: 0.4,
    },
    headerCenterIcons: {
        marginTop: 8,
    },
    headerColumnMiddle: {
        flex: 0.4,
    },
    logo: {
        color: colors.offWhite,
        elevation: 10,
    },

    name: {
        color: colors.offWhite,
        fontSize: 20,
        fontFamily: "San Francisco",
        fontWeight: "bold",
        padding: 10,
    },
    title: {
        color: colors.offWhite,
        fontSize: 20,
        paddingLeft: 10,
        paddingTop: 10,
        fontFamily: "San Francisco",
        fontWeight: "500",
    },
    title2: {
        color: colors.offWhite,
        fontSize: 22,
        paddingTop: 10,
        fontFamily: "San Francisco",
        fontWeight: "bold",
    },
    date: {
        color: colors.offWhite,
        fontSize: 15,
        fontFamily: "San Francisco",
        paddingLeft: 15,
        paddingTop: 2,
    },
    text: {
        color: colors.offWhite,
        fontSize: 13,
        fontFamily: "San Francisco",
    }
});

export default MovieDetailComponent;
