$rootFiles = Get-ChildItem "c:\Users\huzhe\Documents\Antigravity\SaporiSvelati\*.html"
$rootPattern = '(?s)<div class="footer-links">\s*<h4>Esplora</h4>\s*<ul>.*?</ul>\s*</div>'
$rootReplacement = @"
                <div class="footer-links">
                    <h4>Esplora</h4>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="catalogo.html">Catalogo Notizie</a></li>
                    </ul>
                </div>
"@

foreach ($f in $rootFiles) {
    if ($f.Extension -eq ".html") {
        $c = [IO.File]::ReadAllText($f.FullName)
        if ($c -match $rootPattern) {
            $c = [regex]::Replace($c, $rootPattern, $rootReplacement)
            [IO.File]::WriteAllText($f.FullName, $c)
            Write-Host "Updated $($f.Name)"
        }
    }
}

$pageFiles = Get-ChildItem "c:\Users\huzhe\Documents\Antigravity\SaporiSvelati\pages\*.html"
$pagePattern = '(?s)<div class="footer-links">\s*<h4>Esplora</h4>\s*<ul>.*?</ul>\s*</div>'
$pageReplacement = @"
                <div class="footer-links">
                    <h4>Esplora</h4>
                    <ul>
                        <li><a href="../index.html">Home</a></li>
                        <li><a href="../catalogo.html">Catalogo Notizie</a></li>
                    </ul>
                </div>
"@

foreach ($f in $pageFiles) {
    if ($f.Extension -eq ".html") {
        $c = [IO.File]::ReadAllText($f.FullName)
        if ($c -match $pagePattern) {
            $c = [regex]::Replace($c, $pagePattern, $pageReplacement)
            [IO.File]::WriteAllText($f.FullName, $c)
            Write-Host "Updated $($f.Name)"
        }
    }
}
