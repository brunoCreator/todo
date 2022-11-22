
import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, SafeAreaView, View, Center, Box, Heading, VStack, FormControl, Label, Image, Keyboard, TextInput, TouchableWithoutFeedback } from "react-native";
import { styles } from "../assets/css/main";
import {
  Input,
  CheckBox,
  Button, ButtonGroup, withTheme, Text,
  ListItem,
  Avatar,
  Icon,
  Badge,
  ListItemProps,
  Switch,
  lightColors
} from '@rneui/themed';
import { FAB } from "@rneui/base";
import { useNavigation, useRoute } from "@react-navigation/core";
import { useIsFocused } from "@react-navigation/native";
import { ScrollView } from 'react-native';

export default function Home({ navigation }) {
  const [checkboxes, setCheckboxes] = useState([{
    id: 1,
    title: 'Item 1',
    checked: false,
  }, {
    id: 2,
    title: 'Item 2',
    checked: false,
  }]);
  const [editId, setEditId] = useState();
  const edit = (text, index) => {
    const checkboxData = [...checkboxes];
    checkboxData[index].title = text;
    setCheckboxes(checkboxData);
  }
  const [expanded, setExpanded] = useState(false);

  const close = () => {

    setEditId(null);
    Keyboard.dismiss();
  }


  const toggleCheckbox = (id, index) => {
    const checkboxData = [...checkboxes];
    checkboxData[index].checked = !checkboxData[index].checked;
    setCheckboxes(checkboxData);
  }
  const add = () => {
    const nList = [...checkboxes];
    nList.push({
      id: Math.max(...checkboxes.map(o => o.id)) + 1,
      title: '',
      checked: false,
    });
    setCheckboxes(nList);
  }

  const del = (index) => {
    const nList = [...checkboxes];
    nList.splice(index, 1)
    setCheckboxes(nList);
  }

  const data = (checked) => {
    return (checkboxes.map((cb, index) => {
      if ((checked && cb.checked) || (!checked && !cb.checked))
        return (

          <ListItem bottomDivider>
            <ListItem.CheckBox


              checked={cb.checked}
              onPress={() => toggleCheckbox(cb.id, index)}
            />
            <ListItem.Content>
              {editId && editId == cb.id ? <ListItem.Input
                style={{ textAlign: 'left' }}
                value={cb.title}
                onChangeText={(text) => edit(text, index)}
                placeholder='Clique para alterar'
              /> : <ListItem.Title onPress={() => setEditId(cb.id)}>{cb.title == '' ? 'Clique 2 vezes para alterar' : cb.title}</ListItem.Title>}
            </ListItem.Content>

            <Button
              onPress={() => del(index)}
              buttonStyle={{ backgroundColor: 'rgba(214, 61, 57, 1)', marginLeft: "auto" }}
              icon={{
                name: 'remove',
                type: 'font-awesome',
                size: 15,
                color: 'white',
              }}

            />
          </ListItem>


        )
    }))
  }

  return (

    <TouchableWithoutFeedback onPress={() => close()}>
      <View
        style={styles.container}
      >
        <ScrollView>
          <View>
            {
              data(false)
            }
          </View>
        </ScrollView>



        <View>
          <Button title="Adicionar" onPress={add} />
        </View>

        <View style={styles.list}>
          <ListItem.Accordion
            content={
              <>
                <Icon name="done" size={30} />
                <ListItem.Content>
                  <ListItem.Title>Finalizado</ListItem.Title>
                </ListItem.Content>
              </>
            }
            isExpanded={expanded}
            onPress={() => {
              setExpanded(!expanded);
            }}
          >
            {data(true)}
          </ListItem.Accordion>

        </View>

      </View>
    </TouchableWithoutFeedback>

  );
}