<?php
  require_once('../srv/_config.php');

  /*  Function: securityCheck

      Check if the user can access to the admin space.
  */
  function securityCheck($level = NULL){
    if (!isset($_SESSION['access_token'])) {
      header('Location: ../login.php');
      exit();
    } else {
      $user = new User($db);
      $accessLevel = $user->getAccessLevel($emailUser);
      if ($level == NULL && $accessLevel == 0) {
        header('Location: /app');
        exit();
      } else if ($accessLevel != $level && $accessLevel != 3) {
        header('Location: /app');
        exit();
      } 
    }
  }

  