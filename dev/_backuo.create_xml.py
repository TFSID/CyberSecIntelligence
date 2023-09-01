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

    tree = ET.ElementTree(root)
    tree.write("akasata-list.ioc", encoding="us-ascii", xml_declaration=True)

# aceCryptor()
# agrius()

full_ioc()
