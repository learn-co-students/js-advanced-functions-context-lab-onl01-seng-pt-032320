const createEmployeeRecord = (employeeArray) => {
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
};

const createEmployeeRecords = (employeeArray) => {
    return employeeArray.map(employee => createEmployeeRecord(employee))
};

const createTimeInEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(" ")
   
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    return this
};

const createTimeOutEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(" ")
   
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });
    return this
};

const hoursWorkedOnDate = function(dateWorked) {
    let hourIn = this.timeInEvents.find(e => e.date === dateWorked)
    let hourOut = this.timeOutEvents.find(e => e.date === dateWorked)
    return (hourOut.hour - hourIn.hour)/100 
};

const wagesEarnedOnDate = function(dateWorked) {
    let pay = hoursWorkedOnDate.call(this, dateWorked) * this.payPerHour
    return parseFloat(pay.toString())
};

const findEmployeeByFirstName = (employeeArray, firstName) => {
    return employeeArray.find(name => name.firstName === firstName)
};

const calculatePayroll = function(employeeArray) {
    return employeeArray.reduce((memo, e) => {
        return memo + allWagesFor.call(e)
    }, 0)
};

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
};
