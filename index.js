let votes = [];
let all_mandates;
let result = [];


function calculate() {
    for (let i = 0; i < 15; i++) {
        if (document.getElementById(`v${Number.parseInt(i) + 1}`).value != "") {
            votes.push(Number.parseInt(document.getElementById(`v${Number.parseInt(i) + 1}`).value));
        }
        else {
            votes.push(0);
        }
    }

    if (votes.length > 0) {
        if (document.getElementById(`all_m`).value != "") {
            all_mandates = Number.parseInt(document.getElementById(`all_m`).value);

            let all_votes = 0;
            for (let i in votes) {
                all_votes += votes[i];
            }

            let kvota = all_votes / all_mandates;

            let first_result = [];
            let mandates = 0;

            for (let i in votes) {
                if (votes[i] != 0) {
                    first_result.push(votes[i] / kvota);
                    result.push(Math.floor(first_result[i]));
                    mandates += Number.parseInt(result[i]);
                    first_result[i] = Math.trunc((first_result[i] - Math.floor(first_result[i])) * Math.pow(10, 5));  
                }      
            }

            console.log(first_result);

            let remains = all_mandates - mandates;

            let reserv_first_result = first_result.slice(0);

            first_result.sort((prev, next) => next - prev);

            console.log(reserv_first_result);
            console.log(first_result);

            for (let i = 0; i < remains; i++) {
                for (let j in reserv_first_result) {
                    if (first_result[i] == reserv_first_result[j]) {
                        result[j]++;
                    }
                }
            }


            for (let i in votes) {
                //if (result[i] != 0) {
                    document.getElementById(`m${Number.parseInt(i) + 1}`).value = result[i];
                //}
            }

            
        } else {
            alert("Введите общее количество мандатов!")
        }
    } else {
        alert("Введите голоса хотя бы одной партии!")
    }

    votes = [];
    all_mandates = null;
    result = [];
}