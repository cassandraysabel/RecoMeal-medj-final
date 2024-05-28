import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Linking,
  SafeAreaView
} from "react-native";
import { assets } from "../../../components/assets";
import { useDataContext } from "../../../utils/UserData";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { setData } from "../../../utils/asyncstorage";


export default function FavoritesScreen() {
  const { favoriteRecipes, setFavoriteRecipes } = useDataContext();
  const removeFromFavorites = (recipe) => {
    const updatedFavorites = favoriteRecipes.filter(
      (item) => item !== recipe
    );

    setFavoriteRecipes(updatedFavorites);
    setData("favoriteRecipes", updatedFavorites);
  };

  const FavoritesScreen = () => (
    <View style={{ flex: 1 }}>
        {
          (favoriteRecipes.length === 0) ?
          <View style={styles.nofavescontainer}>
            <MaterialCommunityIcons name="notebook-outline" size={70} color="#5F648B" style={styles.nofaves} />
            <View style={styles.nofavetextcontainer}>
            <Text style={styles.nofavetext}> You have no favorites yet.</Text>
            <Text style={styles.nofavetext}> Try using a recipe to see if you'll like it.</Text>
            </View>
          </View> : <View />
        }
      <FlatList
        data={favoriteRecipes}
        keyExtractor={(item) => item.id || Math.random().toString()} 
        renderItem={({ item }) => (
          <View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ justifyContent: "flex-start", marginLeft: 5 }}>
                <TouchableOpacity onPress={() => removeFromFavorites(item)}>
                  <Image
                    source={require("../../../assets/OnHeart.png")}
                    style={{ resizeMode: "contain", width: 30, height: 30 }}
                  />
                </TouchableOpacity>
                {item.recipe && (
                  <Image
                    source={{ uri: item.recipe.image }}
                  />
                )}
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flex: 1,
                  paddingHorizontal: 10,
                  maxWidth: 250,
                }}
              >
                {item.recipe && (
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      marginHorizontal: 5,
                    }}
                  >
                    {item.recipe.label}
                  </Text>
                )}
                <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                  Ingredients:
                </Text>
                <ScrollView style={{ flex: 1, maxWidth: 250, marginBottom: 10, paddingTop: 5}}>
                  <View>
                    {item.recipe &&
                      item.recipe.ingredients.map((ingredient, index) => (
                        <Text key={index} style={{ fontSize: 10 }}>
                          - {ingredient.text}
                        </Text>
                      ))}
                  </View>
                </ScrollView>
              </View>
            </View>
            <View style={{ justifyContent: "flex-end", flex: 1 }}>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: 376,
                  height: 23,
                  backgroundColor: "#F5D491",
                }}
                onPress={() => openRecipeUrl(item.recipe.url)}
              >
                <Text
                  style={{ color: "black", fontSize: 11, fontWeight: "500" }}
                >
                  View Recipe
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );

  const openRecipeUrl = (url) => {
    console.log(url);
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={assets.gradient} style={{ zIndex: 1 }} />
        <Image
          source={assets["ingredients-bg"]}
          resizeMode="cover"
          style={styles.bgimage}
        />
        <Text style={styles.ingredientsText}>Favorites</Text>
      </View>
      <FavoritesScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
  
  },
  header: {
    width: "100%",
    position: "relative",
  },
  bgimage: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: 300,
    height: 100,
  },
  ingredientsText: {
    color: "#333A73",
    fontSize: 30,
    fontWeight: "bold",
    position: "absolute",
    right: 10,
    top: 40,
    zIndex: 1
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  gradientimage: {
    width: "100%",
    height: "12%",
  },
  favText: {
    color: "#333A73",
    fontSize: 30,
    fontWeight: "bold",
    opacity: 1,
    position: "relative",
    marginTop: 50,
    marginRight: 50,
  },
  navigationBar: {
    position: "absolute",
    backgroundColor: "#201E53",
    justifyContent: "flex-end",
    bottom: 0,
    left: 0,
    right: 0,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  descriptions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  descriptionText: {
    fontSize: 10,
    color: "white",
  },
  favorite_rectangle: {
    width:"100%",
    height:160,
    backgroundColor:'white',
    justifyContent:'center',
    marginVertical:8,      
    

  },

  favorite_image: {
    width:100,
    height:100,
    borderRadius:50,
    
  },
  nofaveicon:{
    marginTop: 80,
    marginBottom: 5,
    alignSelf: "center",
  },
  nofaves:{
    paddingTop: 100,
    paddingBottom: 10,
    alignSelf: "center"
  },
  nofavetext:{
    paddingBottom: 10,
    textAlign:"center"
  },
  nofavetextcontainer:{
    justifyContent:"center"
  },
  nofavescontainer:{
    paddingTop: 150
  }
});
