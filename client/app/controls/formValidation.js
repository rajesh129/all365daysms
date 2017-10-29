export function validateEmail(email) {
    var emailregex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailregex.test(email);
}

export function validateAlphabet(alpha) {
    var regex = /^[A-Za-z]+$/;
    return regex.test(alpha);
}

export function validatePhoneNumber(num) {
    var regex = /^\d{10}$/;
    return regex.test(num);
}

export function validateNumber(num) {
    var regex = /^\d+/;
    return regex.test(num);
}

export function validateLineBreak(line) {
    var regex = (line.match(/\n/g)||[]).length;
    console.log(regex);
}

