(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.get_my_layer = function() {
        // Get the current script context
        var ctx = this;
        // Return the layer of the sprite that the block is placed in
        return ctx.executor.sprite.layer;
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['r', 'my layer', 'get_my_layer']
        ]
    };

    // Register the extension
    ScratchExtensions.register('Get My Layer Extension', descriptor, ext);
})({});
