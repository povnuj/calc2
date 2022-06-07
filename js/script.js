class Calculator {
    constructor(res) {
        let values = []
        this.values = values;
        this.res = res;
    }

    
    mathOperation = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
        '%': (a, b) => a * (b / 100),
        'xto': (a, b) => a / (b),
        'sqrt': (a, b) => a ** b
    };

    get getValues() {
        return this.values;
    }

    get result() {
        return this.res;
    }

    set setValues(value) {
        this.values.push(value);
    }

    calc(operation, a, b) {
        try {
            if (operation != undefined) {
                return this.mathOperation[operation](a, b);
            } else this.res += this.mathOperation[this.values[1]](+this.values[0], +this.values[2]);
        } catch (error) {
            this.res = error.message;
        }
    }
}

class Interface {
    constructor() {
        let secondInput = document.querySelector('.enterLine');
        let firstInput = document.querySelector('.topEnterLine');
        this.firstInput = firstInput;
        this.secondInput = secondInput;
    };

    get getSecondInput() {
        return this.secondInput.value
    }

    set setSecondInput(val) {
        if (val.match(/[0-9]/)) this.mathDigits(val);
        if (val == '.') this.point(val);
        if (val.match(/[\/*\-+\(\)=]/) && this.secondInput.value != '') this.mathOperationInterfaces(val);
        if (val == 'escape') this.clearEdit();
        if (val == 'cls') this.clearAllEdit(1, 2, 3, 4);
        if (val == 'backspace') this.dellItem();
        if (this.secondInput.value != '') {
            if (val == '%') this.percent();
            if (val == 'xto') this.xToOne();
            if (val == 'pow') this.pow(1);
            if (val == 'sqrt') this.pow(0);
            if (val == 'pm') this.pluseMinus();
        }
    }

    get getfirstInput() {
        return this.firstInput.value;
    }

    set setFirstInput(val) {
        this.firstInput.value += val;
    }

    clearEdit() {
        this.secondInput.value = '';
    }

    clearAllEdit(item) {
        {
            let argMas = [].slice.call(arguments).map(val => {
                switch (val) {
                    case 1: this.secondInput.value = ''; break;
                    case 2: this.firstInput.value = ''; break;
                    case 3: calc.values.length = 0; break;
                    case 4: calc.res = 0; break;
                }
            });
        }
    }

    mathOperationInterfaces(val) {
        if (calc.getValues == 0 && val != '=') {
            this.clearAllEdit(2, 4);
            calc.setValues = this.secondInput.value;
            this.setFirstInput = this.secondInput.value + ' ' + val + ' ';
            calc.setValues = val;
            this.clearEdit();
        } else if (calc.getValues.length >= 2) {
            calc.setValues = this.secondInput.value;
            calc.setValues = val;
            calc.calc();
            this.firstInput.value = calc.getValues.join(' ');
            this.secondInput.value = calc.result;
            if (calc.getValues[3] == '=') {
                this.clearAllEdit(3);
            } else {
                this.clearAllEdit(2, 3);
                calc.setValues = this.secondInput.value;
                calc.setValues = val;
                this.setFirstInput = calc.getValues.join(' ');
                this.clearAllEdit(4, 1);
            }
        }
    }

    mathDigits(val) {
        if (calc.getValues.length == 0 && this.firstInput.value != '') {
            this.clearAllEdit(1, 2, 4);
        }
        this.secondInput.value += val;
    }

    point(val) {
        let counter = 0;
        this.secondInput.value.split('').forEach(item => {
            if (item == '.') counter++;
        });
        if (this.secondInput.value != '' && counter < 1) {
            this.secondInput.value += val;
        }
    }
    dellItem(tmp) {
        tmp = this.secondInput.value.split('');
        tmp.pop();
        this.secondInput.value = tmp.join('');
    }
    percent() {
        if (calc.getValues.length != 0) {
            this.secondInput.value = calc.calc('%', calc.getValues[0], +this.getSecondInput);
            this.clearAllEdit(2);
            this.setFirstInput = calc.getValues.join(' ');
        }
    }
    xToOne() {
        this.setFirstInput = this.getSecondInput;
        this.secondInput.value = calc.calc('xto', 1, +this.getSecondInput);
    }
    pow(val) {
        if (val > 0) this.secondInput.value = calc.calc('sqrt', 2, +this.getSecondInput);
        else this.secondInput.value = calc.calc('sqrt', +this.getSecondInput, (1 / 2));
    }
    pluseMinus() {
        if (+this.getSecondInput > 0) this.secondInput.value = this.getSecondInput * (-1);
        else this.secondInput.value = Math.abs(this.getSecondInput);
    }

}

let calc = new Calculator(0);
let interfaceCalc = new Interface();



let mouseClick = document.querySelectorAll('.btn');
mouseClick.forEach((el) => {
    el.addEventListener('click', (element) => {
        if (element.target.id.match(/[0-9%\/*\-+\(\)=.]|backspace|escape|pm|sqrt|c|xto|pow/)) {
            interfaceCalc.setSecondInput = element.target.id;
        }
    });
});





/*
document.addEventListener('keydown', event => {
    if ((event.key).match(/[0-9%\/*\-+\(\)=]|Backspace|Escape|Enter/)) CalcNow(event.key)
        console.log(event.key)
})

*/