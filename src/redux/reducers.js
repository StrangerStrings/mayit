const currentRoutineDefaultState = [
    { title: '', endSound: 'ting x1', endVolume: 2, totalDuration: 4, defaultDuration: 2, defaultSound: 'gong x1' },
    { name: 'meditation', duration: 1, sound: 'ting x3', volume: 2 ,  spokenWords:true, splitInterval: true, onDuration: 40, offDuration: 20, setsAmount: 3},
    { name: 'downward dog', duration: 1, sound: 'gong x3', volume: 2, spokenWords:true,  splitInterval: false, onDuration: 40, offDuration: 20, setsAmount: 3},
    // { name: 'mad chanting', duration: 1, sound: 'gong x2', volume: 2 },
    // { name: 'downward cat', duration: 1, sound: 'bell x3', volume: 2 },
    // { name: 'downward fox', duration: 3, sound: 'gong', volume: 2 },
    // { name: 'downward chicken', duration: 3, sound: 'gong', volume: 2 },
    // { name: 'downward goat', duration: 3, sound: 'gong', volume: 2 },
]


const currentRoutineReducer = (state = currentRoutineDefaultState, action) => {
    switch (action.type) {

        case 'EDIT_INTERVAL':

            if (action.setting == 'duration') {
                action.inputValue = Math.max(0, action.inputValue)
            }

            return [
                ...state.slice(0, action.number),
                {...state[action.number], 
                [action.setting]: action.inputValue},
                ...state.slice(action.number+1)
            ]

        case 'ADD_NEW_INTERVAL':
            return [
                ...state,
                {
                    name: '', duration: action.defaultDuration, sound: action.defaultSound, volume: 2,
                    onDuration: 40, offDuration: 20, setsAmount: action.defaultDuration
                }
            ]

        case 'ADD_NEW_INTERVAL_AT':
            return [
                ...state.slice(0, action.where),
                {
                    name: '', duration: action.defaultDuration, sound: action.defaultSound, volume: 2,
                    onDuration: 40, offDuration: 20, setsAmount: action.defaultDuration
                },
                ...state.slice(action.where)
            ]
            
        case 'REMOVE_INTERVAL_AT':
            return [
                ...state.slice(0, action.where),
                ...state.slice(action.where+1),
            ]

        case 'LOAD_ROUTINE':
            return action.routine

        default:
            return state
    }
}







