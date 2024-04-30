import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Button, ImageBackground, View, Text } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";
import { TouchableOpacity, GestureHandlerRootView } from "react-native-gesture-handler";

WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = () => {
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <GestureHandlerRootView >
      <ImageBackground style={{ height: '100%' }} resizeMode="cover" source={{ uri: 'https://th.bing.com/th/id/OIG2.mCsr6qJDxYxlHZi4lW4D?w=1024&h=1024&rs=1&pid=ImgDetMain' }}>
        <View style={{ padding: 15, justifyContent: 'center', flex: 1 }}>
          <View style={{}}>
            <Text style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
              fontFamily: 'monospace',
              lineHeight: 45,
            }}
            >
              Get
            </Text>
            <Text style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
              fontFamily: 'monospace',
              lineHeight: 45,
            }}
            >
              Delicious
            </Text>
            <Text style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
              fontFamily: 'monospace',
              lineHeight: 45,
            }}
            >
              Coffee
            </Text>
          </View>
          <View style={{marginTop: 150}}> 
            <TouchableOpacity onPress={onPress} style={{ backgroundColor: '#DC3535' }}>
              <Text style={{
                color: 'white',
                textAlign: 'center',
                padding: 10,
                fontSize: 20,
                fontWeight: 'bold',
              }}
              >
                Order Now
              </Text>
            </TouchableOpacity>
            <Text style={{ color: '#AEAEAE', textAlign: 'center', marginTop: 10 }}>
              Get Delicious Coffee Now and Enjoy the Best Coffee in the World with Yuryi Coffee App
            </Text>
          </View>
        </View>
      </ImageBackground>
    </GestureHandlerRootView >
  );
}
export default SignInWithOAuth;