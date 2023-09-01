import xml.etree.ElementTree as ET
import uuid
from datetime import datetime
# from utils.helper import aceCryptor_iocs
from malware_ioc.aceCryptor import aceCryptor_ioc
from malware_ioc.agrius import agrius_ioc
from IoC_list import ioc_db


# aceCryptor ioc list
def aceCryptor():
    root = ET.Element("ioc", attrib={
        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
        "xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
        "id": str(uuid.uuid4()),
        "last-modified": "2023-08-29T10:00:48",
        "xmlns": "http://schemas.mandiant.com/2010/ioc"
    })

    short_description = ET.SubElement(root, "short_description")
    short_description.text = "aceCryptor File Hash IOC"
    
    authored_by = ET.SubElement(root, "authored_by")
    authored_by.text = "TFS"
    
    authored_date = ET.SubElement(root, "authored_date")
    authored_date.text = datetime.now().isoformat()
    
    links = ET.SubElement(root, "links")
    links
    
    definition = ET.SubElement(root, "definition")

    indicator_s = ET.SubElement(definition, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

    # aceCryptor sha256 ioc list
    for aceCryptor_sha256 in aceCryptor_ioc.sha256.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = aceCryptor_sha256

    # aceCryptor_md5 hash ioc list
    for aceCryptor_md5 in aceCryptor_ioc.md5.samples_md5:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = aceCryptor_md5


    # indicator_l.text = content_data
    
    # indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
    #     "condition": "is"
    #     })
    
    # context = ET.SubElement(indicator_item, "Context", attrib={
    #     "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
    #     })
    # context
    


    # for content_data in data_list:
    #     content1 = ET.SubElement(indicator_item, "Content", attrib={
    #     "type": "string"
    #     })
    #     content1.text = content_data

    

    tree = ET.ElementTree(root)
    tree.write("aceCryptor.ioc", encoding="us-ascii", xml_declaration=True)

# agrius ioc list
def agrius():
    root = ET.Element("ioc", attrib={
        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
        "xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
        "id": str(uuid.uuid4()),
        "last-modified": "2023-08-29T10:00:48",
        "xmlns": "http://schemas.mandiant.com/2010/ioc"
    })

    short_description = ET.SubElement(root, "short_description")
    short_description.text = "agrius File Hash SHA256 IOC"

    
    authored_by = ET.SubElement(root, "authored_by")
    authored_by.text = "TFS"
    
    authored_date = ET.SubElement(root, "authored_date")
    authored_date.text = datetime.now().isoformat()
    
    links = ET.SubElement(root, "links")
    links
    
    definition = ET.SubElement(root, "definition")

    indicator_s = ET.SubElement(definition, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

    for agrius_sha256 in agrius_ioc.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = agrius_sha256

    
    # md5 hash ioc list
    for agrius_md5 in agrius_ioc.samples_md5:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = agrius_md5


    # indicator_l.text = content_data
    
    # indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
    #     "condition": "is"
    #     })
    
    # context = ET.SubElement(indicator_item, "Context", attrib={
    #     "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
    #     })
    # context
    


    # for content_data in data_list:
    #     content1 = ET.SubElement(indicator_item, "Content", attrib={
    #     "type": "string"
    #     })
    #     content1.text = content_data

    

    tree = ET.ElementTree(root)
    tree.write("agrius.ioc", encoding="us-ascii", xml_declaration=True)

# agrius ioc list
def amavaldo():
    root = ET.Element("ioc", attrib={
        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
        "xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
        "id": str(uuid.uuid4()),
        "last-modified": "2023-08-29T10:00:48",
        "xmlns": "http://schemas.mandiant.com/2010/ioc"
    })

    short_description = ET.SubElement(root, "short_description")
    short_description.text = "agrius File Hash SHA256 IOC"

    
    authored_by = ET.SubElement(root, "authored_by")
    authored_by.text = "TFS"
    
    authored_date = ET.SubElement(root, "authored_date")
    authored_date.text = datetime.now().isoformat()
    
    links = ET.SubElement(root, "links")
    links
    
    definition = ET.SubElement(root, "definition")

    indicator_s = ET.SubElement(definition, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

    for agrius_sha256 in agrius_ioc.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = agrius_sha256

    
    # md5 hash ioc list
    for agrius_md5 in agrius_ioc.samples_md5:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = agrius_md5

    tree = ET.ElementTree(root)
    tree.write("agrius.ioc", encoding="us-ascii", xml_declaration=True)

# full ioc list
def full_ioc():
    root = ET.Element("ioc", attrib={
        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
        "xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
        "id": str(uuid.uuid4()),
        "last-modified": "2023-08-29T10:00:48",
        "xmlns": "http://schemas.mandiant.com/2010/ioc"
    })

    short_description = ET.SubElement(root, "short_description")
    short_description.text = "agrius File Hash SHA256 IOC"

    authored_by = ET.SubElement(root, "authored_by")
    authored_by.text = "TFS"
    
    authored_date = ET.SubElement(root, "authored_date")
    authored_date.text = datetime.now().isoformat()
    
    links = ET.SubElement(root, "links")
    links
    
    definition = ET.SubElement(root, "definition")

    indicator_s = ET.SubElement(definition, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

    for aceCryptor_sha256 in ioc_db.aceCryptor.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = aceCryptor_sha256

    for agrius_sha256 in ioc_db.agrius.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = agrius_sha256

    for amavaldo_sha256 in ioc_db.amavaldo.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = amavaldo_sha256

    for animalfarm_sha256 in ioc_db.animalfarm.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = animalfarm_sha256

    for asylum_ambuscade_sha256 in ioc_db.asylum_ambuscade.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = asylum_ambuscade_sha256

    for attor_sha256 in ioc_db.attor.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = attor_sha256

    for backdoordiplomacy_sha256 in ioc_db.backdoordiplomacy.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = backdoordiplomacy_sha256

    for badiis_sha256 in ioc_db.badiis.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = badiis_sha256

    for bandook_sha256 in ioc_db.bandook.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = bandook_sha256

    for blacklotus_sha256 in ioc_db.blacklotus.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = blacklotus_sha256

    for buhtrap_sha256 in ioc_db.buhtrap.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = buhtrap_sha256

    for casbaneiro_sha256 in ioc_db.casbaneiro.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = casbaneiro_sha256

    for cdrthief_sha256 in ioc_db.cdrthief.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = cdrthief_sha256

    for cloudmensis_sha256 in ioc_db.cloudmensis.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = cloudmensis_sha256

    for cosmicbeetle_sha256 in ioc_db.cosmicbeetle.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = cosmicbeetle_sha256

        
    for danabot_sha256 in ioc_db.danabot.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = danabot_sha256

    for dark_iot_sha256 in ioc_db.dark_iot.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = dark_iot_sha256

    for dazzlespy_sha256 in ioc_db.dazzlespy.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = dazzlespy_sha256

    for deprimon_sha256 in ioc_db.deprimon.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = deprimon_sha256

    for dnsbirthday_sha256 in ioc_db.dnsbirthday.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = dnsbirthday_sha256

    for donot_sha256 in ioc_db.donot.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = donot_sha256

    for dukes_sha256 in ioc_db.dukes.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = dukes_sha256

    for emotet_sha256 in ioc_db.emotet.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = emotet_sha256

    for especter_sha256 in ioc_db.especter.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = especter_sha256

    for evasive_panda_sha256 in ioc_db.evasive_panda.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = evasive_panda_sha256

    for evilnum_sha256 in ioc_db.evilnum.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = evilnum_sha256

    for exchange_exploitation_sha256 in ioc_db.exchange_exploitation.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = exchange_exploitation_sha256

    for famoussparrow_sha256 in ioc_db.famoussparrow.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = famoussparrow_sha256

    for gamaredon_sha256 in ioc_db.gamaredon.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = gamaredon_sha256

    for gamarue_sha256 in ioc_db.gamarue.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = gamarue_sha256

    for gelsemium_sha256 in ioc_db.gelsemium.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = gelsemium_sha256

    for glupteba_sha256 in ioc_db.glupteba.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = glupteba_sha256

    for gmera_sha256 in ioc_db.gmera.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = gmera_sha256

    for grandoreiro_sha256 in ioc_db.grandoreiro.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = grandoreiro_sha256

    for gravityrat_sha256 in ioc_db.gravityrat.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = gravityrat_sha256

    for gref_sha256 in ioc_db.gref.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = gref_sha256

    for greyenergy_sha256 in ioc_db.greyenergy.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = greyenergy_sha256

    for grooundbait_sha256 in ioc_db.grooundbait.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = grooundbait_sha256

    for guildma_sha256 in ioc_db.guildma.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = guildma_sha256

    for industroyer_sha256 in ioc_db.industroyer.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = industroyer_sha256

    for interception_sha256 in ioc_db.interception.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = interception_sha256

    # invisimole
    for invisimole_sha256 in ioc_db.invisimole.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = invisimole_sha256

    # janeleiro
    for janeleiro_sha256 in ioc_db.janeleiro.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = janeleiro_sha256

    # kasidet
    for kasidet_sha256 in ioc_db.kasidet.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = kasidet_sha256

    # keydnap
    for keydnap_sha256 in ioc_db.keydnap.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = keydnap_sha256

    # kimsuky
    for kimsuky_sha256 in ioc_db.kimsuky.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = kimsuky_sha256

    # kobalos
    for kobalos_sha256 in ioc_db.kobalos.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = kobalos_sha256

    # krachulka
    for krachulka_sha256 in ioc_db.krachulka.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = krachulka_sha256

    # kryptocibule
    for kryptocibule_sha256 in ioc_db.kryptocibule.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = kryptocibule_sha256

    # lokorrito
    for lokorrito_sha256 in ioc_db.lokorrito.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = lokorrito_sha256

    # machete
    for machete_sha256 in ioc_db.machete.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = machete_sha256

    # mekotio
    for mekotio_sha256 in ioc_db.mekotio.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = mekotio_sha256

    # mikroceen
    for mikroceen_sha256 in ioc_db.mikroceen.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = mikroceen_sha256

    # mirrorface
    for mirrorface_sha256 in ioc_db.mirrorface.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = mirrorface_sha256

    # mispadu
    for mispadu_sha256 in ioc_db.mispadu.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = mispadu_sha256

    # moose
    for moose_sha256 in ioc_db.moose.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = moose_sha256

    # moustachedbouncer
    for moustachedbouncer_sha256 in ioc_db.moustachedbouncer.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = moustachedbouncer_sha256

    # mumblehard
    for mumblehard_sha256 in ioc_db.mumblehard.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = mumblehard_sha256

    # mustang_panda
    for mustang_panda_sha256 in ioc_db.mustang_panda.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = mustang_panda_sha256

    # nightscout
    for nightscout_sha256 in ioc_db.nightscout.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = nightscout_sha256

    # nukesped_lazarus
    for nukesped_lazarus_sha256 in ioc_db.nukesped_lazarus.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = nukesped_lazarus_sha256

    # numando
    for numando_sha256 in ioc_db.numando.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = numando_sha256

    # oceanlotus
    for oceanlotus_sha256 in ioc_db.oceanlotus.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = oceanlotus_sha256

    # okrum_ke3chang
    for okrum_ke3chang_sha256 in ioc_db.okrum_ke3chang.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = okrum_ke3chang_sha256

    # ousaban
    for ousaban_sha256 in ioc_db.ousaban.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = ousaban_sha256

    # polonium
    for polonium_sha256 in ioc_db.polonium.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = polonium_sha256

    # potao
    for potao_sha256 in ioc_db.potao.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = potao_sha256

    # powerpool
    for powerpool_sha256 in ioc_db.powerpool.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = powerpool_sha256

    # quarterly_reports
    for quarterly_reports_sha256 in ioc_db.quarterly_reports.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = quarterly_reports_sha256

    # rakos
    for rakos_sha256 in ioc_db.rakos.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = rakos_sha256

    # ramsay
    for ramsay_sha256 in ioc_db.ramsay.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = ramsay_sha256

    # rtm
    for rtm_sha256 in ioc_db.rtm.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = rtm_sha256

    # scarcruft
    for scarcruft_sha256 in ioc_db.scarcruft.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = scarcruft_sha256

    # sednit
    for sednit_sha256 in ioc_db.sednit.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = sednit_sha256

    # signsight
    for signsight_sha256 in ioc_db.signsight.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = signsight_sha256

    # spalax
    for spalax_sha256 in ioc_db.spalax.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = spalax_sha256

    # sparklinggoblin
    for sparklinggoblin_sha256 in ioc_db.sparklinggoblin.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = sparklinggoblin_sha256

    # sshdoor
    for sshdoor_sha256 in ioc_db.sshdoor.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = sshdoor_sha256

    # stantinko
    for stantinko_sha256 in ioc_db.stantinko.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = stantinko_sha256

    # stealthytrident
    for stealthytrident_sha256 in ioc_db.stealthytrident.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = stealthytrident_sha256

    # swc_candiru
    for swc_candiru_sha256 in ioc_db.swc_candiru.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = swc_candiru_sha256

    # ta410
    for ta410_sha256 in ioc_db.ta410.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = ta410_sha256

    # telebots
    for telebots_sha256 in ioc_db.telebots.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = telebots_sha256

    # telekopye
    for telekopye_sha256 in ioc_db.telekopye.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = telekopye_sha256

    # tick
    for tick_sha256 in ioc_db.tick.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = tick_sha256

    # turla
    for turla_sha256 in ioc_db.turla.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = turla_sha256

    # ua_wipers
    for ua_wipers_sha256 in ioc_db.ua_wipers.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = ua_wipers_sha256

    # vadokrist
    for vadokrist_sha256 in ioc_db.vadokrist.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = vadokrist_sha256

    # windigo
    for windigo_sha256 in ioc_db.windigo.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = windigo_sha256

    # winnti_group
    for winnti_group_sha256 in ioc_db.winnti_group.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = winnti_group_sha256

    # worok
    for worok_sha256 in ioc_db.worok.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = worok_sha256

    # xddspy
    for xddspy_sha256 in ioc_db.xddspy.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = xddspy_sha256

    # zimbra_phising
    for zimbra_phising_sha256 in ioc_db.zimbra_phising.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = zimbra_phising_sha256

    #  zumanaek
    for zumanaek_sha256 in ioc_db.zumanaek.samples_sha256:
        indicator_l = ET.SubElement(indicator_s, "Indicator", attrib={
        "operator": "OR",
        "id": str(uuid.uuid4())
        })

        indicator_item = ET.SubElement(indicator_l, "IndicatorItem", attrib={
        "condition": "is"
        })

        context = ET.SubElement(indicator_item, "Context", attrib={
            "document": "FileItem", "search": "FileItem/Sha256sum", "type": "mir"
            })
        context

        content1 = ET.SubElement(indicator_item, "Content", attrib={
        "type": "string"
        })
        content1.text = zumanaek_sha256

    

    tree = ET.ElementTree(root)

    tree.write("akasata-list.ioc", encoding="us-ascii", xml_declaration=True)

# aceCryptor()
# agrius()

full_ioc()
