$files = Get-ChildItem -Path "pages/*.html"
$utf8NoBOM = New-Object System.Text.UTF8Encoding($false)

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    
    # 1. Fix the newline mess from previous attempt
    $content = $content -replace '`r`n', "`r`n"
    
    # 2. Fix the extra </div> before </main>
    # The pattern is: <div id="site-newsletter"></div> followed by whitespace, then </div>, then </main>
    $content = [regex]::Replace($content, '(?m)(<div id="site-newsletter"></div>)\s+</div>\s+</main>', "$1`r`n    </main>")
    
    # 3. Fix the encoding mess introduced by last script (â€¢, cosÃ¬, etc.)
    # We replace common double-encoded UTF-8 sequences back to correct characters.
    $replacements = @{
        'â€¢' = '•'
        'Ã¬' = 'ì'
        'Ã ' = 'à'
        'Ã²' = 'ò'
        'Ã¹' = 'ù'
        'Ã©' = 'é'
        'Ã¨' = 'è'
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
    }
    
    foreach ($key in $replacements.Keys) {
        $content = $content -replace $key, $replacements[$key]
    }

    # 4. Fix Saponi typo
    $content = $content -replace 'Saponi Svelati', 'Sapori Svelati'
    
    [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBOM)
}
