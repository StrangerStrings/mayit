import {createStore, combineReducers} from 'redux'
import { currentRoutineReducer, savedRoutinesReducer, routineTitleReducer} from './reducers'


const configureStore = () => {
    const store = createStore(
        combineReducers({
            currentRoutine: currentRoutineReducer,
            savedRoutines: savedRoutinesReducer,
        })
    )
    return store
}

export default configureStore


