$files = @("mp.html","extrato.html","extrato-completo.html","pix.html","pix-transferir.html")
foreach ($f in $files) {
    if (Test-Path $f) {
        $c = [System.IO.File]::ReadAllText("$PSScriptRoot\$f")
        $c = $c -replace '\s*<script src="nav\.js"></script>', ''
        [System.IO.File]::WriteAllText("$PSScriptRoot\$f", $c)
        Write-Host "OK: $f"
    }
}
