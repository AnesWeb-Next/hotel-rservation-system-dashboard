import { useState, useCallback } from "react";

const TOAST_LIMIT = 3;
const TOAST_REMOVE_DELAY = 5000;

type ToastVariant = "default" | "destructive" | "success";

interface ToastData {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  action?: React.ReactNode;
}

interface ToastState {
  toasts: ToastData[];
}

let toastCount = 0;

function generateId(): string {
  toastCount = (toastCount + 1) % Number.MAX_SAFE_INTEGER;
  return toastCount.toString();
}

type ToastHandler = {
  toasts: ToastData[];
  toast: (props: Omit<ToastData, "id">) => string;
  dismiss: (toastId: string) => void;
  dismissAll: () => void;
};

const toastListeners: Array<(state: ToastState) => void> = [];
let toastState: ToastState = { toasts: [] };

function dispatch(state: ToastState): void {
  toastState = state;
  for (const listener of toastListeners) {
    listener(state);
  }
}

function addToast(toast: ToastData): void {
  dispatch({
    toasts: [toast, ...toastState.toasts].slice(0, TOAST_LIMIT),
  });

  setTimeout(() => {
    removeToast(toast.id);
  }, TOAST_REMOVE_DELAY);
}

function removeToast(toastId: string): void {
  dispatch({
    toasts: toastState.toasts.filter((t) => t.id !== toastId),
  });
}

function removeAllToasts(): void {
  dispatch({ toasts: [] });
}

export function toast(props: Omit<ToastData, "id">): string {
  const id = generateId();
  addToast({ ...props, id });
  return id;
}

export function useToast(): ToastHandler {
  const [state, setState] = useState<ToastState>(toastState);

  const subscribe = useCallback((listener: (state: ToastState) => void) => {
    toastListeners.push(listener);
    return () => {
      const index = toastListeners.indexOf(listener);
      if (index > -1) {
        toastListeners.splice(index, 1);
      }
    };
  }, []);

  useState(() => {
    return subscribe(setState);
  });

  return {
    toasts: state.toasts,
    toast,
    dismiss: removeToast,
    dismissAll: removeAllToasts,
  };
}
