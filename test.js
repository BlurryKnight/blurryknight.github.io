class ScreenshotExtension {
  getInfo() {
    return {
      id: 'screenshot',
      name: 'Screenshot',
      blocks: [
        {
          opcode: 'screenshot',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Take Screenshot'
        }
      ]
    };
  }

  screenshot() {
    // Use the HTML5 Canvas API to create a screenshot of the current screen
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.drawImage(document.body, 0, 0);

    // Generate a download link for the screenshot
    const link = document.createElement('a');
    link.download = 'screenshot.png';
    link.href = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');

    // Download the screenshot by simulating a click on the download link
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

Scratch.extensions.register(new ScreenshotExtension());
