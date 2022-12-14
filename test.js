class MyExtension {
  getInfo() {
    return {
      id: 'myextensionexample',
      name: 'Cool Extension',
      blocks: [
        {
          opcode: 'sayHello',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Say Hello'
        },
        {
          opcode: 'clearScreen',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Clear Screen'
        }
      ]
    };
  }

  sayHello() {
    // Create a new div element
    let div = document.createElement('div');
    // Set the text to display
    div.innerText = 'Hello, world!';
    // Style the div so it's positioned in the corner of the screen
    div.style.position = 'absolute';
    div.style.top = 0;
    div.style.right = 0;
    // Append the div to the body of the page
    document.body.appendChild(div);
  }

  clearScreen() {
    // Select all div elements on the page
    let divs = document.querySelectorAll('div');
    // Remove each div
    divs.forEach(div => div.remove());
  }
}

Scratch.extensions.register(new MyExtension());
