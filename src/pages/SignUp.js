import React, { Component } from 'react'
import {
  ActivityIndicator,
  Text,
  TextInput,
  View,
} from 'react-native'
import {
  Button,
} from 'react-native-elements'

import Login from './Login'
import firebase from '../utils/firebase'
import styles from '../utils/common_styles'

export default class SignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loaded: true,
      email: '',
      password: '',
    }
  }

  signup() {
    this.setState({
      loaded: false
    })

    firebase.auth()
    .createUserWithEmailAndPassword(this.state.email, this.state.password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert( errorMessage)
    })

    this.setState({
      email: '',
      password: '',
      loaded: true
    })
  }

  goToLogin() {
    this.props.navigator.push({ id: 'LOGIN' })
  }

  render() {
    const { navigator } = this.props

    return (
      <View style={styles.container}>
        <Text>Sign up</Text>
        <TextInput
          onChangeText={(text) => this.setState({email: text})}
          value={this.state.text}
          placeholder={'Email Address'} />
        <TextInput
          onChangeText={(text) => this.setState({password: text})}
          value={this.state.password}
          placeholder={'Super Secret Password'} />
        <Button
         title="Sign Up"
         onPress={this.signup.bind(this)} />
        <Button
          title="Got an Account?"
          onPress={this.goToLogin.bind(this)} />
      </View>
    )
  }
}
