import React, { useCallback, useState } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { deleteAppointment, getAppointments, updateAppointmentStatus } from "../services/api";

export default function MyAppointmentsScreen({ navigation, route }) {
  const user = route?.params?.user;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    try { setLoading(true); setItems(await getAppointments()); }
    catch (error) { Alert.alert("Erro", error.message); }
    finally { setLoading(false); }
  }, []);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  async function setStatus(id, status) { await updateAppointmentStatus(id, status); load(); }
  async function remove(id) { await deleteAppointment(id); load(); }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <Back navigation={navigation} user={user} />
        <Text style={styles.title}>Meus agendamentos</Text>
        <TouchableOpacity style={styles.secondary} onPress={() => navigation.navigate("ScheduleAppointment", { user })}><Text style={styles.secondaryText}>+ Novo agendamento</Text></TouchableOpacity>
        {loading ? <Text>Carregando...</Text> : null}
        {items.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitle}>{item.paciente} com {item.cuidador}</Text>
            <Text>📅 {formatDate(item.data_consulta)} às {String(item.horario).slice(0,5)}</Text>
            <Text>📍 {item.endereco}</Text>
            <Text>💰 R$ {Number(item.valor || 0).toFixed(2)}</Text>
            <Text style={styles.status}>Status: {item.status}</Text>
            <View style={styles.row}>
              <SmallButton title="Concluir" onPress={() => setStatus(item.id, "Concluído")} />
              <SmallButton title="Cancelar" onPress={() => setStatus(item.id, "Cancelado")} />
              <SmallButton title="Excluir" onPress={() => remove(item.id)} danger />
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
function formatDate(v){ return v ? String(v).slice(0,10).split('-').reverse().join('/') : ''; }
function SmallButton({ title, onPress, danger }) { return <TouchableOpacity style={[styles.smallButton, danger && styles.danger]} onPress={onPress}><Text style={styles.smallButtonText}>{title}</Text></TouchableOpacity>; }
function Back({ navigation, user }) { return <TouchableOpacity style={styles.back} onPress={() => navigation.navigate("Home", { user })}><Text style={styles.backText}>← Voltar</Text></TouchableOpacity>; }
const styles = StyleSheet.create({ screen:{flex:1,backgroundColor:"#EAF6FF", padding: 10}, container:{padding:20,paddingBottom:40}, back:{alignSelf:"flex-start",marginBottom:12}, backText:{color:"#2563EB",fontWeight:"bold"}, title:{fontSize:28,fontWeight:"bold",color:"#0F2A44",marginBottom:12}, secondary:{backgroundColor:"#fff",borderRadius:14,padding:14,marginBottom:14,borderWidth:1,borderColor:"#2563EB"}, secondaryText:{color:"#2563EB",fontWeight:"bold",textAlign:"center"}, card:{backgroundColor:"#fff",borderRadius:18,padding:16,marginBottom:14,elevation:2}, cardTitle:{fontSize:18,fontWeight:"bold",color:"#0F2A44",marginBottom:8}, status:{marginTop:8,fontWeight:"bold",color:"#2563EB"}, row:{flexDirection:"row",gap:8,marginTop:12,flexWrap:"wrap"}, smallButton:{backgroundColor:"#2563EB",borderRadius:12,paddingVertical:10,paddingHorizontal:12}, danger:{backgroundColor:"#DC2626"}, smallButtonText:{color:"#fff",fontWeight:"bold"} });
