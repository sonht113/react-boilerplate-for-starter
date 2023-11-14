import { create } from 'zustand';

type ThemeStore = {
  theme: 'dark' | 'light';
  setTheme: (_: { theme: ThemeStore['theme'] }) => void;
};

const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
  ? 'dark'
  : 'light';
const userTheme = localStorage.getItem('theme') as ThemeStore['theme'];

const useThemeStore = create<ThemeStore>()((set) => ({
  theme: userTheme || 'dark' || systemTheme,
  setTheme: ({ theme }: { theme: ThemeStore['theme'] }) => {
    const body = document.body;

    if (theme === 'dark') {
      if (!body.hasAttribute('class')) {
        body.setAttribute('class', 'dark');
      }
    } else {
      if (body.hasAttribute('class')) {
        body.removeAttribute('class');
      }
    }

    set({
      theme,
    });
  },
}));

export default useThemeStore;
