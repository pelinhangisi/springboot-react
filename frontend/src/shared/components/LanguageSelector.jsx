import { useTranslation } from 'react-i18next';

export function LanguageSelector() {
  const { i18n } = useTranslation();

  const onSelectLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem('lang', language);
  };
  return (
    <>
      <img
        src="https://flagcdn.com/24x18/tr.png"
        role="button"
        width="16"
        height="12"
        alt="Türkçe"
        onClick={() => onSelectLanguage('tr')}></img>

      <img
        src="https://flagcdn.com/24x18/us.png"
        role="button"
        width="16"
        height="12"
        alt="İngilizce"
        onClick={() => onSelectLanguage('en')}></img>
    </>
  );
}
