function createProceduralTexture(width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");

  // Create a gradient background with darker shades
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#555555"); // Lighter dark grey
  gradient.addColorStop(1, "#777777"); // Lighter grey
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  // Add subtle noise for texture
  const imageData = context.getImageData(0, 0, width, height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = Math.random() * 20; // Reduced noise intensity for smoother texture
    data[i] += noise; // Red
    data[i + 1] += noise; // Green
    data[i + 2] += noise; // Blue
  }
  context.putImageData(imageData, 0, 0);

  return canvas;
}

export default createProceduralTexture;