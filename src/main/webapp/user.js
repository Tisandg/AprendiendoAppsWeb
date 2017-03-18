
/*Para visualizar taba, Pie, Area Chart, Donut Chart, y Column Chart*/
/* global google */
google.charts.load('current', {packages: ['corechart', 'bar', 'table']});

$(document).ready(function() {
    google.charts.setOnLoadCallback(retrieveUsers);
    //retrieveUsers();
});

/********** Botones de las Graficas *************/
/* Pie = 1  -  Columnas = 2  -  Donut = 3  -  Area = 4 */
$(function(){
    $("#buttonPie").click(function(event){
        usuarioPorRol(1);
    });
});

$(function(){
    $("#buttonColumnas").click(function(event){
        usuarioPorRol(2);
    });
});

$(function(){
    $("#buttonDona").click(function(event){
        usuarioPorRol(3);
    });
});

$(function(){
    $("#buttonArea").click(function(event){
        usuarioPorRol(4);
    });
});
/********** Fin de las Graficas *********/

$(function(){
    $("#buttonCancelar").click(function(event){
        activarModal("hidden");
    });
});

$(function(){
    $("#buttonLimpiar").click(function(event){
        limpiarEntradas();
    });
});

$(function(){
    $("#buttonAdd").click(function(event){
        limpiarEntradas();
        prueba();
        activarModal("visible");
    });
});

/*Funcion que permite guardar los datos*/
$(function(){
    $("#buttonAddUser").click(function(event){
        //var idrol = $('#selectRol').val();
        //buscar el rol con id "idrol" y enviarlo en el json
        //alert("rol escogido: " + idrol)
        //retrieveRol(idrol);
        //var idu = $("#idUserInput").prop("value");
        //var nameu = $("#nameUserInput").prop("value");
        //var emailu = $("#emailUserInput").prop("value");
        //var idrol = $('#selectRol').val();
        //buscar el rol con id "idrol" y enviarlo en el json
        //alert("rol escogido: " + jsonData.namerole);
        
        if(validarFormulario()){
            var juser = '{"iduser":"'+$("#idUserInput").prop("value")+'","nameuser":"'+$("#nameUserInput").prop("value")
                    +'","emailuser":"'+$("#emailUserInput").prop("value")+'","rol":"'+$('#selectRol').val()+'"}';
            addUser(juser);
            activarModal("hidden");
            retrieveUsers();
        }
        
    });
});
    
 /*function guardando(jsonData) {      
        var idu = $("#idUserInput").prop("value");
        var nameu = $("#nameUserInput").prop("value");
        var emailu = $("#emailUserInput").prop("value");
        //var idrol = $('#selectRol').val();
        //buscar el rol con id "idrol" y enviarlo en el json
        //alert("rol escogido: " + jsonData.namerole);
        
        if(validarFormulario(idu,nameu,emailu)){
            var juser = '{"iduser":"'+idu+'","nameuser":"'+nameu+'","emailuser":"'+emailu+'","rol":"'+jsonData.idrole+'"}';
            addUser(juser);
            activarModal("hidden");
            retrieveUsers();
        }
}
           /* );
});*/

/*function retrieveRol(idu) {
    //retrieve JSON data
    $.get("http://localhost:8080/rol/find/"+idu+"/", function (rData, status) {
        //alert("datos: name"+rData.namerole);
        guardando(rData);
    }, "json");
}*/

$(function(){
    $("#buttonUpd").click(function(event){
        activarModal("visible");
        
    });
});

//funcion para actualizar los datos de un usuario
$(function(){
    $("#buttonUpdUser").click(function(event){
        /*var idu = $("#idUserInput").prop("value");
        var nameu = $("#nameUserInput").prop("value");
        var emailu = $("#emailUserInput").prop("value");
        var idrol = $("#selectRol").prop("value");
        alert("rol escogido: " + idrol);*/
        
        if(validarFormulario()){
            var juser = '{"iduser":"'+$("#idUserInput").prop("value")+'","nameuser":"'+$("#nameUserInput").prop("value")
                    +'","emailuser":"'+$("#emailUserInput").prop("value")+'","rol":"'+$("#selectRol").prop("value")+'"}';
            updUser(juser);
            activarModal("hidden");
            retrieveUsers();
        }
    });
});

//funcion para eliminar un usuario
$(function(){
    $("#buttonDel").click(function(event){
        var idu = $("#idUserInput").prop("value");
        delUser(idu);
        limpiarEntradas();
        retrieveUsers();
    });
});

//funcion para buscar un usuario por id
$(function(){
    $("#buttonFindUser").click(function(event){
        var idu = $("#idUsuarioBuscar").prop("value");
        alert("id escogido: " + idu);
        retrieveUsers(idu);
    });
});

