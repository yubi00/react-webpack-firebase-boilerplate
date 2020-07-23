import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { login , logout } from './actions/auth'
import 'react-dates/lib/css/_datepicker.css'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import AppRouter, { history } from './routers/AppRouter'
import { firebase } from './firebase/firebase'
import LoadingPage from './components/LoadingPage'

const store = configureStore()

const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
)

let hasRendered = false
const renderApp = () => {
    if(!hasRendered) {
        ReactDOM.render(jsx, document.querySelector('#app'))
        hasRendered = true;
    }
}

ReactDOM.render(<LoadingPage/>, document.querySelector('#app'))

firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        console.log(user.displayName)
        store.dispatch(login(user.uid))
        renderApp()
           if( history.location.pathname === '/') {
               history.push('/dashboard')
           } 
    } else {
        store.dispatch(logout())
        renderApp()
        history.push('/')
    }
})