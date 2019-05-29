import Login from '../../../src/views/Login'
import Vue from 'vue/types'

describe('Login.vue', () => {
    it('it should display elements correctly', () => {
        const Constructor = Vue.extend(Login);
        const LoginComponent = new Constructor().$mount();
        expect(LoginComponent.$el.textContent).to.contain('player')
    })
})