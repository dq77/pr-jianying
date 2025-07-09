const BASE_URL = 'https://webav-tech.github.io/WebAV';
export function assetsPrefix(
  assetsURL,
) {
  const base =
    window.location.hostname.includes('webcontainer.io') ||
    window.location.hostname.includes('stackblitz.io') ||
    window.location.hostname.includes('csb.app')
      ? BASE_URL
      : '';
  const prefix = process.env.NODE_ENV === 'development' ? '/' : '/WebAV/';
  if (Array.isArray(assetsURL)) {
    return assetsURL.map((url) => `${base}${prefix}${url}`);
  }

  return Object.fromEntries(
    Object.entries(assetsURL).map(([k, v]) => [k, `${base}${prefix}${v}`]),
  );
}

export async function createFileWriter(
  extName = 'mp4',
){
  const fileHandle = await window.showSaveFilePicker({
    suggestedName: `WebAV-export-${Date.now()}.${extName}`,
  });
  return fileHandle.createWritable();
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
