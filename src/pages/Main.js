import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'

export default class Main extends Component {
  render() {
    return (
      <View style={styles.container}>
          <Text>Main</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 50,
  },
})
