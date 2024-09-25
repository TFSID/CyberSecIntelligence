#Execute in an administrative powershell: Set-ExecutionPolicy UnRestricted -Force
Invoke-WebRequest "https://raw.githubusercontent.com/SwiftOnSecurity/sysmon-config/master/sysmonconfig-export.xml" -OutFile "sysmonlatest.xml" -UseBasicParsing
Invoke-WebRequest "https://download.sysinternals.com/files/Sysmon.zip" -OutFile "sysmon.zip" -UseBasicParsing
Expand-Archive "sysmon.zip" -Force
$path = Get-Location
Set-Location ".\sysmon\"

if ([System.Environment]::Is64BitOperatingSystem) {
    Copy-Item ".\sysmon64.exe" "C:\Windows\System32\sysmon64.exe"
    Set-Location $path
    Start-Process "C:\Windows\System32\Sysmon64.exe" -ArgumentList "-accepteula -i sysmonlatest.xml"
    Start-Process "C:\Windows\System32\Sysmon64.exe" -ArgumentList "-accepteula -c sysmonlatest.xml"
} else {
    Copy-Item ".\sysmon.exe" "C:\windows\system32\sysmon.exe"
    Set-Location $path
    Start-Process "C:\Windows\System32\Sysmon.exe" -ArgumentList "-accepteula -i sysmonlatest.xml"
    Start-Process "C:\Windows\System32\Sysmon.exe" -ArgumentList "-accepteula -c sysmonlatest.xml"
}
Write-Host "Sysmon Installed && Configured Successfully"
Write-Host "Deleting useless files..."
Remove-Item "sysmon*" -Verbose -Force -Recurse
Set-ExecutionPolicy Undefined -Force
Write-Host "Done!"