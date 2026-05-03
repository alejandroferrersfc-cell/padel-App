$outDir = "src\main\resources\data"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Pts($r) { [int][math]::Max(80, [math]::Round(23000 * [math]::Pow(0.988, $r - 1))) }
function Mano($r) { if ($r % 7 -eq 0) { "ZURDO" } else { "DERECHA" } }
function Pos($r)  { if ($r % 2 -eq 0) { "REVES" } else { "DRIVE" } }

$apESP = @("Garcia","Lopez","Martinez","Sanchez","Perez","Gonzalez","Rodriguez","Fernandez","Alvarez","Torres","Ramirez","Flores","Cruz","Diaz","Moreno","Jimenez","Molina","Castro","Ortega","Vega","Ramos","Rubio","Medina","Serrano","Guerrero","Delgado","Fuentes","Herrera","Navarro","Reyes")
$nmESP = @("Carlos","Miguel","David","Pablo","Sergio","Diego","Adrian","Ivan","Victor","Ruben","Oscar","Daniel","Javier","Antonio","Mario","Angel","Luis","Manuel","Rafael","Roberto")
$apARG = @("Pereyra","Leiva","Acosta","Romero","Medina","Suarez","Farias","Ibarra","Gimenez","Juarez","Luna","Rios","Vargas","Sosa","Paz","Herrera","Molina","Nunez","Quiroga","Benitez")
$nmARG = @("Matias","Facundo","Sebastian","Nicolas","Ezequiel","Marcos","Rodrigo","Maximiliano","Gustavo","Hernan","Leandro","Agustin","Ignacio","Bruno","Franco")
$apBRA = @("Silva","Santos","Oliveira","Costa","Ferreira","Alves","Lima","Carvalho","Souza","Rodrigues","Martins","Pereira","Barbosa","Gomes","Moura","Cardoso","Ribeiro","Teixeira","Cunha","Nascimento")
$nmBRA = @("Rafael","Lucas","Thiago","Felipe","Guilherme","Bruno","Andre","Vinicius","Caio","Eduardo")
$apFRA = @("Martin","Bernard","Thomas","Petit","Robert","Richard","Durand","Moreau","Simon","Laurent","Lefevre","Girard","Roux","Morin","Vincent","Dupont","Lambert","Bonnet","Fontaine","Rousseau")
$nmFRA = @("Antoine","Baptiste","Clement","Damien","Florian","Guillaume","Julien","Kevin","Loic","Mathieu")
$apITA = @("Russo","Ferrari","Esposito","Bianchi","Romano","Colombo","Ricci","Marino","Greco","Bruno","Gallo","Conti","Mancini","Fontana","Moretti","Barbieri","Ferrara","Martini","Serra","Vitale")
$nmITA = @("Marco","Luca","Alessandro","Francesco","Matteo","Lorenzo","Davide","Simone","Andrea","Giovanni")
$apPOR = @("Silva","Santos","Ferreira","Pereira","Costa","Carvalho","Lopes","Martins","Rodrigues","Fernandes","Gomes","Sousa","Teixeira","Correia","Almeida","Neves","Cunha","Borges","Marques","Pinto")
$nmPOR = @("Joao","Pedro","Rui","Nuno","Filipe","Tiago","Andre","Miguel","Diogo","Goncalo")

$pools = @(
  [pscustomobject]@{c="ESP";aps=$apESP;nms=$nmESP;n=80},
  [pscustomobject]@{c="ARG";aps=$apARG;nms=$nmARG;n=60},
  [pscustomobject]@{c="BRA";aps=$apBRA;nms=$nmBRA;n=40},
  [pscustomobject]@{c="FRA";aps=$apFRA;nms=$nmFRA;n=30},
  [pscustomobject]@{c="ITA";aps=$apITA;nms=$nmITA;n=30},
  [pscustomobject]@{c="POR";aps=$apPOR;nms=$nmPOR;n=25},
  [pscustomobject]@{c="URU";aps=$apARG;nms=$nmARG;n=15},
  [pscustomobject]@{c="PAR";aps=$apARG;nms=$nmARG;n=10},
  [pscustomobject]@{c="CHI";aps=$apARG;nms=$nmARG;n=10}
)

