export const useConfirm = (message, onConfirm, onCancel = () => {}) => {
  return () => (window?.confirm(message) ? onConfirm() : onCancel());
};
