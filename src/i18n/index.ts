import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 从远程加载语言资源
const loadRemoteTranslations = async () => {
  try {
    const response = await fetch('https://vision.xyb2b.com/black_test/prod/lang/data.json');
    // 添加3s的延迟
    await new Promise(resolve => setTimeout(resolve, 3000));
    const data = await response.json();
    console.log('Loaded remote translations:', data);
    
    // 转换数据格式：将 { zh_CN: {...} } 转换为 { zh_CN: { translation: {...} } }
    const resources: Record<string, { translation: Record<string, string> }> = {};
    Object.keys(data).forEach(lng => {
      if (data[lng] && Object.keys(data[lng]).length > 0) {
        resources[lng] = {
          translation: data[lng]
        };
      }
    });
    
    console.log('Formatted resources:', resources);
    return resources;
  } catch (error) {
    console.error('Failed to load remote translations:', error);
    throw error;
  }
};

// 初始化 i18n（完全使用远程数据）
const initI18n = async () => {
  try {
    const resources = await loadRemoteTranslations();
    
    await i18n
      .use(initReactI18next)
      .init({
        lng: 'zh_CN',
        fallbackLng: 'zh_CN',
        
        resources: resources,
        
        interpolation: {
          escapeValue: false,
        },
        
        react: {
          useSuspense: false
        }
      });
    
    console.log('i18n initialized with remote resources');
    console.log('Current language:', i18n.language);
    console.log('Test translation:', i18n.t('title'));
    return true;
  } catch (error) {
    console.error('Failed to initialize i18n:', error);
    throw error;
  }
};

// 创建初始化 Promise
export const i18nReady = initI18n();

export default i18n;

