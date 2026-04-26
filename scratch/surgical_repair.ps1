$utf8NoBOM = New-Object System.Text.UTF8Encoding($false)

$files = Get-ChildItem -Recurse -Filter *.html
foreach ($file in $files) {
    if ($file.FullName -match "node_modules") { continue }
    
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $modified = $false
    
    # Fix the specific corrupted characters seen in the logs
    # perchǸ -> perché
    if ($content.Contains("perch$([char]0x01F8)")) {
        $content = $content.Replace("perch$([char]0x01F8)", "perché")
        $modified = $true
    }
    # cosǪ -> così
    if ($content.Contains("cos$([char]0x01EA)")) {
        $content = $content.Replace("cos$([char]0x01EA)", "così")
        $modified = $true
    }
    # cos' -> cos'è (the  here is probably a specific byte)
    # Let's try to match the pattern in the description
    if ($content -match "cos'[^ ] la marezzatura") {
        $content = [regex]::Replace($content, "cos'[^ ] la marezzatura", "cos'è la marezzatura")
        $modified = $true
    }
    
    # Generic replacements for common words
    $words = @{
        "perch$([char]0x01F8)" = "perché"
        "cos$([char]0x01EA)" = "così"
        "qualit$([char]0x01EA)" = "qualità"
        "Curiosit$([char]0x01EA)" = "Curiosità"
        "caff$([char]0x01F8)" = "caffè"
        "scienza" = "scienza" # just to check if it matches
    }
    
    foreach ($key in $words.Keys) {
        if ($content.Contains($key)) {
            $content = $content.Replace($key, $words[$key])
            $modified = $true
        }
    }

    if ($modified) {
        [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBOM)
        Write-Host "Repaired: $($file.FullName)"
    }
}
