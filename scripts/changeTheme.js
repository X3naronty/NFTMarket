const themeCache = 'color-theme-preference';
var themeSwitchButton;

const getColorPreference = () => {
  if (localStorage.themeCache) return localStorage.themeCache;
  else
    return window.matchMedia('(prefers-color-theme: dark)').matches
      ? 'dark'
      : 'light';
};

const theme = {
  value: getColorPreference(),
};

const reflectPreference = () => {
  document.documentElement.setAttribute('data-theme', theme.value);
  themeSwitchButton?.setAttribute('aria-label', theme.value);
};

const setPreference = () => {
  localStorage.themeCache = theme.value;
  reflectPreference();
};

reflectPreference();

window.onload = () => {
  themeSwitchButton = document.querySelector('.theme-button');
  reflectPreference();
  themeSwitchButton.onclick = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';

    setPreference();
  };
};

window.matchMedia('(prefers-color-scheme: dark)').onchange = ({
  matches: isDark,
}) => {
  theme.value = isDark ? 'dark' : 'light';
  setPreference();
};