$extras = [System.Collections.Generic.List[string]]::new()
$used = @{}
foreach ($p in $pools) {
  $cnt = 0; $tri = 0
  while ($cnt -lt $p.n -and $tri -lt ($p.n * 20)) {
    $tri++
    $nm = $p.nms | Get-Random
    $ap = $p.aps | Get-Random
    $full = "$nm $ap"
    if (-not $used.ContainsKey($full)) {
      $used[$full] = $true
      $extras.Add("$full;$($p.c)")
      $cnt++
    }
  }
}
$extras300 = $extras | Select-Object -First 300

# Masculino CSV (solo los extra 101-400, los top 100 los carga el DataSeeder.java)
$lines = [System.Collections.Generic.List[string]]::new()
$lines.Add("nombre;nac;mano;posicion;ranking;puntos;categoria")
for ($i = 0; $i -lt $extras300.Count; $i++) {
  $r = 101 + $i
  $m = Mano $r
  $pos = Pos $r
  $pts = Pts $r
  $parts = $extras300[$i] -split ";"
  $lines.Add("$($parts[0]);$($parts[1]);$m;$pos;$r;$pts;MASCULINO")
}
$path = (Resolve-Path ".").Path + "\" + $outDir + "\jugadores_masc.csv"
[System.IO.File]::WriteAllLines($path, $lines, [System.Text.Encoding]::UTF8)
Write-Host "jugadores_masc.csv: $($lines.Count - 1) registros extra (posiciones 101-400)"

# Femenino CSV (solo los extra 61-400)
$apFEM = @("Garcia","Lopez","Martinez","Sanchez","Gonzalez","Rodriguez","Fernandez","Torres","Ramirez","Flores","Moreno","Jimenez","Castro","Ortega","Vega","Ramos","Rubio","Serrano","Delgado","Fuentes","Pereira","Silva","Santos","Oliveira","Costa","Ferreira","Lima","Carvalho","Souza","Martins","Martin","Bernard","Thomas","Petit","Robert","Durand","Moreau","Simon","Laurent","Vincent","Russo","Ferrari","Bianchi","Romano","Colombo","Ricci","Marino","Fontana","Barbieri","Martini")
$nmFEM = @("Laura","Maria","Ana","Carmen","Isabel","Cristina","Elena","Raquel","Patricia","Silvia","Marta","Sandra","Sara","Monica","Natalia","Beatriz","Rosa","Irene","Eva","Alicia","Florencia","Valentina","Camila","Agustina","Sofia","Luciana","Julieta","Micaela","Cecilia","Valeria","Fernanda","Gabriela","Helena","Isabela","Juliana","Larissa","Marie","Sophie","Camille","Lucie","Manon","Lea","Chloe","Emma","Ines","Julie","Giulia","Martina","Francesca","Chiara")
$paisesFem = @(
  [pscustomobject]@{c="ESP";n=130},
  [pscustomobject]@{c="ARG";n=80},
  [pscustomobject]@{c="BRA";n=50},
  [pscustomobject]@{c="FRA";n=40},
  [pscustomobject]@{c="ITA";n=25},
  [pscustomobject]@{c="POR";n=15}
)

$extrasFem = [System.Collections.Generic.List[string]]::new()
$usedF = @{}
foreach ($p in $paisesFem) {
  $cnt = 0; $tri = 0
  while ($cnt -lt $p.n -and $tri -lt ($p.n * 20)) {
    $tri++
    $nm = $nmFEM | Get-Random
    $ap = $apFEM | Get-Random
    $full = "$nm $ap"
    if (-not $usedF.ContainsKey($full)) {
      $usedF[$full] = $true
      $extrasFem.Add("$full;$($p.c)")
      $cnt++
    }
  }
}
$extras340 = $extrasFem | Select-Object -First 340

$linesFem = [System.Collections.Generic.List[string]]::new()
$linesFem.Add("nombre;nac;mano;posicion;ranking;puntos;categoria")
for ($i = 0; $i -lt $extras340.Count; $i++) {
  $r = 61 + $i
  $m = Mano $r
  $pos = Pos $r
  $pts = Pts $r
  $parts = $extras340[$i] -split ";"
  $linesFem.Add("$($parts[0]);$($parts[1]);$m;$pos;$r;$pts;FEMENINO")
}
$pathF = (Resolve-Path ".").Path + "\" + $outDir + "\jugadores_fem.csv"
[System.IO.File]::WriteAllLines($pathF, $linesFem, [System.Text.Encoding]::UTF8)
Write-Host "jugadores_fem.csv: $($linesFem.Count - 1) registros extra (posiciones 61-400)"
Write-Host ""
Write-Host "Listo. Limpia la BD y reinicia el servidor."
