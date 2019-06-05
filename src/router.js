import Vue from 'vue'
import Router from 'vue-router'
import auth from './store/auth-guard';
import SendMessage from './views/SendMessage.vue'
import SendMessageDev from './views/SendMessageDev.vue'
import CalendarEvents from './views/CalendarEvents'
import Login from './views/Login.vue'
import ExamUpload from './views/ExamUpload'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/sendMessage',
            name: 'messages',
            component: SendMessage,
            beforeEnter: auth,
            meta: {
                requiresAuth: true,
                title: 'Send a message'
            }
        },
        {
            path: '/calendar-events',
            name: 'calendar-events',
            component: CalendarEvents,
            beforeEnter: auth,
            meta: {
                requiresAuth: true,
                title: 'Fetch Events on Calendar'
            }

        },
        {
            path: '/dev',
            name: 'messages-dev',
            component: SendMessageDev,
            beforeEnter: auth,
            meta: {
                requiresAuth: true,
                title: 'Send a message to devs'
            }
        },
        {
            path: '/',
            name: 'login',
            component: Login,
            meta: {
                title: 'Login to send a message'
            }
        },
        {
            path: '/exam',
            name: 'exam-upload',
            component: ExamUpload,
            beforeEnter: auth,
            meta: {
                requiresAuth: true,
                title: 'Upload exam timetable'
            }
        }
    ],
    mode: 'history'
})
