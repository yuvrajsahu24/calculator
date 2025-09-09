let display = document.getElementById('display');
const equal = document.getElementById('equal');

function appendValue(val) {
    display.value += val;
}

function clearAll() {
    display.value = "";
}
function deleteLast(){
    display.value= display.value.slice(0,-1);
}

equal.addEventListener('click', calculateValue);

function calculateValue() {
    let allVal = display.value;
    let result = calculation(allVal);
    display.value = result;
}

function calculation(allVal) {
    // Tokenize the input
    let tokens = [];
    let num = "";

    for (let i = 0; i < allVal.length; i++) {
        let ch = allVal[i];
        if (!isNaN(ch) || ch === ".") {
            num += ch;
        } else {
            if (num !== '') {
                tokens.push(parseFloat(num));
                num = "";
            }
            tokens.push(ch);
        }
    }
    if (num !== "") tokens.push(parseFloat(num));

    // First pass: handle * and /
    let stack = [];
    for (let i = 0; i < tokens.length; i++) {
        let ch = tokens[i];
        if (ch === '*' || ch === '/') {
            let prev = stack.pop();
            let next = tokens[++i];
            if (ch === '*') {
                stack.push(prev * next);
            } else {
                stack.push(prev / next);
            }
        } else {
            stack.push(ch);
        }
    }

    // Second pass: handle + and -
    let result = stack[0];
    for (let i = 1; i < stack.length; i++) {
        let ch = stack[i];
        if (ch === '+') {
            result += stack[++i];
        } else if (ch === '-') {
            result -= stack[++i];
        }
    }
    return result;
}
