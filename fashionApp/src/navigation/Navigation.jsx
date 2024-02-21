import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'
import SearchBar from '../Components/searchBar'
import ButtonScroll from '../Components/buttonScroll'
import { data } from './buttonScrollData'


export default function Navi() {
    console.log(data)
 
    return (
        <View style={{paddingTop:50}}>
            <View style={{paddingHorizontal:20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{backgroundColor:'#E5E7E9',height:40,width:40,borderRadius:50,alignItems:'center',display:'flex',justifyContent:'center'}}>
                    <Icon name="arrow-left" type="material-community" color="#000" size={23} style={{fontWeight:'100'}}/>
                </View>
                <View style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:18,fontWeight:'700'}}>Search</Text>
                    </View>
                    <View style={{height:40,width:40,borderRadius:50,alignItems:'center',display:'flex',justifyContent:'center'}}>
                    <Icon name="tune-vertical-variant" type="material-community" color="#5b5b5b" size={23} style={{fontWeight:'100'}}/>
                </View>

            </View>
            <View>
                <SearchBar />
            </View>
            <ScrollView>
                {data.map((item)=>{
                <Text>DHSKF</Text>
                })}
            </ScrollView>
        </View>
    )
}


export default function Navigation() {
    console.log(data)
 
    return (
        <View style={{paddingTop:50}}>
            <View style={{paddingHorizontal:20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{backgroundColor:'#E5E7E9',height:40,width:40,borderRadius:50,alignItems:'center',display:'flex',justifyContent:'center'}}>
                    <Icon name="arrow-left" type="material-community" color="#000" size={23} style={{fontWeight:'100'}}/>
                </View>
                <View style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:18,fontWeight:'700'}}>Search</Text>
                    </View>
                    <View style={{height:40,width:40,borderRadius:50,alignItems:'center',display:'flex',justifyContent:'center'}}>
                    <Icon name="tune-vertical-variant" type="material-community" color="#5b5b5b" size={23} style={{fontWeight:'100'}}/>
                </View>

            </View>
            <View>
                <SearchBar />
            </View>
            <ScrollView>
                {data.map((item)=>{
                <Text>DHSKF</Text>
                })}
            </ScrollView>
        </View>
    )
}
