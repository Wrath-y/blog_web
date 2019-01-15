
import Vue from 'vue';
import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';

Vue.use(Viewer);
Viewer.setDefaults({
  Options: {
      "button": true,
      "navbar": true,
      "toolbar": true,
      "tooltip": true,
      "zoomable": true,
      "rotatable": true,
      "transition": true,
      "fullscreen": true,
      "keyboard": true,
      "url": "data-resource"
    }
});