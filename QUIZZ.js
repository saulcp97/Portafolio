<div id="Block-Test" style="width: 100%;">
	<center>
		<h1>/*Titulo del Test*/</h1>
		<img alt="Titulo alternativo de la Imagen (OPCIONAL)" id="Portada" src="URL de Imagen de Portada" />
	</center>
	<div id="Descripción">
		/*Descripción o invitación que se le da al Usuario para realizar el QUIZZ*/
	</div>
	<center>
		<input id="botonStart" onclick="mostrar();" style="height: 50px; width: 100%;" type="button" value="/*Declaración para empezar*/" />
		<progress id="ProgressBar" max="40" style="display: none; width: 75%;" value="0">/*Esta es la barra que muestra el progreso dentro del QUIZZ*/
			Mensaje a mostrar cuando el navegador utilizado no es compatible.
		</progress>
		<br/>
	</center>
	
	<div id="Decision" style="display: None;">
	//Bloque de HTML que muestra las preguntas
	<center>
		<img alt="Imagen de la pregunta" id="BannerTest" src=""/>//Imagen que se mostrara al hacer una pregunta
		<div>
		<h3 id="pregunta"></h3> //El texto de la pregunta
		</div> //Posibles respuestas dadas a la pregunta
			<input id="cbox1" onclick="respuesta(0)" style="height: 33px; width: 75%;" type="button" value="Op1" /><br />
			<input id="cbox2" onclick="respuesta(1)" style="height: 33px; width: 75%;" type="button" value="Op2" /><br />
			<input id="cbox3" onclick="respuesta(2)" style="height: 33px; width: 75%;" type="button" value="Op3" /><br />
			<input id="cbox4" onclick="respuesta(3)" style="height: 33px; width: 75%;" type="button" value="Op4" /><br />
		</center>
	</div>
	
	<div id="Bloque Oculto" style="display: None;">
	//Bloque de HTML que se muestra cuando el usuario falla una pregunta
		<input onclick="reload();" style="height: 50px; width: 100%;" type="submit" value="Volver a intentarlo" />
	</div>
  
	<div id="Enhorabuena" style="display: None;">
		//Bloque de HTML que se muestra cuando el usuario accierta todas las preguntas
		<center>
			<h2>¡Has acertado todas las preguntas!</h2>
			<img alt="Imagen de enhorabuena" id="BannerEnhorabuena" src="URL de la imagen que se muestra para darle la enhorabuena al usuario" />
		</center>
		<br />
		//Mesaje a mostrar para felicitar al Usuario por acertarlo todo
	</div>


