document.addEventListener("DOMContentLoaded", function () {
  var tiposCredito = [
    {
      name: "PRODUCTIVO PYMES",
      porcentaje: "10.4%",
      min: 5000,
      max: 200000,
      minMeses: 1,
      maxMeses: 60,
      tasaNominal: "10.4%",
      tasaEfectiva: "0.87%",
    },
    {
      name: "PRODUCTIVO EMPRESARIAL",
      porcentaje: "9.3%",
      min: 5000,
      max: 200000,
      minMeses: 1,
      maxMeses: 60,
      tasaNominal: "9.3%",
      tasaEfectiva: "0.78%",
    },
    {
      name: "PRODUCTIVO CORPORATIVO",
      porcentaje: "8.3%",
      min: 5000,
      max: 200000,
      minMeses: 1,
      maxMeses: 60,
      tasaNominal: "8.3%",
      tasaEfectiva: "0.69%",
    },
    {
      name: "CONSUMO",
      porcentaje: "14%",
      min: 400,
      max: 200000,
      minMeses: 1,
      maxMeses: 120,
      tasaNominal: "14%",
      tasaEfectiva: "1.17%",
    },
    {
      name: "MICROCREDITO",
      porcentaje: "17.99%",
      min: 400,
      max: 10000,
      minMeses: 1,
      maxMeses: 72,
      tasaNominal: "17.99%",
      tasaEfectiva: "1.5%",
    },
    {
      name: "VIVIENDA",
      porcentaje: "9.5%",
      min: 5000,
      max: 200000,
      minMeses: 1,
      maxMeses: 120,
      tasaNominal: "9.5%",
      tasaEfectiva: "0.79%",
    },
    {
      name: "ESTUDIANTIL",
      porcentaje: "12.2%",
      min: 400,
      max: 20000,
      minMeses: 1,
      maxMeses: 60,
      tasaNominal: "12.2%",
      tasaEfectiva: "1.02%",
    },
    {
      name: "MAESTRIAS",
      porcentaje: "12.2%",
      min: 400,
      max: 35000,
      minMeses: 1,
      maxMeses: 60,
      tasaNominal: "12.2%",
      tasaEfectiva: "1.02%",
    },
    {
      name: "PHD",
      porcentaje: "12.2%",
      min: 400,
      max: 30000,
      minMeses: 1,
      maxMeses: 84,
      tasaNominal: "12.2%",
      tasaEfectiva: "1.02%",
    },
  ];

  var tiposAmortizar = [
    { name: "ALEMAN (CUOTA VARIABLE)" },
    { name: "FRANCÉS (CUOTA FIJA)" },
  ];

  var seleccionarCredito = document.getElementById("tipoCredito");
  var seleccionarAmortizar = document.getElementById("tipoAmortizacion");

  var montoInput = document.getElementById("amount");
  var porcentajeCredito = document.getElementById("porcentajeCredito");

  var mesesInput = document.getElementById("numMeses");

  var rangoMonto = document.getElementById("rangoMonto");
  var rangoMeses = document.getElementById("rangoMeses");

  var btnLimpiar = document.getElementById("btnLimpiar");

  //Visualizacion de Campos

  window.onload = function () {
    montoInput.disabled = true;
    mesesInput.disabled = true;
    rangoMonto.style.display = "none";
    rangoMeses.style.display = "none";
  };

  seleccionarCredito.addEventListener("change", function () {
    if (this.value) {
      montoInput.disabled = false;
      mesesInput.disabled = false;
      rangoMonto.style.display = "block";
      rangoMeses.style.display = "block";
    } else {
      montoInput.disabled = true;
      mesesInput.disabled = true;
      rangoMonto.style.display = "none";
      rangoMeses.style.display = "none";
    }
  });

  // Limpiar los campos
  btnLimpiar.addEventListener("click", function () {
    amount.value = "";
    numMeses.value = "";
    porcentajeCredito.textContent = "%";

    montoInput.value = "";
    mesesInput.value = "";

    montoInput.disabled = true;
    mesesInput.disabled = true;

    rangoMonto.style.display = "none";
    rangoMeses.style.display = "none";

    seleccionarCredito.value = "";
    seleccionarAmortizar.value = "";

    limpiarTabla();
    
  });

  tiposCredito.forEach(function (credit) {
    var opcion = new Option(
      credit.name,
      credit.name +
        "|" +
        credit.porcentaje +
        "|" +
        credit.min +
        "|" +
        credit.max +
        "|" +
        credit.minMeses +
        "|" +
        credit.maxMeses +
        "|" +
        credit.tasaNominal +
        "|" +
        credit.tasaEfectiva
    );
    seleccionarCredito.add(opcion);
  });

  tiposAmortizar.forEach(function (amortizar) {
    var opcion = new Option(amortizar.name);
    seleccionarAmortizar.add(opcion);
  });

  seleccionarCredito.addEventListener("change", function () {
    updateCreditInfo();
    var creditInfo = this.value.split("|");
    montoInput.dataset.min = creditInfo[2];
    montoInput.dataset.max = creditInfo[3];
    montoInput.value = formatoMoneda(creditInfo[2]); // Establece el valor del input al mínimo
    mesesInput.dataset.minMeses = creditInfo[4];
    mesesInput.dataset.maxMeses = creditInfo[5];
    mesesInput.value = creditInfo[4]; // Establece el valor del input al mínimo
  });

  updateCreditInfo(); // Actualiza la información al cargar la página

  document.getElementById("btnEnviar").addEventListener("click", function () {
    limpiarTabla();
    // Recupera la información del formulario
    var tipoCreditoSeleccionado = seleccionarCredito.value.split("|");
    var tasaNominalCredito = limpiarFormatoPorcentaje(
      tipoCreditoSeleccionado[6]
    );
    var tasaEfectivaCredito = limpiarFormatoPorcentaje(
      tipoCreditoSeleccionado[7]
    );

    var tipoAmortizacionSeleccionado = seleccionarAmortizar.value;
    var monto = limpiarFormatoMoneda(montoInput.value);
    var meses = mesesInput.value;

    if (!tipoAmortizacionSeleccionado) {
      alert(
        "La amortización está vacía. Por favor, seleccione un tipo de amortización."
      );
      return;
    }


    if (tipoAmortizacionSeleccionado === "ALEMAN (CUOTA VARIABLE)") {
      amortizarAlemana(tasaNominalCredito, monto, meses);
    } else if (tipoAmortizacionSeleccionado === "FRANCÉS (CUOTA FIJA)") {
      amortizarFrancesa(tasaEfectivaCredito, monto, meses);
    }

    

    // Imprime la información del formulario en la consola
    console.log(
      "Tipo de amortización seleccionado: ",
      tipoAmortizacionSeleccionado
    );

    console.log("Tasa nominal Credito seleccionado: ", tasaNominalCredito);
    console.log("Tasa efectiva Credito seleccionado: ", tasaEfectivaCredito);

    console.log("Monto: ", monto);
    console.log("Meses: ", meses);
  });
});

  function updateCreditInfo() {
    var creditInfo = document.getElementById("tipoCredito").value.split("|");
    document.getElementById("porcentajeCredito").innerText = creditInfo[1] || "%";
    document.getElementById("rangoMonto").innerText =
      "El monto permitido es de " +
      formatoMoneda(creditInfo[2]) +
      " a " +
      formatoMoneda(creditInfo[3]);
    document.getElementById("rangoMeses").innerText =
      "Valor entre " + creditInfo[4] + " a " + creditInfo[5] + " meses ";
  }

