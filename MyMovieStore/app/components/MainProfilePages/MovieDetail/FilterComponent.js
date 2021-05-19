import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    FlatList
} from "react-native";
import { Divider } from "react-native-paper";
import RNBounceable from "@freakycoder/react-native-bounceable";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Dialog, {
    DialogContent,
    DialogFooter,
    DialogButton,
} from "react-native-popup-dialog";
import { colors } from '../../../assets/Colors/Colors';


class FilterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    callParentFilter(key) {
        this.props.filterThem(key);
    }

    render() {
        return (
            <View>
                <Dialog
                    visible={this.props.visible}
                    footer={
                        <DialogFooter>
                            <DialogButton
                                text="CANCEL"
                                onPress={() => {
                                    this.props.close();
                                }}
                            />
                            <DialogButton
                                text="OK"
                                onPress={() => {
                                    this.props.close();
                                }}
                            />
                        </DialogFooter>
                    }
                >
                    <DialogContent style={{ width: 300, height: 200 }}>
                        <FlatList
                            data={[
                                {
                                    key: "name",
                                    value: "Name",
                                    logo: "movie-edit-outline",
                                },
                                {
                                    key: "date",
                                    value: "Date",
                                    logo: "calendar-star",
                                },
                                {
                                    key: "popularity",
                                    value: "Popularity",
                                    logo: "star-half-full",
                                },
                                {
                                    key: "rate",
                                    value: "Rating",
                                    logo: "star-outline",
                                },
                            ]}
                            renderItem={({ item }) => (
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        this.callParentFilter(item.key);
                                    }}
                                >
                                    <View>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                paddingTop: 15,
                                            }}
                                        >
                                            <View style={{ flex: 0.2 }}>
                                                <RNBounceable
                                                    onPress={() => { }}
                                                >
                                                    <Icon
                                                        style={{
                                                            marginLeft: 20,
                                                        }}
                                                        name={item.logo}
                                                        size={25}
                                                        color={colors.black}
                                                    />
                                                </RNBounceable>
                                            </View>
                                            <View style={{ flex: 0.1 }}></View>
                                            <View style={{ flex: 0.5 }}>
                                                <Text style={styles.item}>
                                                    {item.value}
                                                </Text>
                                            </View>
                                            <View style={{ flex: 0.2 }}>
                                                <RNBounceable
                                                    onPress={() => { }}
                                                >
                                                    <Icon
                                                        style={{
                                                            marginLeft: 20,
                                                        }}
                                                        name={
                                                            this.props.filters[
                                                                item.key
                                                            ] === "asc"
                                                                ? "arrow-up"
                                                                : "arrow-down"
                                                        }
                                                        size={25}
                                                        color={colors.black}
                                                    />
                                                </RNBounceable>
                                            </View>
                                        </View>
                                        <Divider />
                                    </View>
                                </TouchableWithoutFeedback>
                            )}
                        />
                    </DialogContent>
                </Dialog>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        fontSize: 20,
        color: colors.black,
        fontFamily: "San Francisco",
        fontWeight: "bold",
    },
});
export default FilterComponent;
