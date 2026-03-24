$dest = "$PSScriptRoot\_backup"
if (!(Test-Path $dest)) { New-Item -ItemType Directory -Path $dest | Out-Null }

$files = @("mp.css","mp.html","mp.js","extrato.css","extrato.html","extrato-completo.css","extrato-completo.html","pix.css","pix.html","index.html","go.ps1")

foreach ($f in $files) {
    $src = "$PSScriptRoot\$f"
    if (Test-Path $src) {
        Copy-Item $src "$dest\$f" -Force
        Write-Host "OK: $f"
    }
}
Write-Host "Backup salvo em _backup\"