function validarFormatoIngreso(input) {
  var min = parseFloat(input.dataset.min);
  var max = parseFloat(input.dataset.max);
  var value = parseFloat(input.value.replace(/[^0-9.-]+/g, ""));
  if (value < min || value > max) {
    value = min;
  }
  input.value = formatoMoneda(value); // Formatea el valor como una cantidad en dólares
}

function validarNumerosIngreso(input) {
  input.value = input.value.replace(/[^0-9.]+/g, "");
}

function formatoMoneda(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}
function validarMeses(input) {
  var min = parseFloat(input.dataset.minMeses);
  var max = parseFloat(input.dataset.maxMeses);
  var value = parseFloat(input.value);
  if (value < min || value > max) {
    value = min;
  }
  input.value = value;
}

function limpiarFormatoMoneda(valorMoneda) {
  let valorLimpiado = valorMoneda.replace(/[\$,\.]/g, "");
  valorLimpiado = parseInt(valorLimpiado);
  valorLimpiado = Math.floor(valorLimpiado / 100);
  return valorLimpiado;
}

function limpiarFormatoPorcentaje(valorPorcentaje) {
  // Remover el símbolo de porcentaje
  let valorLimpiado = valorPorcentaje.toString().replace(/%/g, "");
  // Convertir el valor a número
  valorLimpiado = parseFloat(valorLimpiado);
  // Si el valor original tenía un símbolo de porcentaje o es mayor que 1, dividirlo por 100 para convertirlo a forma decimal
  if (valorPorcentaje.includes("%") || valorLimpiado > 1) {
    valorLimpiado /= 100;
  }
  // Truncar el resultado a 4 cifras decimales
  valorLimpiado = Math.floor(valorLimpiado * 10000) / 10000;
  return valorLimpiado;
}

