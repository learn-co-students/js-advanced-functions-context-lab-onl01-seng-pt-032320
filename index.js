/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

function createEmployeeRecord(employee) {
    return {
        firstName: employee[0], 
        familyName: employee[1], 
        title: employee[2], 
        payPerHour: employee[3], 
        timeInEvents: [], 
        timeOutEvents: []
    }

}


function createEmployeeRecords(employees) {
    return employees.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    this["timeInEvents"].push({
        type: "TimeIn", 
        hour: parseInt(hour), 
        date: date
    })
    return this;
}

function createTimeOutEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    this["timeOutEvents"].push({
        type: "TimeOut", 
        hour: parseInt(hour), 
        date: date
    })
    return this;
}

function hoursWorkedOnDate(day) {
    let timeIn = this.timeInEvents.find(function(e) {return e.date === day}).hour
    let timeOut = this.timeOutEvents.find(function(e) {return e.date === day}).hour
    let hours = parseInt(timeOut - timeIn)/100
    return hours
}

function wagesEarnedOnDate(day) {
    let payRate = this.payPerHour
    return (hoursWorkedOnDate.call(this, day) * payRate)
}

function findEmployeeByFirstName(employees, name) {
    return employees.find(employee => employee.firstName === name)
}

function calculatePayroll(employees) {
    return employees.reduce(function(accumulator,employee) {
        return accumulator + allWagesFor.call(employee)
    }, 0) 
     
}


let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}