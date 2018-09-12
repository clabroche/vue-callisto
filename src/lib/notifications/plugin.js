import Notifications from "./notifications.vue";
import events from "./events";
export default {
  install(Vue) {
    Vue.component('notifs', Notifications)
    Vue.prototype.$notifs = {
      add: (title, message,seconds) => events.$emit('add', {
        title, message, seconds
      })
    }
  }
};