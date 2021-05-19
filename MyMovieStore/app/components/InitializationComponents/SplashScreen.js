/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions, NavigationActions } from "react-navigation";
import LogoLoader from "./LogoLoader";
import { colors } from '../../assets/Colors/Colors';


// Splash Screen
export default class SplashScreen extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this._redirectToProfiles();
    }

    _redirectToProfiles = async () => {
        let userData = await AsyncStorage.getItem("user");
        let routesName = "MultipleProfiles";
        if (!userData) {
            routesName = "BuildProfile";
        }
        setTimeout(() => {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: "MultipleProfiles",
                    }),
                ],
            });
            this.props.navigation.dispatch(resetAction);
        }, 1000);
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar animated={true} hidden={true} />
                <View style={styles.rowContainer}>
                    <LogoLoader
                        source={require("../../assets/images/watch.png")}
                        style={styles.logo}
                    />
                    <Text style={styles.productName}>WatchSpace</Text>
                </View>
                <View styles={styles.footer}>
                    <Text style={styles.madeBy}>ABHINAV</Text>
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
    rowContainer: {
        flex: 0.9,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    footer: {
        flex: 0.1,
    },
    madeBy: {
        color: colors.offWhite,
        fontSize: 23,
        alignSelf: "center",
        fontFamily: "San Francisco",
        fontWeight: "bold",
    },
    productName: {
        color: colors.offWhite,
        fontSize: 40,
        alignSelf: "center",
        fontWeight: "bold",
        fontStyle: "italic",
    },
});
