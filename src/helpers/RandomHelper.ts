//Coloque aqui todas as funcionalidade que gerem coisas aleatórias

export const gerarCodigo = (length: number, chars: string = 'aA#*') => {
    let mask = '';

    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    if (chars.indexOf('*') > -1) mask += '*&$@';
    if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';

    let result = '';
    for (let i = length; i > 0; --i) {
        result += mask[Math.floor(Math.random() * mask.length)];
    }

    return result;
};
