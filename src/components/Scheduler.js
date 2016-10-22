import React, { Component } from 'react'
import {
  Text,
  View,
  ListView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import {
  Card,
  Tabs,
  Tab,
  Icon,
  List,
  ListItem,
} from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import BrunchDetailsDisplay from './BrunchDetailsDisplay'
import LocationsCards from './LocationsCards'
import googConfig from '../../google-places-api-key'
import Contacts from 'react-native-contacts'
import axios from 'axios'

let initialGPlacesRequest = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=43.038902,-87.906471&radius=500&type=restaurant&keyword=brunch&key=' + googConfig.GOOGLE_PLACES_API_KEY

export default class Scheduler extends Component {
  constructor(props) {
    super(props)

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    this.addToInvitedContacts = this.addToInvitedContacts.bind(this)

    this.state = {
      selectedTab: 'when',
      date: null,
      time: null,
      contacts: [],
      locations: [],
      invitedContacts: [],
      chosenLocations: [],
    }
  }

  componentWillMount() {
    // axios.get(initialGPlacesRequest)
    //   .then(res => {
    //     this.setState({
    //       locations: res.data.results
    //     })
    //   })

    Contacts.getAll((err, contacts) => {
      if(err && err.type === 'permissionDenied'){
        console.log('error getting Contacts', err.type)
      } else {
        console.log(contacts)
        this.setState({ contacts })
      }
    })
  }

  changeTab (selectedTab) {
    this.setState({selectedTab})
  }

  addToInvitedContacts(newContact) {
    this.setState({
      invitedContacts: [...this.state.invitedContacts, newContact]
    })
  }

  renderContactsRow(rowData, sectionID) {
    return (
      <ListItem
        onPress={() => console.log(rowData)}
        key={sectionID}
        title={rowData.givenName}
        subtitle={rowData.subtitle}
      />
    )
  }

  render() {
    const {
      selectedTab,
      date,
      time,
      contacts,
      locations
    } = this.state

    const contactsRows = this.dataSource.cloneWithRows(contacts || [])
    const placesRows = this.dataSource.cloneWithRows(locations || [])

    return (
      <View style={{flex: 1}}>
        <BrunchDetailsDisplay
          date={this.state.date}
          time={this.state.time}
          locations={this.state.chosenLocations}
          invited={this.state.invitedContacts} />

        <Tabs>
          <Tab
            tabStyle={selectedTab !== 'when' && styles.tabSelectedstyle}
            titleStyle={[styles.titleStyle]}
            selectedTitleStyle={[styles.titleSelected]}
            selected={selectedTab === 'when'}
            title={selectedTab === 'when' ? 'WHEN' : null}
            renderIcon={() => <Icon name='whatshot' size={26} />}
            renderSelectedIcon={() => <Icon name='whatshot' size={26} />}
            onPress={() => this.changeTab('when')}>

            <View style={styles.container}>
              <Text style={styles.welcome}>Alright, What Time?</Text>
              <DatePicker
                style={{width: 200}}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate={new Date().toDateString()}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                }}
                onDateChange={(date) => {this.setState({date: date})}}
              />

              <DatePicker
                style={{width: 200}}
                mode="time"
                placeholder="select time"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                }}
                onDateChange={(time) => {this.setState({time: time})}}
              />
            </View>

          </Tab>
          <Tab
            tabStyle={selectedTab !== 'where' && styles.tabSelectedstyle}
            titleStyle={styles.titleStyle}
            selectedTitleStyle={styles.titleSelected}
            selected={selectedTab === 'where'}
            title={selectedTab === 'where' ? 'WHERE' : null}
            renderIcon={() => <Icon name='important-devices' size={26} />}
            renderSelectedIcon={() => <Icon name='important-devices' size={26} />}
            onPress={() => this.changeTab('where')}>
            <View style={styles.container}>

              <Text style={styles.welcome}>What sounds tasty?</Text>
              <LocationsCards />

            </View>
          </Tab>
          <Tab
            tabStyle={selectedTab !== 'who' && styles.tabSelectedstyle}
            titleStyle={[styles.titleStyle]}
            selectedTitleStyle={[styles.titleSelected]}
            selected={selectedTab === 'who'}
            title={selectedTab === 'who' ? 'WHO' : null}
            renderIcon={() => <Icon name='important-devices' size={26} />}
            renderSelectedIcon={() => <Icon name='important-devices' size={26} />}
            onPress={() => this.changeTab('who')}>
            <View style={styles.container}>

              <Text style={styles.welcome}>Who?</Text>

              <Card>
                <List containerStyle={{marginBottom: 20}}>
                  {
                    this.state.contacts.map((c, i) => (
                      <TouchableOpacity
                        onPress={() => {
                          this.addToInvitedContacts(c)

                        }}>
                      <ListItem
                        key={i}
                        title={c.givenName}
                      />
                  </TouchableOpacity>
                    ))
                  }
                </List>
              </Card>

            </View>
          </Tab>
        </Tabs>
      </View>
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
  tabs: {

  },
  tabSelectedstyle: {

  },
  titleStyle: {
    color: 'blue'
  },
  titleSelected: {
    color: 'blue'
  },
})
