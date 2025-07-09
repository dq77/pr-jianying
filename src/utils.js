
export const setScreenSize = (elem) => {
  const box = document.getElementById('play-area')
  const height = box.offsetHeight
  const width = height*720/1280
  elem.style.width = `${width}px`
  elem.style.height = `${height}px`
}
export const loadFile = async (accept) => {
  const [fileHandle] = await window.showOpenFilePicker({ types: [{ accept }] });
  return (await fileHandle.getFile());
}


// 素材默认居中填充
export function calculateScaledSize(content) {
  const containerWidth = 720;
  const containerHeight = 1280;
  const contentWidth = content.width;
  const contentHeight = content.height;
  
  // 计算宽高比例
  const containerRatio = containerWidth / containerHeight;
  const contentRatio = contentWidth / contentHeight;
  
  let scaledWidth, scaledHeight, fitType;
  let scale;
  
  // 判断适配方式
  if (contentRatio > containerRatio) {
      // 宽度受限 - 以宽度为基准缩放
      fitType = 'width';
      scaledWidth = containerWidth;
      scaledHeight = containerWidth / contentRatio;
      scale = scaledWidth / contentWidth;
  } else {
      // 高度受限 - 以高度为基准缩放
      fitType = 'height';
      scaledHeight = containerHeight;
      scaledWidth = containerHeight * contentRatio;
      scale = scaledHeight / contentHeight;
  }
  
  // 计算居中位置
  const x = (containerWidth - scaledWidth) / 2;
  const y = (containerHeight - scaledHeight) / 2;
  
  return {
      w: scaledWidth,
      h: scaledHeight,
      x: x,
      y: y
  };
}

