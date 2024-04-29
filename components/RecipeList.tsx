import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RecipeCard from './RecipeCard'

export default function RecipeList({ recipes }) {
  return (
    <ScrollView horizontal  >
      {recipes.map((recipe) => {
        return (
        <RecipeCard key={recipe.shareAs} recipe={recipe} />
      )})}
    </ScrollView>
  )
}
