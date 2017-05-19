import AFRAME from 'aframe';

const minScale = 0.00000000000001;

AFRAME.registerComponent('animate-scale-out', {
  schema: {
    type: 'boolean',
  },

  tick() {
    if (this.data && this.el.object3D.scale.x > minScale) {
      this.el.object3D.scale.x -= 0.05;
      this.el.object3D.scale.y -= 0.05;

      if (this.el.object3D.scale.x < 0) {
        this.el.object3D.scale.x = minScale;
      }

      if (this.el.object3D.scale.y < 0) {
        this.el.object3D.scale.y = minScale;
      }

      if (this.el.object3D.scale.z < 0) {
        this.el.object3D.scale.z = minScale;
      }
    }
  },
});
