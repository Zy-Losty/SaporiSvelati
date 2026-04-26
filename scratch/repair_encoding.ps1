$utf8NoBOM = New-Object System.Text.UTF8Encoding($false)
$latin1 = [System.Text.Encoding]::GetEncoding("iso-8859-1")

$files = Get-ChildItem -Recurse -Filter *.html
foreach ($file in $files) {
    if ($file.FullName -match "node_modules") { continue }
    
    $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
    $text = [System.Text.Encoding]::UTF8.GetString($bytes)
    
    if ($text -match "Ã") {
        # This looks like double encoding. 
        # Try to fix: interpret UTF-8 string as Latin-1 bytes, then read those bytes as UTF-8.
        $corruptedBytes = [System.Text.Encoding]::UTF8.GetBytes($text)
        # This is not quite right. 
        
        # Let's try direct string replacements for the most common ones without using literal chars in script
        # à = Ã + \u00A0
        $content = $text
        $content = $content.Replace("Ã`u{00A0}", "à")
        $content = $content.Replace("Ã¨", "è")
        $content = $content.Replace("Ã©", "é")
        $content = $content.Replace("Ã¬", "ì")
        $content = $content.Replace("Ã²", "ò")
        $content = $content.Replace("Ã¹", "ù")
        $content = $content.Replace("Ã`u{00B9}", "ù")
        
        # Also handle the  or weird chars seen in logs
        $content = $content.Replace("perchǸ", "perché")
        $content = $content.Replace("cosǪ", "così")
        
        [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBOM)
        Write-Host "Repaired: $($file.FullName)"
    }
}
