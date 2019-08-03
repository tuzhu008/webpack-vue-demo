import Vue from 'vue';

const app = new Vue({
  el: '#app',
  data: {
    text: 'Hello webpack too too!'
  },
  template: '<div>{{ text }}</div>'
});