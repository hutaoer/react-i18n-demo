import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 从远程加载语言资源
const loadRemoteTranslations = async () => {
  try {
    // 加载两个不同的语言包
    const [testResponse, commonResponse] = await Promise.all([
      fetch('https://vision.xyb2b.com/black_test/prod/lang/data.json'),
      fetch('https://vision.xyb2b.com/black_common/prod/lang/data.json')
    ]);
    
    const testData = await testResponse.json();
    const commonData = await commonResponse.json();
    
    console.log('Loaded test translations:', testData);
    console.log('Loaded common translations:', commonData);
    
    // 转换数据格式：支持多个命名空间
    const resources: Record<string, Record<string, Record<string, string>>> = {};
    
    // 处理 test 命名空间
    Object.keys(testData).forEach(lng => {
      if (testData[lng] && Object.keys(testData[lng]).length > 0) {
        if (!resources[lng]) resources[lng] = {};
        resources[lng].test = testData[lng];
      }
    });
    
    // 处理 common 命名空间
    Object.keys(commonData).forEach(lng => {
      if (commonData[lng] && Object.keys(commonData[lng]).length > 0) {
        if (!resources[lng]) resources[lng] = {};
        resources[lng].common = commonData[lng];
      }
    });
    
    console.log('Formatted resources with namespaces:', resources);
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
        
        // 支持多个命名空间
        ns: ['test', 'common'],
        defaultNS: 'test',
        
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
    console.log('Available namespaces:', i18n.options.ns);
    console.log('Test translation:', i18n.t('title', { ns: 'test' }));
    console.log('Common translation:', i18n.t('title', { ns: 'common' }));
    return true;
  } catch (error) {
    console.error('Failed to initialize i18n:', error);
    throw error;
  }
};

// 创建初始化 Promise
export const i18nReady = initI18n();

export default i18n;

