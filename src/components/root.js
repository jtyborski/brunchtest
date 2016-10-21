import React, { Component } from 'react'
import { Navigator } from 'react-native'
import NavigationBar from 'react-native-navbar'

import Main from './Main'
import Scheduler from './Scheduler.js'

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
