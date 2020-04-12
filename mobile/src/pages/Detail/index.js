import React from 'react';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native'; 
import { useNavigation, useRoute } from '@react-navigation/native';
import MailCompose from 'react-native-mail-compose';

import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Detail(){
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;

    const valueFormated = Intl.NumberFormat(
        'pt-BR', 
        {
            style: 'currency', 
            currency: 'BRL'
        }).format(incident.value);
    
    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria 
        de ajudar no caso ${incident.title} com o valor de ${valueFormated}`;
    function navigateBack(){
        navigation.goBack();
    }

    async function sendMail(){
        try{
            await MailCompose.send({
                toRecipients: [incident.email],
                subject: `Herói do caso: ${incident.title}`,
                text: message
            });
        }catch(err){

        }
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }

    return(
        <View style={styles.container}>
             <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={navigateBack}>
                    <Text>Voltar</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG:</Text>
                <Text style={styles.incidentValue}>
                    {incident.name} de {incident.city}/{incident.uf}
                </Text>
                
                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>
                    {incident.description}
                </Text>
                
                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}> {valueFormated} </Text>
            </View>
            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso</Text>
                
                <Text style={styles.heroDescription}>Entre em contato</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} 
                        onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action}
                        onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}