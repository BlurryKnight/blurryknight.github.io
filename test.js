class DiscordRichPresenceExtension {
  // Tell Scratch about the extension
  getInfo() {
    return {
      id: 'discordrichpresence',
      name: 'Discord Rich Presence',
      blocks: [
        {
          opcode: 'updatePresence',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Update Discord presence with [DETAILS] and [STATE]'
        }
      ]
    };
  }

  // Define the updatePresence method
  updatePresence(args) {
    // Get the details and state from the block arguments
    const details = args.DETAILS;
    const state = args.STATE;

    // Use the electron-store package to get the user's client ID
    // If it's not stored yet, prompt the user to enter it
    const Store = require('electron-store');
    const store = new Store();
    let clientId = store.get('clientId');
    if (!clientId) {
      clientId = window.prompt('Please enter your Discord client ID:');
      store.set('clientId', clientId);
    }

    // Use the Discord Rich Presence API to update the user's presence
    const Discord = require('discord-rpc');
    const client = new Discord.Client({ transport: 'ipc' });

    client.on('ready', () => {
      client.setActivity({
        details: details,
        state: state
      });
    });

    client.login({ clientId: clientId });
  }
}

// Register the extension
Scratch.extensions.register(new DiscordRichPresenceExtension());