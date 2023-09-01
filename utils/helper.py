from malware_ioc.aceCryptor import aceCryptor_ioc

def aceCryptor_iocs():
    for sha256 in aceCryptor_ioc.sha256:
        print(sha256)