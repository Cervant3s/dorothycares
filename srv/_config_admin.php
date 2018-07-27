<?php
  require_once('../srv/_config.php');

  /**
   * Check if the user can access the admin space, otherwise redirection leads to index.
   * 
   * @param $level level needed to access the page.
   */
  function securityCheck($level = NULL){
    if (!isset($_SESSION['access_token'])) {
      header('Location: ../login.php');
      exit();
    } else {
      global $db;
      $user = new User($db);
      $accessLevel = $user->getAccessLevel($_SESSION['email']);
      if (($level == NULL && $accessLevel > 0) || ($accessLevel == $level || $accessLevel == 3)) {
        //Access granted
      } else {
        header('Location: ../index.php');
        exit();
      } 
    }
  }