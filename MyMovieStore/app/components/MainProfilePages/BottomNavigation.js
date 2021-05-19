import React, { Component } from "react";
import { View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import HomeComponent from "./Home/HomeComponent";
import PopularComponent from "./Popular/PopularComponent";
import SearchComponent from "./Search/SearchComponent";
import FavoriteComponent from "./Favorite/FavoriteComponent";
import UpComingComponent from "./Upcoming/UpComingComponent";
import MovieDetailComponent from "./MovieDetail/MovieDetailComponent";
import VideoPlayerComponent from "./VideoPlayer/VideoPlayerComponent";
import { colors } from '../../assets/Colors/Colors';


const AppBarScreen = createMaterialBottomTabNavigator(
    {
        home: {
            screen: HomeComponent,
            navigationOptions: {
                tabBarLabel: "Home",
                tabBarIcon: ({ tintColor, focused }) => (
                    <View style={{ marginLeft: -10, marginTop: -5 }}>
                        <Icon
                            size={30}
                            name={focused ? "home" : "home-outline"}
                            color={tintColor}
                        />
                    </View>
                ),
                gesturesEnabled: true,
                tabBarColor: colors.tabBarColor,
            },
        },
        upcoming: {
            screen: UpComingComponent,
            navigationOptions: {
                tabBarLabel: "UpComing Movies",
                tabBarIcon: ({ tintColor, focused }) => (
                    <View style={{ marginLeft: -10, marginTop: -5 }}>
                        <Icon
                            size={30}
                            name={focused ? "movie-outline" : "movie-roll"}
                            color={tintColor}
                        />
                    </View>
                ),
                gesturesEnabled: true,
                tabBarColor: colors.tabBarColor,
            },
        },
        popular: {
            screen: PopularComponent,
            navigationOptions: {
                tabBarLabel: "Popular Movies",
                tabBarIcon: ({ tintColor, focused }) => (
                    <View style={{ marginLeft: -10, marginTop: -5 }}>
                        <Icon
                            size={30}
                            name={
                                focused
                                    ? "arrow-top-right-thick"
                                    : "arrow-top-right-bold-outline"
                            }
                            color={tintColor}
                        />
                    </View>
                ),
                gesturesEnabled: true,
                tabBarColor: colors.tabBarColor,
            },
        },
        favorite: {
            screen: FavoriteComponent,
            navigationOptions: {
                tabBarLabel: "Favorite Movies",
                tabBarIcon: ({ tintColor, focused }) => (
                    <View style={{ marginLeft: -10, marginTop: -5 }}>
                        <Icon
                            size={30}
                            name={
                                focused
                                    ? "heart-multiple"
                                    : "heart-multiple-outline"
                            }
                            color={focused ? colors.red : tintColor}
                        />
                    </View>
                ),
                gesturesEnabled: true,
                tabBarColor: colors.tabBarColor,
            },
        },
    },
    {
        initialRouteName: "home",
        animationEnabled: true,
        labeled: false,
        activeTintColor: colors.offWhite,
        inactiveTintColor: colors.grey,
        elevation: 30,
    }
);

const CreateContainer = createAppContainer(AppBarScreen);

const StartApp = createStackNavigator(
    {
        Favorites: FavoriteComponent,
        Search: SearchComponent,
        MovieDetail: MovieDetailComponent,
        VideoPlayer: VideoPlayerComponent,
        BottomTabBar: CreateContainer,
    },
    {
        initialRouteName: "BottomTabBar",
        headerMode: "none",
        navigatorOptions: () => ({
            title: "Welcome",
        }),
    }
);

const CombinedCreateContainer = createAppContainer(StartApp);

class App extends Component {
    render() {
        return <CombinedCreateContainer />;
    }
}

export default App;
