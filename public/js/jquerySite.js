/*--- MÁSCARA DATA ---*/

function formatar(src, mask) {
	var i = src.value.length;
	var saida = mask.substring(0, 1);
	var texto = mask.substring(i)
	if (texto.substring(0, 1) != saida) {
		src.value += texto.substring(0, 1);
	}
}

/* Valida Data */

var reDate4 = /^((0?[1-9]|[12]\d)\/(0?[1-9]|1[0-2])|30\/(0?[13-9]|1[0-2])|31\/(0?[13578]|1[02]))\/(19|20)?\d{2}$/;
var reDate = reDate4;

function doDateVenc(Id, pStr, pFmt) {
	d = document.getElementById(Id);
	if (d.value != "") {
		if (d.value.length < 10) {
			alert("Data Inválida!\nDigite corretamente a data: dd/mm/aaaa !");
			d.value = "";
			d.focus();
			return false;
		} else {

			eval("reDate = reDate" + pFmt);
			if (reDate.test(pStr)) {
				return false;
			} else if (pStr != null && pStr != "") {
				alert("ALERTA DE ERRO!!\n\n" + pStr + " NÃO é uma data válida.");
				d.value = "";
				d.focus();
				return false;
			}
		}
	} else {
		return false;
	}

}

/*--- FIM MÁSCARA DATA ---*/

/*--- MÁSCARA CPF ---*/

function mascaraMutuario(o, f) {
	v_obj = o
	v_fun = f
	setTimeout('execmascara()', 1)
}

function execmascara() {
	v_obj.value = v_fun(v_obj.value)
}

function cpfCnpj(v) {

	//Remove tudo o que não é dígito
	v = v.replace(/\D/g, "")

	if (v.length <= 14) {//CPF

		//Coloca um ponto entre o terceiro e o quarto dígitos
		v = v.replace(/(\d{3})(\d)/, "$1.$2")

		//Coloca um ponto entre o terceiro e o quarto dígitos
		//de novo (para o segundo bloco de números)
		v = v.replace(/(\d{3})(\d)/, "$1.$2")

		//Coloca um hífen entre o terceiro e o quarto dígitos
		v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2")

	} else {//CNPJ

		//Coloca ponto entre o segundo e o terceiro dígitos
		v = v.replace(/^(\d{2})(\d)/, "$1.$2")

		//Coloca ponto entre o quinto e o sexto dígitos
		v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")

		//Coloca uma barra entre o oitavo e o nono dígitos
		v = v.replace(/\.(\d{3})(\d)/, ".$1/$2")

		//Coloca um hífen depois do bloco de quatro dígitos
		v = v.replace(/(\d{4})(\d)/, "$1-$2")

	}

	return v
}

/*--- FIM MÁSCARA CPF ---*/

/*--- MÁSCARA TELEFONE ---*/

function mascara(o, f) {
	v_obj = o
	v_fun = f
	setTimeout("execmascara()", 1)
}

function execmascara() {
	v_obj.value = v_fun(v_obj.value)
}

function mtel(v) {
	v = v.replace(/\D/g, "");
	//Remove tudo o que não é dígito
	v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
	//Coloca parênteses em volta dos dois primeiros dígitos
	v = v.replace(/(\d)(\d{4})$/, "$1-$2");
	//Coloca hífen entre o quarto e o quinto dígitos
	return v;
}

function id(el) {
	return document.getElementById(el);
}

window.onload = function() {
	id('telefone').onkeyup = function() {
		mascara(this, mtel);
	}
}
/*--- FIM MÁSCARA TELEFONE ---*/

/*--- ONLOAD ---*/

$(document).ready(function() {

	/*--- HABILITAR CAMPO ---*/
	$('.disable').prop("disabled", true);

	$('.seletor').on('change', function() {
		if ($(this).val() === "SIM") {
			$('.disable').first().prop("disabled", false);
		} else {
			$('.disable').prop("disabled", true);
		}
	});

	/*--- FIM HABILITAR CAMPO ---*/

	$("#divPacientes ul li").click(function() {
		$(this).toggleClass("select");
	});

	$("a.btnEvol").click(function() {
		$("#divEvo").slideToggle("fast");
	});
});
