import AsyncStorage from "@react-native-async-storage/async-storage";

export const asyncStoreKeys = {
    store: "@localStore"
}

export default {
    storeData: async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            // saving error
            console.log("error")
        }
    },
    getData: async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    },
    removeValue : async (key) => {
        try {
          await AsyncStorage.removeItem(key)
        } catch(e) {
          // remove error
        }
      
        console.log('Done.')
      }
}