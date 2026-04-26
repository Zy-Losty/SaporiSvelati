$utf8NoBOM = New-Object System.Text.UTF8Encoding($false)
$replacements = @{
    'Ã ' = 'à'
    'Ã²' = 'ò'
    'Ã¹' = 'ù'
    'Ã©' = 'é'
    'Ã¨' = 'è'
    'Ã¬' = 'ì'
    'Ã³' = 'ó'
    'Ã¡' = 'á'
    'Ã¢' = 'â'
    'Ã®' = 'î'
    'Ã”' = 'Ô'
    'Ã»' = 'û'
    'Ã‰' = 'É'
    'Ãˆ' = 'È'
    'â€™' = "'"
    'Â°' = '°'
    'â€¢' = '•'
    'Ã¯' = 'ï'
    'Ãª' = 'ê'
    'perchǸ' = 'perché'
    'cosǪ' = 'così'
    'Curiosit' = 'Curiosità'
    'qualit' = 'qualità'
    'caff' = 'caffè'
    '' = 'à' # This might match the broken char
}

$files = Get-ChildItem -Recurse -Filter *.html
foreach ($file in $files) {
    if ($file.FullName -match "node_modules") { continue }
    
    # Read as UTF8 with BOM first (which PowerShell might have introduced)
    $content = [System.IO.File]::ReadAllText($file.FullName)
    
    foreach ($key in $replacements.Keys) {
        $content = $content.Replace($key, $replacements[$key])
    }
    
    # Specific fixes for common words that might have double encoding patterns
    $content = $content -replace 'curiositÃ ', 'curiosità'
    $content = $content -replace 'perchÃ©', 'perché'
    $content = $content -replace 'perchÃ¨', 'perché'
    $content = $content -replace 'cosÃ¬', 'così'
    $content = $content -replace 'qualitÃ ', 'qualità'
    
    [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBOM)
    Write-Host "Fixed: $($file.FullName)"
}
