import { useTranslation } from 'react-i18next';
import { IconButton, Stack } from '@mui/material';

export function LanguageSelector() {
  const { i18n } = useTranslation();

  const onSelectLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem('lang', language);
  };

  return (
    <Stack direction="row" spacing={2} justifyContent="center">
      <IconButton onClick={() => onSelectLanguage('tr')}>
        <img
          src="https://flagcdn.com/24x18/tr.png"
          alt="Türkçe"
          width="24"
          height="18"
        />
      </IconButton>
      <IconButton onClick={() => onSelectLanguage('en')}>
        <img
          src="https://flagcdn.com/24x18/us.png"
          alt="English"
          width="24"
          height="18"
        />
      </IconButton>
    </Stack>
  );
}
