import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { i18nReady } from './i18n';
import './index.css';

// 显示加载提示
const loadingElement = document.createElement('div');
loadingElement.id = 'loading';
loadingElement.style.cssText = `
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 18px;
  color: #666;
`;
loadingElement.textContent = '正在从远程加载语言资源...';
document.getElementById('root')!.appendChild(loadingElement);

// 等待 i18n 初始化完成后再渲染应用
i18nReady.then(() => {
  // 移除加载提示
  const loading = document.getElementById('loading');
  if (loading) {
    loading.remove();
  }
  
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}).catch((error) => {
  console.error('Failed to initialize i18n:', error);
  // 移除加载提示
  const loading = document.getElementById('loading');
  if (loading) {
    loading.remove();
  }
  
  // 即使失败也渲染应用，显示错误信息
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#ff0000'
      }}>
        加载语言资源失败，请检查网络连接
      </div>
    </React.StrictMode>,
  );
});

