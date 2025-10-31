import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import LanguageSwitcher from './components/LanguageSwitcher';
import i18n from './i18n';
import './App.css';

// Test 命名空间组件
const TestNamespace = () => {
  const { t } = useTranslation('test');
  return (
    <div style={{ padding: '10px', background: '#e6f7ff', borderRadius: '4px', marginBottom: '10px' }}>
      <strong>Test 命名空间:</strong> {t('title')} - {t('greeting_morning')}
    </div>
  );
};

// Common 命名空间组件
const CommonNamespace = () => {
  const { t } = useTranslation('common');
  return (
    <div style={{ padding: '10px', background: '#f6ffed', borderRadius: '4px' }}>
      <strong>Common 命名空间:</strong> {t('common')} {t('title')}
    </div>
  );
};

function App() {
  const { t, ready } = useTranslation();

  // 监听 i18n 初始化状态变化（可选，用于调试）
  useEffect(() => {
    console.log('ready', ready);
    const handleInitialized = () => {
      console.log('i18n initialized, current language:', i18n.language);
      console.log('Test translation:', i18n.t('title'));
    };

    if (i18n.isInitialized) {
      handleInitialized();
    } else {
      // 监听 i18n 的初始化事件
      i18n.on('initialized', handleInitialized);
      return () => {
        i18n.off('initialized', handleInitialized);
      };
    }
  }, [ready]);

  // 使用 ready 属性判断是否准备好（react-i18next 提供的标准方式）
  if (!ready) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        正在从远程加载语言资源...
      </div>
    );
  }

  return (
    <div>
      <LanguageSwitcher />
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1>{t('title')}</h1>
        <p style={{ fontSize: '18px', color: '#666' }}>{t('greeting_morning')}</p>
        
        <div style={{
          marginTop: '40px',
          padding: '20px',
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginTop: 0 }}>命名空间演示</h2>
          
          <div style={{ marginBottom: '20px' }}>
            <h3>Test 命名空间（默认）:</h3>
            <p>标题: {t('title', { ns: 'test' })}</p>
            <p>问候: {t('greeting_morning', { ns: 'test' })}</p>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <h3>Common 命名空间:</h3>
            <p>标题: {t('title', { ns: 'common' })}</p>
            <p>问候: {t('greeting_morning', { ns: 'common' })}</p>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <h3>使用 useTranslation 指定命名空间:</h3>
            <TestNamespace />
            <CommonNamespace />
          </div>
          
          <div style={{ marginTop: '20px', padding: '10px', background: '#f0f0f0', borderRadius: '4px' }}>
            <strong>调试信息：</strong><br/>
            当前语言: {i18n.language}<br/>
            可用命名空间: {Array.isArray(i18n.options.ns) ? i18n.options.ns.join(', ') : i18n.options.ns}<br/>
            默认命名空间: {i18n.options.defaultNS}<br/>
            title 翻译 (test): {t('title', { ns: 'test' })}<br/>
            title 翻译 (common): {t('title', { ns: 'common' })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
