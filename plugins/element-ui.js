import Vue from 'vue'
import {
  Loading,
  Message,
  Card,
  Button,
} from 'element-ui';

export default () => {
  Vue.use(Loading.directive);
  Vue.use(Card);
  Vue.use(Button);
  Vue.prototype.$message = Message;
}
