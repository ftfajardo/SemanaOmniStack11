import React, {useState,useEffect} from 'react';
import {View , FlatList ,Image , Text, TouchableOpacity} from 'react-native';
import {Feather} from '@expo/vector-icons';
import logoImgs from '../../assets/logo.png';
import styles from './styles';
import {useNavigation} from '@react-navigation/native'
import api from '../../services/api';

export default function Incidents(){
    const navigation = useNavigation();
    const [incidents,setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page,setPage] = useState(1);
    const [loading,setLoading] = useState(false);


    function navigateToDetail(incident){
        navigation.navigate('Detalhes', {incident});
    }

    async function loadIncidents(){
        if(loading){
            return;
        }

        if( total > 0 && incidents.length == total){
            return;
        }
        
        setLoading(true);
        
        
        const response = await api.get('incidents',{params:{page}});
        setIncidents([...incidents,...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page+1);
        setLoading(false);
    }

    useEffect(  () => {
        loadIncidents();

    }, []);


    return( 
        <View style={styles.container}>
            <View style= {styles.header}>
                <Image source={logoImgs} />
                <Text style = {styles.headerText}>
                    Total de <Text style= {styles.header.TextBold}>{total} casos</Text>
                </Text>
            </View>
            <Text style= {styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
       
        <FlatList 
            data = {incidents}
            style={styles.IncidentsList}
            keyExtractor = {incident => String(incident.id)}
            onEndReached={loadIncidents}
            onEndReachedThreshold= {0.2}
            renderItem = {({item: incident}) => (
                <View style={styles.incident}>
                    <Text style= {styles.incidentProperty}>ONG:</Text>
                    <Text style= {styles.incidentValue}>{incident.name}</Text>

                    <Text style= {styles.incidentProperty}>CASO:</Text>
                    <Text style= {styles.incidentValue}>{incident.title}</Text>

                    <Text style= {styles.incidentProperty}>VALOR:</Text>
                    <Text style= {styles.incidentValue}>R$ {incident.value}</Text>

                    <TouchableOpacity style= {styles.detailsButton}
                        onPress = {() => navigateToDetail(incident)}
                    >
                        <Text style={styles.detailsButtonText}>Ver mais detalhes </Text>
                        <Feather name= "arrow-right" size= {16} color = "#E02031"></Feather>
                    </TouchableOpacity>
            </View>






        )} />
            

       
    </View>

        
    );


}