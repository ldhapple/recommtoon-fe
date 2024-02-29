import { createApp } from 'vue'
import App from './Home.vue'
import router from './router'; // 라우터 설정 import

createApp(App).use(router).mount('#app')
