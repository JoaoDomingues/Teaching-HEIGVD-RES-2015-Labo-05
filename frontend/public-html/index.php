<!DOCTYPE html>
<html>
   <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8; charset=UTF-8">
      <title>Laboratoire RES</title>
      <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
      <script>
      <!--C'est ligne permettent de faire un requête ajax afin de récupere un valeur aléatoire dans le backend-->
      $(document).ready(function(){
          $("button").click(function(){
              $.ajax({url: "http://www.res-lab.com/api/", success: function(result){
                  $("#number").html(result);
              }});
          });
      });
      </script>
   </head>
   <body>		
		<h1>Generer un nombre aléatoire</h1>
		
      Adresse ip du serveur: <?echo $_SERVER["REMOTE_ADDR"];?>
      
		<p>
			<button>Cliquer pour avoir un nombre</button>
			
			<div id="number">
         (vide)
			</div>
			<br/>
		</p>
	</body>
</html>