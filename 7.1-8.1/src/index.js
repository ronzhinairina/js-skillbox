import "./index.css";
import IMask from 'imask';
import { cardnumberMask } from "./components/card-mask";

window.onload = function () {

    const name = document.getElementById('name');
    const cardnumber = document.getElementById('cardnumber');
    const expirationdate = document.getElementById('expirationdate');
    const securitycode = document.getElementById('securitycode');
    const ccicon = document.getElementById('    ');
    const ccsingle = document.getElementById('ccsingle');
    const email = document.getElementById('email');

    const expirationdateMask = new IMask(expirationdate, {
        mask: Date,
        pattern: 'M/`Y',
        blocks: {
            M: {
                mask: IMask.MaskedRange,
                from: 1,
                to: 12,
                maxLength: 2,
            },
            Y: {
                mask: IMask.MaskedRange,
                from: new Date().getFullYear() % 1000,
                to: new Date().getFullYear() % 1000 + 20,
                maxLength: 2,
            }
        },
        format: function (date) {
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            if (month < 10) month = "0" + month;
            if (date.getTime() > new Date().getTime()) {
                return [month, year % 1000].join('/');
            }

            return '';
        },
        parse: function (str) {
            const yearMonthDay = str.split('/');
            return new Date(2000 + Number(yearMonthDay[1]), yearMonthDay[0] - 1)
        },
        autofix: true,
    });

    const securitycodeMask = new IMask(securitycode, {
        mask: '000',
    });

    const emailRegExp = /.+@.+\..+/;

    const swapColor = function (basecolor) {
        document.querySelectorAll('.lightcolor')
            .forEach(function (input) {
                input.setAttribute('class', '');
                input.setAttribute('class', 'lightcolor ' + basecolor);
            });
        document.querySelectorAll('.darkcolor')
            .forEach(function (input) {
                input.setAttribute('class', '');
                input.setAttribute('class', 'darkcolor ' + basecolor + 'dark');
            });
    };

    cardnumberMask.on("accept", function () {
        switch (cardnumberMask.masked.currentMask.cardtype) {
            case 'visa':
                ccicon.classList.add('visa');
                ccsingle.innerHTML = SVG.visa_single;
                swapColor('lime');
                break;
            case 'mastercard':
                ccicon.innerHTML = SVG.mastercard;
                ccsingle.innerHTML = SVG.mastercard_single;
                swapColor('lightblue');

                break;
            case 'unionpay':
                ccicon.innerHTML = SVG.unionpay;
                ccsingle.innerHTML = SVG.unionpay_single;
                swapColor('cyan');
                break;
            default:
                ccicon.innerHTML = '';
                ccsingle.innerHTML = '';
                swapColor('grey');
                break;
        }
    });

    document.querySelector('.preload').classList.remove('preload');
    document.querySelector('.creditcard').addEventListener('click', function () {
        if (this.classList.contains('flipped')) {
            this.classList.remove('flipped');
        } else {
            this.classList.add('flipped');
        }
    })

    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            document.getElementById('svgname').innerHTML = 'John Doe';
            document.getElementById('svgnameback').innerHTML = 'John Doe';
        } else {
            document.getElementById('svgname').innerHTML = this.value;
            document.getElementById('svgnameback').innerHTML = this.value;
        }
    });

    cardnumberMask.on('accept', function () {
        if (cardnumberMask.value.length == 0) {
            document.getElementById('svgnumber').innerHTML = '0123 4567 8910 1112';
        } else {
            document.getElementById('svgnumber').innerHTML = cardnumberMask.value;
        }
    });

    expirationdateMask.on('accept', function () {
        if (expirationdateMask.value.length == 0) {
            document.getElementById('svgexpire').innerHTML = '01/23';
        } else {
            document.getElementById('svgexpire').innerHTML = expirationdateMask.value;
        }
    });

    securitycodeMask.on('accept', function () {
        if (securitycodeMask.value.length == 0) {
            document.getElementById('svgsecurity').innerHTML = '985';
        } else {
            document.getElementById('svgsecurity').innerHTML = securitycodeMask.value;
        }
    });

    email.addEventListener('blur', () => {
        if (!emailRegExp.test(email.value)) {
            email.classList.add('invalid');
        } else {
            email.classList.remove('invalid')
        }
    })

    name.addEventListener('focus', function () {
        document.querySelector('.creditcard').classList.remove('flipped');
    });

    cardnumber.addEventListener('focus', function () {
        document.querySelector('.creditcard').classList.remove('flipped');
    });

    securitycode.addEventListener('focus', function () {
        document.querySelector('.creditcard').classList.add('flipped');
    });

    const inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('change', () => {
            const btn = document.querySelector('#submit');
            if (name.value && cardnumber.value && expirationdate.value && securitycode.value && email.value) {
                btn.disabled = false;
            } else {
                btn.disabled = true;
            }
        });
    }
};