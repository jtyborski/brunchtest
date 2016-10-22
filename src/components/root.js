import React, { Component } from 'react'
import { Navigator } from 'react-native'
import NavigationBar from 'react-native-navbar'
import * as firebase from 'firebase'
import Main from './Main'
import Scheduler from './Scheduler.js'

const  config = {
  apiKey: "AIzaSyDFW4N_djF7iqG8VxF93lk8Tv9VflyuGJ0",
  authDomain: "brunchsters-1476495208918.firebaseapp.com",
  databaseURL: "https://brunchsters-1476495208918.firebaseio.com",
  storageBucket: "brunchsters-1476495208918.appspot.com",
  messagingSenderId: "357831759350"
}
const firebaseApp = firebase.initializeApp(config)

export default class Root extends Component {
  renderScene(route, navigator) {
    if (route.id === 'MAIN') {
      return <Main navigator={navigator} />
    }

    if (route.id === 'SCHEDULE') {
      return <Scheduler navigator={navigator} />
    }

    return <Text>Default route</Text>
  }

  render() {
    return (
      <Navigator style={{flex: 1}}
        initialRoute={{id: 'SCHEDULE', title: 'Schedule a Brunch!'}}
        renderScene={this.renderScene}
        />
    )
  }
}
