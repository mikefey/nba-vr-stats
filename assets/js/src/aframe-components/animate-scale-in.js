import AFRAME from 'aframe';

AFRAME.registerComponent('animate-scale-in', {
  schema: {
    type: 'boolean',
  },

  tick() {
    if (this.data && this.el.object3D.scale.x < 1) {
      this.el.object3D.scale.x += 0.05;
      this.el.object3D.scale.y += 0.05;
      this.el.object3D.scale.z += 0.05;

      if (this.el.object3D.scale.x > 1) {
        this.el.object3D.scale.x = 1;
      }

      if (this.el.object3D.scale.y > 1) {
        this.el.object3D.scale.y = 1;
      }

      if (this.el.object3D.scale.z > 1) {
        this.el.object3D.scale.z = 1;
      }
    }
  },
});
