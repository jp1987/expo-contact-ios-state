import {StatusBar} from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import * as Contacts from 'expo-contacts';
import {useEffect, useState} from "react";

export default function App() {
  const [permission, setPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const {status} = await Contacts.getPermissionsAsync();
      setPermission(status === 'granted');
    })();
  }, []);

  return (
    <View style={styles.container}>
      {!permission && (
        <Button title="Give permission" onPress={async () => {
          const result = await Contacts.requestPermissionsAsync();
          if (result.status === 'granted') {
            setPermission(true);
          }
        }}/>)}
      {permission && (
        <>
        <Button title="Add contact" onPress={async () => {
          console.log('add contact');

          await Contacts.presentFormAsync(
            null,
            {
              contactType: 'person',
              name: '',
              phoneNumbers: [{ number: '123456789', label: 'mobile' }],
            },
            {
              isNew: true,
            }
          );
        }} />
          <Button title="Pick contact" onPress={async () => {
            console.log('pick contact');

            const contact = await Contacts.presentContactPickerAsync({
              fields: [Contacts.Fields.PhoneNumbers],
            });

            console.log('pick contact result');
            console.log(JSON.stringify(contact, null, 2));
          }} />
        </>
      )}
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
