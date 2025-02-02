export const handleAnimationComplete = async (duration = 600) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration); // Match the duration of the exit animation (adjust as needed)
  });
};

export const zoom = {
  hidden: {
    transform: "scale(0)",
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  },
  visible: {
    transform: "scale(1)",
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    transform: "scale(0)",
    opacity: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export const handleClose = async (
  e: React.MouseEvent,
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>,
  onClose: () => void,
) => {
  e.stopPropagation();
  setIsVisible(false);

  await handleAnimationComplete(500); // You can also make the duration customizable
  onClose();
};

export const handlePopoverClick = (e: React.MouseEvent) => {
  e.stopPropagation();
};
