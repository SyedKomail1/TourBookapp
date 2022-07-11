import React from 'react';
import { Share, View, Button,TouchableOpacity,Text } from 'react-native';

const Shared = () => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Join me on Tour Book ',
          url: 'tourbook.com',
          title: 'Share'
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    } 
  };
  return (
    <View style={{ marginTop: 50 }}>

<TouchableOpacity onPress={onShare}  style={{
          alignSelf:'center',
          flexDirection: 'row',
          justifyContent:'center',
          backgroundColor: '#fff',
          width: '90%',
          padding:20,
          paddingBottom: 22,
          borderRadius:10,
          shadowopacity:80,
          elevation:15,
          margin:-30
          
          }}  >
              <Text  >Share</Text>
</TouchableOpacity>
    </View>
  );
};

export default Shared;