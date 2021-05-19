import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Image,
    StatusBar,
    ScrollView
} from "react-native";
import RNBounceable from "@freakycoder/react-native-bounceable";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MovieCardComponent from "../MovieCard/MovieCardComponent";
import { colors } from '../../../assets/Colors/Colors';


class SearchComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api_key: "afc4e3645add4e5a7eeafe8e855518bf",
            page: 1,
            movies: [],
            searchText: "",
            img_static_url: "https://www.themoviedb.org/t/p/w220_and_h330_face",
        };
    }

    search() {
        fetch(
            "https://api.themoviedb.org/3/search/movie?api_key=afc4e3645add4e5a7eeafe8e855518bf&language=en-US&query=%7B%22name%22%3A%22" +
            this.state.searchText +
            "%22%7D&page=" +
            this.state.page +
            "&include_adult=true",
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
                this.setState({
                    movies: [...this.state.movies, ...responseJson["results"]],
                });
            });
    }

    loadMore() {
        console.log("bottom");
        this.setState({ page: this.state.page + 1 }, () => {
            this.search();
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
                                <RNBounceable onPress={() => { }}></RNBounceable>
                                <RNBounceable onPress={() => { }}>
                                    <Image
                                        style={[
                                            styles.profile,
                                            { marginLeft: 80 },
                                        ]}
                                        source={require("../../../assets/images/user2.png")}
                                    />
                                </RNBounceable>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

                <View style={[styles.middleContent]}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 0.95 }}>
                            <KeyboardAvoidingView>
                                <TextInput
                                    style={[styles.input]}
                                    placeholderTextColor={colors.offWhite}
                                    placeholder="Search By Movie Name..."
                                    onChangeText={(text) => {
                                        this.setState({ searchText: text });
                                    }}
                                    value={this.state.searchText}
                                ></TextInput>
                            </KeyboardAvoidingView>
                        </View>
                        <View style={{ flex: 0.15 }}>
                            <RNBounceable
                                onPress={() => {
                                    this.search();
                                }}
                            >
                                <Icon
                                    size={30}
                                    name="text-search"
                                    style={[
                                        styles.logo,
                                        { marginLeft: 20, marginTop: 10 },
                                    ]}
                                />
                            </RNBounceable>
                        </View>
                    </View>
                    <View style={{ paddingTop: 10 }}></View>
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
    input: {
        borderColor: colors.offWhite,
        borderRadius: 5,
        borderWidth: 1,
        color: "white",
        textAlign: "center",
        fontSize: 20,
    },
});

export default SearchComponent;
