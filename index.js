/* Your Code Here */
function createEmployeeRecord(empArray) {
    const employee = {
        firstName: empArray[0],
        familyName: empArray[1],
        title: empArray[2],
        payPerHour: empArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

let createEmployeeRecords = (empArrays) => {
    return empArrays.map(createEmployeeRecord)
}

const createDateOBJ = function(getType, dateTime) {
    return {type: getType, date: dateTime.slice(0, 10), hour: parseInt(dateTime.slice(-4))}
}

const createTimeInEvent = function(dateTime) {
    this.timeInEvents.push(createDateOBJ("TimeIn", dateTime))
    return this 
}

const createTimeOutEvent = function(dateTime) {
    this.timeOutEvents.push(createDateOBJ("TimeOut", dateTime))
    return this
}

const hoursWorkedOnDate = function(dateYMD) {
    const timeIn = this.timeInEvents.find(e => e.date === dateYMD).hour
    const timeOut = this.timeOutEvents.find(e => e.date === dateYMD).hour
    return (timeOut - timeIn) / 100
}

const wagesEarnedOnDate = function(employee, dateYMD) {
    const rawWage = hoursWorkedOnDate(employee, dateYMD) * employee.payPerHour
    return rawWage 
}

const calculatePayroll = function(records) {
    return records.reduce(function(total, employee) {
        return total + allWagesFor(employee)
    }, 0)
}

const findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find((employee) => {
        return employee.firstName === firstName
    })
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function (employee) {
    let eligibleDates = employee.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}