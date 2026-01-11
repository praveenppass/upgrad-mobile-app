/**
 * @format
 */
import { decode } from "base-64";
import { AppRegistry } from "react-native";
import "react-native-gesture-handler";

import App from "./App";
import { name as appName } from "./app.json";

global.atob = decode;

AppRegistry.registerComponent(appName, () => App);
