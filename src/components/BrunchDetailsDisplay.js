import React from 'react'
import {
  Text,
  View,
  StyleSheet,
} from 'react-native'

import {
  Button,
  Card
} from 'react-native-elements'

const BrunchDetailsDisplay = (props) => {
  return (
    <Card style={styles.card}>
      <Text style={styles.time}>{props.date} @ {props.time}</Text>
      <Text>You have picked {props.locations.length} locations.</Text>
      <Text>You have invited {props.invited.length} people to brunch.</Text>

      { props.date !== null &&
        props.time !== null &&
        props.invited.length > 0 &&
        props.locations.length > 0 ?
            <Button title="Brunch On" /> : null }
    </Card>
  )
}

export default BrunchDetailsDisplay

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'red'
  },
  time: {
    textAlign: 'center',
    fontSize: 26,
  }
})
