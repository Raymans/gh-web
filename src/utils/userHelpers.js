import { navigate } from 'gatsby-link';
import { changeLocale } from 'gatsby-plugin-intl';

export default function changeUILocale(locale) {
  if (locale === 'zh-TW') {
    navigate(location.pathname.replace('/en/', '/') + location.search);
  } else {
    changeLocale(locale);
  }
}