//Cuando presiona el boton "Listar Usuarios" llamara a la funcion
//que muestra los datos de los usuarios
$(function(){
    $("#buttonFindUsers").click(function(event){
        retrieveUsers();
    });
});

//funcion para cambiar a la pagina de estadisticas
$(function(){
    $("#buttonEstadisticas").click(function(event){
        location.href="Estadisticas.html";
    });
});

/****************  Validaciones  ********************/ 
function validarFormulario(idu,nameu,emailu){
    
    var idu = $("#idUserInput").prop("value");
    var nameu = $("#nameUserInput").prop("value");
    var emailu = $("#emailUserInput").prop("value");
    var idRol = $('#selectRol').val();
    
    var camposValidos = true;
    /*Validacion de campos requeridos*/
    if(estaVacio(idu)){
        document.getElementById("menssageValidationId").innerHTML = "Este campo es requerido";
        camposValidos = false;    
    }else{
        document.getElementById("menssageValidationId").innerHTML = "";
        if(!validarId(idu)){
            camposValidos = false;
        }
    }
    
    if(estaVacio(nameu)){
        document.getElementById("menssageValidationName").innerHTML = "Este campo es requerido";
       camposValidos = false; 
    }else{
        document.getElementById("menssageValidationName").innerHTML = "";
        if(!validarName(nameu)){
            camposValidos = false;
        }
    }
    
    if(!estaVacio(emailu)){
        if(!validarEmail(emailu)){
            camposValidos = false;
        }
    }else{
        document.getElementById('menssageValidationEmail').innerHTML="";
    }

    return camposValidos;
}

function estaVacio( idCampo, idDiv ){
    var valor = idCampo;
    if( valor == null || valor.length == 0 || /^\s+$/.test(valor) ) {
        return true;
    }else{
        return false;
    }
}

function validarEmail( email ) {
    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    //expr = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if ( !expr.test(email) ){
        document.getElementById('menssageValidationEmail').innerHTML="Direccion de correo " + email + " es incorrecta.";
        return false;
    }else{
        document.getElementById('menssageValidationEmail').innerHTML="";
        return true;
    }
}

function validarId( id ){
    /*Devuelve true cuando no puede convertir a numero. Deveulve falso cuando lo puede convertir*/
    if(isNaN(id)) {
        document.getElementById('menssageValidationId').innerHTML="Id incorrecto";
        return false;
    }else{
        return true;
    }
}

function validarName( name ){
    if(isNaN(name)) {
        return true;
    }else{
        document.getElementById('menssageValidationName').innerHTML="Nombre no puede contener numeros";
        return false;
    }
}

 /*   Fin validaciones      */


function prueba() {
    //retrieve JSON data
    $.get("http://localhost:8080/rol/findall/", function (rData, status) {
        //llenarRoles(rData);//Para que dibuje los usuarios
        for(var i = 0; i < rData.length ; i = i + 1){
            $("#selectRol").append('<option value='+rData[i].idrole+'>'+rData[i].namerole+'</option>');
        }
    }, "json");
    
}

function activarModal(visibilidad){
    document.getElementById("bgventana").style.visibility = visibilidad;
}

function limpiarEntradas(){
    $('#formulario')[0].reset();
    $('#selectRol').empty();
    document.getElementById('menssageValidationId').innerHTML="";
    document.getElementById('menssageValidationName').innerHTML="";
    document.getElementById('menssageValidationEmail').innerHTML="";
}

function usuarioPorRol(tipoGrafica){
    $.get("http://localhost:8080/user/findall/", function (rDataUser, statusUser) {
        //rData tengo todos los usuarios
        var tamanoUsuarios = rDataUser.length;
        $.get("http://localhost:8080/rol/findall/",function (rDataRol,statusRol){
            var tamanoRol = rDataRol.length;
            
            var arreglo = [] //[{Rol:"Rol",Cantidad:"Cantidad"}];
            var porcentajeRol = ["Rol","Cantidad"];
            arreglo.push(porcentajeRol);
            
            var cont = 1;
            //alert("rol: "+rDataUser[0].rol.idrole);
            for(var i = 0; i < tamanoRol ; i = i + 1){
                /*if(i  != 0 ){
                    porcentajes +=",";
                }¨*/
                var contador = 0;
                
                for(var j = 0; j < tamanoUsuarios ; j = j + 1){
                    
                    if(rDataUser[j].rol.idrole == rDataRol[i].idrole){
                        contador++;
                    }   
                }
                //objeto
                //var porcentajeRol = {Rol:rDataRol[i].namerole,Cantidad:contador};
                var porcentajeRol = [rDataRol[i].namerole,contador];
                //porcentajes += '{"Rol":"'+rDataRol[i].namerole+'","Cantidad":"'+contador+'"}';

                arreglo.push(porcentajeRol);
                //alert("contador: "+cont);
                cont++;
                //alert("rol "+rDataRol[i].namerole+" cantidad"+contador);
            }
            //porcentajes +=']';
            //jsonPorcentaje.push() = JSON.stringify(abc);
            //alert("tam porcentajes "+arreglo.length);
            //var jsonPorcentaje = JSON.stringify(arreglo);
            //var myArr = JSON.stringify(arreglo);
            drawChart(arreglo,tipoGrafica);
        },"json");
    }, "json");
}

