'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  TouchableOpacity,
  ActivityIndicatorIOS,
  NavigatorIOS,
  ListView,
  TouchableOpacity,
} = React;

var AddContact = require('./AddContact.ios.js');
var UserContacts = require('react-native-contacts');

var Contacts = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          component: ContactsList,
          title: 'Contacts',
        }}
      />
    );
  }
});

var ContactsList = React.createClass({
  getInitialState: function() {
    return {
      dataSource: null,
    };
  },

  componentDidMount: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    UserContacts.getAll((err, contacts) => {
      if (err) {

      } else {
        this.setState({
          dataSource: ds.cloneWithRows(contacts)
        });
      }
    });
  },

  render: function() {
    if (!this.state.dataSource) {
      return (
        <ActivityIndicatorIOS animating={true} size="large" />
      );
    }

    return (
      <ListView
        style={styles.list}
        dataSource={this.state.dataSource}
        renderRow={this._rowContent}
      />
    );
  },

  _rowContent: function(rowData) {
    return (
      <View>
        <TouchableOpacity onPress={() => this._rowPress(rowData)}>
          <View style={styles.listContainer}>
          <Text style={styles.rowText}>
            {rowData.givenName}
            <Text style={styles.boldText}>
              {" "}{rowData.familyName}
            </Text>
          </Text>
          <Text style={styles.rowAdd}>+</Text>
          </View>
          </TouchableOpacity>
          <View style={styles.row} />
      </View>
    );
  },

  _rowPress: function(rowData) {
    console.log('what');
    this.props.navigator.push({
      component: AddContact,
      title: 'Add Contact',
      passProps: {contact: rowData},
    });
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    marginTop: 65,
  },
  row: {
    transform: [{scaleX: 0.95}],
    borderBottomWidth: 1,
    borderColor: 'grey',
    opacity: 0.3,
    padding: 4,
  },
  rowText: {
    marginTop: 12,
    marginBottom: 4,
    marginLeft: 15,
    fontFamily: 'Helvetica',
    fontSize: 18,
    flex: 0.75,
  },
  rowAdd: {
    color: '007AFF',
    marginTop: 12,
    marginBottom: 4,
    marginLeft: 15,
    fontFamily: 'Helvetica',
    fontSize: 18,
    flex: 0.1,
  },
  boldText: {
    fontWeight: 'bold',
  }
});

module.exports = Contacts;
