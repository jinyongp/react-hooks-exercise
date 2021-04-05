const useNotification = (title, options) => {
  // if (!(Notification in window)) return;
  return async () => {
    if (Notification.permission !== "granted") {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") return;
    }
    new Notification(title, options);
  };
};

export default useNotification;
