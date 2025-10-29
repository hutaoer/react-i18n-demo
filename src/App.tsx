import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './components/LanguageSwitcher';
import './App.css';

function App() {
  const { t } = useTranslation();

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
            <li>语言资源从远程 URL 加载</li>
            <li>当前支持中文和英文</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

