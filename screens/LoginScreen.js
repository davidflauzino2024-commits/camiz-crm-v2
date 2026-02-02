// screens/LoginScreen.js
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { auth } from '../firebaseConfig';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const login = () => {
    if (!email || !senha) {
      setMensagem('⚠️ Preencha email e senha antes de continuar.');
      return;
    }

    signInWithEmailAndPassword(auth, email, senha)
      .then(() => {
        setMensagem('✅ Login realizado com sucesso!');
        navigation.navigate('LeadForm');
      })
      .catch((error) => setMensagem('❌ Erro: ' + error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Login CAMIZ – ADS</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <Button title="Entrar" onPress={login} />
      <Text style={styles.mensagem}>{mensagem}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  mensagem: {
    marginTop: 10,
    textAlign: 'center',
  },
});
