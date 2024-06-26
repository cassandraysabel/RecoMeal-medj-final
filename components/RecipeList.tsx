import { ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";
import RecipeCard from "./RecipeCard";

export default function RecipeList({ recipes, ingredient }) {

  
  return (
    <View >
      <View style={{height: 28, paddingLeft: 20, marginBottom: 2, marginTop: 9}}>
       <Text style={{fontSize: 20, color: '#FBA834' }}>{ingredient.name}</Text>
        

      </View>
      
      <ScrollView horizontal>
        {recipes.map((recipe) => {
          return <RecipeCard key={recipe.recipe.image} recipe={recipe} />;
        })}
      </ScrollView>
    </View>
  );
}

