interface IdleTimeoutOptions {
    timeout: number;
    onIdle: () => void;
}
declare const useIdleTimeout: ({ timeout, onIdle }: IdleTimeoutOptions) => boolean;
export default useIdleTimeout;
