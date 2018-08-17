export const isTitleInUse = (title, routines) => {
    for (let i=1; i<(routines.length) ;i++){
        if (routines[i][0].title == title){
            return i
        }
    }
}

//what does it need to have in that first index?
// all the details, even stuff for default stuff, like what 'add option' will create.
// It also needs to have endSound and endVolume
// it doesn't need to have title, length or intervals
// add option - just needs defaultDuration and defaultSound, 
// saved straight from template inputs

export const createTemplate = (intervals, durations, sounds) => {
    let arr = [{
        title: '',
        defaultDuration: durations,
        defaultSound: sounds,
        endSound: sounds,
        endVolume: 2
    }]
    for (let i=0; i<intervals ;i++){
        let obj = { name: '', duration: durations, sound: sounds, volume: 1,
                    spokenWords: false,   splitInterval: false,
                    setsAmount: durations, onDuration: 40, offDuration: 20, }
        arr.push(obj)
    }
    return arr
}


export const minuteS = (number) => {
    return number == 1 ? `${number} minute` : `${number} minutes`
}

export const stndrdth = (number) => {
    if ( number >= 11 && number <= 13) {return 'th'}
    var lastDig = number.toString().split('').pop();
    return lastDig == 1 ? 'st' : lastDig == 2 ? 'nd' : lastDig == 3 ? 'rd' : 'th'
}


export const saveToLocal = (savedRoutines) =>{
    localStorage.setItem('savedRoutines', JSON.stringify(savedRoutines))
}