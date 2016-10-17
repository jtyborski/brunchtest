import React, { Component } from 'react'
import {
  Text,
  View,
  ListView,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import {
  Button,
  List,
  ListItem,
} from 'react-native-elements'

import Contacts from 'react-native-contacts'
import DatePicker from 'react-native-datepicker'
import DrawerLayout from 'react-native-drawer-layout'
import NavigationBar from 'react-native-navbar'
import axios from 'axios'

import CurrentBrunchDetailsDisplay from './currentBrunchDetailsDisplay'
import clrs from '../utils/clrs'
import googConfig from '../google-places-api-key'

const dummyContacts = [
  {
    recordID: 1,
    familyName: "Morks",
    givenName: "Laggy",
    middleName: "",
    emailAddresses: [{
      label: "personal",
      email: "lmorks@example.com",
    }],
    phoneNumbers: [{
      label: "mobile",
      number: "(666) 666-6666",
    }],
    thumbnailPath: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
  },

  {
    recordID: 2,
    familyName: "Jung",
    givenName: "Carl",
    middleName: "",
    emailAddresses: [{
      label: "work",
      email: "carl-jung@example.com",
    }],
    phoneNumbers: [{
      label: "mobile",
      number: "(555) 555-5555",
    }],
    thumbnailPath: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
  },
  {
    recordID: 3,
    familyName: "Wazz",
    givenName: "Carlz",
    middleName: "",
    emailAddresses: [{
      label: "work",
      email: "carlz-wazz@example.com",
    }],
    phoneNumbers: [{
      label: "mobile",
      number: "(000) 000-0000",
    }],
    thumbnailPath: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
  }
]

let initialGPlacesRequest = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=43.038902,-87.906471&radius=500&type=restaurant&keyword=brunch&key=' + googConfig.GOOGLE_PLACES_API_KEY

export default class Root extends Component {
  constructor(props) {
    super(props)

    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

    this.state = {
      contactsList: dummyContacts,
      locations: [],
      // date: '',
      // time: '20:00',
      // datetime: '2016-05-05 20:00',
      // datetime1: '2016-05-05 20:00',
    }
  }

  componentWillMount() {
    // gets GooglePlaces
    // axios.get(initialGPlacesRequest)
    //   .then(res => {
    //     this.setState({
    //       locations: res.data.results
    //     })
    //   })
  }

  render() {
    const placesRows = this.dataSource.cloneWithRows(this.state.locations || []) // populate locations ListView
    const contactsRows = this.dataSource.cloneWithRows(this.state.contactsList || [])

    let navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Text style={styles.drawer}>My Brunches</Text>
      </View>
    )

    let titleConfig = {title: 'Welcome to Brunchsters', style: {color: 'white'}}

    return (
      <DrawerLayout
        drawerWidth={300}
        drawerPosition={DrawerLayout.positions.Left}
        renderNavigationView={() => navigationView}>

        <NavigationBar
          title={titleConfig}
          style={{backgroundColor: 'red'}} />

        <CurrentBrunchDetailsDisplay
          date
          time
          place
          friends />

        <View style={styles.container}>
          <Text style={styles.welcome}>Schedule a Brunch</Text>

          <DatePicker
            style={{width: 200, marginBottom: 50}}
            date={this.state.date}
            mode="date"
            placeholder="placeholder"
            format="YYYY-MM-DD"
            minDate="2016-05-01"
            maxDate="2016-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={(date) => {this.setState({date: date});}}
          />

          <Button
            title="Invite Friends"
            raised
          />

          <List>
            <ListView
              dataSource={contactsRows}
              renderRow={this.renderContactsRow}
            />
          </List>

          <List>
            <ListView
              dataSource={placesRows}
              renderRow={(place) => (
                <ListItem
                  title={place.name}
                  subtitle={`Price: ${place.price_level}, Rating: ${place.rating}`}/>
              )}
            />
          </List>

        </View>
      </DrawerLayout>
    )
  }

  renderContactsRow (rowData, sectionID) {
    return (
      <ListItem
        roundAvatar
        key={sectionID}
        title={rowData.givenName}
        subtitle={rowData.subtitle}
        avatar={{uri:rowData.avatar_url}}
      />
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  drawer: {
    margin: 10,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'left',
  },
})
