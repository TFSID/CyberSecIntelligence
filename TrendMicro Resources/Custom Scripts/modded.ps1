$OutputEncoding = [console]::InputEncoding = [console]::OutputEncoding = [Text.UTF8Encoding]::UTF8

function tm_entry_point {
#Execute in an administrative powershell: Set-ExecutionPolicy UnRestricted -Force
Set-ExecutionPolicy Unrestricted -Force
cd "C:\\Program Files\\"
Write-Host "Done!"
pause
}

tm_entry_point 