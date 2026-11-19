<#
  release.ps1 : bump version, update CHANGELOG, commit, tag and push.

  Usage (from the repo folder):
    .\scripts\release.ps1 -Bump patch -Message "Added new project"
    .\scripts\release.ps1 -Bump minor -Message "New blog section"
    .\scripts\release.ps1 -Bump major -Message "Full redesign"
    .\scripts\release.ps1 -Bump patch -Message "Typo fix" -NoPush

  patch = small fix or content update   (1.0.0 -> 1.0.1)
  minor = new section or feature        (1.0.1 -> 1.1.0)
  major = big redesign                  (1.1.0 -> 2.0.0)
#>
param(
  [ValidateSet("patch", "minor", "major")] [string]$Bump = "patch",
  [Parameter(Mandatory = $true)] [string]$Message,
  [switch]$NoPush
)
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$utf8 = New-Object System.Text.UTF8Encoding($false)
$old = (Get-Content "VERSION" -Raw).Trim()
$p = $old.Split(".") | ForEach-Object { [int]$_ }
switch ($Bump) {
  "major" { $p[0]++; $p[1] = 0; $p[2] = 0 }
  "minor" { $p[1]++; $p[2] = 0 }
  "patch" { $p[2]++ }
}
$new = "$($p[0]).$($p[1]).$($p[2])"
$today = Get-Date -Format "yyyy-MM-dd"

# VERSION file
[IO.File]::WriteAllText("$root\VERSION", "$new`n", $utf8)

# data/site.js version + updated date
$site = [IO.File]::ReadAllText("$root\data\site.js")
$site = $site -replace 'version:\s*"[^"]*"', "version: `"$new`""
$site = $site -replace 'updated:\s*"[^"]*"', "updated: `"$today`""
[IO.File]::WriteAllText("$root\data\site.js", $site, $utf8)

# index.html cache busting: style.css?v=X, site.js?v=X, main.js?v=X
$html = [IO.File]::ReadAllText("$root\index.html")
$html = $html -replace '\?v=[0-9]+\.[0-9]+\.[0-9]+', "?v=$new"
[IO.File]::WriteAllText("$root\index.html", $html, $utf8)

# CHANGELOG (new entry under the header)
$log = [IO.File]::ReadAllText("$root\CHANGELOG.md")
$entry = "## [$new] - $today`n`n- $Message`n`n"
$idx = $log.IndexOf("## [")
if ($idx -ge 0) { $log = $log.Insert($idx, $entry) } else { $log = $log + "`n" + $entry }
[IO.File]::WriteAllText("$root\CHANGELOG.md", $log, $utf8)

git add -A
git commit -m "v${new}: $Message"
git tag -a "v$new" -m "v${new}: $Message"
Write-Host "Released v$new (was v$old)" -ForegroundColor Green

if (-not $NoPush) {
  git push origin HEAD
  git push origin "v$new"
  Write-Host "Pushed. GitHub Pages will update in about a minute." -ForegroundColor Green
}
