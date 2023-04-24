const employeeData = ["Gray", "Worm", "Security", 1];
let testEmployee;

function createEmployeeRecord(employeeData){
    const anEmployee = {
        firstName: "",
        familyName: "",
        title: "",
        payPerHour: 0,
        timeInEvents: [],
        timeOutEvents: []
    };
    
    anEmployee.firstName = employeeData[0];
    anEmployee.familyName = employeeData[1];
    anEmployee.title = employeeData[2];
    anEmployee.payPerHour = employeeData[3];
    anEmployee.timeInEvents = [];
    anEmployee.timeOutEvents = [];
    return anEmployee;
};
testEmployee = createEmployeeRecord(employeeData);
console.log("test: ", testEmployee)

//----------------------------

let employeeRecords;
const twoRows = [
    ["moe", "sizlak", "barkeep", 2],
    ["bartholomew", "simpson", "scamp", 3]
];

function createEmployeeRecords(employees){
    let employeeRecords = []
        
    employeeRecords = employees.map(function(item) {

        let one = createEmployeeRecord(item);
        let oneEmployee = Object.assign({}, one);
        //let oneEmployee = {...anEmployee}
        return oneEmployee
    });

    return employeeRecords;
}

employeeRecords = createEmployeeRecords(twoRows);
let firstNames = employeeRecords.map(obj => obj.firstName);
console.log(firstNames);

//------------------------

let dataEmployees = [
    ["Thor", "Odinsson", "Electrical Engineer", 45],
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150],
    ["Darcey", "Lewis", "Intern", 15],
    ["Jarvis", "Stark", "CIO", 125],
    ["Anthony", "Stark", "Angel Investor", 300],
    ["Byron", "Poodle", "Mascot", 3],
    ["Julius", "Caesar", "General", 27],
    ["Rafiki", "", "Aide", 10],
    ["Simba", "", "King", 100]
  ];

employeeRecords = createEmployeeRecords(dataEmployees);
firstNames = employeeRecords.map(obj => obj.firstName);
console.log(firstNames);

//----------------------------

//let bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3]);
let bpRecord = createEmployeeRecord(dataEmployees[6]);

function createTimeInEvent(bpRecord, timeIn){
    const timeInArray = timeIn.split(" ");
    const newEvent = {
        type: "TimeIn",
        hour: parseInt(timeInArray[1]),
        date: timeInArray[0]
    }

    bpRecord.timeInEvents.push(newEvent); //bpRecord.timeInEvents[0]
    bpRecord.timeInEvents.push(timeIn); //bpRecord.timeInEvents[1]
    return bpRecord;
};

let updatedBpRecord = createTimeInEvent(bpRecord, "2014-02-28 1400");

//-------------------

//bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3])
bpRecord = createEmployeeRecord(dataEmployees[6]);

function createTimeOutEvent(bpRecord, timeOut){
    const timeOutArray = timeOut.split(" ");
    let newEvent = {
        type: "TimeOut",
        hour: parseInt(timeOutArray[1]),
        date: timeOutArray[0]
    }

    bpRecord.timeOutEvents.push(newEvent); //bpRecord.timeOutEvents[0]
    bpRecord.timeOutEvents.push(timeOut); //bpRecord.timeOutEvents[1]
    return bpRecord;
};

updatedBpRecord = createTimeOutEvent(bpRecord, "2015-02-28 1700")
//console.log("update: ", updatedBpRecord);
newE = updatedBpRecord.timeOutEvents[0].type;
//console.log("newE: ", newE)

//---------------------

let cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 1000]);

function hoursWorkedOnDate(eRecord, theDate){
  let foundItem = eRecord.timeOutEvents.find(item => item.date === theDate);
  let hourOut = foundItem.hour;
  foundItem = eRecord.timeInEvents.find(item => item.date === theDate);
  let hourIn = foundItem.hour;
  return (hourOut - hourIn)/100;
};

updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900");
updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100");
let hours = hoursWorkedOnDate(updatedBpRecord, updatedBpRecord.timeInEvents[0].date);

//--------------------------

cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27]);

function wagesEarnedOnDate(eRecord, date){
  const hours = hoursWorkedOnDate(eRecord, date);
  return eRecord.payPerHour * hours;
};

updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900");
updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100");
let payOwed = wagesEarnedOnDate(updatedBpRecord, updatedBpRecord.timeInEvents[0].date);

//----------------------------

