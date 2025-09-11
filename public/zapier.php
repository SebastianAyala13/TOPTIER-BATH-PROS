<?php
// --- CORS (permite POST desde tu sitio) ---
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: content-type, x-zapier-secret");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

// --- Leer body (JSON plano del form) ---
$body = file_get_contents('php://input');
if (!$body) {
  http_response_code(400);
  header('Content-Type: application/json');
  echo json_encode(["error"=>"Empty body"]);
  exit;
}

// --- Config ---
$hook = 'https://hooks.zapier.com/hooks/catch/24574105/udv6m97/';
$secret = 'TU_SECRETO_UNICO'; // <-- cámbialo y filtra en Zapier con Headers.x-zapier-secret

// --- Reenviar a Zapier ---
$ch = curl_init($hook);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  'Content-Type: application/json',
  'x-zapier-secret: ' . $secret
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// --- Responder al navegador ---
header('Content-Type: application/json');
if ($httpcode >= 200 && $httpcode < 300) {
  echo '{"ok":true}';
} else {
  http_response_code(502);
  echo json_encode(["error"=>"Zapier error","status"=>$httpcode,"detail"=>$response]);
}


