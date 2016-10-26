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

import SignUp from './SignUp'

import firebase from '../utils/firebase'
import common_styles from '../utils/common_styles'

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loaded: true,
      email: '',
      password: '',
    }
  }

  login() {
    this.setState({
      loaded: false
    })

    firebase.auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
    })

    this.setState({
      email: '',
      password: '',
      loaded: true
    })
  }

  goToSignup(){
    this.props.navigator.push({ id: 'SIGNUP' })
  }

  render() {
    return (
      <View style={common_styles.container}>
        <Text>Log In</Text>
        <TextInput
          onChangeText={(text) => this.setState({email: text})}
          value={this.state.text}
          placeholder={'Email Address'} />
        <TextInput
          onChangeText={(text) => this.setState({password: text})}
          value={this.state.password}
          placeholder={'Super Secret Password'} />
        <Button
         title="Sign In"
         onPress={this.login.bind(this)} />
         <Button
          title="Sign Up"
          onPress={this.goToSignup.bind(this)} />
      </View>
    )
  }
}
