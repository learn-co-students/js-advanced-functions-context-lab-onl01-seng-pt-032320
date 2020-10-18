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
    return e.date;
  });

  let payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};

let createEmployeeRecord = function (arr) {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
};

let createEmployeeRecords = function (arr) {
  return arr.map((em) => createEmployeeRecord(em));
};

let createTimeInEvent = function (dateStamp) {
  let [date, hour] = dateStamp.split(" ");

  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });

  return this;
};

let createTimeOutEvent = function (dateStamp) {
  let [date, hour] = dateStamp.split(" ");

  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });

  return this;
};

let hoursWorkedOnDate = function (date) {
  let timeIn = this.timeInEvents.find((e) => e.date === date);
  let timeOut = this.timeOutEvents.find((e) => e.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
};

let wagesEarnedOnDate = function (date) {
  let hoursWorked = hoursWorkedOnDate.call(this, date);
  return this.payPerHour * hoursWorked;
};

let calculatePayroll = function (arr) {
  let payroll = arr.map((emp) => allWagesFor.call(emp));
  return payroll.reduce((acc,curr) => acc + curr, 0)
};

  let findEmployeeByFirstName = function(arr, firstName){
    let emp = arr.find(e => e.firstName === firstName)
    return emp
  }


//   let allWagesFor = function (employee){
//     let dates = employee.timeInEvents.map(event => event.date)
//     let wages = dates.map(function(date){
//       return wagesEarnedOnDate(employee,date)
//     })
//     return wages.reduce(function (acc,curr){
//       return acc + curr
//     }, 0)
//   }

//   let calculatePayroll = function (arr){
//     let payroll = arr.map(emp => allWagesFor(emp))
//     return payroll.reduce(function (acc,curr){
//         return acc + curr
//     }, 0)
//   }

//   let findEmployeeByFirstName = function(arr, firstName){
//     let emp = arr.find(e => e.firstName === firstName)
//     return emp
//   }
