import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { SignaturePlugin } from '@syncfusion/ej2-vue-inputs';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//  fontawesome
import '@fortawesome/fontawesome-free/js/all.js';

createApp(App).use(store).use(router).use(SignaturePlugin).mount('#app')
