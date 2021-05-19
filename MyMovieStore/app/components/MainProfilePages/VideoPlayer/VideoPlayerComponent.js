import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Dimensions,
    Platform,
} from "react-native";
import Video from "react-native-video";
import MediaControls from "react-native-media-controls";
import Orientation from "react-native-orientation-locker";
import { colors } from '../../../assets/Colors/Colors';


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;


class VideoPlayerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api_key: "afc4e3645add4e5a7eeafe8e855518bf",
            movieId: this.props.movieId,
            isPaused: false,
            isLoading: true,
            duration: 100,
            currentTime: 0,
            isFullScreen: true,
            videoUrl: null,
        };
    }
    componentDidMount() {
        this._getVideo();
    }

    _getVideo = async () => {
        fetch(
            "https://api.themoviedb.org/3/movie/" +
            this.state.movieId +
            "/watch/providers?api_key=" +
            this.state.api_key,
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
                try {
                    this.setState({
                        videoUrl: responseJson["results"]["AR"]["link"],
                        isLoading: false,
                    });
                } catch (err) {
                    console.log(err);
                }
            });
    };

    render() {
        // Orientation.lockToLandscape();

        return (
            <View style={{ flex: 1 }}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Video
                        paused={this.state.isPaused}
                        ref={(ref) => {
                            this.player = ref;
                        }}
                        onEnd={() => {
                            Orientation.lockToPortrait();
                            this.props.navigation.pop();
                        }}
                        resizeMode="contain"
                        source={{
                            uri:
                                "https://assets.mixkit.co/videos/download/mixkit-countryside-meadow-4075.mp4",
                        }}
                        style={
                            Platform.OS === "android"
                                ? styles.videoContainerAndroid
                                : styles.videoContainerIOS
                        }
                        volume={10}
                    />
                    <MediaControls
                        duration={this.state.duration}
                        isLoading={this.state.isLoading}
                        mainColor={colors.media}
                        progress={this.state.currentTime}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    toolbar: {
        marginTop: 30,
        backgroundColor: colors.offWhite,
        padding: 10,
        borderRadius: 5,
    },
    videoContainerAndroid: {
        height: "100%",
        width: "100%",
    },
    mediaPlayer: {
        height: "100%",
        width: "100%",
        backgroundColor: colors.background,
    },
});

export default VideoPlayerComponent;
