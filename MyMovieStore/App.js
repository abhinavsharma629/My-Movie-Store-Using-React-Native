import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// Custom Created
import BuildProfile from "./app/components/ProfileComponents/BuildProfile";
import MultipleProfiles from "./app/components/ProfileComponents/MultipleProfiles";
import BottomNavigation from "./app/components/MainProfilePages/BottomNavigation";
import SplashScreen from "./app/components/InitializationComponents/SplashScreen";

const StartApp = createStackNavigator(
    {
        BuildProfile: BuildProfile,
        MultipleProfiles: MultipleProfiles,
        BottomNavigation: BottomNavigation,
        SplashScreen: SplashScreen,
    },
    {
        initialRouteName: "SplashScreen",
        headerMode: "none",
        navigatorOptions: () => ({
            title: "Welcome",
        }),
    }
);

const CreateContainer = createAppContainer(StartApp);

class App extends Component {
    render() {
        return <CreateContainer />;
    }
}

export default App;
