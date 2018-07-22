<?php
  require_once '../srv/_config_admin.php';

  securityCheck();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="stylesheet" href="css/materialize.min.css">
  <title>Interface admin</title>
</head>
<body>
<div class="section no-pad-bot" id="index-banner">
    <div class="container">
      <br><br>
      <h1 class="header center red-text">Admin/index</h1>
      <div class="row center">
        <h5 class="header col s12 light"> 

        </h5>
      </div>
      <div class="row center">
          <div class="col s12 m4">

      </div>
      </div>
    </div>
  </div>


  <div class="container">
    <div class="section">

      <!--   Icon Section   -->
      <div class="row">
        <div class="col s12 m4">
          <div class="icon-block">
            <h2 class="center light-blue-text">
                <a href="../admin/admin-management.php" id="download-button" class="btn-large waves-effect waves-light red">Users</a>

            </h2>
            <h5 class="center">
              Implantation, Startup, User
            </h5>
          </div>
        </div>

        <div class="col s12 m4">
          </div>

          <div class="col s12 m4">
              <div class="icon-block">
                <h2 class="center light-blue-text">
                    <a href="../admin/admin-resources.php" id="download-button" class="btn-large waves-effect waves-light red">Contents</a>
    
                </h2>
                <h5 class="center"> 
                  Datas being displayed by Dorothy
                </h5>
              </div>
            </div>
    </div>
    <br><br>
  </div>
  <script src="js/materialize.min.js"></script>
</body>
</html>
