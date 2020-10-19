let createEmployeeRecord = array => {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = records => {
    return records.map(record => createEmployeeRecord(record))
}


let createTimeInEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

const createTimeOutEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
    return this
}

const hoursWorkedOnDate = function(day){
    //need to take the hours worked between in time to out time
    let inTime = this.timeInEvents.find(function(event){
        return event.date === day
    })

    let outTime = this.timeOutEvents.find(function(event){
        return event.date === day
    })

    return (outTime.hour - inTime.hour) / 100

}


let wagesEarnedOnDate = function(date){
    let wages = this.payPerHour * hoursWorkedOnDate.call(this,date)
    return parseFloat(wages.toString())
}

let calculatePayroll = function(employees){
    return employees.reduce(function(mem,rec){
        return mem + allWagesFor.call(rec)
    },0)
}

let findEmployeeByFirstName = function(records,firstName){
   return records.find(function(record){ 
       return record.firstName === firstName })
}



/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!
 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}