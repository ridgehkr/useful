type ElementSize = {
    width: number;
    height: number;
};
declare const useElementSize: (ref: React.RefObject<HTMLElement>) => ElementSize;
export default useElementSize;
