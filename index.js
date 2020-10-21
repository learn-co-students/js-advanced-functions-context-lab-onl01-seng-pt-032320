/* Your Code Here */

function createEmployeeRecord(theArray) {
    let newEmployee = {
        firstName: theArray[0],
        firstName: theArray[0],
        familyName: theArray[1],
        title: theArray[2],
        payPerHour: theArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return newEmployee;
}

function createEmployeeRecords(theArrays) {
    return theArrays.map( x => createEmployeeRecord(x) );
}

function createTimeInEvent(timeStamp) {
    let timeObject = {type: "TimeIn", hour: parseInt(timeStamp.split(" ")[1], 10), date: timeStamp.split(" ")[0]};
    this.timeInEvents.push(timeObject);
    return this;
}

function createTimeOutEvent(timeStamp) {
    let timeObject = {type: "TimeOut", hour: parseInt(timeStamp.split(" ")[1], 10), date: timeStamp.split(" ")[0]};
    this.timeOutEvents.push(timeObject);
    return this;
}

function hoursWorkedOnDate(timeStamp) {
    let timeOut = this.timeOutEvents.find(element => element.date === timeStamp);
    let timeIn = this.timeInEvents.find(element => element.date === timeStamp);
    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(timeStamp) {
    let hoursWorked = hoursWorkedOnDate.call(this, timeStamp);
    return hoursWorked * this.payPerHour;
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

//

function findEmployeeByFirstName(employeeArray, firstName) {
    return employeeArray.find(x => x.firstName === firstName);
}

function calculatePayroll(employeeArray) {
    let allWages = employeeArray.map(x => allWagesFor.call(x));
    return allWages.reduce((x,y) => x+y, 0);
}