const savedRoutinesDefaultState = [
    {sortByDate: true, ascending: false},
    // [{ title: 'early', length:13, totalDuration: 41, dateCreated: 100, endSound: 'gong x1', endVolume: 2}, { name: 'meditation', duration: 12, sound: 'gong', volume: 2 }, { name: 'downward dog', duration: 3, sound: 'gong', volume: 2 }, { name: 'mad chanting', duration: 5, sound: 'gong', volume: 2 }, { name: 'downward cat', duration: 3, sound: 'gong', volume: 2 }, { name: 'downward fox', duration: 3, sound: 'gong', volume: 2 }, { name: 'downward chicken', duration: 3, sound: 'gong', volume: 2 }, { name: 'downward goat', duration: 3, sound: 'gong', volume: 2 }],
    // [{ title: 'late', length: 10, totalDuration: 31, dateCreated: 500, endSound: 'gong x1', endVolume: 2}, { name: 'meditation', duration: 12, sound: 'gong', volume: 2 }, { name: 'downward dog', duration: 3, sound: 'gong', volume: 2 }, { name: 'mad chanting', duration: 5, sound: 'gong', volume: 2 }, { name: 'downward cat', duration: 3, sound: 'gong', volume: 2 }, { name: 'downward fox', duration: 3, sound: 'gong', volume: 2 }, { name: 'downward chicken', duration: 3, sound: 'gong', volume: 2 }, { name: 'downward goat', duration: 3, sound: 'gong', volume: 2 }],
    // [{ title: 'middle', length: 8, totalDuration: 64, dateCreated: 300, endSound: 'gong x1', endVolume: 2 }, { name: 'meditation', duration: 12, sound: 'gong', volume: 2 }, { name: 'downward dog', duration: 3, sound: 'gong', volume: 2 }, { name: 'mad chanting', duration: 5, sound: 'gong', volume: 2 }, { name: 'downward cat', duration: 3, sound: 'gong', volume: 2 }, { name: 'downward fox', duration: 3, sound: 'gong', volume: 2 }, { name: 'downward chicken', duration: 3, sound: 'gong', volume: 2 }, { name: 'downward goat', duration: 3, sound: 'gong', volume: 2 }],
    // [{ title: 'early', length: 13, totalDuration: 41, dateCreated: 100, endSound: 'gong x1', endVolume: 2 }, { name: 'meditation', duration: 12, sound: 'gong', volume: 2 }, { name: 'downward dog', duration: 3, sound: 'gong', volume: 2 }, { name: 'mad chanting', duration: 5, sound: 'gong', volume: 2 }, { name: 'downward cat', duration: 3, sound: 'gong', volume: 2 }, { name: 'downward fox', duration: 3, sound: 'gong', volume: 2 }, { name: 'downward chicken', duration: 3, sound: 'gong', volume: 2 }, { name: 'downward goat', duration: 3, sound: 'gong', volume: 2 }],
    // [{ title: 'late', length: 10, totalDuration: 31, dateCreated: 500, endSound: 'gong x1', endVolume: 2 }, { name: 'meditation', duration: 12, sound: 'gong', volume: 2 }, { name: 'downward dog', duration: 3, sound: 'gong', volume: 2 }, { name: 'mad chanting', duration: 5, sound: 'gong', volume: 2 }, { name: 'downward cat', duration: 3, sound: 'gong', volume: 2 }, { name: 'downward fox', duration: 3, sound: 'gong', volume: 2 }, { name: 'downward chicken', duration: 3, sound: 'gong', volume: 2 }, { name: 'downward goat', duration: 3, sound: 'gong', volume: 2 }],
    // [{ title: 'middle', length: 8, totalDuration: 64, dateCreated: 300, endSound: 'gong x1', endVolume: 2 }, { name: 'meditation', duration: 12, sound: 'gong', volume: 2 }, { name: 'downward dog', duration: 3, sound: 'gong', volume: 2 }, { name: 'mad chanting', duration: 5, sound: 'gong', volume: 2 }, { name: 'downward cat', duration: 3, sound: 'gong', volume: 2 }, { name: 'downward fox', duration: 3, sound: 'gong', volume: 2 }, { name: 'downward chicken', duration: 3, sound: 'gong', volume: 2 }, { name: 'downward goat', duration: 3, sound: 'gong', volume: 2 }],
    // [{ title: 'early', length: 13, totalDuration: 41, dateCreated: 100, endSound: 'gong x1', endVolume: 2 }, { name: 'meditation', duration: 12, sound: 'gong', volume: 2 }, { name: 'downward dog', duration: 3, sound: 'gong', volume: 2 }, { name: 'mad chanting', duration: 5, sound: 'gong', volume: 2 }, { name: 'downward cat', duration: 3, sound: 'gong', volume: 2 }, { name: 'downward fox', duration: 3, sound: 'gong', volume: 2 }, { name: 'downward chicken', duration: 3, sound: 'gong', volume: 2 }, { name: 'downward goat', duration: 3, sound: 'gong', volume: 2 }],
    // [{ title: 'late', length: 10, totalDuration: 31, dateCreated: 500, endSound: 'gong x1', endVolume: 2 }, { name: 'meditation', duration: 12, sound: 'gong', volume: 2 }, { name: 'downward dog', duration: 3, sound: 'gong', volume: 2 }, { name: 'mad chanting', duration: 5, sound: 'gong', volume: 2 }, { name: 'downward cat', duration: 3, sound: 'gong', volume: 2 }, { name: 'downward fox', duration: 3, sound: 'gong', volume: 2 }, { name: 'downward chicken', duration: 3, sound: 'gong', volume: 2 }, { name: 'downward goat', duration: 3, sound: 'gong', volume: 2 }],
    // [{ title: 'middle', length: 8, totalDuration: 64, dateCreated: 300, endSound: 'gong x1', endVolume: 2 }, { name: 'meditation', duration: 12, sound: 'gong', volume: 2 }, { name: 'downward dog', duration: 3, sound: 'gong', volume: 2 }, { name: 'mad chanting', duration: 5, sound: 'gong', volume: 2 }, { name: 'downward cat', duration: 3, sound: 'gong', volume: 2 }, { name: 'downward fox', duration: 3, sound: 'gong', volume: 2 }, { name: 'downward chicken', duration: 3, sound: 'gong', volume: 2 }, { name: 'downward goat', duration: 3, sound: 'gong', volume: 2 }],

]


const savedRoutinesReducer = (state = savedRoutinesDefaultState, action) => {
    switch (action.type) {

        case 'SAVE_ROUTINE':
            return [
                ...state,
                action.routine
            ]

        case 'DELETE_ROUTINE':
            return [
                ...state.slice(0, action.which),
                ...state.slice(action.which + 1),
            ]


        case 'SORT_BY':
            return [
                {sortByDate: action.sortByDate  , ascending: action.ascending},
                ...state.slice(1)
            ]

        case 'SORT':
            let SR = [...state.slice(1)]
            let sortBy = state[0].sortByDate ? 'dateCreated' : 'totalDuration'
            SR = SR.sort((a,b) => (
                    state[0].ascending ? a[0][sortBy] - b[0][sortBy] : b[0][sortBy] - a[0][sortBy]
            ))
            return [
                state[0],
                ...SR
            ]
            
        case 'LOAD_LOCAL_ROUTINES':
            return action.savedRoutines

        default:
            return state
    }
}







export { currentRoutineReducer, savedRoutinesReducer}