import Vue from 'vue'
import moment from 'moment'

moment.locale('fr');
Vue.filter('formatDate', (date) => {
  return moment(date).format('D MMMM YYYY')
})
