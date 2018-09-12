<template lang="html">
  <div id="notifications">
    <div class="notifsWrapper">
        <div class="notifWrapper" @click="deleteNotif(notif)" v-for="notif of notifications" :key="notif.uuid" 
          :ref="notif.uuid" 
          v-bind:class="{
            openNotif: !notif.deleting,
            deleteNotif: notif.deleting,
          }">
           <div class="notifContainer">
             <div class="title">{{notif.title}}</div>
             <div class="msg">{{notif.message}}</div>
           </div>
        </div>
    </div>
  </div>
</template>

<script lang="js">
  import events from "./events.js";
  import * as uuid from 'uuid/v4'
  export default  {
    name: 'notifications',
    props: [],
    mounted() {
      events.$on('add',this.add)
    },
    data() {
      return {
        notifications: []
      }
    },
    methods: {
      add (notif) {
        if(typeof notif === 'string') notif = {title:'', message: notif}
        notif.uuid = uuid()
        this.notifications.push(notif)
        setTimeout(() => this.deleteNotif(notif), notif.seconds || 3000);
      },
      deleteNotif(notif) {
        const index = this.notifications.indexOf(notif)
        this.notifications[index].deleting = true
        this.notifications = [...this.notifications]
        setTimeout(()=>{
          const index = this.notifications.indexOf(notif)
          this.notifications.splice(index, 1)
        }, 2000)
      }
    },
    computed: {
      notifsCount() {return this.notifications.length}
    }
  }
</script>

<style scoped lang="scss">
@import "../../common";

@keyframes openNotif {
  0% {
    max-height: 0;
  }
  to {
    max-height: 400px;
  }
}
@keyframes closeNotif {
  0% {
    max-height: 400px;
  }
  to {
    max-height: 0;
  }
}

#notifications {
  z-index: 100000;
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: flex-end;
  #closeAll {
    text-align: right;
    i {
      font-size: 1.7em;
      background-color: $mainColor;
      color: $mainTextColor;
      padding: 10px;
      box-shadow: 0 0 10px grey;
    }
  }
  .notifWrapper {
    animation-name: openNotif;
    animation-duration: 400ms;
    animation-fill-mode: forwards;
    overflow-y: hidden;
    box-shadow: 0 0 10px grey;
    margin-top: 10px;
    background-color: $mainColor;
    color: $mainTextColor;
    &.deleteNotif {
      animation-name: closeNotif;
      animation-duration: 400ms;
      animation-fill-mode: forwards;
    }
    .notifContainer {
      padding: 10px;
      width: 400px;
      .title,
      .msg {
        box-sizing: border-box;
        text-align: left;
      }
      .title {
        font-weight: bold;
        padding-bottom: 10px;
        width: 100%;
        border-bottom: 1px solid $mainTextColor;
      }
      .msg {
        padding-top: 10px;
        width: 100%;
      }
    }
  }
}
</style>
