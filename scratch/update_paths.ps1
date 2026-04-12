$files = Get-ChildItem "c:\Users\huzhe\Documents\Antigravity\SaporiSvelati\*.html", "c:\Users\huzhe\Documents\Antigravity\SaporiSvelati\pages\*.html"
foreach ($f in $files) {
    $c = [IO.File]::ReadAllText($f.FullName)
    # Brand
    $c = $c -replace "assets/images/logo.svg", "assets/images/brand/logo.svg"
    # Home
    $c = $c -replace "assets/images/hero.png", "assets/images/home/hero.png"
    # Articles - move anything that's currently in assets/images to assets/images/articoli/
    # This regex looks for (src=")(possibly ../)(assets/images/)(FILENAME)(not starting with home|brand|articoli)
    $pattern = '(?i)(src=")((\.\./)?assets/images/)(?!home/|brand/|articoli/)([^"]+?)(")'
    $c = [regex]::Replace($c, $pattern, '$1$2articoli/$4$5')
    [IO.File]::WriteAllText($f.FullName, $c)
    Write-Host "Updated $($f.Name)"
}
