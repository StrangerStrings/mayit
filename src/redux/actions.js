// current routine
export const editInterval = (number, setting, inputValue) => ({
    type: 'EDIT_INTERVAL',
    number, 
    setting, 
    inputValue
})

export const addNewInterval = ({defaultDuration, defaultSound}) => ({
    type: 'ADD_NEW_INTERVAL',
    defaultDuration,
    defaultSound
})

export const addNewIntervalAt = ({ defaultDuration, defaultSound },where) => ({
    type: 'ADD_NEW_INTERVAL_AT',
    defaultDuration,
    defaultSound,
    where
})


export const removeIntervalAt = (where) => ({
    type: 'REMOVE_INTERVAL_AT',
    where
})


export const loadRoutine = (routine) => ({
    type: 'LOAD_ROUTINE',
    routine
})






// saved routines
export const saveRoutine = (routine) => ({
    type: 'SAVE_ROUTINE',
    routine
})
export const deleteRoutine = (which) => ({
    type: 'DELETE_ROUTINE',
    which
})

export const sortBy = (sortByDate, ascending) => ({
    type: 'SORT_BY',
    sortByDate,
    ascending

})
export const sort = () => ({
    type: 'SORT',
})

export const loadLocalRoutines = (savedRoutines) => ({
    type: 'LOAD_LOCAL_ROUTINES',
    savedRoutines
})
