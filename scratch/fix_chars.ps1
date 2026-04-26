$utf8NoBOM = New-Object System.Text.UTF8Encoding($false)

$files = Get-ChildItem -Recurse -Filter *.html
foreach ($file in $files) {
    if ($file.FullName -match "node_modules") { continue }
    
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $modified = $false
    
    $orig = $content
    
    # â†’  (right arrow) -> \u00E2\u2020\u2019  wait, no.
    # The bytes for → are E2 86 92.
    # When interpreted as Windows-1252:
    # E2 = â
    # 86 = † (dagger)
    # 92 = ’ (right single quotation mark)
    $arrow = "$([char]0x00E2)$([char]0x2020)$([char]0x2019)"
    
    # â€¢ (bullet) -> \u00E2\u20AC\u00A2
    # Bytes for • are E2 80 A2
    # E2 = â
    # 80 = €
    # A2 = ¢
    $bullet = "$([char]0x00E2)$([char]0x20AC)$([char]0x00A2)"
    
    # Ã¨ (è) -> C3 A8
    # C3 = Ã
    # A8 = ¨
    $egrave = "$([char]0x00C3)$([char]0x00A8)"
    
    # Ã© (é) -> C3 A9
    # C3 = Ã
    # A9 = ©
    $eacute = "$([char]0x00C3)$([char]0x00A9)"
    
    # Ã (à) -> C3 A0
    # C3 = Ã
    # A0 = (non-breaking space)
    $agrave = "$([char]0x00C3)$([char]0x00A0)"
    
    # Ã¬ (ì) -> C3 AC
    # C3 = Ã
    # AC = ¬
    $igrave = "$([char]0x00C3)$([char]0x00AC)"
    
    # Ã² (ò) -> C3 B2
    # C3 = Ã
    # B2 = ²
    $ograve = "$([char]0x00C3)$([char]0x00B2)"
    
    # Ã¹ (ù) -> C3 B9
    # C3 = Ã
    # B9 = ¹
    $ugrave = "$([char]0x00C3)$([char]0x00B9)"
    
    # â€™ (') -> E2 80 99
    # E2 = â
    # 80 = €
    # 99 = ™
    $apos = "$([char]0x00E2)$([char]0x20AC)$([char]0x2122)"
    
    # Â° (°) -> C2 B0
    # C2 = Â
    # B0 = °
    $deg = "$([char]0x00C2)$([char]0x00B0)"

    # Add replacements
    $content = $content.Replace($arrow, "→")
    $content = $content.Replace($bullet, "•")
    $content = $content.Replace($egrave, "è")
    $content = $content.Replace($eacute, "é")
    $content = $content.Replace($agrave, "à")
    $content = $content.Replace($igrave, "ì")
    $content = $content.Replace($ograve, "ò")
    $content = $content.Replace($ugrave, "ù")
    $content = $content.Replace($apos, "'")
    $content = $content.Replace($deg, "°")
    
    # Sometimes it's double encoded space? "CuriositÃ "
    $content = $content.Replace("Curiosit$([char]0x00C3) ", "Curiosità ")
    $content = $content.Replace("Curiosit$([char]0x00C3)<", "Curiosità<")
    
    # We can also do a pass with string replacement just in case
    $content = $content.Replace("â†’", "→")
    $content = $content.Replace("â€¢", "•")
    $content = $content.Replace("Ã¨", "è")
    $content = $content.Replace("Ã©", "é")
    $content = $content.Replace("Ã ", "à")
    $content = $content.Replace("Ã¬", "ì")
    $content = $content.Replace("Ã²", "ò")
    $content = $content.Replace("Ã¹", "ù")
    $content = $content.Replace("â€™", "'")
    $content = $content.Replace("Â°", "°")
    $content = $content.Replace("Eccellenze &amp; Scienza", "Eccellenze & Scienza")
    
    if ($content -ne $orig) {
        [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBOM)
        Write-Host "Fixed: $($file.FullName)"
    }
}
