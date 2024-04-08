export type UndoRedoState<T> = {
    actions: T[];
    redo: () => void;
    undo: () => void;
    takeAction: (a: T) => void;
    clearActions: () => void;
};
/**
 * Manages a stack of user actions to undo/redo
 *
 * @returns {UndoRedoState}
 */
declare const useUndoRedo: <T>() => UndoRedoState<T>;
export default useUndoRedo;
