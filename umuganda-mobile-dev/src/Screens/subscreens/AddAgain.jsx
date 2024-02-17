import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Add } from '../Add'

export const AddAgain = () => {
  return (
   <SafeAreaView>
    <ScrollView>
        <View>
            < Add />
        </View>
    </ScrollView>
   </SafeAreaView>
  )
}

const styles = StyleSheet.create({})