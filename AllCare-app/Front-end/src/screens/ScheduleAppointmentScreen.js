import React, { useCallback, useState } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { createAppointment } from "../services/api";

export default function ScheduleAppointmentScreen({ navigation, route }) {
  const user = route?.params?.user;
  const getProfissionais = route?.params?.profissional;
  const [form, setForm] = useState({
    paciente: user?.usr_name || "Usuário Teste",
    cuidador: getProfissionais?.name || "Profissional Exemplo",
    especialidade: getProfissionais?.spec?.join(", ") || "Especialidade Exemplo",
    data_consulta: new Date().toISOString().slice(0, 10),
    horario: "14:00",
    endereco: "Barueri - SP",
    valor: "150.00",
    observacoes: "Negociação iniciada com " + getProfissionais?.name + " pelo aplicativo AllCare."
  });
  const [loading, setLoading] = useState(false);

  function update(field, value) { setForm((old) => ({ ...old, [field]: value })); }

  async function handleSubmit() {
    try {
      setLoading(true);
      await createAppointment({ ...form, usuario_id: user?.usr_id || null });
      Alert.alert("Sucesso", "Consulta agendada com sucesso.");
      navigation.navigate("MyAppointments", { user });
    } catch (error) {
      Alert.alert("Erro", error.message || "Não foi possível agendar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <Back navigation={navigation} user={user} />
        <Text style={styles.title}>Agendar consulta</Text>
        <Text style={styles.subtitle}>Cadastre uma consulta/atendimento e salve no MySQL.</Text>
        <Input label="Paciente" value={form.paciente} onChangeText={(v) => update("paciente", v)} />
        <Input label="Cuidador" value={form.cuidador} onChangeText={(v) => update("cuidador", v)} />
        <Input label="Especialidade" value={form.especialidade} onChangeText={(v) => update("especialidade", v)} />
        <Input label="Data (AAAA-MM-DD)" value={form.data_consulta} onChangeText={(v) => update("data_consulta", v)} />
        <Input label="Horário (HH:MM)" value={form.horario} onChangeText={(v) => update("horario", v)} />
        <Input label="Endereço" value={form.endereco} onChangeText={(v) => update("endereco", v)} />
        <Input label="Valor combinado" value={form.valor} onChangeText={(v) => update("valor", v)} keyboardType="numeric" />
        <Input label="Observações" value={form.observacoes} onChangeText={(v) => update("observacoes", v)} multiline />
        <Button title={loading ? "Salvando..." : "Salvar agendamento"} onPress={handleSubmit} />
      </ScrollView>
    </SafeAreaView>
  );
}

function Input(props) { return <View style={styles.field}><Text style={styles.label}>{props.label}</Text><TextInput style={[styles.input, props.multiline && styles.textArea]} placeholder={props.label} {...props} /></View>; }
function Button({ title, onPress }) { return <TouchableOpacity style={styles.button} onPress={onPress}><Text style={styles.buttonText}>{title}</Text></TouchableOpacity>; }
function Back({ navigation, user }) { return <TouchableOpacity style={styles.back} onPress={() => navigation.navigate("Home", { user })}><Text style={styles.backText}>← Voltar</Text></TouchableOpacity>; }
const styles = StyleSheet.create({ screen:{flex:1,backgroundColor:"#EAF6FF"}, container:{padding:20,paddingBottom:40}, back:{alignSelf:"flex-start",marginBottom:12}, backText:{color:"#2563EB",fontWeight:"bold"}, title:{fontSize:28,fontWeight:"bold",color:"#0F2A44"}, subtitle:{color:"#52677A",marginBottom:18}, field:{marginBottom:12}, label:{fontWeight:"bold",color:"#0F2A44",marginBottom:6}, input:{backgroundColor:"#fff",borderRadius:14,borderWidth:1,borderColor:"#CFE3FF",padding:14}, textArea:{minHeight:90,textAlignVertical:"top"}, button:{backgroundColor:"#2563EB",borderRadius:16,padding:16,alignItems:"center",marginTop:12}, buttonText:{color:"#fff",fontWeight:"bold",fontSize:16} });
