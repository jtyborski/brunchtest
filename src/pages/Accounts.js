import React, { Component } from 'react'
import {
  Image,
  View,
  Text
} from 'react-native'

import common_styles from '../utils/common_styles'

export default class Account extends {
  constructor(props) {
    super(props)
    this.state={ loaded:false }
  }

  componentWillMount() {
    this.user = firebase.auth().currentUser
    if (user) {
      alert('User is signed in')
    } else {
      // No user is signed in.
      alert('No user is signed in.')
    }
  }

  render() {
    return (
      <View style={common_styles.container}>
        
      </View>
    )
  }
}
