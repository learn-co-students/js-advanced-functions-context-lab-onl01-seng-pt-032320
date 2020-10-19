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

// Your code here

function createEmployeeRecord(arr){
    const obj ={}
    obj['firstName'] = arr[0]
    obj['familyName'] = arr[1]
    obj['title'] = arr[2]
    obj['payPerHour'] = arr[3]
    obj['timeInEvents'] = []
    obj['timeOutEvents'] = []
    return obj 
}

function createEmployeeRecords(arr1){
    console.log(arr1);
    const arrayObject = []
    for(let i=0; i < arr1.length; i++){
        arrayObject.push(createEmployeeRecord(arr1[i]))
    }
    return arrayObject

}

function createTimeInEvent(dateValue){
    const newObj = {}
    const value = dateValue.split(" ")
    newObj['type'] = 'TimeIn'
    newObj['hour'] = parseInt(value[1])
    newObj['date'] = value[0]
    this['timeInEvents'].push(newObj)
    return this 
}

function createTimeOutEvent(dateValue){
    const newObj = {}
    const value = dateValue.split(" ")
    newObj['type'] = 'TimeOut'
    newObj['hour'] = parseInt(value[1])
    newObj['date'] = value[0]
    this['timeOutEvents'].push(newObj)
    return this 
}

function hoursWorkedOnDate(date){
    const len = this['timeInEvents'].length
    const c = this['timeInEvents'][0]['date']
    let timeInHour;
    let timeOutHour;
    let timeElapse;


    for(let i=0;i<len;i++){
        if (date === this['timeInEvents'][i]['date']) {
            timeInHour = this['timeInEvents'][i]['hour']
            
        }
    }
    for(let i=0;i<len;i++){
       if (date === this['timeOutEvents'][i]['date']) {
            timeOutHour = this['timeOutEvents'][i]['hour']
            
        }
    }

    timeElapse = timeOutHour - timeInHour
    return timeElapse/100
}

function wagesEarnedOnDate(date){
    const hours = hoursWorkedOnDate.call(this,date)
    const payRate = this['payPerHour']
    const wages = hours * payRate
    return wages
   
}

// 0044-03-14 0900 

function findEmployeeByFirstName(srcArray,fname){
    let obj;
    

    for(let i=0;i<srcArray.length;i++){
        if(srcArray[i]['firstName'] === fname){
            obj = srcArray[i]
            break 
        }
    }
    return obj
}

function calculatePayroll(employees){
    let total =0
    for(let i=0;i<employees.length;i++){
     total+=allWagesFor.call(employees[i])
 }
 return total
}
