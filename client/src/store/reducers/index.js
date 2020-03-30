import {combineReducers} from "redux"
import error from "./error"
import auth from "./auth"
import {setPolls, setCurrentPoll} from './polls'
export default combineReducers({
    error,
    auth,
    setPolls,
    setCurrentPoll
})
