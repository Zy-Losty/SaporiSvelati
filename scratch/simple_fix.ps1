$utf8NoBOM = New-Object System.Text.UTF8Encoding($false)

$mappings = @{
    "Ã " = "à"
    "Ã¨" = "è"
    "Ã©" = "é"
    "Ã¬" = "ì"
    "Ã²" = "ò"
    "Ã¹" = "ù"
    "Ã³" = "ó"
    "Ã¡" = "á"
    "â€™" = "'"
    "Â°" = "°"
    "â€¢" = "•"
}

$files = Get-ChildItem -Recurse -Filter *.html
foreach ($file in $files) {
    if ($file.FullName -match "node_modules") { continue }
    
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $modified = $false
    
    foreach ($key in $mappings.Keys) {
        if ($content.Contains($key)) {
            $content = $content.Replace($key, $mappings[$key])
            $modified = $true
        }
    }
    
    if ($modified) {
        [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBOM)
        Write-Host "Fixed: $($file.FullName)"
    }
}
