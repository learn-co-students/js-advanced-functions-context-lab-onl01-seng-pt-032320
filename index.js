/* Your Code Here */

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

let createEmployeeRecord = function ([firstName, familyName, title, payRate]) {
  let x = {
    firstName: firstName,
    familyName: familyName,
    title: title,
    payPerHour: payRate,
    timeInEvents: [],
    timeOutEvents: []
  }
  return x 
}

let createEmployeeRecords = function (array) {
  let newarray = array.map(x => createEmployeeRecord(x))
  return newarray
}

let createTimeInEvent = function (dateStamp){
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(dateStamp.split(" ")[1]),
    date: dateStamp.split(" ")[0]
  })
  return this
}

let createTimeOutEvent = function (dateStamp) {
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(dateStamp.split(" ")[1]),
    date: dateStamp.split(" ")[0]
  })
  return this
}

let hoursWorkedOnDate = function (date) {
  let outTime = this.timeOutEvents.find( x => x.date === date).hour
  let inTime = this.timeInEvents.find( x => x.date === date).hour
  return (outTime - inTime)/100
}

let wagesEarnedOnDate = function (date) {
  return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

let findEmployeeByFirstName = function (srcArray, firstName) {
  return srcArray.find( x => x.firstName === firstName)
}

let calculatePayroll = function (array) {
  return array.reduce(function (memo, rec){
      return memo + allWagesFor.call(rec)
  }, 0)
} 