function createEmployeeRecord(row) {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeRowData) {
    return employeeRowData.map(function(row) {
        return createEmployeeRecord(row)
    })
}

function createTimeInEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })
    return employee
}

function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
    return employee
}

function hoursWorkedOnDate(employee, dateWorked) {
    let inPunch = employee.timeInEvents.find(function(e) {
        return e.date === dateWorked
    })
    let outPunch = employee.timeOutEvents.find(function(e) {
        return e.date === dateWorked
    })
    return (outPunch.hour - inPunch.hour) / 100
}

let wagesEarnedOnDate = function(employee, dateWorked){
    let dailyWages = hoursWorkedOnDate(employee, dateWorked)
        * employee.payPerHour
    return parseFloat(dailyWages.toString())
}

function allWagesFor(employee) {
    let periodDates = employee.timeInEvents.map(function(e) {
        return e.date
    })
    let periodWages = periodDates.reduce(function(memo, date) {
        return memo + wagesEarnedOnDate(employee, date)
    }, 0)
    return periodWages
}

function calculatePayroll(employees) {
    return employees.reduce(function(memo, rec) {
        return memo + allWagesFor(rec)
    }, 0)
}

function findEmployeeByFirstName(employeeArray, firstName) {
    return employeeArray.find(function(rec) {
        return rec.firstName === firstName
    })
}