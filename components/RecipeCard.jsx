import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { assets } from './assets';
import { useDataContext } from '../utils/UserData';
import { setData } from '../utils/asyncstorage';


export default function RecipeCard({ recipe }) {

  const { favoriteRecipes, setFavoriteRecipes } = useDataContext()

  const openRecipeUrl = (url) => {
    console.log(url);
    Linking.openURL(url);
  };

  const AddRecipesToFavorites = () => {
    //console.log("Adding recipe to favorites:", recipe); 
    // Check if the recipe is already in favorites by label
    if (favoriteRecipes.some((favRecipe) => favRecipe.recipe.label === recipe.recipe.label)) {
      console.log("Recipe already exists in favorites.");
      return;
    }
    const updatedFavorites = [...favoriteRecipes, recipe];
    setFavoriteRecipes(updatedFavorites);
    setData("favoriteRecipes", updatedFavorites);
  };
  
  
  return (
    <View>
      <View
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
          marginHorizontal: 5,
          marginBottom: 20,
          backgroundColor: "#333A73",
          borderRadius: 15,
          elevation: 3,
          marginTop: 10,
          height: 234,
          width: 162,
        }}
      >
        <Image
          source={{ uri: recipe.recipe.image }}
          style={{
            width: 151,
            height: 102,
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10,
            marginBottom: 5,
            borderRadius: 15,
          }} 
        />
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text
            style={{
              fontSize: 11,
              fontWeight: "bold",
              padding: 5,
              color: "white",
              textTransform: "uppercase",
            }}
          >
            {recipe.recipe.label.toUpperCase()}
          </Text>
        </View>
        <View
          style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 1 }}
        >
          <View
            style={{
              width: 138,
              height: 30,
              backgroundColor: "white",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              marginBottom: 8
            }}
          >
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: "#FBA834",
                borderRadius: 6.6,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 3,
                marginLeft: 0,
              }}
            >
              <TouchableOpacity onPress={AddRecipesToFavorites }>
              <Image
                source={assets['heart-icon']}
                style={{ width: 20, height: 20 }}
              ></Image>

              </TouchableOpacity>
              
            </View>

            <Text style={{ fontSize: 6, fontWeight: "500", color: "black" }}>
              Add To Favorites
            </Text>

            <TouchableOpacity
              style={{
                width: 45,
                height: 20,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 35,
                backgroundColor: "#FBA834",
                marginLeft: 8,
              }}
              onPress={() => openRecipeUrl(recipe.recipe.url)}
            >
              <Text style={{ fontSize: 7, fontWeight: "500", color: "white" }}>
                See More...
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}