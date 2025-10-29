import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import LanguageSwitcher from './components/LanguageSwitcher';
import i18n from './i18n';
import './App.css';

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
          <h2 style={{ marginTop: 0 }}>使用说明</h2>
          <ul>
            <li>点击上方按钮切换语言</li>
            <li>语言切换无需刷新页面</li>
            <li>语言资源完全从远程 URL 加载</li>
            <li>当前支持中文和英文</li>
          </ul>
          
          <div style={{ marginTop: '20px', padding: '10px', background: '#f0f0f0', borderRadius: '4px' }}>
            <strong>调试信息：</strong><br/>
            当前语言: {i18n.language}<br/>
            title 翻译: {t('title')}<br/>
            greeting_morning 翻译: {t('greeting_morning')}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
