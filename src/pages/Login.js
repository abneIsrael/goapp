import React, { Component } from 'react';

import { 
    KeyboardAvoidingView, 
    View, 
    TextInput, 
    Text, 
    TouchableOpacity, 
    StyleSheet

} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage'; // grava dados assincronamente dentro do SqlLite, semelhante ao armazenamento local do browser com ReactJS

import Icon from "react-native-vector-icons/FontAwesome";

export default class Login extends Component {

    state = {
      username: '',
    }

    /**
     * Verifica se o usuario digitou um login anteriormente
     * e ja redireciona para a Timeline, antes de renderizar
     * o componente em tela.
     */
    async componentDidMount () {
        const username = await AsyncStorage.getItem('@Omnistack:username');

        if (username) {
          this.props.navigation.navigate('App');
        }
    }

    handleInputChange = (valueImput) => {
        this.setState({username: valueImput});
    };

    handleLogin = async () => {
        const {username} = this.state;

        if (!username.length) return;

        await AsyncStorage.setItem('@Omnistack:username', username);

        this.props.navigation.navigate('App'); //navega para a rota App
    };

    render() {
        return(
        <KeyboardAvoidingView behavior="padding" style={styles.container}>

            <View style={styles.content}>
                <Icon name="twitter" size={64} color="#4BB0EE" />

                <TextInput 
                    style={styles.input} 
                    placeholder="Nome do usuário" 
                    onChangeText={this.handleInputChange} 
                    onSubmitEditing={this.handleLogin} 
                    value={this.state.username} 
                    returnKeyType="send"s
                />
                
                <TouchableOpacity onPress={this.handleLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>           

        </KeyboardAvoidingView>
        ); 
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF"
    },
  
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 30
    },
  
    input: {
      borderWidth: 1,
      borderColor: "#DDD",
      borderRadius: 5,
      height: 44,
      paddingHorizontal: 15,
      alignSelf: "stretch",
      marginTop: 30
    },
  
    button: {
      height: 44,
      alignSelf: "stretch",
      marginTop: 10,
      backgroundColor: "#4BB0EE",
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center"
    },
  
    buttonText: {
      color: "#FFF",
      fontSize: 16,
      fontWeight: "bold"
    }
  });
  