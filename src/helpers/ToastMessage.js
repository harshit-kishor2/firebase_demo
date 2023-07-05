const showToast = ({
  title,
  type = 'normal',
  position = 'bottom',
  duration = 4000,
}) => {
  toast.hideAll();
  if (title == 'undefined') {
  } else {
    toast.show(title ?? 'Please provide a toast message.', {
      type: type,
      placement: position,
      duration: duration,
      offset: 30,
      animationType: 'zoom-in',
    });
  }
};

const ToastMessage = {showToast};
export default ToastMessage;

// type: "normal | success | warning | danger | custom",
// animationType: "slide-in | zoom-in",
