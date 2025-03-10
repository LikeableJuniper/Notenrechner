function getAverage(returnValues=false) {
    let totalScore = 0;
    let totalWeight = 0;
    for (let i = 1; i <= 14; i++) {
        let grade = Number(document.getElementById("grade" + i).value);
        let valueInputField = document.getElementById("weight" + i);
        let value = Number(valueInputField.value);
        if (grade != 0 && value == 0) {
            value = 1;
            valueInputField.value = 1;
        }
        else if (grade == 0) {
            continue;
        }
        totalScore += value*grade;
        totalWeight += value;
    }

    if (returnValues) {
        return [totalScore, totalWeight]
    }
    document.getElementById("averageOutput").innerText = "Durchschnitt: " + customRound(totalScore/totalWeight, 1/1000);
}

function calculatePoints() {
    let points = 0;
    let grades = [];
    for (let i = 1; i <= 14; i++) {
        let grade = Number(document.getElementById("grade" + i).value);
        //weights are irrelevant for calculating points, as all final averages should have a weight of 1 towards the point score
        if (grade != 0) {
            grades.push(customRound(grade, 0.5));
        }
    }
    for (let i = 0; i < 5; i++) {
        let minimum = Math.min(...grades);
        let index = grades.indexOf(minimum);
        points += minimum;
        grades.splice(index, 1);
        if (grades.length == 0) {
            break;
        }
    }
    let outputField = document.getElementById("pointsOutput");
    outputField.innerText = "Punkte: " + points + "/19 (Gerundet auf halbe Noten)";
}

function customRound(number, roundInterval) {
    return Math.round(number/roundInterval)*roundInterval;
}

function getNeeded() {
    getAverage();
    let [totalScore, totalWeight] = getAverage(returnValues=true);
    let targetGrade = Number(document.getElementById("neededGrade").value);
    let nextWeight = Number(document.getElementById("neededWeight").value);
    let requiredGrade = (targetGrade * (totalWeight+nextWeight) - totalScore)/nextWeight;
    document.getElementById("neededOutput").innerText = "Benötigte Note: " + customRound(requiredGrade, 1/1000);
}

function calculateCompensationPoints() {
    let negativePoints = 0;
    let compensationPoints = 0;
    for (let i = 1; i <= 14; i++) {
        let grade = Number(document.getElementById("grade" + i).value);
        //weights are irrelevant for calculating points, as all final averages should have a weight of 1 towards the point score
        if (grade != 0) {
            grade = customRound(grade, 0.5)
            if (grade < 4) {
                negativePoints += 4 - grade;
            }
            else if (grade > 4) {
                compensationPoints += grade - 4;
            }
        }
    }
    document.getElementById("compensationOutput").innerText = "Negative Punkte: " + negativePoints + " | Ausgleichspunkte: " + compensationPoints + " | Ausgeglichen: " + ["Nein", "Ja"][Number(compensationPoints >= 2*negativePoints)];
}

function calculateObtainedGrade() {
    let maxPoints = document.getElementById("maximalPoints").value;
    let obtainedPoints = document.getElementById("obtainedPoints").value;

    let obtainedGrade = customRound(obtainedPoints/maxPoints * 5 + 1, 1/1000);
    let pointsForFour = Number(customRound(maxPoints * 0.6, 1/10)).toFixed(1);
    console.log(pointsForFour)

    document.getElementById("obtainedPointsOutput").innerText = "Erreichte Note: " + obtainedGrade + " | Punkte für 4: " + pointsForFour;
}

function calculateNeededPoints() {
    let maxPoints = document.getElementById("maximalPoints").value;
    let desiredGrade = document.getElementById("desiredGrade").value;
    
    let neededPoints = customRound((desiredGrade-1)/5 * maxPoints, 1/1000);

    document.getElementById("desiredGradeOutput").innerText = "Benötigte Punkte: " + neededPoints;
}
