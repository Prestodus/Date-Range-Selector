param([string]$NewVersion)
$pkg = Get-Content -LiteralPath 'package.json' -Raw | ConvertFrom-Json
$pkg.version = $NewVersion
$out = $pkg | ConvertTo-Json -Depth 10
[System.IO.File]::WriteAllText('package.json', $out, (New-Object System.Text.UTF8Encoding($false)))
Write-Host "Bumped version to $NewVersion"