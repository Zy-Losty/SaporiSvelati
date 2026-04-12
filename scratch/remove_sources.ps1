$files = Get-ChildItem "c:\Users\huzhe\Documents\Antigravity\SaporiSvelati\pages\*.html"
foreach ($f in $files) {
    $c = [IO.File]::ReadAllText($f.FullName)
    $c = [regex]::Replace($c, "(?s)\s*<section class=""sources reveal"">.*?</section>", "")
    [IO.File]::WriteAllText($f.FullName, $c)
    Write-Host "Updated $($f.Name)"
}
