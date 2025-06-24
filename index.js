function createEmployeeRecord(employeeCard) {
    const [firstName, familyName, title, payPerHour] = employeeCard;
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
};

function createEmployeeRecords(employeeCards) {
    return employeeCards.map(card => createEmployeeRecord(card));
};


function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    });
    return employeeRecord;
};

function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    });
    return employeeRecord;
};

function hoursWorkedOnDate(employeeRecord, dateStamp) {
    const date = dateStamp.split(" ")[0];
    let timeInStamp;
    let timeOutStamp;

    for (let timeInEvent of employeeRecord.timeInEvents) {
        if (timeInEvent.date === date) {
            timeInStamp = timeInEvent.hour;
            break;
        }
    }
    for (let timeOutEvent of employeeRecord.timeOutEvents) {
        if (timeOutEvent.date === date) {
            timeOutStamp = timeOutEvent.hour
        }
    }

    return (timeOutStamp - timeInStamp)/100;
}

function wagesEarnedOnDate(employeeRecord, dateStamp) {
    return hoursWorkedOnDate(employeeRecord, dateStamp) * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
    let wagesOwed = [];
    let dateStamps = employeeRecord.timeOutEvents.map(timeOutEvent => timeOutEvent.date);
    for (const dateStamp of dateStamps) {
        wagesOwed.push(wagesEarnedOnDate(employeeRecord, dateStamp));
    }

    return wagesOwed.reduce((acc, curr) => {
        return acc += curr
    }, 0);
}

function calculatePayroll(employeeRecords) {
    const payOwed = []
    for (const employeeRecord of employeeRecords) {
        let wagesOwed = [];
        let dateStamps = employeeRecord.timeOutEvents.map(timeOutEvent => timeOutEvent.date);
        for (const dateStamp of dateStamps) {
            wagesOwed.push(wagesEarnedOnDate(employeeRecord, dateStamp));
        }
        payOwed.push(wagesOwed.reduce((acc, curr) => {
            return acc += curr
        }, 0))
    }
    return payOwed.reduce((acc, curr) => {
        return acc += curr
    }, 0)
}