function retrieveUsers() {
    //retrieve JSON data
    $.get("http://localhost:8080/user/findall/", function (rData, status) {
        //alert("Data: " + rData.toString() + "\nStatus: " + status);
        drawUsers(rData);//Para que dibuje los usuarios
    }, "json");
}

function retrieveUser(idu) {
    //retrieve JSON data
    $.get("http://localhost:8080/user/find/"+idu+"", function (rData, status) {
        //alert("Data: " + rData.iduser + "\nStatus: " + status + "tamaño: "+rData.);
        drawUser(rData);//Para que dibuje los usuarios
    }, "json");
}

function addUser(juser) {
    $.ajax({
        url: 'http://localhost:8080/user/add',
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: juser,
        complete: function (rData) {
            alert("Se ha agregado exitosamente: ");
        }
    });
}

function updUser(jsonuser) {
    $.ajax({
        url: 'http://localhost:8080/user/upd/',
        type: 'put',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonuser,
        complete: function (rData) {
            alert("Se ha actualizado el usuario: ");
        }
    });
}

function delUser(id) {
    //delete data
    $.ajax({
        url: 'http://localhost:8080/user/delete/',
        type: 'delete',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: id,
        complete: function (rData) {
            alert("Se ha eliminado el usuario: " );
        }
    });
}

function drawUsers(jsonData) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Id');
    data.addColumn('string', 'Name');
    data.addColumn('string', 'Email');
    data.addColumn('string', 'Rol');
    data.addRows(jsonData.length);
    for(var i = 0; i < jsonData.length ; i = i + 1){
        data.setCell(i,0,jsonData[i].iduser);
        data.setCell(i,1,jsonData[i].nameuser);
        data.setCell(i,2,jsonData[i].emailuser);
        data.setCell(i,3,jsonData[i].rol.namerole);
    }
    var table = new google.visualization.Table(document.getElementById('table_div'));
    table.draw(data, {showRowNumber: false, width: '95%', heigth:'95%'});
    
    google.visualization.events.addListener(table, 'select', selectHandler); 
    function selectHandler(){
        var selectedItem = table.getSelection()[0];
        if(selectedItem){
            $("#idUserInput").val(data.getValue(selectedItem.row, 0));
            $("#nameUserInput").val(data.getValue(selectedItem.row, 1));
            $("#emailUserInput").val(data.getValue(selectedItem.row, 2));
            $("#selectRol").val(data.getValue(selectedItem.row, 3));
        }
    }
}

function drawUser(jsonData){    
    $("#idUserInput").val(jsonData.iduser);
    $("#nameUserInput").val(jsonData.nameuser);
    $("#emailUserInput").val(jsonData.emailuser);
    $("#selectRol").val(jsonData.rol.namerol);
}

function drawChart(jsonData,tipoGrafica) {
    
    var data = google.visualization.arrayToDataTable(jsonData);
    var options;
    var chart;

    /* Pie */
    if(tipoGrafica == 1){
        options = {
            legend: 'none',
            pieSliceText: 'label',
            title: 'Cantidad de personas por rol',
            pieStartAngle: 100,
        };
        chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    }
    
    /*Columnas*/
    if(tipoGrafica == 2){
        var options = {
            title: 'Cantidad de personas por rol',
            annotations: {
              alwaysOutside: true,
              textStyle: {
                fontSize: 14,
                color: '#000',
                auraColor: 'none'
              }
            },
            hAxis: {
              title: 'Roles',
              format: 'h:mm a',
              viewWindow: {
                min: [7, 30, 0],
                max: [17, 30, 0]
              }
            },
            vAxis: {
              title: 'Rating (scale of 1-10)'
            }
        };
        chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    }
    
    /*Donut*/
    if(tipoGrafica == 3){
        options = {
            title: 'Personas por rol',
            pieHole: 0.4,
        };
        chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    }

    /*Area*/
    if(tipoGrafica == 4){
        options = {
            title: 'Personas por rol',
            hAxis: {title: 'Rol',  titleTextStyle: {color: '#333'}},
            vAxis: {minValue: 0}
        };

        chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
    }

    chart.draw(data, options);
}
