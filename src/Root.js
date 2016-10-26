import React, { Component } from 'react'
import {
  Navigator,
  Text,
  View
} from 'react-native'
import NavigationBar from 'react-native-navbar'
import Main from './pages/Main'
import Login from './pages/Login'
import Scheduler from './pages/Scheduler'
import SignUp from './pages/SignUp'
import firebase from './utils/firebase'

var user = firebase.auth().currentUser

export default class Root extends Component {
  renderScene(route, navigator) {
    if (user) {
      // User is signed in.
      console.log(user)
      return <Main navigator={navigator} />
    } else {
      // No user is signed in.
      alert('No user is signed in')
      console.log(user)
    }

    if (!user || route.id === 'SIGNUP') {
      return <SignUp navigator={navigator} />
    }

    if (!user || route.id === 'LOGIN') {
      return <Login navigator={navigator} />
    }

    if (route.id === 'MAIN') {
      return <Main navigator={navigator} />
    }

    if (route.id === 'SCHEDULE') {
      return <Scheduler navigator={navigator} />
    }

    return (
      <View style={{flex:1, alignItems: 'center', justifyContent:
      'center'}}>
        <Text style={{ fontSize: 60, textAlign: 'center' }}>
          404!!!!!!!!!!!!
        </Text>
        <Text style={{ fontSize: 23, textAlign: 'center' }}>
          Your  phone is #@^&! broken.
        </Text>
      </View>
    )
  }

  render() {
    return (
      <Navigator style={{flex: 1}}
        initialRoute={{id: 'SIGNUP', title: 'Schedule a Brunch!'}}
        renderScene={this.renderScene}
        />
    )
  }
}
