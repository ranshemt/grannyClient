import React from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import { withNavigation } from 'react-navigation'
import PropType from 'prop-types'
const S = StyleSheet.create({
  container: {
    flex: 1
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#CED0CE',
    marginLeft: '14%'
  }
})
const RecipesList = props => {
  return (
    <FlatList
      data={props.recipes}
      keyExtractor={item => item.id}
      renderItem={({ item }) => {
        return (
          <View style={S.container} onPress={() => props.navigation.navigate('Recipe')}>
            <Text>
              {item.title}, {item.preptime} דקות
            </Text>
            <Text>כאבים: {item.pains.join(', ')}</Text>
            <Text>מרכיבים: {item.ingredients.join(', ')}</Text>
            <Text>תיאור: {item.description}</Text>
          </View>
        )
      }}
      ItemSeparatorComponent={() => {
        return <View style={S.separator} />
      }}
    />
  )
}
RecipesList.propTypes = {
  navigation: PropType.object.isRequired,
  recipes: PropType.array.isRequired
}
export default withNavigation(RecipesList)
