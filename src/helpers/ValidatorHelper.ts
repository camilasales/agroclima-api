export const validaCpfCnpj = (str: any) => {    
    str = str.replace(/\./gi, "");
    str = str.replace(/\//gi, "");
    str = str.replace(/\-/gi, "");

    if ((str == '00000000000') ||
        (str == '11111111111') ||
        (str == '22222222222') ||
        (str == '33333333333') ||
        (str == '44444444444') ||
        (str == '55555555555') ||
        (str == '66666666666') ||
        (str == '77777777777') ||
        (str == '88888888888') ||
        (str == '99999999999') ||
        (str == '01234567890')) {
        return false;
    }

    if (str.length == 14) {
        let b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

        if ((str = str != null ? str.replace(/[^\d]/g, "") : '').length == 14) {

            if (/0{14}/.test(str))
                return false;

            for (var i = 0, n = 0; i < 12; n += str[i] * b[++i]);
            if (str[12] != (((n %= 11) < 2) ? 0 : 11 - n))
                return false;

            for (var i = 0, n = 0; i <= 12; n += str[i] * b[i++]);
            if (str[13] != (((n %= 11) < 2) ? 0 : 11 - n))
                return false;

        }
    } else if (str.length == 11) {
        let numero: number = 0;
        let caracter: string = '';
        let numeros: string = '0123456789';
        let j: number = 10;
        let somatorio: number = 0;
        let resto: number = 0;
        let digito1: number = 0;
        let digito2: number = 0;
        let cpfAux: string = '';

        cpfAux = str.substring(0, 9);

        for (let i: number = 0; i < 9; i++) {
            caracter = cpfAux.charAt(i);
            if (numeros.search(caracter) == -1) {
                return false;
            }
            numero = Number(caracter);
            somatorio = somatorio + (numero * j);
            j--;
        }

        resto = somatorio % 11;
        digito1 = 11 - resto;

        if (digito1 > 9) {
            digito1 = 0;
        }

        j = 11;
        somatorio = 0;
        cpfAux = cpfAux + digito1;

        for (let i: number = 0; i < 10; i++) {
            caracter = cpfAux.charAt(i);
            numero = Number(caracter);
            somatorio = somatorio + (numero * j);
            j--;
        }
        resto = somatorio % 11;
        digito2 = 11 - resto;

        if (digito2 > 9) {
            digito2 = 0;
        }
        cpfAux = cpfAux + digito2;

        if (str != cpfAux) {
            return false;
        }
    }


    return true;
}

export const validaEmail = (email: any) => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(email);
}

