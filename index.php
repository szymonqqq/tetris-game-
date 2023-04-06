<!DOCTYPE html>
<html lang="pl">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tetris game</title>
    <link rel="stylesheet" href="style.css" />
    <script src="main.js" defer></script>
  </head>
  <body>
  <?php 
 $db = mysqli_connect('localhost', 'root', '', 'userdatatetris') or die('brak połączenia');
  
  if(isset($_POST["register"])){
    $name = $_POST['name'];
    $email = $_POST['e-mail'];
    $password = $_POST['password'];
    $password2 = $_POST['password2'];
    if($password==$password2 && (!empty($name) && !empty($email) && !empty($password) && !empty($password2))) {
           mysqli_query($db, "INSERT INTO users (nazwa, email, haslo) VALUES ('$name', '$email', '$password')");
         
    }
  }
  if(isset($_POST["login"])){
    $email = $_POST['e-mail'];
    $password = $_POST['password'];

    $query_login = mysqli_query($db, "SELECT * FROM users WHERE email ='$email' AND haslo='$password'");
    if(mysqli_num_rows($query_login) > 0 && !empty($email) && !empty($password)) {
 echo '<link rel="stylesheet" href="style2.css">';
    
    }
  }
  mysqli_close($db);
  ?>
  


    <div class="wrapper">
      <div class="game">
        <h1>tetris</h1>
        <canvas></canvas>
        <div class="main">
          <canvas></canvas>
          <button>Stop</button>
          <p>score: <span>0</span></p>
        </div>
        <button class="login_button">Zaloguj się</button>
      </div>
      <div class="register">
        <h1>Logowanie</h1>
        <form action="" method="POST" class="login">
          <label>e-mail: </label><input type="text" name='e-mail' /><br />
          <label>hasło: </label>
          <input type="password" name='password' />
          <input type="submit" value="zaloguj" name ='login'/>
        </form>
        <p>jeśli nie posiadasz kliknij <span>zarejestruj się</span></p>

        <form method="POST" class="signin">
          <label>nazwa: </label><input type="text" name='name' /><br />
          <label>e-mail: </label><input type="text"  name='e-mail'/><br />
          <label>hasło: </label> <input type="password"  name='password'/><br />
          <label>powtórz hasło: </label> <input type="password" name ='password2'/>
          <input type="submit" value="zarejestruj" name="register" />
        </form>
      </div>
    </div>

  </body>
</html>
