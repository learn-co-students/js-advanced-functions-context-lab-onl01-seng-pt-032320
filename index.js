let createEmployeeRecord = function(array) {
    let employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee;
}

let createEmployeeRecords = function(arrays) {
    let records = [];
    arrays.map( function(array) {
        records.push(createEmployeeRecord(array));
    });
    return records;
}

let createTimeInEvent = function(date) {
    let dayTime = date.split(' ')
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dayTime[1], 10),
        date: dayTime[0]
    })
    return this;
}

let createTimeOutEvent = function(date) {
    let dayTime = date.split(' ')
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dayTime[1], 10),
        date: dayTime[0]
    })
    return this;
}

let hoursWorkedOnDate = function(day) {
    let timeIn = this.timeInEvents.filter( function(event) {
        return event.date === day;
    })
    let timeOut = this.timeOutEvents.filter( function(event) {
        return event.date === day;
    })
    return (timeOut[0].hour - timeIn[0].hour) / 100
}

let wagesEarnedOnDate = function(date) {
    return (hoursWorkedOnDate.call(this, date) * this.payPerHour)
}

let findEmployeeByFirstName = function(records, name) {
    let record = records.filter( function(employee) {
        return employee.firstName === name;
    })
    return record[0];
}

let calculatePayroll = function(records) {
    let totalPay = 0;
    records.map( function(employee) {
        totalPay += allWagesFor.call(employee);
    })
    return totalPay;
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