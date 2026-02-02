// screens/LeadFormScreen.js
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { db } from '../firebaseConfig';

export default function LeadFormScreen() {
  const [leadNome, setLeadNome] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadTelefone, setLeadTelefone] = useState('');
  const [mensagemLead, setMensagemLead] = useState('');

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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Cadastro de Lead</Text>

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
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
