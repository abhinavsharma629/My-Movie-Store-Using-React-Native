import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    Image,
    StatusBar
} from "react-native";
import RNBounceable from "@freakycoder/react-native-bounceable";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StackActions, NavigationActions } from "react-navigation";
import { colors } from '../../assets/Colors/Colors';


class BuildProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
        };
    }

    navigateToMainSection = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: "MultipleProfiles",
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
                        <RNBounceable
                            onPress={() => {
                                this.navigateToMainSection();
                            }}
                        >
                            <Icon
                                size={35}
                                name="keyboard-backspace"
                                style={[styles.logo, styles.headerCenterIcons]}
                            />
                        </RNBounceable>
                    </View>
                    <View style={[styles.headerColumnMiddle, { padding: 10 }]}>
                        <Text style={styles.madeBy}>WatchSpace</Text>
                    </View>
                    <View
                        style={[
                            styles.headerColumnRight,
                            styles.headerCenterIcons,
                        ]}
                    >
                        <RNBounceable
                            onPress={() => {
                                this.navigateToMainSection();
                            }}
                        >
                            <Icon
                                size={35}
                                name="content-save-cog"
                                style={[
                                    styles.logo,
                                    styles.headerCenterIcons,
                                    { marginLeft: 20 },
                                ]}
                            />
                        </RNBounceable>
                    </View>
                </View>
                <View style={styles.middleContent}>
                    <View style={{ alignItems: "center", elevation: 10 }}>
                        <Image
                            style={styles.profile}
                            source={require("../../assets/images/user1.png")}
                        />
                        <RNBounceable onPress={() => { }}>
                            <Icon
                                size={35}
                                name="image-edit"
                                style={[styles.logo, styles.imageLogo]}
                            />
                        </RNBounceable>
                        <KeyboardAvoidingView>
                            <TextInput
                                style={[styles.input]}
                                placeholderTextColor={colors.offWhite}
                                placeholder="Account Name"
                                onChange={(text) => {
                                    this.setState({ value: text });
                                }}
                                value={this.state.value}
                            ></TextInput>
                        </KeyboardAvoidingView>
                    </View>
                </View>
                <View>
                    <RNBounceable
                        onPress={() => {
                            this.navigateToMainSection();
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "center",
                            }}
                        >
                            <Icon size={30} name="delete" style={styles.logo} />
                            <Text style={styles.delete}>Delete Profile</Text>
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
        flex: 0.7,
    },
    profile: {
        width: 150,
        height: 150,
        borderRadius: 10,
    },
    headerColumnLeft: {
        flex: 0.2,
    },
    headerColumnRight: {
        flex: 0.2,
    },
    headerCenterIcons: {
        marginTop: 7,
    },
    headerColumnMiddle: {
        textAlign: "center",
        alignItems: "center",
        flex: 0.6,
    },
    logo: {
        color: colors.offWhite,
        elevation: 10,
    },
    imageLogo: {
        marginTop: -25,
        marginLeft: 140,
    },
    madeBy: {
        color: colors.offWhite,
        fontSize: 30,
        fontFamily: "San Francisco",
        fontWeight: "bold",
    },
    delete: {
        color: colors.offWhite,
        fontSize: 20,
        paddingLeft: 15,
        fontFamily: "San Francisco",
        fontWeight: "bold",
    },
    input: {
        borderColor: colors.background,
        borderRadius: 5,
        borderWidth: 1,
        width: 250,
        padding: 10,
        marginTop: 20,
        color: colors.offWhite,
        textAlign: "center",
        fontSize: 20,
    },
});

export default BuildProfile;
