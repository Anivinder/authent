import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../store/auth-context';

function WelcomeScreen() {
  const [fetchedMessage, setFetchedMesage] = useState('')

  const authctx = useContext(AuthContext);
  const token = authctx.token;

  useEffect(() =>{
    axios.get('https://react-native-project-b6923-default-rtdb.firebaseio.com/message.json?auth=' + token).then(response =>{
      console.log(response.data);
      setFetchedMesage(response.data);
    })
  })
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
