import React,{Component}from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
    FlatList} from 'react-native';
import {ListItem,Card,Header,Icon} from 'react-native-elements'
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader.js'

export default class MyRecievedBooksScreen extends Component{
    constructor(){
        super();
        this.state ={
            userId:firebase.auth().currentUser.email,
            recievedBooksList:[]
        } 
        this.requestRef = null
    }
    getRecievedBooksList = ()=>{
        this.notificationRef = db.collection("requested_books")
        .where("user_id","==",this.state.userId)
        .where("book_status","==",'recieved')
        .onSnapshot((snapshot)=>{
            var recievedBooksList = snapshot.docs.map((doc)=>doc.data())
               
                this.setState({
                    recievedBooksList:recievedBooksList
                })
                
        })
    }
    componentDidMount(){
        this.getRecievedBooksList();
    }
    componentWillMount(){
        this.requestRef
    }

    keyExtractor = (item,index)=>index.toString()

    renderItem = ({item,index})=>{
        <ListItem
        key = {index}
        title = {item.book_name}
        subtitle = {item.bookStatus}
        titleStyle = {{color:'black',fontWeight:'bold'}}
        bottomDivider/>


    }
    render(){
        return(
            <View style = {{flex:1}}>
                <View style = {{flex:1}}>
                    <MyHeader navigation = {this.props.navigation} title = "Recieved Books"/>
                    </View>
                    <View style = {{flex:0.9}}>{
                        this.state.recievedBooksList.length === 0
                        ?(
                            <View style = {{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <Text style = {{fontSize:20}}>List Of All Recieved Books</Text>
                            </View>
                         ):(
                            <FlatList
                            keyExtractor={this.keyExtractor}
                            data = {this.state.recievedBooksList}
                            renderItem = {this.renderItem}
                            />
                         )
                    }
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
     flex:1,
   },
   subContainer:{
    flex:1,
    fontSize:20,
    justifyContent:'center',
    alignItems:'center',
  },
  button:{
    width:200,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"orange",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    elevation: 16,
  },
})

