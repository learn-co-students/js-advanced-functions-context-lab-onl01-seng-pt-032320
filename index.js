/* Your Code Here */
const createEmployeeRecord = (empArray) => {
    return {
        firstName: empArray[0],
        familyName: empArray[1],
        title: empArray[2],
        payPerHour: empArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = (empArrays) => {
    return empArrays.map(createEmployeeRecord)
}

const createDateOBJ = (getType, dateTime) => {
    return {type: getType, date: dateTime.slice(0, 10), hour: parseInt(dateTime.slice(-4))}
}

const createTimeInEvent = (employee, dateTime) => {
    employee.timeInEvents.push(createDateOBJ("TimeIn", dateTime))
    return employee
}

const createTimeOutEvent = (employee, dateTime) => {
    employee.timeOutEvents.push(createDateOBJ("TimeOut", dateTime))
    return employee
}

const hoursWorkedOnDate = (employee, dateYMD) => {
    const timeIn = employee.timeInEvents.find((e) => e.date === dateYMD).hour
    const timeOut = employee.timeOutEvents.find((e) => e.date === dateYMD).hour
    return (timeOut - timeIn)/100
}

const wagesEarnedOnDate = (employee, dateYMD) => {
    const rawWage = hoursWorkedOnDate(employee, dateYMD) * employee.payPerHour
    return rawWage 
}

const calculatePayroll = (records) => {
    return records.reduce((memo, rec) => {
        return memo + allWagesFor(rec)
    }, 0)
}

const findEmployeeByFirstName = (srcArray, firstName) => {
    return srcArray.find((rec) => {
        return rec.firstName === firstName
    })
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