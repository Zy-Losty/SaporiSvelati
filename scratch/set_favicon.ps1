$rootFiles = Get-ChildItem "c:\Users\huzhe\Documents\Antigravity\SaporiSvelati\*.html"
foreach ($f in $rootFiles) {
    if ($f.Extension -eq ".html") {
        $c = [IO.File]::ReadAllText($f.FullName)
        if ($c -notmatch 'rel="icon"') {
            $c = $c -replace '(</title>)', "`$1`n    <link rel=""icon"" type=""image/svg+xml"" href=""assets/images/brand/logo.svg"">"
            [IO.File]::WriteAllText($f.FullName, $c)
            Write-Host "Updated $($f.Name)"
        }
    }
}

$pageFiles = Get-ChildItem "c:\Users\huzhe\Documents\Antigravity\SaporiSvelati\pages\*.html"
foreach ($f in $pageFiles) {
    if ($f.Extension -eq ".html") {
        $c = [IO.File]::ReadAllText($f.FullName)
        if ($c -notmatch 'rel="icon"') {
            $c = $c -replace '(</title>)', "`$1`n    <link rel=""icon"" type=""image/svg+xml"" href=""../assets/images/brand/logo.svg"">"
            [IO.File]::WriteAllText($f.FullName, $c)
            Write-Host "Updated $($f.Name)"
        }
    }
}