function amortizarAlemana(tasaNominalCredito, monto, meses) {
  let saldo = monto;
  let tasaMensual = tasaNominalCredito / 12;
  let abonoCapital = monto / meses;
  let tabla = document.getElementById("tablaCredito");

  let seguroDesgravamen = monto * 0.00149;

  for (let i = 1; i <= meses; i++) {
    let interes = saldo * tasaMensual;
    let cuota = abonoCapital + interes + seguroDesgravamen;
    saldo -= abonoCapital;

    let row = tabla.insertRow(i);
    row.className = "hover:bg-blue-50 beet bg-white";
    let cell;

    cell = row.insertCell(0);
    cell.innerHTML = i;
    cell.className = "border px-6 py-2 text-center";

    cell = row.insertCell(1);
    cell.innerHTML = abonoCapital.toFixed(2);
    cell.className = "border px-6 py-2 text-center";

    cell = row.insertCell(2);
    cell.innerHTML = interes.toFixed(2);
    cell.className = "border px-4 py-2 text-center";

    cell = row.insertCell(3);
    cell.innerHTML = seguroDesgravamen.toFixed(2);
    cell.className = "border px-6 py-2 text-center";

    cell = row.insertCell(4);
    cell.innerHTML = cuota.toFixed(2);
    cell.className = "border px-6 py-2 text-center";

    cell = row.insertCell(5);
    cell.innerHTML = saldo.toFixed(2);
    cell.className = "border px-6 py-2 text-center";
  }
}

function amortizarFrancesa(tasaEfectiva, montoPrestamo, meses) {
  let tabla = document.getElementById("tablaCredito");
  let saldo = montoPrestamo;
  let cuotaFija = (montoPrestamo * tasaEfectiva) / (1 - Math.pow(1 + tasaEfectiva, -meses));

  for(let i = 1; i <= meses; i++) {
      let seguroDesgravamen = montoPrestamo * 0.00149;
      let interes = tasaEfectiva * saldo;
      let abonoCapital = cuotaFija - interes;
      saldo -= abonoCapital;

      let row = tabla.insertRow(i);
      row.className = "hover:bg-blue-50 beet bg-white";
      let cell;

      cell = row.insertCell(0);
      cell.innerHTML = i;
      cell.className = "border px-6 py-2 text-center";

      cell = row.insertCell(1);
      cell.innerHTML = abonoCapital.toFixed(2);
      cell.className = "border px-6 py-2 text-center";

      cell = row.insertCell(2);
      cell.innerHTML = interes.toFixed(2);
      cell.className = "border px-4 py-2 text-center";

      cell = row.insertCell(3);
      cell.innerHTML = seguroDesgravamen.toFixed(2);
      cell.className = "border px-6 py-2 text-center";

      cell = row.insertCell(4);
      cell.innerHTML = cuotaFija.toFixed(2);
      cell.className = "border px-6 py-2 text-center";

      cell = row.insertCell(5);
      cell.innerHTML = saldo.toFixed(2);
      cell.className = "border px-6 py-2 text-center";
  }
}

function limpiarTabla() {
  var tabla = document.getElementById('tablaCredito');
  var filas = tabla.getElementsByTagName('tr');

  // Comenzamos desde i = 1 para evitar eliminar el encabezado de la tabla
  for(var i = filas.length - 1; i > 0; i--) {
    tabla.deleteRow(i);
  }
}


