import i18next from 'i18next';
import Routes from '@constants/routes';

// TODO: Replace here the screens titles

i18next.addResources('es', 'app', {
  es: {
    [Routes.Login]: 'Login',
    [Routes.Tab1]: 'Tab 1',
    [Routes.Tab2]: 'Tab 2',
    [Routes.Home]: 'Home'
  }
});
