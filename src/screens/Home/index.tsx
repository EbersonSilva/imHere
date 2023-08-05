
import { Text, View, TextInput, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native';
import { styles } from './styles';

import { Participant } from '../../components/Participant';
import React , { useState } from 'react';

export default function Home() {

  const [participants, setParticipants] = useState<string[]>([])
  const [participantName, setParcipantName] = useState('')


  function handleParticipantAdd(){
    if (participants.includes(participantName)){
      return Alert.alert("Participante Existe", "Já existe um participante na lista com esse nome.")
    }
   setParticipants(prevState => [...prevState, participantName])
   setParcipantName('')
    
  }

  function handleParticipantRemove(name: string){
   
    Alert.alert("Remover", `Remover o participante ${name}?`, [
      {
        text: "Sim",
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name)) //Retorna a lista sem o nome que foi deletado
      },
      {
        text: "Não",
        style: "cancel"
      }
    ]);
  }

  return (
    <View style={styles.container}>

    

      <Text style={styles.eventName}> 
        Nome do evento
      </Text>

      <Text style={styles.eventDate}> 
        Domingo, 30 de Julho de 2023.
      </Text>
      <View style={styles.form}>
      <TextInput 
        style={styles.input} 
        placeholder='Nome do participante'
        placeholderTextColor="#6b6b6b"
        onChangeText={setParcipantName}
        value={participantName}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
        <Text style={styles.buttonText}>
          +
        </Text>
      </TouchableOpacity>
      </View>
      {/* FlatList = Utilizado para colocar scroll na lista caso ultrapasse a tela */}
      <FlatList
      data={participants}
      keyExtractor={item => item}
      renderItem={({item }) => (
        <Participant 
          key={item} 
          name={item}
          onRemove={() => handleParticipantRemove(item)}/>
      )}
      // ListEmptyComponet = Propriedade para apresentar mensagem na tela inicial caso não tenha participantes na lista de presença.
      ListEmptyComponent={() => (
        <Text style={styles.listEmptyText}>
          Ninguem chegou no evento ainda? Adicione participantes a sua lista de presença.
        </Text>
      )}
      />
    </View>
  );
}