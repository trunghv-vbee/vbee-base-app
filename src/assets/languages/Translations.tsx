import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useCallback, useEffect, useState} from 'react';
import * as RNLocalize from 'react-native-localize';
import strings from 'assets/strings';

const DEFAULT_LANGUAGE = 'vi';
const APP_LANGUAGE = 'appLanguage';

interface Props {
  children: React.ReactNode;
}

// This is strings resource that includes multi languages
export const translations = strings;

export const LocalizationContext = createContext({
  translations,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setAppLanguage: (language: string) => {},
  getAppLanguage: () => {},
  appLanguage: DEFAULT_LANGUAGE,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  initializeAppLanguage: (initLanguageCallback: () => void) => {},
});

export const LocalizationProvider = ({children}: Props) => {
  const initLanguageCallBack = () => {};

  const [appLanguage, setAppLanguage] = useState(DEFAULT_LANGUAGE);

  const setLanguage = async (language: string) => {
    try {
      translations.setLanguage(language);
      setAppLanguage(language);
      await AsyncStorage.setItem(APP_LANGUAGE, language);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  /**
   * Return current app language
   */
  const getLanguage = async () => AsyncStorage.getItem(APP_LANGUAGE);

  /**
   * Using to initialize language
   * - If used for the first time will check current mobile language and setup app language to mobile language
   * - If used for seconds time will setup by lastest app language
   * @param {The callback method when language setup is finished} initLanguageCallback
   */
  const initializeAppLanguage = useCallback(
    async (initLanguageCallback: () => void) => {
      const currentLanguage = await AsyncStorage.getItem(APP_LANGUAGE);
      if (currentLanguage) {
        await setLanguage(currentLanguage);
      } else {
        let localeCode = DEFAULT_LANGUAGE;
        const supportedLocaleCodes = translations.getAvailableLanguages();
        const phoneLocaleCodes = RNLocalize.getLocales().map(
          locale => locale.languageCode,
        );
        phoneLocaleCodes.some(code => {
          if (supportedLocaleCodes.includes(code)) {
            localeCode = code;
            return true;
          }
          return false;
        });
        await setLanguage(localeCode);
      }
      // callback when language is set
      initLanguageCallback();
    },
    [],
  );

  useEffect(() => {
    initializeAppLanguage(initLanguageCallBack);
  }, [initializeAppLanguage]);

  return (
    <LocalizationContext.Provider
      value={{
        translations,
        setAppLanguage: setLanguage,
        getAppLanguage: getLanguage,
        appLanguage,
        initializeAppLanguage,
      }}>
      {children}
    </LocalizationContext.Provider>
  );
};
