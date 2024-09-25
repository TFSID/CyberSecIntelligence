$userProfiles = Get-WmiObject Win32_UserProfile

foreach ($profile in $userProfiles) {
    $userSID = $profile.SID
    Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled True -CimSession $userSID
    Set-NetFirewallProfile -Profile 'Public' -LogFileName '%systemroot%\System32\logfiles\firewall\pfirewall.log' -LogAllowed True -CimSession $userSID
}