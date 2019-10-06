import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { 
  SafeAreaView, 
  ScrollView,
  StyleSheet, 
  Text, 
  Image,
  View, 
  Vibration,
  TouchableOpacity,
  AsyncStorage 
} from 'react-native';

import SpotList from '../components/SpotList';
import ModalRequest from '../components/ModalRequest';

import logo from '../assets/logo.png';

export default function List({ navigation }) {
  const [techs, setTechs] = useState([]);
  const [modal, setModal] = useState();
  const [message, setMessage] = useState('');

  function logout() {
    AsyncStorage.clear();
    navigation.navigate('Login');
  }

  function showResponse(msg) {
    const PATTERN = [ 1000, 200, 300, 400];
    Vibration.vibrate(PATTERN, false);

    setMessage(msg);
    setModal(true);
  }

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio('http://192.168.94.2:3333', {
        query: { user_id }
      });

      socket.on('booking_response', booking => {
        let message = {
          company: booking.spot.company,
          date: booking.date,
          status: booking.approved,
        }
        showResponse(message);
      })
    });
    
  }, [])

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTechs => {
      const techsArray = storagedTechs.split(',').map(tech => tech.trim());

      setTechs(techsArray);
    })
  }, []);

  return (
    <SafeAreaView style={styles.container}>

      <ModalRequest message={message} open={modal} />
      <View style={styles.header}>
        <TouchableOpacity style={styles.buttonExit} onPress={logout}>
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>

        <Image style={styles.logo} source={logo} />

        <View><Text style={{color:'#fff', marginRight: 20}}>Sair</Text></View>
      </View>
      
      <ScrollView>
        {techs.map(tech => <SpotList key={tech} tech={tech} />)}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
  },

  header: {
    height: 56,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10,
  },

  buttonExit: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginLeft: 20,
  },

  buttonText: {
    color: '#777',
    fontSize: 16,
  },
});