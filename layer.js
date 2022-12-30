(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.get_layer = function(sprite) {
        // Return the current layer of the sprite
        return sprite.layer;
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['r', 'layer of %s', 'get_layer', 'Sprite1']
        ]
    };

    // Register the extension
    ScratchExtensions.register('Get Layer Extension', descriptor, ext);
})({});
