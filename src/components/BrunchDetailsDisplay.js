import React from 'react'
import {
  Text,
  View,
} from 'react-native'

import {
  Button,
} from 'react-native-elements'

const BrunchDetailsDisplay = (props) => {

  return (
    <View>
      <Text>{props.date} - {props.time}</Text>
      <Text>You have picked {props.locations.length} locations.</Text>
      <Text>You have invited {props.invited.length} people to brunch.</Text>
      
    </View>
  )
}

export default BrunchDetailsDisplay
