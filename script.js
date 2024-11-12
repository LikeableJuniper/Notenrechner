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
    document.getElementById("averageOutput").innerHTML = "Durchschnitt: " + roundToThousands(totalScore/totalWeight);
}

function calculatePoints() {
    let points = 0;
    let grades = [];
    for (let i = 1; i <= 14; i++) {
        let grade = Number(document.getElementById("grade" + i).value);
        //weights are irrelevant for calculating points, as all final averages should have a weight of 1 towards the point score
        if (grade != 0) {
            grades.push(grade)
        }
    }
    for (let i = 0; i < 5; i++) {
        let minimum = Math.min(...grades);
        let index = grades.indexOf(minimum);
        points += minimum;
        grades.splice(index, 1);
        if (grades.length == 0) {
            break
        }
    }
    let outputField = document.getElementById("pointsOutput");
    outputField.innerHTML = "Punkte: " + points + "/19";
}

function roundToThousands(number) {
    return Math.round(number*1000)/1000;
}

function getNeeded() {
    getAverage();
    let [totalScore, totalWeight] = getAverage(returnValues=true);
    let targetGrade = Number(document.getElementById("neededGrade").value);
    let nextWeight = Number(document.getElementById("neededWeight").value);
    let requiredGrade = (targetGrade * (totalWeight+nextWeight) - totalScore)/nextWeight;
    document.getElementById("neededOutput").innerHTML = "Benötigte Note: " + roundToThousands(requiredGrade);
}
