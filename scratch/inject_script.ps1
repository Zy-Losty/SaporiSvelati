$scriptTag = '<script src="js/newsletter.js"></script>'
$scriptTagNested = '<script src="../js/newsletter.js"></script>'

Get-ChildItem -Filter *.html -Recurse | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    
    # Check if the file has a newsletter form
    if ($content -match 'class="newsletter-form"') {
        # Check depth
        $isNested = $_.FullName -match '\\pages\\'
        $tagToUse = if ($isNested) { $scriptTagNested } else { $scriptTag }
        
        if (-not ($content -match 'newsletter\.js')) {
            $newContent = $content -replace '</body>', "$tagToUse`r`n</body>"
            $newContent | Set-Content $_.FullName -Encoding UTF8
            Write-Host "Injected script in: $($_.FullName)"
        }
    }
}
