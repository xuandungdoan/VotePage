import React,{Component} from 'react'
import api from '../services/api'
class App extends Component {
    
    componentDidMount() {
       const result= api.call('post','auth/login',{
            username: 'username',
            password: 'password'
        })
        console.log(result,`It's Okey`);    
    }
    render() {
        
    return <div>gi v ${api.host}</div>
    }
}
// const App = () => <div>helloword</div>
export default App;