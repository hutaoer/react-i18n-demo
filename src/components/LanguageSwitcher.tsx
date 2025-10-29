import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ marginBottom: '20px', padding: '20px', background: '#f5f5f5' }}>
      <h3 style={{ marginTop: 0 }}>语言切换</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={() => changeLanguage('zh_CN')}
          style={{
            padding: '8px 16px',
            background: i18n.language === 'zh_CN' ? '#1890ff' : '#fff',
            color: i18n.language === 'zh_CN' ? '#fff' : '#000',
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: i18n.language === 'zh_CN' ? 'bold' : 'normal'
          }}
        >
          中文
        </button>
        <button
          onClick={() => changeLanguage('en_US')}
          style={{
            padding: '8px 16px',
            background: i18n.language === 'en_US' ? '#1890ff' : '#fff',
            color: i18n.language === 'en_US' ? '#fff' : '#000',
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: i18n.language === 'en_US' ? 'bold' : 'normal'
          }}
        >
          English
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;

