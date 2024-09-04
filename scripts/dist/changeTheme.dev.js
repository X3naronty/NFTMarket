"use strict";

var themeCache = 'color-theme-preference';
var themeSwitchButton;

var getColorPreference = function getColorPreference() {
  if (localStorage.themeCache) return localStorage.themeCache;else return window.matchMedia('(prefers-color-theme: dark)').matches ? 'dark' : 'light';
};

var theme = {
  value: getColorPreference()
};

var reflectPreference = function reflectPreference() {
  document.documentElement.setAttribute('data-theme', theme.value);
  themeSwitchButton.setAttribute('aria-label', theme.value);
};

var setPreference = function setPreference() {
  localStorage.themeCache = theme.value;
  reflectPreference();
};

window.onload = function () {
  themeSwitchButton = document.querySelector('.theme-button');
  reflectPreference();

  themeSwitchButton.onclick = function () {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
    setPreference();
  };
};

window.matchMedia('(prefers-color-scheme: dark)').onchange = function (_ref) {
  var isDark = _ref.matches;
  theme.value = isDark ? 'dark' : 'light';
  setPreference();
};
//# sourceMappingURL=changeTheme.dev.js.map
