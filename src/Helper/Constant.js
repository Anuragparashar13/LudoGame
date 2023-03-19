


export const asyncKeys = {
  keyAppLanguage: 'save_language',
  keyUserId: 'userId',
};

export class globalVariables {
  static keyAppLanguageGlobal = 'en';
  static token = '';
}

readData = async () => {
  try {
    globalVariables.keyAppLanguageGlobal = await AsyncStorage.getItem('save_language');
  } catch (e) {
    alert('Failed to fetch the data from storage')
  }

 
}

export default {
  asyncKeys,
  globalVariables,
};
