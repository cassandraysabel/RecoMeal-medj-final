import React, { useState } from 'react';
import { Image, TouchableOpacity, View, Text } from 'react-native';
import { assets } from './assets';

export default function RecipeCard({ recipe }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View>
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginHorizontal: 5,
          marginBottom: 20,
          backgroundColor: '#333A73',
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
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text
            style={{
              fontSize: 11,
              fontWeight: 'bold',
              padding: 5,
              color: 'white',
              textTransform: 'uppercase',
            }}
          >
            {recipe.recipe.label.toUpperCase()}
          </Text>
        </View>
        <View
          style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 10 }}
        >
          <View
            style={{
              width: 138,
              height: 19,
              backgroundColor: 'white',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              marginBottom: 8,
            }}
          >
            <TouchableOpacity onPress={toggleFavorite}>
              <View
                style={{
                  width: 13,
                  height: 13,
                  backgroundColor: '#FBA834',
                  borderRadius: 6.6,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 3,
                  marginLeft: 0,
                }}
              >
                <Image
                  source={
                    isFavorite ? assets['OnHeart'] : assets['heart-icon']
                  }
                  style={{ width: 13, height: 10 }}
                />
              </View>
            </TouchableOpacity>

            <Text style={{ fontSize: 6, fontWeight: '500', color: 'black' }}>
              {isFavorite ? 'Remove from Favorites' : 'Add To Favorites'}
            </Text>

            <TouchableOpacity
              style={{
                width: 53,
                height: 13,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 35,
                backgroundColor: '#FBA834',
                marginLeft: 8,
              }}
              onPress={() => openRecipeUrl(recipe.recipe.url)}
            >
              <Text style={{ fontSize: 8, fontWeight: '500', color: 'white' }}>
                See More...
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