<script>
	var pregunta = 0;
	var indexImage = 0;
	var respuestasDadas;
	var image =[/* Lista de URL de la imagen asociada a cada pregunta, cada imagen debe aparecer en la misma posición que la pregunta asociada*/];
	var preguntas = [/*Lista de Strings que contienen cada pregunta*/];
   
	var opciones = [/*Las opciones que se le presentan al usuario junto con la pregunta se muestran en el formato ['0','1','2','3']
						para cada pregunta, siendo la primera '0' siempre la correcta, no hay que preocuparse luego se reordenan al azar*/
	];
   
	var preguntasOfrecidas = [];
	var opcionesOfrecidas = [];
   
	var actCorrect = 0;
   
	var viewImage = [];
	var Resultados = [];
   
	document.getElementById("BannerTest").src = image[indexImage];

	function copyPaste(input){
		output = [];
		for(var i = 0; i < input.length; ++i) {    
			if(input[i].constructor === Array) {
				output[i] = [];
				for(var j = 0; j < input[i].length; ++j) {
					output[i][j] = input[i][j];
				}
			} else {
				output[i] = input[i];
			}
		}
		return output;
	}
   
   function mostrar() {
    document.getElementById("botonStart").style.display= "none";
    document.getElementById("Descripción").style.display= "none";
    document.getElementById("Portada").style.display= "none";
    document.getElementById("Decision").style.display= "block";
    document.getElementById("ProgressBar").style.display= "block";
   }
    
   window.onload = function() {
    preguntasOfrecidas = copyPaste(preguntas);
    opcionesOfrecidas = copyPaste(opciones);
    viewImage = copyPaste(image);
    reordenarPreguntas();
    
    respuestasDadas = [];
    document.getElementById("ProgressBar").max = preguntas.length;
    document.getElementById("ProgressBar").value = 0;
    indexImage = 0;
    pregunta = 0;
    document.getElementById("BannerTest").src = viewImage[indexImage];
    document.getElementById("pregunta").innerHTML = preguntasOfrecidas[0];
    recolocar(); 
    for(var i = 1; i <= opciones[pregunta].length; ++i){
     document.getElementById(("cbox" + i)).value= opcionesOfrecidas[pregunta][i-1];
    }
   }
   
   function reordenarPreguntas(){
    var auxiliar,valorR;
    var auxiliar2 = [];
    var auxiliarIm;
    for(var i = 0; i < preguntasOfrecidas.length; ++i) {
     valorR = i + ~~((preguntasOfrecidas.length - i) * Math.random())
     
     auxiliar = preguntasOfrecidas[valorR];
     preguntasOfrecidas[valorR] = preguntasOfrecidas[i];
     preguntasOfrecidas[i] = auxiliar;
     
     auxiliar2 = opcionesOfrecidas[valorR];
     opcionesOfrecidas[valorR] = opcionesOfrecidas[i];
     opcionesOfrecidas[i] = auxiliar2;
     
     auxiliarIm = viewImage[valorR];
     viewImage[valorR] = viewImage[i];
     viewImage[i] = auxiliarIm;    
    }
   }
   
   function recolocar(){
    actCorrect = 0;
    if(Math.random() > 0.25){
     let guardaCambiante;
     if(Math.random() > 0.33) {
      if(Math.random() > 0.5) {
       actCorrect = 3;
      } else {
       actCorrect = 2;
      }
     } else {
      actCorrect = 1;
     }
     guardaCambiante = opcionesOfrecidas[pregunta][actCorrect];
     opcionesOfrecidas[pregunta][actCorrect] = opcionesOfrecidas[pregunta][0];
     opcionesOfrecidas[pregunta][0] = guardaCambiante;
    }
   }

   function reload() {    
    preguntasOfrecidas = copyPaste(preguntas);
    opcionesOfrecidas = copyPaste(opciones);
    viewImage = copyPaste(image);
    reordenarPreguntas();
    
    respuestasDadas = [];
    document.getElementById("ProgressBar").max = preguntas.length;
    document.getElementById("ProgressBar").value = 0;
    indexImage = 0;
    pregunta = 0;
    document.getElementById("BannerTest").src = viewImage[indexImage];
    document.getElementById("pregunta").innerHTML = preguntasOfrecidas[0];
    
    recolocar();
    
    for(var i = 1; i <= opciones[pregunta].length; ++i){
     document.getElementById(("cbox" + i)).value= opcionesOfrecidas[pregunta][i-1];
    }
    document.getElementById("Decision").style.display= "block";
    document.getElementById("Bloque Oculto").style.display= "none";  
   }

   function respuesta(cb) {
    if(cb == this.actCorrect) {
     respuestasDadas.push(cb);
     document.getElementById("ProgressBar").value++;
     document.getElementById("BannerTest").src = viewImage[++indexImage];
     if(pregunta < preguntasOfrecidas.length - 1) {
      document.getElementById("pregunta").innerHTML = preguntasOfrecidas[++pregunta];
      recolocar();
      for(var i = 1; i <= opcionesOfrecidas[pregunta].length; ++i){
       document.getElementById(("cbox" + i)).value= opcionesOfrecidas[pregunta][i-1];
      }
     } else {
      document.getElementById("Decision").style.display= "none";
      document.getElementById("Enhorabuena").style.display= "block";
     }
    } else {
     document.getElementById("Decision").style.display= "none";
     document.getElementById("Bloque Oculto").style.display= "block";
    }
   }
  </script>
 </div>
