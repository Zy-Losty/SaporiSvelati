$utf8NoBOM = New-Object System.Text.UTF8Encoding($false)

$mappings = @{
    "$([char]0x00C3)$([char]0x00A0)" = "à"
    "$([char]0x00C3)$([char]0x00A8)" = "è"
    "$([char]0x00C3)$([char]0x00A9)" = "é"
    "$([char]0x00C3)$([char]0x00AC)" = "ì"
    "$([char]0x00C3)$([char]0x00B2)" = "ò"
    "$([char]0x00C3)$([char]0x00B9)" = "ù"
    "$([char]0x00E2)$([char]0x0080)$([char]0x0099)" = "'"
    "$([char]0x00E2)$([char]0x0080)$([char]0x00A2)" = "•"
    "$([char]0x00C3)$([char]0x00B3)" = "ó"
    "$([char]0x00C3)$([char]0x00A1)" = "á"
    "$([char]0x00C3)$([char]0x00AA)" = "ê"
    "$([char]0x00C3)$([char]0x00AF)" = "ï"
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
    
    # Also fix some specific broken patterns seen in previous attempts
    if ($content -match "perchǸ") { $content = $content -replace "perchǸ", "perché"; $modified = $true }
    if ($content -match "cosǪ") { $content = $content -replace "cosǪ", "così"; $modified = $true }
    
    if ($modified) {
        [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBOM)
        Write-Host "Repaired: $($file.FullName)"
    }
}
