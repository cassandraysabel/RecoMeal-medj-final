import { ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";
import RecipeCard from "./RecipeCard";

export default function RecipeList({ recipes, ingredient }) {
  return (
    <View >
      <View style={{height: 26, paddingLeft: 20, marginBottom: 2}}>
       <Text style={{fontSize: 20, color: '#FBA834' }}>{ingredient}</Text>
        

      </View>
      
      <ScrollView horizontal>
        {recipes.map((recipe) => {
          return <RecipeCard key={recipe.recipe.image} recipe={recipe} />;
        })}
      </ScrollView>
    </View>
  );
}

