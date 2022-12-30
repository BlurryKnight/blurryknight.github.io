(function (Scratch) {
  'use strict';

  // Define a function to implement the layer behavior for a target
  const implementLayerForTarget = (target, originalTarget) => {
    // Define a symbol to store the layer value for each target
    const LAYER = Symbol('layer');

    // Initialize the layer value for the target
    target[LAYER] = originalTarget ? originalTarget[LAYER] : 0;

    // Override the _getRenderOrder method to return the target's layer value
    const original = target._getRenderOrder;
    target._getRenderOrder = function () {
      return this[LAYER];
    };
  };

  // Wait for the Scratch.VM object to be defined
  window.addEventListener('scratchLoaded', () => {
    // Get a reference to the vm object
    const vm = new Scratch.VM();

    // Implement the layer behavior for all existing targets
    vm.runtime.targets.forEach((target) => implementLayerForTarget(target));

    // Implement the layer behavior for any new targets that are created
    vm.runtime.on('targetWasCreated', (target, originalTarget) => implementLayerForTarget(target, originalTarget));

    // Implement the layer behavior for all targets when a project is loaded
    vm.runtime.on('PROJECT_LOADED', () => {
      vm.runtime.targets.forEach((target) => implementLayerForTarget(target));
    });

    // Define the extension's blocks
    const blocks = {
      setLayer: {
        opcode: 'setLayer',
        blockType: Scratch.BlockType.COMMAND,
        text: 'set layer to [LAYER]',
        arguments: {
          LAYER: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: 0,
          },
        },
      },
      getLayer: {
        opcode: 'getLayer',
        blockType: Scratch.BlockType.REPORTER,
        text: 'layer',
        disableMonitor: true,
      },
    };

    // Define the extension's functions
    const functions = {
      setLayer: function (args, util) {
        // Set the target's layer value to the specified value
        util.target[LAYER] = +args.LAYER || 0;
      },
      getLayer: function (args, util) {
        // Return the target's layer value
        return util.target[LAYER];
      },
    };

    // Register the extension
    Scratch.extensions.register(new Scratch.Extension(blocks, functions));
  });
})(Scratch);
