import * as React from "react";
import {SafeAreaView, View, Text, StyleSheet } from "react-native";
import FlatListExample from './src/components/FlatListExample.js';

export default function App() {
  return (
    <SafeAreaView
      style={style.viewContainer}>
        <FlatListExample/>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  viewContainer : {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})