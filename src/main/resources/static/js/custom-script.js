﻿

//maskmoney
$(function() {
	
	var decimal = $('.js-decimal');
	decimal.maskMoney({ prefix:'R$ ', decimal: ',', thousands: '.', affixesStay: false });
	
	var plain = $('.js-plain');
	plain.maskMoney({ precision: 0, thousands: '.' });
	
	var double = $('.js-double');
	double.maskMoney({ precision: 3, allowZero:true, decimal: ',' });
});


//datepicker

$.extend($.fn.pickadate.defaults, {
    monthsFull: [ 'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro' ],
    monthsShort: [ 'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez' ],
    weekdaysFull: [ 'domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado' ],
    weekdaysShort: [ 'dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab' ],
    today: 'hoje',
    clear: 'limpar',
    close: 'fechar',
    format: 'dd/mm/yyyy',
    formatSubmit: 'dd/mm/yyyy'
});

$.extend($.fn.pickadate.defaults, {
    clear: 'limpar'
});


//confirmar senha
$("#formValidate").validate({
    rules: {
        
        password: {
			required: false,
			minlength: 6
		},
		cpassword: {
			required: false,
			equalTo: "#password"
		},
		email: {
            required: false,
            email:false
        },
		
        cgender:"required",
		cagree:"required",
    },
    //For custom messages
    messages: {
       
    	 
        password:{
            minlength:"A senha deve ter no mínimo 6 caracteres!"
        },
        cpassword:{
        	equalTo: "Senhas não Conferem!"
        },
        
    },
    errorElement : 'div',
    errorPlacement: function(error, element) {
      var placement = $(element).data('error');
      if (placement) {
        $(placement).append(error)
      } else {
        error.insertAfter(element);
      }
    }
 });
//$(window).load(function() {
//	$.ajax({
//		url: '/dashboard/pormes',
//		method: 'GET', 
//		success: function(vendaMes) {
//			var meses = [];
//			var valores = [];
//			console.log(vendaMes);
//			vendaMes.forEach(function(obj) {
//				meses.unshift(obj.mes);
//				valores.unshift(obj.total);
//			});
//
//			var data = {
//					  labels: meses,
//					  series: [
//					    valores
//					  ]
//					};
//
//			new Chartist.Bar('.meu-chart', data);
//		}
//	});
//	
//});

$(window).load(function() {
	var totalDia = $(".js-totalDia");
	function format (num) {
	    return num
	       .toFixed(2)
	       .replace(".", ",")
	       .replace(/(\d)(?=(\d{3})+(?!\d))/g, "1.")
	}
	$.ajax({
		url: '/dashboard/pordia',
		method: 'GET', 
		success: function(venda) {
			var vendaFormatada = format(venda);
			if (venda != null) {
				totalDia.text('R$ '+vendaFormatada);
			}else{
				totalDia.text('R$ 0,00');
			}
		}
	});
	
});



