(function (Scratch) {
  'use strict';

  const LAYER = Symbol('layer');

  /**
   * @param {VM.RenderedTarget} target
   */
  const implementLayerForTarget = (target, originalTarget) => {
    target[LAYER] = originalTarget ? originalTarget[LAYER] : 0;

    const original = target._getRenderOrder;
    target._getRenderOrder = function () {
      return this[LAYER];
    };
  };

  const vm = Scratch.vm;
  vm.runtime.targets.forEach((target) => implementLayerForTarget(target));
  vm.runtime.on('targetWasCreated', (target, originalTarget) => implementLayerForTarget(target, originalTarget));
  vm.runtime.on('PROJECT_LOADED', () => {
    vm.runtime.targets.forEach((target) => implementLayerForTarget(target));
  });

  class Layer {
    getInfo() {
      return {
        id: 'layer',
        name: 'Layer',
        color1: '#4287f5',
        color2: '#2b62ba',
        color3: '#204785',
        blocks: [
          {
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
          {
            opcode: 'getLayer',
            blockType: Scratch.BlockType.REPORTER,
            text: 'layer',
            disableMonitor: true,
          },
        ],
      };
    }
    setLayer(args, util) {
      // TODO: move to Scratch.Cast when it's merged
      util.target[LAYER] = +args.LAYER || 0;
    }
    getLayer(args, util) {
      return util.target[LAYER];
    }
  }

  Scratch.extensions.register(new Layer());
})(Scratch);
