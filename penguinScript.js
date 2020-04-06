var studentPromise = d3.json("classData.json")

studentPromise.then(
    function(students)
    {
        console.log(students);
        displayTable(students);
    },
    function(err)
    {
        console.log("didnt work");
    })

var displayTable = function(students)
{
    d3.select("body")
        .append("table")
        .attr("id", "studentTable")
    var rows = d3.select("#studentTable")
    rows.append("th")
        .attr("class", "colHeader")
        .attr("id","Picture")
        .text("Picture")
    rows.append("th")
        .attr("class", "colHeader")
        .attr("id","Quiz")
        .text("Quiz Average")
    rows.append("th")
        .attr("class", "colHeader")
        .attr("id","HW")
        .text("Homework Average")
    rows.append("th")
        .attr("class", "colHeader")
        .attr("id","Test")
        .text("Test Average")
    rows.append("th")
        .attr("class", "colHeader")
        .attr("id","Final")
        .text("Grade on Final")
    rows.append("th")
        .attr("id", "TotalGrade")
        .attr("class", "colHeader")
        .text("Class Grade")
    var rows = d3.select("#studentTable")
        .selectAll("tr")
        .data(students)
        .enter()
        .append("tr")
        .attr("class", function(student)
            {
                if (getGrade(student) <= 70)
                {
                    return "failing"
                }
                else{
                    return "passing"
                }
            })
    rows.append("td")
        .append("img")
        .attr("src", function(student)
            { pictureLink = student.picture
              picture = "/imgs/" + pictureLink
        
                return picture
            })
        .style("height", "100")
        .style("width", "100")
    rows.append("td")
        .text(function(student){return getQuizMean(student)})
        .attr("class", "generalColumn")
    rows.append("td")
        .text(function(student){return getHwMean(student)})
        .attr("class", "generalColumn")
    rows.append("td")
        .text(function(student){return getTestMean(student)})
        .attr("class", "generalColumn")
    rows.append("td")
        .text(function(student){return getFinalGrade(student)})
        .attr("class", "generalColumn")
    rows.append("td")
        .text(function(student)
        {
            return getGrade(student);
        
        })
        .attr("class", "generalColumn")
    initHeaders(students)
    console.log("table displayed")      
}

var getHwMean = function(student)
{
    homework = student.homework;
    hwGrades = homework.map(function(hw){return hw.grade});
    meanGrade = d3.mean(hwGrades);
    return Math.round(meanGrade);
}
var getTestMean = function(student)
{
    tests = student.test;
    testGrades = tests.map(function(test){return test.grade});
    meanGrade = d3.mean(testGrades);
    return Math.round(meanGrade);
}
var getQuizMean = function(student)
{
    quizes = student.quizes;
    quizeGrades = quizes.map(function(quize){return quize.grade});
    meanGrade = d3.mean(quizeGrades);
    return Math.round(meanGrade);
}
var getFinalGrade = function(student)
{
    return student.final[0].grade;
    
}
var getGrade = function(student)
{
    
    quizMean = getQuizMean(student)*10 *.20;
    hwMean = getHwMean(student)*2 * .15;
    testMean = getTestMean(student)*.30;
    final = getFinalGrade(student)*.35;
    return Math.round(quizMean+hwMean+testMean+final);
}

var clearTable = function()
{
    d3.selectAll("#studentTable")
        .remove();
    console.log("table cleared")
}

var initHeaders = function(students)
{
    d3.select("#Quiz")
        .on("click", function()
        {
            console.log("clicked");
            students.sort(function(a,b)
            {
                studentA = getQuizMean(a)
                studentB = getQuizMean(b)
                if(studentA > studentB){return 1}
                else if(studentA < studentB){return -1}
                else {return 0;}
            });
            console.log(students)
            
            clearTable();
            displayTable(students);
        });
    d3.select("#HW")
        .on("click", function()
        {
            students.sort(function(a,b)
            {
                studentA = getHwMean(a)
                studentB = getHwMean(b)
                if(studentA > studentB){return 1}
                else if (studentA < studentB){return -1}
                else {return 0;}
            });
            console.log(students)
            clearTable();
            displayTable(students)
        })
    d3.select("#Test")
        .on("click", function()
        {
            students.sort(function(a,b)
            {
                studentA = getTestMean(a)
                studentB = getTestMean(b)
                if(studentA > studentB){return 1}
                else if (studentA < studentB){return -1}
                else {return 0;}
            });
            console.log(students)
            clearTable();
            displayTable(students)
        })
}
