<?php
  require_once('/srv/_config.php');

  /*  Function: securityCheck

      Check if the user can access to the admin space.
  */
  function securityCheck(){
    if (!isset($_SESSION['access_token'])) {
      header('Location: ../login.php');
      exit();
    } else {
      // header('Location: admin.php');
      // exit();
    }
  }