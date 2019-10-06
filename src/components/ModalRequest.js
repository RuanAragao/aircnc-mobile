import React, { useEffect, useState } from 'react';
import {Modal, Text, TouchableHighlight, View, StyleSheet} from 'react-native';

function ModalRequest({ message, open }) {
  const [visible, setVisible] = useState();

  // useEffect(() => {
  //   setVisible(false);
  // }, [])

  useEffect(() => {
    if(open) {
      setVisible(true);
    } else {
      setVisible(false)
    }
  }, [open])

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      >
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Solicitação respondida</Text>

          <Text style={styles.message}>
            A sua reserva em {message.company} 
            na data de {message.date} 
            foi {message.status ? 'APROVADA' : 'REJEITADA'}.
          </Text>

          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              setVisible(false);
            }}>
            <Text style={styles.buttonText}>Entendido</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },

  message: {
    fontSize: 22,
    color: '#333',
    marginBottom: 20,
  },

  button: {
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ModalRequest;