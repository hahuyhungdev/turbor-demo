// Utility function to calculate offsetX and offsetY
const calculateOffset = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): { offsetX: number; offsetY: number } => {
  const rect = event.currentTarget.getBoundingClientRect()

  const offsetX = event.pageX - (rect.x + window.scrollX)
  const offsetY = event.pageY - (rect.y + window.scrollY)
  return { offsetX, offsetY }
}

// Utility function to handle image zoom
const handleZoom = (
  event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  imageRef: React.RefObject<HTMLImageElement>
) => {
  const { naturalHeight, naturalWidth } = imageRef.current as HTMLImageElement
  const { offsetX, offsetY } = calculateOffset(event)
  const rect = event.currentTarget.getBoundingClientRect()

  const top = offsetY * (1 - naturalHeight / rect.height)
  const left = offsetX * (1 - naturalWidth / rect.width)
  const image = imageRef.current as HTMLImageElement
  image.style.width = naturalWidth + 'px'
  image.style.height = naturalHeight + 'px'
  image.style.maxWidth = 'unset'
  image.style.top = top + 'px'
  image.style.left = left + 'px'
}

// Utility function to remove zoom
const handleRemoveZoom = (imageRef: React.RefObject<HTMLImageElement>) => {
  const image = imageRef.current
  if (image) {
    image.removeAttribute('style')
  }
}

export { calculateOffset, handleZoom, handleRemoveZoom }
