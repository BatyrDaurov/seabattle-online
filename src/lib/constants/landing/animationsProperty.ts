export const animationsVariants = (
  direction: 'row' | 'column',
  comeFrom: 'top' | 'bottom' | 'left' | 'right'
) => {
  if (direction === 'row') {
    return {
      hidden: { opacity: 0, x: comeFrom === 'left' ? -50 : 50 },
      visible: { opacity: 1, x: 0 },
    }
  } else {
    return {
      hidden: { opacity: 0, y: comeFrom === 'top' ? -100 : 100 },
      visible: { opacity: 1, y: 0 },
    }
  }
}
