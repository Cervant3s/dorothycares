<?php

  /* uncomment FOR DEBUG */
  error_reporting(E_ALL);
  ini_set('display_errors', 1);

  // Constants for database connexion
  define('DB_HOST', 'localhost'); // Database Hostname
  define('DB_NAME', 'dorothy_teaser'); // Database Name
  define('DB_USER', 'root'); // Database Username
  define('DB_PASS', 'c]u!+fHh[F\x>8U+'); // Database Password

  // we initialize a new connexion
  $db = new PDO('mysql:host='.DB_HOST.';dbname='.DB_NAME.';charset=utf8', DB_USER, DB_PASS);

  // we start a session
  session_start();

  // General constants
  define('HOME_URL','https://dorothycares.ovh/');
  // define('SCRIPT_DIR','/home/tcbmediavc/dorothycares.io');
  define('SCRIPT_DIR','..');
  define('VERSION','1.0.1 Beta');

  // we include the GoogeAPI files
  require_once SCRIPT_DIR.'/GoogleAPI/vendor/autoload.php';

  // insert class files
	require_once SCRIPT_DIR.'/class/class.user.php';
  require_once SCRIPT_DIR.'/class/class.implantation.php';
  require_once SCRIPT_DIR.'/class/class.startup.php';
  require_once SCRIPT_DIR.'/class/class.system.php';
  require_once SCRIPT_DIR.'/class/class.form.php';

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