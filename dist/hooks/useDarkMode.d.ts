/**
 * Dark mode state and toggle function
 */
export type DarkModeUsage = {
    isDarkMode: boolean;
    setIsDarkMode: (dark: boolean) => void;
};
/**
 * A hook to manage dark mode state. The document root will also be given a dark-mode class when dark mode is enabled.
 * @param {boolean} initiallyDark - Whether or not dark mode should be enabled by default. If not set, the user's system-wide dark mode preference will be defaulted to.
 * @returns - An array containing the current dark mode state and a function to toggle dark mode.
 */
declare const useDarkMode: (initiallyDark?: boolean) => DarkModeUsage;
export default useDarkMode;
