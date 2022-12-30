(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.set_layer = function(sprite, layer) {
        // Set the layer of the sprite to the specified value
        sprite.layer = layer;
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            [' ', 'set layer of %s to %n', 'set_layer', 'Sprite1', 1]
        ]
    };

    // Register the extension
    ScratchExtensions.register('Set Layer Extension', descriptor, ext);
})({});
