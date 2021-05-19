import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Image
} from "react-native";
import { Button } from "react-native-elements";
import RNBounceable from "@freakycoder/react-native-bounceable";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from '../../../assets/Colors/Colors';


class MovieCardComponent extends Component {
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

    render() {
        const stateMovie = this.state.movie;
        return (
            <View style={styles.movieViewContainer}>
                <RNBounceable
                    onPress={() => {
                        this.props.navigation.push("MovieDetail", {
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
                <View>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.props.navigation.navigate("MovieDetail", {
                                movieId: stateMovie["id"],
                            });
                        }}
                    >
                        <View>
                            <Text style={styles.title}>
                                {stateMovie["title"]}
                            </Text>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.date}>
                                    {this.formatDate(
                                        stateMovie["release_date"]
                                    )}
                                </Text>
                                <Text style={{ marginLeft: 10 }}></Text>
                                <Text
                                    style={[
                                        styles.date,
                                        {
                                            color:
                                                stateMovie["adult"] === "true"
                                                    ? colors.isAdult
                                                    : colors.isFamily,
                                        },
                                    ]}
                                >
                                    {stateMovie["adult"] === "true"
                                        ? "Adult (18+)"
                                        : "Family (12+)"}
                                </Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <View
                        style={{
                            flexDirection: "row",
                            paddingTop: 15,
                            paddingLeft: 5,
                        }}
                    >
                        <Button
                            icon={
                                <Icon name="play" size={20} color={colors.black} />
                            }
                            title="  Play    "
                            raised
                            buttonStyle={{
                                borderRadius: 5,
                                backgroundColor: colors.offWhite,
                            }}
                            containerStyle={{ marginLeft: 10 }}
                            titleStyle={{ color: "black", fontWeight: "bold" }}
                            onPress={() => {
                                this.props.navigation.navigate("VideoPlayer", {
                                    movieId: stateMovie["id"],
                                });
                            }}
                        />

                        <RNBounceable onPress={() => { }}>
                            <Icon
                                size={30}
                                name="heart-outline"
                                style={[styles.myButton, { color: colors.red }]}
                            />
                        </RNBounceable>
                        <Icon
                            size={30}
                            name="share-variant"
                            style={[styles.myButton, { color: colors.offWhite }]}
                        />
                    </View>
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
        flex: 0.6,
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

export default MovieCardComponent;
