export type ClipboardStatus = {
    value: string | null;
    copy: (text: string) => void;
    clear: () => void;
};
/**
 * Manages the clipboard state and provides functions to interact with it.
 * NOTE: This hook relies on the Clipboard API, which currently has limited browser support.
 * It also requires HTTPS to work in modern browsers.
 *
 * Clipboard API: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
 *
 * @returns {ClipboardStatus} - The clipboard status and functions to interact with it.
 */
declare const useClipboard: () => ClipboardStatus;
export default useClipboard;
