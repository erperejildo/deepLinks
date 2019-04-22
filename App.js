import React from "react";
import { View, Text, Button, Linking, Platform } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

class HomeScreen extends React.Component {
  componentWillMount() {
    // B
    if (Platform.OS === "android") {
      Linking.getInitialURL().then(url => {
        this.navigate(url);
      });
    } else {
      Linking.addEventListener("url", this.handleOpenURL);
    }
  }

  componentWillUnmount() {
    // C
    Linking.removeEventListener("url", this.handleOpenURL);
  }

  handleOpenURL = event => {
    // D
    this.navigate(event.url);
  };

  navigate = url => {
    // E
    const { navigate } = this.props.navigation;
    const route = url.replace(/.*?:\/\//g, "");
    const routeName = route.split("/")[0];
    const page = route.split("/")[1];
    const code = route.split("/")[2];

    if (page === "Redeem") {
    }

    if (routeName === "app") {
      navigate(page, { code: code });
    }
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Redeem"
          onPress={() => this.props.navigation.navigate("Redeem")}
        />
      </View>
    );
  }
}

class RedeemScreen extends React.Component {
  componentWillMount() {
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.code
    ) {
      // we clicked a redeem link from an ad
      // TODO: add tracking
    }
  }

  render() {
    if (this.props.navigation.state.params) {
      var code = this.props.navigation.state.params.code;
    } else {
      code = "No code";
    }
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Redeem Screen: {code}</Text>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate("Home")}
        />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Redeem: {
    screen: RedeemScreen
  }
});

export default createAppContainer(AppNavigator);
