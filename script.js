function getAverage(returnValues=false) {
    let totalScore = 0;
    let totalWeight = 0;
    for (let i = 1; i <= 6; i++) {
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
    document.getElementById("averageOutput").innerHTML = "Durchschnitt: " + totalScore/totalWeight;
}

function roundToClosestHundreth(number) {
    return Math.round(number*100)/100;
}

function getNeeded() {
    let [totalScore, totalWeight] = getAverage(returnValues=true);
    let targetGrade = Number(document.getElementById("grade7").value);
    let nextWeight = Number(document.getElementById("weight7").value);
    let requiredGrade = (targetGrade * (totalWeight+nextWeight) - totalScore)/nextWeight;
    document.getElementById("neededOutput").innerHTML = "Benötigte Note: " + roundToClosestHundreth(requiredGrade);
}