function allWagesFor(eRecord){

  let c = eRecord.timeInEvents.length/2;
  let dailyPay = 0, payOwed = 0;

  for (let i = 0; i < c; i++) {
    dailyPay = wagesEarnedOnDate(eRecord, eRecord.timeInEvents[i*2].date);
    payOwed += dailyPay;
  }
  return payOwed;
}

cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27]);
updatedBpRecord = createTimeInEvent(cRecord, "0044-03-14 0900");
updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-14 2100");
updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900");
updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100");
const allWages = allWagesFor(cRecord);
console.log("all: ", allWages);

//--------------------------

function calculatePayroll(employeesData){
  let grandTotalOwed = employeesData.reduce((m, e) => m + allWagesFor(e), 0);
  return grandTotalOwed;
  }

let rRecord = createEmployeeRecord(["Rafiki", "", "Aide", 10])
let sRecord = createEmployeeRecord(["Simba", "", "King", 100])

let sTimeData = [
  ["2019-01-01 0900", "2019-01-01 1300"], // 4 * 100 = 400
  ["2019-01-02 1000", "2019-01-02 1300"]  // 3 * 100 = 300 ===> 700 total
]
    
let rTimeData = [
  ["2019-01-11 0900", "2019-01-11 1300"], // 4 * 10 = 40
  ["2019-01-12 1000", "2019-01-12 1300"]  // 3 * 10 = 30 ===> 70 total ||=> 770
]

sTimeData.forEach(function (d) {
  let [dIn, dOut] = d
  sRecord = createTimeInEvent(sRecord, dIn)
  sRecord = createTimeOutEvent(sRecord, dOut)
})

rTimeData.forEach(function (d, i) {
  let [dIn, dOut] = d
  rRecord = createTimeInEvent(rRecord, dIn)
  rRecord = createTimeOutEvent(rRecord, dOut)
})

let employees = [sRecord, rRecord]
let grandTotal = calculatePayroll(employees)
console.log("total: ", grandTotal)

//---------------------------

let src = [
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150]
  ]

let srcEmployees = createEmployeeRecords(src);

let srcFirstNames = srcEmployees.map(function (e) {
    return e.firstName
  });
console.log(srcFirstNames);

//-------------------------------------------------

const csvDataEmployees = [
    ["Thor", "Odinsson", "Electrical Engineer", 45],
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150],
    ["Darcey", "Lewis", "Intern", 15],
    ["Jarvis", "Stark", "CIO", 125],
    ["Anthony", "Stark", "Angel Investor", 300]
  ]

const csvTimesIn = [
    ["Thor", ["2018-01-01 0800", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Loki", ["2018-01-01 0700", "2018-01-02 0700", "2018-01-03 0600"]],
    ["Natalia", ["2018-01-01 1700", "2018-01-02 1800", "2018-01-03 1300"]],
    ["Darcey", ["2018-01-01 0700", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Jarvis", ["2018-01-01 0500", "2018-01-02 0500", "2018-01-03 0500"]],
    ["Anthony", ["2018-01-01 1400", "2018-01-02 1400", "2018-01-03 1400"]]
  ]

const csvTimesOut = [
    ["Thor", ["2018-01-01 1600", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Loki", ["2018-01-01 1700", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Natalia", ["2018-01-01 2300", "2018-01-02 2300", "2018-01-03 2300"]],
    ["Darcey", ["2018-01-01 1300", "2018-01-02 1300", "2018-01-03 1300"]],
    ["Jarvis", ["2018-01-01 1800", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Anthony", ["2018-01-01 1600", "2018-01-02 1600", "2018-01-03 1600"]]
  ]

let csvEmployeeRecords = createEmployeeRecords(csvDataEmployees)
console.log("csv before: ", csvEmployeeRecords);

csvEmployeeRecords.forEach(function (rec) {
    let timesInRecordRow = csvTimesIn.find(function (row) {
        return rec.firstName === row[0]
    })

    let timesOutRecordRow = csvTimesOut.find(function (row) {
      return rec.firstName === row[0]
    })

    timesInRecordRow[1].forEach(function(timeInStamp){
      createTimeInEvent(rec, timeInStamp)
    })

    timesOutRecordRow[1].forEach(function(timeOutStamp){
      createTimeOutEvent(rec, timeOutStamp)
    })
});

console.log("csv after: ", csvEmployeeRecords);

let grandTotalOwed = calculatePayroll(csvEmployeeRecords);
console.log(grandTotalOwed);

