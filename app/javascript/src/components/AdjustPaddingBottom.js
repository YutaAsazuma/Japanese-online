const AdjustPaddingBottom = () => {
  const grid = document.querySelector('.product-grid');
  if(!grid) return;
  let maxHeight = 0;
  grid.childNodes.forEach((child) => {
    maxHeight = child.offsetHeight ;
  });
  grid.style.paddingBottom = `${maxHeight}px`;
}

export default AdjustPaddingBottom;
