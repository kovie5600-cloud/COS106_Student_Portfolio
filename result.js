const form = document.getElementById("resultForm");
const tableBody = document.getElementById("resultTableBody");
const errorMessage = document.getElementById("resultError");

let studentResults =
    JSON.parse(localStorage.getItem("studentResults")) || [];

function calculateGrade(average) {

    if (average >= 70) {
        return "A";
    } else if (average >= 60) {
        return "B";
    } else if (average >= 50) {
        return "C";
    } else if (average >= 45) {
        return "D";
    } else if (average >= 40) {
        return "E";
    } else {
        return "F";
    }

}

function displayResults() {

    tableBody.innerHTML = "";

    studentResults.forEach(function(student, index) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.matricNumber}</td>
            <td>${student.mth101}</td>
            <td>${student.gst101}</td>
            <td>${student.csc101}</td>
            <td>${student.cos101}</td>
            <td>${student.total}</td>
            <td>${student.average}%</td>
            <td>${student.grade}</td>
            <td>
                <button onclick="deleteResult(${index})">
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(row);

    });

}

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.getElementById("studentName").value.trim();

    const matricNumber =
        document.getElementById("matricNumber").value.trim();

    const mth101Value =
        document.getElementById("mth101").value;

    const gst101Value =
        document.getElementById("gst101").value;

    const csc101Value =
        document.getElementById("csc101").value;

    const cos101Value =
        document.getElementById("cos101").value;

    if (
        name === "" ||
        matricNumber === "" ||
        mth101Value === "" ||
        gst101Value === "" ||
        csc101Value === "" ||
        cos101Value === ""
    ) {

        errorMessage.innerHTML =
            "Please complete all the fields.";

        errorMessage.style.color = "red";

        return;

    }

    const mth101 = Number(mth101Value);
    const gst101 = Number(gst101Value);
    const csc101 = Number(csc101Value);
    const cos101 = Number(cos101Value);

    const scores = [
        mth101,
        gst101,
        csc101,
        cos101
    ];

    const invalidScore = scores.some(function(score) {
        return score < 0 || score > 100;
    });

    if (invalidScore) {

        errorMessage.innerHTML =
            "Each score must be between 0 and 100.";

        errorMessage.style.color = "red";

        return;

    }

    const total =
        mth101 + gst101 + csc101 + cos101;

    const average =
        (total / scores.length).toFixed(2);

    const grade =
        calculateGrade(Number(average));

    const student = {
        name: name,
        matricNumber: matricNumber,
        mth101: mth101,
        gst101: gst101,
        csc101: csc101,
        cos101: cos101,
        total: total,
        average: average,
        grade: grade
    };

    studentResults.push(student);

    localStorage.setItem(
        "studentResults",
        JSON.stringify(studentResults)
    );

    errorMessage.innerHTML =
        "Student result added successfully.";

    errorMessage.style.color = "green";

    form.reset();

    displayResults();

});

function deleteResult(index) {

    const answer =
        confirm("Do you want to delete this result?");

    if (answer === true) {

        studentResults.splice(index, 1);

        localStorage.setItem(
            "studentResults",
            JSON.stringify(studentResults)
        );

        displayResults();

    }

}

displayResults();