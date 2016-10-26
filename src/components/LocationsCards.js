'use strict';
import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import SwipeCards from 'react-native-swipe-cards';

let Card = React.createClass({
  render() {
    return (
      <View style={[styles.card, {backgroundColor: 'rebeccapurple'}]}>
        <Image
          style={styles.image}
          source={{uri: this.props.icon}} />
        <Text>{this.props.name}</Text>
      </View>
    )
  }
})

const Cards = [
  {text: 'Tomato', backgroundColor: 'crimson'},
  {text: 'Aubergine', backgroundColor: 'purple'},
  {text: 'Courgette', backgroundColor: 'green'},
  {text: 'Blueberry', backgroundColor: 'blue'},
  {text: 'Umm...', backgroundColor: 'cyan'},
  {text: 'orange', backgroundColor: 'orange'},
]

export default React.createClass({
  getInitialState() {
    return {
      cards: Cards //this.props.suggestedLocations
    }
  },
  
  handleYup(card) {
    this.props.addLocation(card)
    console.log(`Yup for ${card.text}`)
  },

  handleNope (card) {
    console.log(`Nope for ${card.text}`)
  },

  render() {
    const { suggestedLocations } = this.props

    // if (suggestedLocations < 1) return <Text>Loading...</Text>
    // console.log(suggestedLocations)

    return (
      <View>
        <SwipeCards
          cards={this.state.cards}
          renderCard={(cardData) => <Card {...cardData} />}
          renderNoMoreCards={() => <Text>Out of cards!</Text>}
          handleYup={this.handleYup}
          handleNope={this.handleNope}
        />
      </View>
    )
  }
})

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  }
})
