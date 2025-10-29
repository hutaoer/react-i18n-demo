import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: 'zh_CN', // 默认语言
    fallbackLng: 'zh_CN',
    
    interpolation: {
      escapeValue: false, // React 已经转义，不需要再次转义
    },
    
    backend: {
      loadPath: 'https://vision.xyb2b.com/black_test/prod/lang/data.json',
      parse: (data: string) => {
        const parsed = JSON.parse(data);
        return parsed;
      }
    },
    
    react: {
      useSuspense: false
    }
  });

export default i18n;

