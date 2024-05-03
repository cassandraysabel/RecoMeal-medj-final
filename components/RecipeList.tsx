import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import RecipeCard from "./RecipeCard";

export default function RecipeList({ recipes, ingredient }) {
  return (
    <View>
      <Text>{ingredient}</Text>
      <ScrollView horizontal>
        {recipes.map((recipe) => {
          return <RecipeCard key={recipe.recipe.image} recipe={recipe} />;
        })}
      </ScrollView>
    </View>
  );
}