let $cf = require('./../../../../server/common/function');

module.exports = function () {
    /*$stac = new SvaTactic($dbAdapter);
    $stt = new SvaTechTactic($dbAdapter);
    $st = new SvaTechnique($dbAdapter);
    $sls = new SigmaLogSources($dbAdapter);

    //$dbAdapter
    $tactics = $stac->getAll();
    $properties = array();
    foreach ($tactics as $tactic) {
        if (!empty($tactic['name'])) {
            $techniqueIds = $stt->getAllByTacticId($tactic['id'], true);
            $techniques = count($techniqueIds) ? $st->getAll(array(
                'includedIds' => $techniqueIds,
                'orderColumn' => 'name'
            )) : array();

            $techniquesName = array();
            foreach ($techniques as $technique) {
                if (!empty($technique['name'])) {
                    $techniquesName[] = $technique['name'];
                }
            }

            if (count($techniquesName)) {
                $properties[$tactic['name']] = array(
                    'type' => 'array',
                    'items' => array(
                        'enum' => $techniquesName,
                    ),
                    'uniqueItems' => true
                );
            }
        }
    }

    try {
        if (count($properties) <= 0) {
            throw new \Exception('no mitre');
        }

        $mitreAttCk = array(
            'type' => 'object',
            'properties' => $properties
        );
        $mitreAttCk = json_encode($mitreAttCk, JSON_PRETTY_PRINT);
    } catch (\Exception $e) {
        $mitreAttCk = null;
    }

   // $logSourcesTmp = $sls->getAll();
    $LogSourceCategories = $sls->getAllByEntityType('category');
    $LogSourceProducts = $sls->getAllByEntityType('product');
    $LogSourceServices = $sls->getAllByEntityType('service');

    $logSources = array();*/

    /*foreach ($logSourcesTmp as $logSourceTmp) {
        $logSources[] = array(
            'category' => isset($logSourceTmp['category']) ? $logSourceTmp['category'] : '',
            'product' => isset($logSourceTmp['product']) ? $logSourceTmp['product'] : '',
            'service' => isset($logSourceTmp['service']) ? $logSourceTmp['service'] : ''
        );
    }*/

    //let mitreAttack = '';
    let logSources = {
        'category': '',
        'product': '',
        'service': ''
    };
    let logSourceCategories = ["none"];
    let logSourceProducts = ["none"];
    let logSourceServices = ["none"];

    let result = {
        "title": "Example Schema",
        "type": "object",
        "properties": {
            "additionalProperties": false,
            "title": {
                "type": "string",
                "minLength": 1,
                "maxLength": 256
            },
            "status": {
                "enum": ["stable", "testing", "experimental"]
            },
             "description": {
                "type": "string",
                "maxLength": 1000
            },
            "author": {
                "type": ["array", "string"],
                "maxLength": 256
            },
            "level": {
                "enum": ["low", "medium", "high", "critical"]
            },
            "falsepositives": {
                "type": ["array", "object"]
            },
            "reference": {
                "type": ["array", "string"]
            },
            "logsource": {
                "type": "object",
                "errorMessage": "Logsource section is required, please specify what logs Sigma will look for by including section \"logsource:\" and set one of the product, service or category options. Example: \"product: windows service:sysmon\"",
                "highlight": true,
                "dependentData": logSources,
                "properties": {
                    "category": {
                       "type": "string",
                        "enumSelect": logSourceCategories,
                        "additionalProperties": false
                    },
                    "product": {
                        "type": "string",
                        "enumSelect": logSourceProducts,
                        "additionalProperties": false
                    },
                    "service": {
                        "type": "string",
                        "enumSelect": logSourceServices,
                        "additionalProperties": false
                    },
                    "description": {
                        "type": "string",
                        "maxLength": 4092,
                        "additionalProperties": false
                    },
                    "description1": {
                        "type": "string",
                        "maxLength": 4092,
                        "additionalProperties": false
                    },
                    "description2": {
                        "type": "string",
                        "maxLength": 4092,
                        "additionalProperties": false
                    },
                    "description3": {
                        "type": "string",
                        "maxLength": 4092,
                        "additionalProperties": false
                    },
                    "description4": {
                        "type": "string",
                        "maxLength": 4092,
                        "additionalProperties": false
                    },
                    "description5": {
                        "type": "string",
                        "maxLength": 4092,
                        "additionalProperties": false
                    },
                    "description6": {
                        "type": "string",
                        "maxLength": 4092,
                        "additionalProperties": false
                    },
                    "description7": {
                        "type": "string",
                        "maxLength": 4092,
                        "additionalProperties": false
                    },
                    "description8": {
                        "type": "string",
                        "maxLength": 4092,
                        "additionalProperties": false
                    },
                    "description9": {
                        "type": "string",
                        "maxLength": 4092,
                        "additionalProperties": false
                    },
                    "description10": {
                        "type": "string",
                        "maxLength": 4092,
                        "additionalProperties": false
                    }
                },
                "additionalProperties": false
            },
            "detection": {
                "type": "object",
                "highlight": true,
                "properties": {
                    "keywords": {
                        "type": ["array", "object"]
                    },
                    "selection": {
                        "type": ["array", "object"]
                    },
                    "condition": {
                        "type": ["array", "string"],
                        "additionalProperties": false
                    },
                    "filter": {
                        "type": "object"
                    },
                    "timeframe": {
                        "type": "string",
                        "maxLength": 256,
                        "pattern": "^([0-9]+(s|d|m|h|M|Y))$",
                        "errorMessage": "You can specify a time unit after a time value \"X\", such as XY, XM, Xd, Xh, Xm or Xs, to represent years (Y), months (M), days (d), hours (h), minutes (m) and seconds (s), respectively",
                        "additionalProperties": false
                    }
                },
                "required": ["condition"]
            },
            "fields": {
                "type": ["array", "object"]
            },
            "date": {
                "type": "string",
                "maxLength": 256,
                "pattern": "^[0-9]{4}\/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])$",
                "errorMessage": "Date format is incorrect. Required format is YYYY/MM/DD, for example 2018/01/31",
                "additionalProperties": false,
                "calendar": true
            }
        },
        "required": ["title", "logsource", "detection"]
    };

    /*if ($cf.isSet(mitreAttack)) {
        result['mitre-attack'] = mitreAttack;
    }*/

    return result;
};