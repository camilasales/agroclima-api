//TODO - ajustar esse helper

export default class FormatHelper {
    constructor() {
    }

    //Converte a data no formato americano para formato brasileiro
    public dateEnToPTBR(param :any) {
        if (param) {
            try {
                let data = new Date(param);

                let ano = data.getFullYear();
                let mes = (data.getMonth() + 1);
                let dia = data.getUTCDate();

                let retorno = (dia.toString().length < 2 ? '0' + dia : dia) + '/' + (mes.toString().length < 2 ? '0' + mes : mes) + '/' + ano;

                return retorno;
            } catch (error) {
                throw error;
            }
        }

        return null;
    }

    public formatCpfCnpj (param: any) {
        //faz nada caso o valor false
        if(!param) {
            return param;
        }

        param = param.replace(/\D/g, "")

        if (param.length < 14) { //CPF
            param = param.replace(/(\d{3})(\d)/, "$1.$2");
            param = param.replace(/(\d{3})(\d)/, "$1.$2");
            param = param.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        } else { //CNPJ
            param = param.replace(/^(\d{2})(\d)/, "$1.$2");
            param = param.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
            param = param.replace(/\.(\d{3})(\d)/, ".$1/$2");
            param = param.replace(/(\d{4})(\d)/, "$1-$2");
        }

        return param;
    }

    public formatCep(param: any) {
        //faz nada caso o valor false
        if(!param) {
            return param;
        }

        var retorno = /^([\d]{2})\.*([\d]{3})-*([\d]{3})/;

        if (retorno.test(param)) {
            return param.replace(retorno, "$1$2-$3");
        }

        return null;
    }


    public formatRg(param: any) {
        //faz nada caso o valor false
        if(!param) {
            return param;
        }

        param = param.replace(/(\d{2})(\d)/, "$1.$2");
        param = param.replace(/(\d{3})(\d)/, "$1.$2");
        param = param.replace(/(\d{3})(\d{1})$/, "$1-$2");

        return param;
    }

    public formatarMoeda(param: any) {

        //faz nada caso o valor false
        if(!param) {
            return param;
        }

        param = param ? parseFloat(param) : parseFloat('0');

        let retorno = param.toFixed(2) // casas decimais
            .replace('.', ',')
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

        return 'R$ ' + retorno;
    }

    public formatarPeso(param: any) {

        //faz nada caso o valor false
        if(!param) {
            return param;
        }

        param = param ? parseFloat(param) : parseFloat('0');

        let retorno = param.toFixed(2) // casas decimais
            .replace('.', ',')
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

        return retorno;
    }
}

export const limparCpfCnpj = (param: any) => {
    return param
        .replaceAll(' ', '')
        .replaceAll('.', '')
        .replaceAll('-', '')
        .replaceAll('/', '');
}

