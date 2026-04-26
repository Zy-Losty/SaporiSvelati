$utf8NoBOM = New-Object System.Text.UTF8Encoding($false)

$replacements = @{
    # â†’ -> →
    "w6LigqDihJI=" = "4oaS"
    # â€¢ -> •
    "w6LigqzCog==" = "4oCi"
    # Ã¨ -> è
    "w4PDiA==" = "w6g="
    # Ã© -> é
    "w4PDiQ==" = "w6k="
    # Ã  -> à
    "w4PCoA==" = "w6A="
    # Ã¬ -> ì
    "w4PCsA==" = "w6w="
    # Ã² -> ò
    "w4PCsg==" = "w7I="
    # Ã¹ -> ù
    "w4PCuQ==" = "w7k="
    # â€™ -> '
    "w6LigqzihKI=" = "Jw=="
}

$files = Get-ChildItem -Recurse -Filter *.html
foreach ($file in $files) {
    if ($file.FullName -match "node_modules") { continue }
    
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $modified = $false
    
    foreach ($key in $replacements.Keys) {
        $targetBytes = [System.Convert]::FromBase64String($key)
        $targetStr = [System.Text.Encoding]::UTF8.GetString($targetBytes)
        
        $replaceBytes = [System.Convert]::FromBase64String($replacements[$key])
        $replaceStr = [System.Text.Encoding]::UTF8.GetString($replaceBytes)
        
        if ($content.Contains($targetStr)) {
            $content = $content.Replace($targetStr, $replaceStr)
            $modified = $true
        }
    }
    
    if ($modified) {
        [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBOM)
        Write-Host "Fixed: $($file.FullName)"
    }
}
