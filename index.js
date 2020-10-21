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

const createEmployeeRecords = (empArrays) => {
    return empArrays.map(createEmployeeRecord)
}

const createTimeInEvent = function(dateStamp) {
    let date = dateStamp.split(" ")[0];
    let hour = parseInt(dateStamp.split(" ")[1]);

    this['timeInEvents'].push({
        type: 'TimeIn',
        date: date,
        hour: hour
    })
    return this
}

const createTimeOutEvent = function (dateStamp) {
    let date = dateStamp.split(" ")[0];
    let hour = parseInt(dateStamp.split(" ")[1]);

    this['timeOutEvents'].push({
        type: 'TimeOut',
        date: date,
        hour: hour
    })
    return this
}

const hoursWorkedOnDate = function(dateYMD) {
    const timeIn = this.timeInEvents.find(e => e.date === dateYMD).hour
    const timeOut = this.timeOutEvents.find(e => e.date === dateYMD).hour
    return (timeOut - timeIn) / 100
}

const wagesEarnedOnDate = function(dateYMD){
    const rawWage = hoursWorkedOnDate.call(this, dateYMD)
        * this.payPerHour
    return parseFloat(rawWage.toString())
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

let allWagesFor = function() {
    let eligibleDates = this.timeInEvents.map(function(e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const calculatePayroll = function(record){
    return record.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)
    }, 0)
}