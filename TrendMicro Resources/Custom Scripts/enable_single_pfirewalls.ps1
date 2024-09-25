Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled True
Set-NetFirewallProfile -Profile 'Public' -LogFileName '%systemroot%\System32\logfiles\firewall\pfirewall.log' -LogAllowed True