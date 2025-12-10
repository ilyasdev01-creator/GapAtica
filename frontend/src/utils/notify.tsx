import { toast, ToastOptions } from "react-toastify";

const baseOptions: ToastOptions = {
  autoClose: 3000,
  pauseOnHover: true,
  closeOnClick: true,
};

export const notify = {
  success: (message: string, title?: string, opts?: ToastOptions) =>
    toast.success(title ? `${title} — ${message}` : message, {
      ...baseOptions,
      ...opts,
    }),
  error: (message: string, title?: string, opts?: ToastOptions) =>
    toast.error(title ? `${title} — ${message}` : message, {
      ...baseOptions,
      ...opts,
    }),
  info: (message: string, title?: string, opts?: ToastOptions) =>
    toast.info(title ? `${title} — ${message}` : message, {
      ...baseOptions,
      ...opts,
    }),
  warn: (message: string, title?: string, opts?: ToastOptions) =>
    toast.warn(title ? `${title} — ${message}` : message, {
      ...baseOptions,
      ...opts,
    }),
};

export default notify;
