$(document).ready(function(){
	var data = arrObj();
	var conta = 0;

	$("#home").on("click", function() {
		$(".menu_icos").removeClass("active");
		$("#home").addClass("active");
		$("#tit_txt_menu").text('Home');
	});

	$("#remesa").on("click", function() {
		$(".menu_icos").removeClass("active");
		$("#remesa").addClass("active");
		$("#tit_txt_menu").text('Remesas');
	});

	$("#tarjeta").on("click", function() {
		$(".menu_icos").removeClass("active");
		$("#tarjeta").addClass("active");
		$("#tit_txt_menu").text('Tarjeta');
	});

	$("#edo_cuenta").on("click", function() {
		$(".menu_icos").removeClass("active");
		$("#edo_cuenta").addClass("active");
		$("#tit_txt_menu").text('Edo. de cuenta');
	});

	$("#sig_opera").on("click", function() {
		$(".menu_icos").removeClass("active");
		$("#sig_opera").addClass("active");
		$("#tit_txt_menu").text('Siguiente operación');
	});

	$("#estadistica").on("click", function() {
		$(".menu_icos").removeClass("active");
		$("#estadistica").addClass("active");
		$("#tit_txt_menu").text('Estadisticas');
	});

	$("#busTab").on("click", function() {
		$(".icons_her").removeClass("activeHer");
		$("#busTab").addClass("activeHer");
		$('.dt-search').show();
	});

	$("#filTab").on("click", function() {
		$(".icons_her").removeClass("activeHer");
		$("#filTab").addClass("activeHer");
		$('.dt-search').hide();
	});

	$("#impTab").on("click", function() {
		$(".icons_her").removeClass("activeHer");
		$("#impTab").addClass("activeHer");
		$('.dt-search').hide();
	});

	$("[id^=tecla_]").on("click", function() {
		var valor = $(this).attr('id').split('_');
		var val_inp = '';
		if (valor[1] == 'del') {
			$('#id_rem').val($('#id_rem').val().substring(0,$('#id_rem').val().length -1));
			if (conta > 0) {
				conta--;
			}
		} else if (valor[1] == 'ent') {
			$("#busTab").on("click", function() {
  				$('#dt-search-0').val($('#id_rem').val());
  				$("#dt-search-0").trigger("click");
			});
			$("#busTab").trigger("click");
			$("#dt-search-0").trigger("click");
k		} else if (valor[1] == '.') {
			alert('El punto no es valido para el ID de la remesa');
		} else {
			if (conta < 8) {
				$('#id_rem').val($('#id_rem').val()+valor[1]);
				conta++;
			} else {
				alert('Exediste la cantidad de caracteres (8)');
			}
		}
	});

	tNow = Date.now();
	hoy = new Date(tNow);

	$("#fecha").text(hoy.toDateString());

	$('#remesasTable').DataTable({
		scrollY: 200,
		searching: true,
		ordering:  false,
		"bLengthChange": false,
	    data: data,
	    columns: [
	    	{ data: 'charged_at'},
	        { data: 'id' },
	        { data: 'company' },
	        { data: 'amount' },
	        { data: 'created_at' },
	        { data: 'status' }
	    ],
	    columnDefs: [
        	{
            	target: 0,
            	visible: false,
            	searchable: false
        	},
        	{
            	target: 4,
            	visible: false,
            	searchable: false
        	},
        	{
            	target: 5,
            	visible: false,
            	searchable: false
        	}
    	],
    	order: {
        	name: 'charged_at',
        	dir: 'desc'
    	}
	});

	$('.dt-search').hide();

	console.log(data);
});

function arrObj(){
	var remesas = [];
	var num = 0;
	for (var i = 0; i < 20; i++) {
		num = getRandom();
		if ((num % 2) == 0) {
			var estatus = 'COBRADO';
			if (i < 10) {
				var fechaC = '2023120'+(i+1);
			} else {
				var fechaC = '2023120'+(i+1);
			}
		} else {
			var estatus = 'NO_COBRADO';
			var fechaC = '';
		}
		remesa = {
			"id":num,
			"company":"Western Union",
			"amount":(i+1)*1500,
			"status":estatus,
			"created_at":"20231201",
			"charged_at":fechaC
		}
		remesas.push(remesa)
	}
	return remesas;
}

function getRandom() {
 	min = Math.ceil(0);
  	max = Math.floor(99999999);
  	return Math.floor(Math.random() * (max - min + 1) + min);
}