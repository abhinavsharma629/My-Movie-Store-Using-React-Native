import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Image,
    StatusBar,
    ScrollView,
    ImageBackground,
    ActivityIndicator,
} from "react-native";
import { Button } from "react-native-elements";
import RNBounceable from "@freakycoder/react-native-bounceable";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MovieCardComponent from "../MovieCard/MovieCardComponent";
import HorizontalMovieCardComponent from "../MovieCard/HorizontalMovieCardComponent";
import FilterComponent from "../MovieDetail/FilterComponent";
import { colors } from '../../../assets/Colors/Colors';

class CommonMovieScreenComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api_key: "afc4e3645add4e5a7eeafe8e855518bf",
            api_url: this.props.api_url,
            page: 1,
            movies: [],
            img_static_url: "https://www.themoviedb.org/t/p/w220_and_h330_face",
            topMovie: {},
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
        this._getMoviesData();
    }

    _getMoviesData = async () => {
        fetch(this.state.api_url + this.state.page, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    movies: [...this.state.movies, ...responseJson["results"]],
                    topMovie: responseJson["results"][0],
                });
            });
    };

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

    loadMore() {
        console.log("bottom");
        this.setState({ page: this.state.page + 1 }, () => {
            this._getMoviesData();
        });
    }

    render() {
        //Load More
        const isCloseToBottom = ({
            layoutMeasurement,
            contentOffset,
            contentSize,
        }) => {
            const paddingToBottom = 20;
            return (
                layoutMeasurement.height + contentOffset.y >=
                contentSize.height - paddingToBottom
            );
        };

        // Movie Cards
        let movieView = [];
        let stateMovies = this.state.movies;
        if (stateMovies.length === 0) {
            movieView.push(
                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}><ActivityIndicator color={colors.offWhite} /></View>)
        }
        else {
            for (let i = 1; i < stateMovies.length; i++) {
                movieView.push(
                    <MovieCardComponent
                        key={stateMovies[i]["id"]}
                        navigation={this.props.navigation}
                        movie={stateMovies[i]}
                    />
                );
            }
        }

        let horizontalMovieView = [];
        if (stateMovies.length === 0) {
            horizontalMovieView.push(
                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}><ActivityIndicator color={colors.offWhite} /></View>)
        }
        else {
            for (let i = 0; i < stateMovies.length; i++) {
                horizontalMovieView.push(
                    <HorizontalMovieCardComponent
                        key={stateMovies[i]["id"]}
                        navigation={this.props.navigation}
                        movie={stateMovies[i]}
                    />
                );
            }
        }

        return (
            <View style={styles.container}>
                <StatusBar animated={true} hidden={true} />

                <TouchableWithoutFeedback
                    onPress={() => {
                        this.props.navigation.navigate("MovieDetail", {
                            movieId: this.state.topMovie["id"],
                        });
                    }}
                >
                    <View style={styles.header}>
                        <ImageBackground
                            source={{
                                uri:
                                    this.state.img_static_url +
                                    this.state.topMovie.poster_path,
                            }}
                            style={styles.image}
                            imageStyle={{ opacity: 0.2 }}
                        >
                            <View style={styles.headerContainer}>
                                <View
                                    style={[
                                        styles.headerColumnLeft,
                                        styles.headerCenterIcons,
                                        styles.headerLogoContainer,
                                    ]}
                                >
                                    <RNBounceable onPress={() => { }}>
                                        <Image
                                            style={[styles.wsLogo]}
                                            source={require("../../../assets/images/watch.png")}
                                        />
                                    </RNBounceable>
                                </View>
                                <View
                                    style={[styles.headerColumnMiddle]}
                                ></View>
                                <View
                                    style={[
                                        styles.headerColumnRight,
                                        styles.headerCenterIcons,
                                        { flexDirection: "row" },
                                    ]}
                                >
                                    <RNBounceable
                                        onPress={() => {
                                            this.props.navigation.navigate(
                                                "Search",
                                                {}
                                            );
                                        }}
                                    >
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
                            {Object.keys(this.state.topMovie).length > 0 ? (<View>
                                <RNBounceable
                                    onPress={() => {
                                        this.props.navigation.navigate(
                                            "MovieDetail",
                                            {
                                                movieId: this.state.topMovie["id"],
                                            }
                                        );
                                    }}
                                >
                                    <Image
                                        style={[styles.overlayImage]}
                                        source={{
                                            uri:
                                                this.state.img_static_url +
                                                this.state.topMovie.poster_path,
                                        }}
                                    />
                                </RNBounceable>

                                <View
                                    style={{ flexDirection: "row", paddingTop: 10 }}
                                >
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
                                        containerStyle={{
                                            marginLeft: 7,
                                            width: 130,
                                        }}
                                        titleStyle={{
                                            color: colors.black,
                                            fontWeight: "bold",
                                        }}
                                        onPress={() => {
                                            this.props.navigation.navigate(
                                                "VideoPlayer",
                                                {
                                                    movieId: this.state.topMovie[
                                                        "id"
                                                    ],
                                                }
                                            );
                                        }}
                                    />
                                    <Icon
                                        style={{ marginLeft: 30 }}
                                        onPress={() => {
                                            this.props.navigation.navigate(
                                                "MovieDetail",
                                                {
                                                    movieId: this.state.topMovie[
                                                        "id"
                                                    ],
                                                }
                                            );
                                        }}
                                        name="information"
                                        size={35}
                                        color={colors.white}
                                    />
                                </View>
                            </View>
                            ) :
                                (
                                    <View style={styles.overlayImage}>
                                        <ActivityIndicator color={colors.offWhite} />
                                    </View>
                                )}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{ flex: 0.5 }}>
                    <ScrollView>
                        {this.props.isHome ? (
                            <View style={{ flex: 0.3, padding: 5 }}>
                                <Text style={styles.title1}>My List</Text>
                                <ScrollView horizontal={true}>
                                    {horizontalMovieView}
                                </ScrollView>
                            </View>
                        ) : (
                                <View style={{ flex: 0.3, padding: 5 }}></View>
                            )}
                        <FilterComponent
                            visible={this.state.visible}
                            filters={this.state.filters}
                            close={() => {
                                this.setState({ visible: false });
                            }}
                            filterThem={this.filterData}
                        />
                        <View style={{ flex: 0.7 }}>
                            <RNBounceable
                                onPress={() => {
                                    this.setState({
                                        visible: !this.state.visible,
                                    });
                                }}
                            >
                                <Icon
                                    name="sort"
                                    style={{ marginLeft: "90%" }}
                                    size={25}
                                    color={colors.offWhite}
                                />
                            </RNBounceable>
                            <Text style={styles.title1}>
                                {this.props.heading}
                            </Text>
                            <ScrollView
                                onScroll={({ nativeEvent }) => {
                                    if (isCloseToBottom(nativeEvent)) {
                                        this.loadMore();
                                    }
                                }}
                            >
                                {movieView}
                                <Text></Text>
                                <Text></Text>
                            </ScrollView>
                        </View>
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
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    header: {
        flex: 0.5,
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
        flex: 0.5,
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
        top: "22%",
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
        textAlign: "center",
        alignItems: "center",
        flex: 0.4,
        marginLeft: 20,
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
    title1: {
        color: colors.offWhite,
        fontSize: 25,
        paddingLeft: 10,
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
});

export default CommonMovieScreenComponent;
