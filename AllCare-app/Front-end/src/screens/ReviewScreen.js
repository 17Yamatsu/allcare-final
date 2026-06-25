import React, { useCallback, useState } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { createReview, getReviews } from "../services/api";

export default function ReviewScreen({ navigation, route }) {
  const user = route?.params?.user;
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ avaliador: user?.usr_name || "Usuário Teste", cuidador: "Ana Cuidadora", nota: "5", comentario: "Excelente atendimento." });
  const load = useCallback(async () => { try { setItems(await getReviews()); } catch(e){ Alert.alert("Erro", e.message); } }, []);
  useFocusEffect(useCallback(()=>{ load(); }, [load]));
  function update(k,v){ setForm(o=>({...o,[k]:v})); }
  async function save(){ try { await createReview(form); Alert.alert("Sucesso", "Avaliação enviada."); load(); } catch(e){ Alert.alert("Erro", e.message); } }
  const avg = items.length ? (items.reduce((s,i)=>s+Number(i.nota || 0),0)/items.length).toFixed(1) : "0.0";
  return <SafeAreaView style={styles.screen}><ScrollView contentContainerStyle={styles.container}><Back navigation={navigation}/><Text style={styles.title}>Avaliação do atendimento</Text><View style={styles.score}><Text style={styles.scoreNumber}>{avg}</Text><Text style={styles.stars}>⭐⭐⭐⭐⭐</Text><Text>Média geral das avaliações</Text></View><View style={styles.form}><Input label="Avaliador" value={form.avaliador} onChangeText={(v)=>update('avaliador',v)}/><Input label="Cuidador" value={form.cuidador} onChangeText={(v)=>update('cuidador',v)}/><Input label="Nota de 1 a 5" value={form.nota} onChangeText={(v)=>update('nota',v)} keyboardType="numeric"/><Input label="Comentário" value={form.comentario} onChangeText={(v)=>update('comentario',v)} multiline/><Button title="Enviar avaliação" onPress={save}/></View>{items.map(item=><View key={item.id} style={styles.card}><Text style={styles.cardTitle}>{'⭐'.repeat(Number(item.nota || 0))}</Text><Text>Cuidador: {item.cuidador}</Text><Text>Avaliador: {item.avaliador}</Text><Text>{item.comentario}</Text></View>)}</ScrollView></SafeAreaView>;
}
function Input(props){return <View style={styles.field}><Text style={styles.label}>{props.label}</Text><TextInput style={[styles.input,props.multiline&&styles.textArea]} {...props}/></View>}
function Button({title,onPress}){return <TouchableOpacity style={styles.button} onPress={onPress}><Text style={styles.buttonText}>{title}</Text></TouchableOpacity>}
function Back({navigation}){return <TouchableOpacity style={styles.back} onPress={()=>navigation.goBack()}><Text style={styles.backText}>← Voltar</Text></TouchableOpacity>}
const styles=StyleSheet.create({screen:{flex:1,backgroundColor:"#EAF6FF", padding: 10},container:{padding:20,paddingBottom:40},back:{alignSelf:"flex-start",marginBottom:12},backText:{color:"#2563EB",fontWeight:"bold"},title:{fontSize:28,fontWeight:"bold",color:"#0F2A44",marginBottom:12},score:{backgroundColor:"#fff",borderRadius:18,padding:20,alignItems:"center",marginBottom:16},scoreNumber:{fontSize:42,fontWeight:"bold",color:"#2563EB"},stars:{fontSize:22,marginVertical:8},form:{backgroundColor:"#fff",borderRadius:18,padding:16,marginBottom:16},field:{marginBottom:10},label:{fontWeight:"bold",marginBottom:4,color:"#0F2A44"},input:{backgroundColor:"#F8FBFF",borderRadius:12,borderWidth:1,borderColor:"#CFE3FF",padding:12},textArea:{minHeight:80,textAlignVertical:"top"},button:{backgroundColor:"#2563EB",borderRadius:14,padding:14,alignItems:"center"},buttonText:{color:"#fff",fontWeight:"bold"},card:{backgroundColor:"#fff",borderRadius:18,padding:16,marginBottom:14},cardTitle:{fontSize:20,fontWeight:"bold",color:"#F59E0B"}});
