<?php
$to = 'liammatulick@gmail.com'; 
$subject = 'Test';
$message = '
<html>
<body>
  <p>Someone is trying to contact you</p>

</body>
</html>
';

$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=iso-8859-1';


$headers[] = 'From: contact@uflvaping.com';

mail($to, $subject, $message, implode("\r\n", $headers));
$success = mail($to, $subject, $message, implode("\r\n", $headers));
if (!$success) {
    $errorMessage = error_get_last()['message'];
    echo $errorMessage;
}

?>

<html>
<head>
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>UVJ</title>
<link rel="stylesheet" type="text/css" href="../styles.css">
<script src="../script.js"></script>
  <style>
    @font-face { font-family: Gagalin; src: url('https://raw.githubusercontent.com/pyroteddie/uflvape/master/assets/fonts/Gagalin.otf?raw=true') format('opentype')}
    h1{
      font-family:Gagalin; 
      justify-content: center;
      display:flex;
      font-size:40px;
    }
  </style>
<h1 >UFL Vape</h1>
  <div class="NavBar">
    <button class="NavBarButton" onclick="location.href='../index.html'">HOME</button>
    <button class="NavBarButton" onclick="location.href='../pages/ComingSoon.html'">COMING SOON</button>
    <button class="NavBarButton" onclick="location.href='../pages/ContactUs.html'">CONTACT US</button>
    <span class='CartButContainer'><img class='CartBut' src="https://firebasestorage.googleapis.com/v0/b/uflvape.appspot.com/o/Shopping-Basket-Icon.png?alt=media&token=29eeed85-b3cc-48ee-96a8-7edfad230137" onclick="location.href='../pages/Checkout.html'" /><a id="CartLength"></a></span>
  </div>
</head>

<body>
  <section>
    <div  class="contactform">
      <?php echo "<h1>" & $_POST['FullName'] & "</h1>" ?>
    </div >
  </section>

</body>


</html>


