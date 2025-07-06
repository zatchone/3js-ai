// Enhanced download function with more options
export const downloadCanvasToImage = (filename = "custom-shirt", format = "png", quality = 1.0) => {
  const canvas = document.querySelector("canvas");
  
  if (!canvas) {
    alert("No canvas found! Please wait for the 3D model to load.");
    return;
  }

  // Set higher resolution for better quality
  const originalWidth = canvas.width;
  const originalHeight = canvas.height;
  
  // Create a temporary canvas with higher resolution
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  
  // Scale up for better quality (2x resolution)
  const scale = 2;
  tempCanvas.width = originalWidth * scale;
  tempCanvas.height = originalHeight * scale;
  
  // Draw the original canvas onto the temporary canvas with scaling
  tempCtx.scale(scale, scale);
  tempCtx.drawImage(canvas, 0, 0);
  
  // Generate the data URL with specified format and quality
  const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
  const dataURL = tempCanvas.toDataURL(mimeType, quality);
  
  // Create download link
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = `${filename}_${new Date().toISOString().slice(0, 10)}.${format}`;
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up
  tempCanvas.remove();
};

// Alternative download function with custom dimensions
export const downloadCanvasWithDimensions = (width = 1024, height = 1024, filename = "custom-shirt") => {
  const canvas = document.querySelector("canvas");
  
  if (!canvas) {
    alert("No canvas found! Please wait for the 3D model to load.");
    return;
  }

  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  
  tempCanvas.width = width;
  tempCanvas.height = height;
  
  // Draw the original canvas with custom dimensions
  tempCtx.drawImage(canvas, 0, 0, width, height);
  
  const dataURL = tempCanvas.toDataURL('image/png');
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = `${filename}_${width}x${height}.png`;
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  tempCanvas.remove();
};

export const reader = (file) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.readAsDataURL(file);
  });

export const getContrastingColor = (color) => {
  // Remove the '#' character if it exists
  const hex = color.replace("#", "");

  // Convert the hex string to RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate the brightness of the color
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return black or white depending on the brightness
  return brightness > 128 ? "black" : "white";
};