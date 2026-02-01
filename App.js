import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { auth, db } from './firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

export default function App() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const [leadNome, setLeadNome] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadTelefone, setLeadTelefone] = useState('');
  const [mensagemLead, setMensagemLead] = useState('');

  const login = () => {
    if (!email || !senha) {
      setMensagem('⚠️ Preencha email e senha antes de continuar.');
      return;
    }

    signInWithEmailAndPassword(auth, email, senha)
      .then(() => setMensagem('✅ Login realizado com sucesso!'))
      .catch((error) => setMensagem('❌ Erro: ' + error.message));
  };

  const salvarLead = async () => {
    if (!leadNome || !leadEmail || !leadTelefone) {
      setMensagemLead('⚠️ Preencha todos os dados do lead.');
      return;
    }

    try {
      await addDoc(collection(db, 'leads'), {
        nome: leadNome,
        email: leadEmail,
        telefone: leadTelefone,
        criadoEm: new Date()
      });
      setMensagemLead('✅ Lead salvo com sucesso!');
      setLeadNome('');
      setLeadEmail('');
      setLeadTelefone('');
    } catch (error) {
      setMensagemLead('❌ Erro ao salvar lead: ' + error.message);
    }
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

      <View style={styles.divisor} />

      <Text style={styles.subtitulo}>Cadastro de Lead</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do lead"
        value={leadNome}
        onChangeText={setLeadNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Email do lead"
        value={leadEmail}
        onChangeText={setLeadEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone do lead"
        value={leadTelefone}
        onChangeText={setLeadTelefone}
        keyboardType="phone-pad"
      />
      <Button title="Salvar lead" onPress={salvarLead} />
      <Text style={styles.mensagem}>{mensagemLead}</Text>
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
  subtitulo: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 30,
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
  divisor: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 20,
  },
});