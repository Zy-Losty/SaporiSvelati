$files = Get-ChildItem -Path "pages/*.html"
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    # Pattern to match: <div id="site-newsletter"></div> followed by whitespace, a </div>, and </main>
    # The extra </div> is the one we want to remove.
    $newContent = $content -replace '(?m)<div id="site-newsletter"></div>\s+</div>\s+</main>', '<div id="site-newsletter"></div>`r`n    </main>'
    
    # Also fix any "Saponi Svelati" if any remain
    $newContent = $newContent -replace 'Saponi Svelati', 'Sapori Svelati'
    
    [System.IO.File]::WriteAllText($file.FullName, $newContent, [System.Text.Encoding]::UTF8)
}
