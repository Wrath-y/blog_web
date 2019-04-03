import Vue from 'vue'
import {
  Loading,
  Message,
  Card,
  Button,
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Loading.directive);
Vue.use(Card);
Vue.use(Button);
Vue.prototype.$message = Message;
