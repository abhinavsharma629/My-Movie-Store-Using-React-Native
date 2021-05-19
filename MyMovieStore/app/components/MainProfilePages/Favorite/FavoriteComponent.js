import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Image,
    StatusBar,
    ScrollView
} from "react-native";
import RNBounceable from "@freakycoder/react-native-bounceable";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MovieCardComponent from "../MovieCard/MovieCardComponent";
import FilterComponent from "../MovieDetail/FilterComponent";
import { colors } from '../../../assets/Colors/Colors';

class FavoriteComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api_key: "afc4e3645add4e5a7eeafe8e855518bf",
            api_url:
                "https://api.themoviedb.org/3/movie/top_rated?api_key=afc4e3645add4e5a7eeafe8e855518bf&language=en-US&page=",
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
                this.setState(
                    {
                        movies: [
                            ...this.state.movies,
                            ...responseJson["results"],
                        ],
                        topMovie: responseJson["results"][0],
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

    loadMore() {
        console.log("bottom");
        this.setState({ page: this.state.page + 1 }, () => {
            this._getMoviesData();
        });
    }

    render() {
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
                <TouchableWithoutFeedback
                    onPress={() => {
                        this.props.navigation.navigate("MovieDetail", {
                            movieId: this.state.topMovie["id"],
                        });
                    }}
                >
                    <View style={styles.header}>
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
                            <View style={[styles.headerColumnMiddle]}></View>
                            <View
                                style={[
                                    styles.headerColumnRight,
                                    styles.headerCenterIcons,
                                    { flexDirection: "row" },
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
                    </View>
                </TouchableWithoutFeedback>

                <View style={[styles.middleContent]}>
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
        flex: 0.15,
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
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
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
    date: {
        color: colors.offWhite,
        fontSize: 15,
        fontFamily: "San Francisco",
        paddingLeft: 15,
        paddingTop: 2,
    },
});

export default FavoriteComponent;
