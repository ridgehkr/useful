/**
 * Manages a stack of user actions to undo/redo
 *
 * @returns { actions: T[], redo: () => void, undo: () => void, takeAction: (a: T) => void, clearActions: () => void }
 */
declare const useUndoRedo: <T>() => {
    actions: T[];
    redo: () => void;
    undo: () => void;
    takeAction: (a: T) => void;
    clearActions: () => void;
};
export default useUndoRedo;
