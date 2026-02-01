// Importa as funções necessárias do SDK do Firebase
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuração do Firebase do seu projeto
const firebaseConfig = {
  apiKey: 'AIzaSyDOqGwAMA_pEZv-LKNN-6PyFReUIZZ3p04',
  authDomain: 'camiz-crm.firebaseapp.com',
  projectId: 'camiz-crm',
  storageBucket: 'camiz-crm.appspot.com',
  messagingSenderId: '1055473922274',
  appId: '1:1055473922274:web:02e6224d63d28fcc5b116b'
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta o módulo de autenticação
export const auth = getAuth(app);
export const db = getFirestore(app);
