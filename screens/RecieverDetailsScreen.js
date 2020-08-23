import React,{Component}from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    FlatList} from 'react-native';
    import {ListItem,Card,Header,Icon} from 'react-native-elements'

import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader.js'

export default class recieverDetailsScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            userId:firebase.auth().currentUser.email,
            userName:"",
            recieverId:this.props.navigation.getParam('details')["user_id"],
            requestId:this.props.navigation.getParam('details')["request_id"],
            bookName:this.props.navigation.getParam('details')["book_name"],
            reason_for_requesting:this.props.navigation.getParam('details')["reasonToRequest"],
            recieverName:'',
            recieverContact:'',
            recieverAddress:'',
            recieverRequestDockId:'',
        }
    }
    getUserDetails=(userId)=>{
        db.collection("users").where("email_id","==",userId).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    userName:doc.data().first_name+" "+doc.data().last_name
                })
            })
        })
    }
    getRecieverDetails(){
        db.collection('users').where('email_id','==',this.state.recieverId).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({
                    recieverName:doc.data().first_name,
                    recieverAddress:doc.data().address,
                    recieverContact:doc.data().contact,
                })
            })
                
        })
        db.collection('requested_books').where('request_id','==',this.state.requestId).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({
                    recieverRequestDockId:doc.id
                })
            })
        })
        }
        updateBookStatus = ()=>{
            db.collection('all_donations').add({
                "book_name":this.state.bookName,
                "request_id":this.state.requestId,
                "requested_by":this.state.recieverName,
                "donor_id":this.state.userId,
                "request_status":"donor interested"
            })
        }
        addNotification = ()=>{
            var message = this.state.userName+"Has shown interest in donating the book"
            db.collection('all_notifications').add({
                "targeted_user_id":this.state.recieverId,
                "request_id":this.state.requestId,
                "donor_id":this.state.userId,
                "book_name":this.state.bookName,
                "date":firebase.firestore.FieldValue.serverTimestamp(),
                "notification_status":"unread",
                "message":message
            })
        }
        componentDidMount(){
            this.getRecieverDetails();
            this.getUserDetails(this.state.userId)
        }
        render(){
            console.log("one")
            return(
                <View style = {styles.container}>
                    <View style = {{flex:0.1}}>
                        <Header leftComponent = {<Icon name = "arrow_left" type = 'feather' color = '696969' onPress = {()=>this.props.navigation.goBack()}/>}
                        centerComponent = {{text:"donate books", style:{color:'#90a5a9',fontSize:20,fontWeight:"bold"}}}
                        backgroundColor = "eaf8fe"/>
                    </View>
                    <View  style = {{flex:0.3}}>
                        <Card title = {"book information"}
                        titleStyle = {{fontSize:20}}
                        >
                            <Card>
                                <Text style = {{fontWeight:'bold'}}>Name:{this.state.bookName}</Text>
                            </Card>
                            <Card>
                                <Text style = {{fontWeight:'bold'}}>Reason:{this.state.reason_for_requesting}</Text>
                            </Card>
                        </Card>
                    </View>
                    <View  style = {{flex:0.3}}>
                        <Card title = {"Reciever Information"}
                        titleStyle = {{fontSize:20}}
                        >
                            <Card>
                                <Text style = {{fontWeight:'bold'}}>Name:{this.state.recieverName}</Text>
                            </Card>
                            <Card>
                                <Text style = {{fontWeight:'bold'}}>contact:{this.state.recieverContact}</Text>
                            </Card>
                            <Card>
                                <Text style = {{fontWeight:'bold'}}>address:{this.state.recieverAddress}</Text>
                            </Card>
                        </Card>
                    </View>
                    <View style = {styles.buttonContainer}>
                        {
                            this.state.recieverId !== this.state.userId
                            ?(
                                <TouchableOpacity
                                style = {styles.button}
                                onPress = {()=>{
                                    this.updateBookStatus()
                                    this.addNotification()
                                    this.props.navigation.navigate('MyDonations')
                                }}>
                                    <Text>I want to donate</Text>
                                </TouchableOpacity>
                            ):null
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
   buttonContainer:{
    flex:0.3,
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
