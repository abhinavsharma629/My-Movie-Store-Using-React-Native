import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar
} from "react-native";
import RNBounceable from "@freakycoder/react-native-bounceable";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StackActions, NavigationActions } from "react-navigation";
import { colors } from '../../assets/Colors/Colors';


class MultipleProfiles extends Component {
    constructor(props) {
        super(props);
    }

    navigateToMainSection = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: "BottomNavigation",
                }),
            ],
        });
        this.props.navigation.dispatch(resetAction);
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar animated={true} hidden={true} />
                <View style={styles.header}>
                    <View
                        style={[
                            styles.headerColumnLeft,
                            styles.headerCenterIcons,
                        ]}
                    >
                        <RNBounceable onPress={() => { }}>
                            <Image
                                style={styles.wsLogo}
                                source={require("../../assets/images/watch.png")}
                            />
                        </RNBounceable>
                    </View>
                    <View style={[styles.headerColumnMiddle, { padding: 10 }]}>
                        <RNBounceable onPress={() => { }}>
                            <Text style={styles.madeBy}>WatchSpace</Text>
                        </RNBounceable>
                    </View>
                </View>
                <View style={[styles.middleContent, { flexDirection: "row" }]}>
                    <View style={{ flex: 0.1 }}></View>
                    <View
                        style={{
                            flex: 0.8,
                            flexWrap: "wrap",
                            flexDirection: "row",
                            alignItems: "flex-start",
                        }}
                    >
                        <RNBounceable
                            onPress={() => {
                                this.navigateToMainSection();
                            }}
                        >
                            <View style={styles.profileBox}>
                                <Image
                                    style={styles.profile}
                                    source={require("../../assets/images/user1.png")}
                                />
                                <Text style={styles.name}>Abhinav</Text>
                            </View>
                        </RNBounceable>
                        <RNBounceable
                            onPress={() => {
                                this.navigateToMainSection();
                            }}
                        >
                            <View style={styles.profileBox}>
                                <Image
                                    style={styles.profile}
                                    source={require("../../assets/images/user1.png")}
                                />
                                <Text style={styles.name}>Somya</Text>
                            </View>
                        </RNBounceable>
                        <RNBounceable
                            onPress={() => {
                                this.navigateToMainSection();
                            }}
                        >
                            <View style={styles.profileBox}>
                                <Image
                                    style={styles.profile}
                                    source={require("../../assets/images/user1.png")}
                                />
                                <Text style={styles.name}>Muskan</Text>
                            </View>
                        </RNBounceable>
                    </View>
                    <View style={{ flex: 0.1 }}></View>
                </View>
                <View>
                    <RNBounceable
                        onPress={() => {
                            this.props.navigation.navigate("BuildProfile");
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "center",
                            }}
                        >
                            <Icon
                                size={30}
                                name="plus-circle-multiple-outline"
                                style={styles.logo}
                            />
                            <Text style={styles.add}>Add Profile</Text>
                        </View>
                    </RNBounceable>
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
    header: {
        flex: 0.2,
        padding: 15,
        flexDirection: "row",
    },
    middleContent: {
        flex: 0.75,
        padding: 20,
    },
    profileBox: {
        paddingLeft: 25,
        elevation: 10,
        padding: 20,
    },
    wsLogo: {
        width: 100,
        height: 50,
    },
    profile: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    headerColumnLeft: {
        flex: 0.2,
    },
    headerColumnRight: {
        flex: 0.2,
    },
    headerCenterIcons: {
        marginTop: 8,
    },
    headerColumnMiddle: {
        textAlign: "center",
        alignItems: "center",
        flex: 0.6,
        marginLeft: 20,
    },
    logo: {
        color: colors.offWhite,
        elevation: 10,
    },
    madeBy: {
        color: colors.offWhite,
        fontSize: 30,
        fontFamily: "San Francisco",
        fontWeight: "bold",
        marginTop: 5,
        marginLeft: 10,
    },
    name: {
        color: colors.offWhite,
        fontSize: 20,
        fontFamily: "San Francisco",
        fontWeight: "bold",
        padding: 10,
    },
    add: {
        color: colors.offWhite,
        fontSize: 20,
        paddingLeft: 15,
        fontFamily: "San Francisco",
        fontWeight: "bold",
    },
});

export default MultipleProfiles;
