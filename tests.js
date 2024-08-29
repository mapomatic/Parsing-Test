/* eslint-disable quotes */
/* eslint-disable max-len */
/* eslint-disable camelcase */
// ==UserScript==
// @name         Parsing Test - TESTS
// @namespace    http://tampermonkey.net/
// @version      2024.08.22.000
// @description  try to take over the world!
// @author       You
// @match        https://www.google.com*
// @grant        none
// @require      file:///C:\Users\mfreese\source\git\Parsing-Test\Test.js
// @require      https://cdn.jsdelivr.net/npm/esprima@4/dist/esprima.min.js
// ==/UserScript==

/* global esprima */
/* global LabelProcessor */
/* global Test */

(function main() {
    'use strict';

    window.esprima = esprima;
    window.LabelProcessor = LabelProcessor;

    const moreTests = [
        "return fieldValues.ARPT_NAME + ' ' + '(' + (fieldValues.NOTAM_ID) + ')';",
        "",
        "label = 'EV Network: ' + fieldValues.ev_network + '\\n' + fieldValues.station_name + '\\n' + fieldValues.street_address + '\\n Connectors: ' + fieldValues.ev_connector_types; if (fieldValues.ev_dc_fast_num) { label += '\\n DC Fast Chargers: ' + fieldValues.ev_dc_fast_num }; if (fieldValues.ev_level1_evse_num) { label += '\\n Level 1 Chargers: ' + fieldValues.ev_level1_evse_num }; if (fieldValues.ev_level2_evse_num) { label += '\\n Level 2 Chargers: ' + fieldValues.ev_level2_evse_num }; if (fieldValues.ev_pricing) { label += ' + \\n Pricing: ' + fieldValues.ev_pricing }; return label;",
        "let zoom = W.map.getZoom(); if (zoom >= 2) {  label = fieldValues.LOCALE_NAME + ' (Post Office)'; } if (zoom >= 5) {  label += '\\n' + fieldValues.ADDRESS + ', ' + fieldValues.CITY + ', ' + fieldValues.STATE + ' ' + fieldValues.ZIP_CODE; } return label;",
        'return "Name:"+fieldValues.IVM_SYMBOL+"\\n Maint Level:"+fieldValues.OPER_MAINT_LEVEL+"\\n Surface Type:"+fieldValues.SURFACE_TYPE+"\\n Lanes:"+fieldValues.LANES+"\\n Open to:"+fieldValues.OPENFORUSETO;',
        "return `${fieldValues.prod_type}\\nUntil\\n${new Date(fieldValues.ends).toLocaleString()}`",
        'return "Status:"+fieldValues.status+"\\n Flood Stage:"+fieldValues.flood+"\\n Last Observation:"+fieldValues.observed+"\\n UTC Time:"+fieldValues.obstime;',
        "return fieldValues.mission.replace(/^CA-\\w{3}-(\\w{3,10})-\\w{3,6}/,'$1');",
        "return `${fieldValues.rdclass_22} | ${fieldValues.rdnum_21} | ${fieldValues.rdname_21}`",
        "return `${fieldValues.ANAME} (${fieldValues.ENAME} ${fieldValues.ETYPE})`",
        'return fieldValues.ANAME + " (" + fieldValues.ENAME + ")\\n MNCP #" + fieldValues.MNCP_NO',
        'return "ZONE " + label',
        'return fieldValues.ANAME + " (" + fieldValues.ENAME + ")\\nDISTRICT #" + fieldValues.DIST_NO',
        "return label.replace(/\\d+'\\s*ROW/g,'');",
        "return label.replace(/^0\\s*/,'');",
        "return label.replace(_regexReplace.r0, '');",
        "return label.replace(_regexReplace.r0, '').replace(_regexReplace.r5, '$1\\n$2');",
        "let zoom = W.map.getZoom(); if (zoom >= 2) {  label = fieldValues.NAME; } if (zoom >= 5) {  label += '\\n' + fieldValues.FULLADDR; } return label;",
        "return fieldValues.FACILITYID+'\\n'+fieldValues.FULLADDR;",
        "return fieldValues.SitusAddNumber+' '+fieldValues.SitusAddName;",
        "return 'MM ' + label;",
        "return label.replace(_regexReplace.r3, '');",
        "return `${fieldValues.Location} \\n ${new Date(fieldValues.Start_Date).toLocaleString('en-US')} to ${new Date(fieldValues.End_Date).toLocaleString()} \\n Direction: ${fieldValues.Direction} \\n ${fieldValues.Description }`",
        "return label.replace(_regexReplace.r1, '$1$2');",
        "return fieldValues.evactype + '\\n ' + fieldValues.incidentnm;",
        "return label.replace(_regexReplace.r5, '$1\\n$2');",
        "return 'Exit # ' + label;",
        "return 'PM ' + label;",
        "return 'SR-' + label;",
        "return fieldValues.SHELTER_NAME + '\\n' + fieldValues.ADDRESS_1 + '\\nSTATUS: ' + fieldValues.SHELTER_STATUS_CODE;",
        "return (Math.round(((new Date()-(new Date(fieldValues.esritimeutc)))/360000))/10).toString();",
        "return fieldValues.mission.replace(/^CA-\\w{3}-(\\w{3,10})-\\w{3,6}/,'$1') + '\\n' + new Date(fieldValues.modify_date).toLocaleString('en-US');",
        "return label.replace('</p>', ' + \\n + ');",
        "return 'ENDS: ' + (new Date(fieldValues.END_DATE)).toString();",
        "return label + '\\n' + 'Active';",
        "return 'From: ' + fieldValues.StartDateFormatted + '\\nTo: ' +fieldValues.EndDateFormatted+'\\n'+fieldValues.Name+'\\n'+fieldValues.Description;",
        "return fieldValues.direction + '\\n ' +fieldValues.laneimpact+'\\n'+fieldValues.description;",
        "return fieldValues.street + '\\n' + fieldValues.direction + '\\n' + fieldValues.subtype + '\\n' + (new Date(fieldValues.endtime)) ;",
        "return fieldValues.NAME + '\\n' + fieldValues.ADDRESS;",
        "return fieldValues.PARK_NAME + '\\n' + fieldValues.ADDRESS + '\\nRestrooms: ' + fieldValues.RESTROOMS;",
        "return fieldValues.School + '\\n' + fieldValues.Street;",
        "return (new Date(fieldValues.STARTDATE)) + ' to ' + (new Date(fieldValues.ENDDATE));",
        "return 'Mandatory';",
        `if (fieldValues.ControlType="RO") {label = "Residents Only";} else if (fieldValues.ControlType="C") {label = "Road Closure";} label += '\\n' + fieldValues.ControlDescription; return label;`,
        "return fieldValues.FULLSTREET + ' (SL: ' + fieldValues.SPEED_LIMIT + ' mph )' ;",
        "return fieldValues.RoadName + '\\n' + fieldValues.ClosureReason + '\\n' + fieldValues.RoadFrom + ' to ' + fieldValues.RoadTo ;",
        'return "Evacuation Order";',
        "return fieldValues.street + '\\n' + fieldValues.direction + '\\n' + fieldValues.description ;",
        "return 'Emergency Closure\\n'+fieldValues.REASON",
        "return 'Scheduled until\\n'+fieldValues.SCHEDULED_OPEN",
        "return fieldValues.Name+'\\n'+fieldValues.Address;",
        'return fieldValues.Road_Name + "\\n" + fieldValues.Status + "\\n" + fieldValues.Closure_Description + "\\n" + fieldValues.Notes;',
        "label = '#' + fieldValues.structure_number_008 + '\\n' + fieldValues.facility_carried_007 + '\\n' + ' over ' + fieldValues.features_desc_006a; return label;",
        "return fieldValues.RoadName + '\\n' + fieldValues.EventType +'\\n' +'Until: '+(new Date(fieldValues.DateRoadReOpen)).toString() + '\\n' +fieldValues.Description;",
        "label = fieldValues.AGENCY_NAME; if (fieldValues.STATION != '<Null>' && fieldValues.STATION != null && fieldValues.STATION != '' && fieldValues.STATION != ' ') {  label += ' ' + fieldValues.STATION; } if (fieldValues.ADDRESS != '<Null>' && fieldValues.ADDRESS != null && fieldValues.ADDRESS != '' && fieldValues.ADDRESS != ' ') {  label += '\\n' + fieldValues.ADDRESS; } return label;",
        "return 'PUBLIC SHELTER\\nFACILITY: ' + fieldValues.FacilityName + '\\n' + fieldValues.FacilityAddress1 + '\\nSTATUS: OPEN';",
        "return 'Mandatory Evacuation';",
        "return label.replace(_regexReplace.r4, '$2 $1');",
        "return label.replace(_regexReplace.r1, '$1$2').replace(_regexReplace.r0, '');",
        "var options = {day:'2-digit',year:'numeric',month:'2-digit',hour:'2-digit',minute:'2-digit'}; return `${fieldValues.Type} \\n${fieldValues.direction}\\nuntil ${new Date(fieldValues.endtime).toLocaleString('en-US', options)}\\n${fieldValues.description}`;",
        "return label.replace(_regexReplace.r4, '$2 $1').replace(/^LAND\\s.*/, '');",
        "return label.replace(/^0+/,'');",
        `function formatLabel(label1) {  if(label1 && label1 !== 'null' && label1 !== 'null null') {  return label1.replace(/\\(/g, "").replace(/\\)/g, "").trim();  }  return ''; } label = formatLabel(fieldValues.CompleteAddressNumber + ' ' + fieldValues.CompleteStreetName); if (!label) {  let formattedAddress = formatLabel(  (fieldValues.AddressNumber +   fieldValues.AddressNumberSuffix + ' ' +   fieldValues.StreetNamePreModifier +   fieldValues.StreetNamePreDirectional +   fieldValues.StreetNamePreType + ' ' +  fieldValues.StreetName + ' ' +   fieldValues.StreetNamePostType +   fieldValues.StreetNamePostDirectional +   fieldValues.StreetNamePostModifier).replace(/null/g, "")  );  if (formattedAddress.startsWith('0 '))  {  formattedAddress = '';  }  let formattedLocation = formatLabel(fieldValues.LocationDescription);  let formattedComments = formatLabel(fieldValues.Comments);  label = formattedAddress + '\\n';  if (formattedLocation !== formattedComments) {  label += formattedLocation + '\\n' + formattedComments;  } else {  label += formattedLocation;  } } return label;`,
        `label = ""; if (fieldValues.addr_housenumber) { label += fieldValues.addr_housenumber;} if (fieldValues.addr_street) { label += ' '+fieldValues.addr_street;} if (fieldValues.addr_unit) { label += ' ' + fieldValues.addr_unit;} if (fieldValues.addr_city) { label += '\\n' + fieldValues.addr_city;} return label;`,
        `label = ""; if (fieldValues.AddNo_Full) { label += fieldValues.AddNo_Full;} if (fieldValues.StNam_Full) { label += ' '+fieldValues.StNam_Full;} if (fieldValues.Inc_Muni) { label += '\\n' + fieldValues.Inc_Muni;} return label;`,
        "label = '#' + fieldValues.structure_number_008 + '\\n' + fieldValues.facility_carried_007 + '\\n' + ' over ' + fieldValues.features_desc_006a;  return label;",
        "label = '#' + fieldValues.BridgeStructureNumber + '\\n' + fieldValues.FacilityCarried_NBI7 + '\\n' + ' over ' + fieldValues.FeatureCrossed_NBI6A;  if (fieldValues.BridgeName) { label += ' ( ' + fieldValues.BridgeName +' )';} return label;",
        "label = fieldValues.ROUTE_ID + '\\n' + 'EXIT: '; let exits = [fieldValues.EXIT_EXIT_NUM1, fieldValues.EXIT_EXIT_NUM2, fieldValues.EXIT_EXIT_NUM3].filter(Boolean).join(' & '); label += exits + '\\n' + (fieldValues.EXIT_EXIT_DESC ? fieldValues.EXIT_EXIT_DESC.replace(/\\(.*?\\)/g, '').trim() : '');  if (fieldValues.EXIT_EXIT_HISTORICAL) {   label += '\\n' + 'OLD EXIT: ' + fieldValues.EXIT_EXIT_HISTORICAL;  }  return label;",
        "label = 'SL: ' + fieldValues.SpeedLimit; if (fieldValues.SectionFromLocation) {   label += ' | FROM: ' + fieldValues.SectionFromLocation;  } if (fieldValues.SectionToLocation) {   label += ' | TO: ' + fieldValues.SectionToLocation;  } return label;",
        `label = ""; if (fieldValues.Location) {  const numberAtEndPattern = /\\s+(\\d+)$/;  const match = fieldValues.Location.match(numberAtEndPattern);  if (match) {  const houseNumber = match[1].replace(/^0+/, '');  label = houseNumber + ' ' + fieldValues.Location.replace(numberAtEndPattern, '').trim();  } else {  label = fieldValues.Location.replace(/^0+/, '').trim();  } } if (fieldValues.Town_Name) {  const townNameTrimmed = fieldValues.Town_Name.trim();  label += (label ? '\\n' : '') + townNameTrimmed; } if (!/^\\d+\\s/.test(label.trim()) && fieldValues.Mailing_Address) {  const mailingAddressTrimmed = fieldValues.Mailing_Address.trim();  label += (label ? '\\nMail Add: ' : 'Mail Add: ') + mailingAddressTrimmed; } return label`,
        "label = fieldValues.OFFIC_NAME + '\\n' + fieldValues.OS_TYPE; return label;",
        "label = fieldValues.AV_LEGEND + '\\n' + fieldValues.IMS_LEGEND + '\\n' + fieldValues.PROPERTY; return label;",
        "return label.replace(/#\\d+$/, '');",
        "return label.replace(/LOT\\s[A-Za-z0-9-]+\\s/gi, '');",
        "return label.replace(/^0\\s+/, '');",
        "return fieldValues.FACILITY_CARRIED + ' over \\n' + fieldValues.FEATURE_INTRSCTD",
        "if (fieldValues.Unit != null ) { return fieldValues.Unit + ' ' + fieldValues.StreetName} else {return fieldValues.HouseNumber + ' ' + fieldValues.StreetName}",
        "return 'EXIT ' + label.replace(/^0+/,'');",
        "return 'SR-' + fieldValues.RouteNum;",
        "return 'Welcome Center: ' + fieldValues.MileMrk + 'MM' + '\\n' + fieldValues.FacilityNu;",
        "return 'Service Plaza: ' + label;",
        "return fieldValues.Name+'\\n'+fieldValues.FACILITY;",
        "return fieldValues.NAME+'\\n'+fieldValues.ADDRESS;",
        "return fieldValues.label + '\\n' + 'Status' + ': ' + fieldValues.status + '\\n' + 'Special Needs' + ': ' + fieldValues.special_needs + '\\n' + 'Pet Friendly' + ': ' + fieldValues.pet_friendly",
        `return label.replace((new RegExp(", "+fieldValues.MUNICIPALITY+" "+fieldValues.MUNICIPALITY, 'g')), '');`,
        "label = fieldValues.FULL_NAME; if (fieldValues.COUNTY_ROAD != '<Null>' && fieldValues.COUNTY_ROAD != null && fieldValues.COUNTY_ROAD != '0' && fieldValues.COUNTY_ROAD != '' && fieldValues.COUNTY_ROAD != ' ') {  label += ' (CR-' + fieldValues.COUNTY_ROAD + ')'; } return label;",
        "return fieldValues.NAME+'\\n'+fieldValues.FULLADDR;",
        "return label.replace(_regexReplace.r2, '');",
        "return fieldValues.SNAME_CAD + '\\n' + '(' + fieldValues.SPEEDLIMIT + 'MPH' + ')'",
        "label = ''; if(fieldValues.NAME) {label += fieldValues.NAME}; if(fieldValues.Shield) {label += ' ('+fieldValues.Shield}; if(fieldValues.Hwy_Num) {label += '-'+fieldValues.Hwy_Num +')'}; if(fieldValues.LIMITDAY) {label += ' | MPH:' + fieldValues.LIMITDAY}; return label;",
        "return fieldValues.SITUS_HOUSE_+'\\n'+fieldValues.SITUS_PREFIX+fieldValues.SITUS_STREET+fieldValues.SITUS_STREET_TYPE+fieldValues.SITUS_POST_DIR;",
        "return fieldValues.ST1+'\\n'+fieldValues.ST2;",
        "label = fieldValues.STREETNAME; label += (((fieldValues.MPH != '<Null>') && (fieldValues.MPH != null) && (fieldValues.MPH != '0') && (fieldValues.MPH != '') && (fieldValues.MPH != ' '))  ? ` (${fieldValues.MPH} MPH)`  : ''); return label;",
        "return 'MM ' + label.replace(/^0+/,'');",
        "return 'Exit ' + label;",
        "label = fieldValues.FULLSTREET; label += (((fieldValues.MPH != '<Null>') && (fieldValues.MPH != null) && (fieldValues.MPH != '0') && (fieldValues.MPH != '') && (fieldValues.MPH != ' '))  ? ` (${fieldValues.MPH} MPH)`  : ''); return label;",
        "label = ((fieldValues.FULLNAME != '') ? fieldValues.FULLNAME : ''); label += (fieldValues.SPEED ? ` (${fieldValues.SPEED} MPH)` : ''); return label;",
        "return label.replace(/^0+\\s/, '');",
        "label = ((fieldValues.Label != '') ? fieldValues.Label: ''); label += (fieldValues.SpeedLimit? ` (${fieldValues.SpeedLimit} MPH)` : ''); return label;",
        "return fieldValues.cross_street1 + '\\n' + '' + fieldValues.cross_street2;",
        "return fieldValues.CROSS_STRE + '\\n' + '' + fieldValues.CROSS_ST_1;",
        "return label.replace(/^0\\s+/,'');",
        "label = ((fieldValues.ROAD != '') ? fieldValues.ROAD : ''); label += (fieldValues.MPH ? ` (${fieldValues.MPH} MPH)` : ''); return label;",
        "return fieldValues.NAME + '\\n' + 'BLDG ' + fieldValues.NUMBER;",
        "label = 'UGA Parking Lot'; if (fieldValues.PKLOT_CODE !== '<Null>' && fieldValues.PKLOT_CODE !== null && fieldValues.PKLOT_CODE !== '')  label += '\\n' + fieldValues.PKLOT_CODE; return label;",
        "return fieldValues.NAME + '\\n' + '(' + fieldValues.SPEED_LIMI + 'MPH' + ')'",
        "return 'MM ' + label.replace(/;.*/g,'');",
        `label = fieldValues.REV_LongLabel; const pattern = /, ID.*/; label = label.replace(pattern, ''); const pattern2 = /^[^\\d]*\\b(?=\\d)/; label = label.replace(pattern2, ''); label = label.replace(/,/g, '\\n'); return label.trim();`,
        "label = 'BRKEY#' + fieldValues.BRKEY + '\\n' + fieldValues.ROUTE + '\\n' + ' over ' + fieldValues.FEATURES;  return label;",
        "var options = {day:'2-digit',year:'numeric',month:'2-digit',hour:'2-digit',minute:'2-digit'}; return `${fieldValues.ROADWAY} closed\\nfrom ${fieldValues.LOCATION}\\n${new Date(fieldValues.START).toLocaleString('en-US', options)}\\n${new Date(fieldValues.FINISH).toLocaleString('en-US', options)}`;",
        "return label === 'not available' ? '' : label;",
        'return `${fieldValues.PRMTLOCATN}\\nclosed from\\n${fieldValues.TEXTSTART} to ${fieldValues.TEXTEND}\\nfor ${fieldValues.TEXTDESCR || "Unknown"}`;',
        "label = ''; label += fieldValues.fullname; if(fieldValues.stroute) {label += ' / Rte ' + fieldValues.stroute;} if(fieldValues.astrte) {label += ' / Rte ' + fieldValues.astrte;} return label;",
        "label = ''; return label;",
        "label = ''; sd = new Date(Number(fieldValues.StartDate)); ed = new Date(Number(fieldValues.EndDate)); label += fieldValues.Route1 + ' - ' + fieldValues.ConstructionType; label += '\\nStart: ' + sd.toLocaleDateString() + ' ' + sd.toLocaleTimeString(); label += '\\nEnd: ' + ed.toLocaleDateString() + ' ' + ed.toLocaleTimeString(); label += '\\n' + fieldValues.SuggestionToMotorist;  return label;",
        "return (((fieldValues.SP_LIM != '<Null>') && (fieldValues.SP_LIM != null) && (fieldValues.SP_LIM != '0')) ? `(${fieldValues.SP_LIM} MPH)` : '');",
        "return label.replace(/\\./g, '');",
        `function createLabel(fieldValues) {  let parts = [];  if (fieldValues.PRE_DIR) {  parts.push(fieldValues.PRE_DIR);  }  parts.push(fieldValues.ST_NAME);  if (fieldValues.ST_TYPE) {  parts.push(fieldValues.ST_TYPE);  }  if (fieldValues.SUF_DIR) {  parts.push(fieldValues.SUF_DIR);  }  let baseLabel = parts.join(" ");  if (fieldValues.L_ADDR === fieldValues.H_ADDR) {  return fieldValues.H_ADDR + ' ' + baseLabel;  } else {  return fieldValues.L_ADDR + ' - ' + fieldValues.H_ADDR + ' ' + baseLabel;  } } label = createLabel(fieldValues); return label;`,
        "return fieldValues.PARK + '\\n' +fieldValues.LOCATION;",
        "label = ''; label += fieldValues.CFSUBTYPE; label += '\\n' + fieldValues.CFNAME; label += '\\n' + fieldValues.ADDRESS; return label;",
        "return label.replace(new RegExp((label.match(/ \\d{5} (.*)/))[1],'g'),'').trim();",
        "label = '';",
        "label = ''; sd = new Date(Number(fieldValues.STARTDATE)); ed = new Date(Number(fieldValues.ENDDATE)); label += fieldValues.BLOCKTYPE + ' - ' + fieldValues.LOCDESC ; label += '\\nStart: ' + sd.toLocaleDateString() + ' ' + sd.toLocaleTimeString(); label += '\\nEnd: ' + ed.toLocaleDateString() + ' ' + ed.toLocaleTimeString(); return label;",
        "return label.replace(_regexReplace.r3, '').replace(_regexReplace.r0, '');",
        "return label.split('_').pop();",
        "return fieldValues.PROPERTY_ADDRESS + '\\n' + fieldValues.PROPERTY_ADDRESS_CITY",
        "return fieldValues.Name + (W.map.zoom >= 4 ? '\\n' + fieldValues.Address: '');",
        "return label.split(',', 2).pop().replace(/ signed route/i, '');",
        "return 'SL ' + label;",
        "return label.replace(/\\s\\w\\w\\s\\d{5}$/,'');",
        "return label.replace(/,\\s\\w\\w$/,'');",
        "label = ''; label += fieldValues.rid; if (fieldValues.direction!= '' && fieldValues.direction != null)   label += ' ' + fieldValues.direction; if (fieldValues.description != ''&& fieldValues.description != null)  label += ' - '+ fieldValues.description; return label;",
        "label = ''; if (fieldValues.INTERSTATE_ROUTES && fieldValues.INTERSTATE_ROUTES.trim()) {   label += 'I-' + fieldValues.INTERSTATE_ROUTES.trim();} if (fieldValues.US_ROUTES && fieldValues.US_ROUTES.trim()) {   label += 'U-' + fieldValues.US_ROUTES.trim();} if (fieldValues.STATE_ROUTES && fieldValues.STATE_ROUTES.trim()) {   label += 'K-' + fieldValues.STATE_ROUTES.trim();} return label;",
        "return label.replace(_regexReplace.r3, '')",
        "label = (((fieldValues.PRD != '') && (fieldValues.PRD != null)) ? `${fieldValues.PRD} ` : ''); label += (((fieldValues.STP != '') && (fieldValues.STP != null)) ? `${fieldValues.STP} ` : ''); label += fieldValues.RD; label += (((fieldValues.STS != '') && (fieldValues.STS != null)) ? ` ${fieldValues.STS}` : ''); label += (((fieldValues.POD != '') && (fieldValues.POD != null)) ? ` ${fieldValues.POD}` : ''); label += (fieldValues.SPDLIMIT ? ` (${fieldValues.SPDLIMIT} MPH)` : ''); return label;",
        "return `${fieldValues.SCHNAME} (${fieldValues.SCHTYPE})\\n${fieldValues.ADDRESS}`;",
        "return `${fieldValues.SCH_NAME}\\n${fieldValues.ADDRESS}`;",
        'label = "Lower to 25"; return label;',
        "return label.replace(_regexReplace.r3,'');",
        "label = ''; const cd = new Date(Number(fieldValues.NEWDATE)); label += fieldValues.ROADNAME +' - ' + cd.toLocaleDateString(); return label;",
        "let zoom = W.map.getZoom(); if (zoom >= 2) {  label = fieldValues.NAME; } if (zoom >= 5) {  label += '\\n' + fieldValues.ADDRESS; } return label;",
        "label = ''; cd = new Date(Number(fieldValues.ENTERED_ON)); label += fieldValues.ROADNAME +' - ' + cd.toLocaleDateString(); return label;",
        "label = ''; if (fieldValues.State_Rout != '' && fieldValues.State_Rout != ' ' && fieldValues.State_Rout != null)  label += ' ' + fieldValues.State_Rout; if (fieldValues.State_Ro_1 != '' && fieldValues.State_Ro_1 != ' ' && fieldValues.State_Ro_1 != null)  label += ' ' + fieldValues.State_Ro_1; if (fieldValues.State_Ro_2 != '' && fieldValues.State_Ro_2 != ' ' && fieldValues.State_Ro_2 != null)  label += ' ' + fieldValues.State_Ro_2; if (fieldValues.State_Ro_3 != '' && fieldValues.State_Ro_3 != ' ' && fieldValues.State_Ro_3 != null)  label += ' ' + fieldValues.State_Ro_3; if (fieldValues.State_Ro_4 != '' && fieldValues.State_Ro_4 != ' ' && fieldValues.State_Ro_4 != null)  label += ' ' + fieldValues.State_Ro_4; if (fieldValues.State_Ro_5 != '' && fieldValues.State_Ro_5 != ' ' && fieldValues.State_Ro_5 != null)  label += ' ' + fieldValues.State_Ro_5; return label;",
        "return label.replace(/\\sPARISH$/, '');",
        "return fieldValues.NAME + '\\n' + fieldValues.STREET;",
        "label = '#' + fieldValues.Bridge_Department_Number + '\\n' + fieldValues.Facility_Carried + '\\n' + ' over ' + fieldValues.Feature_Intersected; if (fieldValues.Bridge_Name) { label += '\\n' + fieldValues.Bridge_Name; }  return label;",
        "label = ''; if (fieldValues.Route_System === 'I' || fieldValues.Route_System === 'SR' || fieldValues.Route_System === 'US') { label = fieldValues.Route_System + '-' + fieldValues.Route_Number + ' '+ fieldValues.Route_Direction + ' ( '+ fieldValues.St_Name.trim() + ' )' ;} else { label = fieldValues.St_Name.trim(); } return label.replace(/\\bSTREET\\b/gi, 'ST').replace(/\\bAVENUE\\b/gi, 'AVE').replace(/\\bROAD\\b/gi, 'RD').replace(/\\bDRIVE\\b/gi, 'DR');",
        "return label.replace(/\\s*,\\s*\\d{5}$/,'').replace(/\\s+Apt\\s+.*$/,'');",
        "return (fieldValues.PROP_LOC==='') ? 'LOT#\\n' + fieldValues.MAP_BK_LOT : ((fieldValues.PROPLOCNUM===0 ? '' : fieldValues.PROPLOCNUM) + ' ' + fieldValues.PROP_LOC).trim();",
        "return 'MM ' + label.replace(/\\D*/i,'');",
        "return 'COVID Vaccine Site' + '\\n' + fieldValues.name + '\\n' + fieldValues.fulladdr",
        "return fieldValues.SPEED_LIMIT + 'MPH' + '\\n' + fieldValues.Sign_FaceDirection",
        "label = 'Red Light Camera' + '\\n' + fieldValues.Location; if (fieldValues.NearLocation) { label += '\\n' + 'near: ' + fieldValues.NearLocation; } return label;",
        "label = 'Speed Camera' + '\\n' + fieldValues.USER_Location; if (fieldValues.USER_SchlLocati) { label += '\\n' + 'near: ' + fieldValues.USER_SchlLocati; } return label;",
        "return label.replace(/, MI.*/, '');",
        "label = (((fieldValues.FULLSTN != '<Null>') && (fieldValues.FULLSTN != null)) ? `${fieldValues.FULLSTN} ` : ''); label += (((fieldValues.MPH != '<Null>') && (fieldValues.MPH != null)) ? `(${fieldValues.MPH} MPH)` : ''); return label;",
        "return 'MN- ' + label;",
        "return 'CR- ' + label;",
        "label = fieldValues['FULLNAME']; if (fieldValues['SURF_TYPE']) { label += ' | TYPE: ' + fieldValues['SURF_TYPE'] }; if (fieldValues['SPEEDLIMIT']) { label += ' | SL: ' + fieldValues['SPEEDLIMIT'] + ' MPH'}; return label;",
        "return `${fieldValues.Comb_Add}\\n${fieldValues.Postal_Com}`;",
        "return fieldValues.Name+'\\n'+fieldValues.Location;",
        "return label.replace(/OCEAN SPR.*/,'');",
        "return label.replace(/^tishomingo\\s*(CR\\s.*)/i,'$1');",
        "return label.replace(/.* MILE (\\d*).*/, 'MM $1');",
        'return "Name: "+fieldValues.Facility+"\\n Addr: "+fieldValues.Address+"\\n City: "+fieldValues.City+"\\n Phone: "+fieldValues.Phone;',
        'return "Status:"+fieldValues.WME_Status+"\\n Road Name:"+fieldValues.Road_Name+"\\n Closure Type:"+fieldValues.Type_of_Closure+"\\n Comments:"+fieldValues.Comments+"\\n # Seg on PL:"+fieldValues.Total_seg_PL1+"\\n Sheet Row #:"+fieldValues.Sheet_Row__;',
        "return fieldValues.CART_NUM === null ? fieldValues.NAME1 : fieldValues.NAME1 + ' / CR-' + fieldValues.CART_NUM;",
        "return label.replace(/^Audrain R(oa)?d /i, 'CR-');",
        "return label.replace(/^none$/i, '');",
        "return label.replace(/(DENT )?COUNTY ROAD /i, 'CR-');",
        "return label.search(/ ALY$/) > 0 ? '' : label;",
        "return label.replace(/,.*/i, '');",
        "return fieldValues.PRE_DIR + ' ' + fieldValues.STREET_NAM + ' ' + fieldValues.STREET_TYP + ' (' + fieldValues.SPEED + ')';",
        "return fieldValues.Alias === null ? fieldValues.Rdname : fieldValues.Rdname + ' (' + fieldValues.Alias + ')';",
        "return label.replace(/ \\d{5}$/, '');",
        `const startD = new Date(parseInt(fieldValues.STARTDATE)).toLocaleDateString("en-US"); const endD = new Date(parseInt(fieldValues.ENDDATE)).toLocaleDateString("en-US"); return fieldValues.PERMITNUMBER + '\\n' + startD + ' to ' + endD;`,
        "return label.replace(/^No Situs Address$/i, '');",
        "return label.replace(/0\\s/, '');",
        "return label.replace(/(.*)( & )([0-9]+)/, '$3 $1');",
        "return fieldValues.FullStNm + ' (' + fieldValues.SpeedLimit + ')'",
        "return label + ' State Park';",
        "return label + ' Fishing Access';",
        "return (fieldValues.SITUS_ADDRESS + '').replace(fieldValues.CITY_STATE + ' ' + fieldValues.ZIP, '').replace(/^null$/, '').replace(/^0+/, '').replace(/\\\\/g, '').replace(/([^,]*),\\s(.*)/, '$1\\n$2');",
        "return 'SL- ' + label;",
        "let zoom = W.map.getZoom(); label = fieldValues.NAME; if (zoom >= 5) {  label += `\\n${fieldValues.ADDRESS}`; } return label;",
        "if (fieldValues.OWNER === 'TAXPAYER') {  return ''; } return fieldValues.ADDRESS.replace(/^0+/, '');",
        "if (fieldValues.ALIAS1 !== '') {return fieldValues.LSN + ' (' + fieldValues.ALIAS1 + ')';} return fieldValues.LSN;",
        "return (fieldValues.ST_NAME === null || fieldValues.ST_NAME === '') ? fieldValues.LSN : fieldValues.ST_NAME;",
        "return 'SR - ' + label;",
        `label = ""; if (fieldValues.STREET) { label += fieldValues.STREET;} if (fieldValues.LC_LEGEND) { label += ' | ' + fieldValues.LC_LEGEND;} if (fieldValues.SURF_TYPE) { label += ' | ' + fieldValues.SURF_TYPE;} if (fieldValues.LEGIS_CLASS) { label += ' | Class: ' + fieldValues.LEGIS_CLASS;} return label;`,
        "return fieldValues.LABEL_NAME + '\\n' + fieldValues.PHYSADDRLINE1",
        "return `${fieldValues.ADDRESS}\\n${fieldValues.CITY_MAILI}`;",
        "label = ((fieldValues.SpeedLimit != null) ? fieldValues.SpeedLimit : 'Unk.'); label += ' MPH'; label = label + ' (' + fieldValues.StreetName+')'; return label;",
        'return fieldValues.siteadd+" \\n"+fieldValues.scity;',
        'return fieldValues.st_address+" \\n"+fieldValues.post_comm;',
        'return fieldValues.StreetName+" ("+fieldValues.RouteName+")";',
        'label = fieldValues.StreetName; const prefixes = ["SR-", "US-", "NC-", "I-"]; if (fieldValues.RouteName && prefixes.some(prefix => fieldValues.RouteName.startsWith(prefix))) {  label += " (" + fieldValues.RouteName + ")"; } if (fieldValues.BaseDetail) {  label += " | " + fieldValues.BaseDetail; } return label;',
        "label = ''; var cd = new Date(Number(fieldValues.created_date)); label += fieldValues.STR_NAME_FULL +' - ' + cd.toLocaleDateString(); return label;",
        "return fieldValues.park_name + '\\n' + fieldValues.park_streetnumber + ' ' + fieldValues.park_streetname;",
        "return fieldValues.FULL_NAME + (fieldValues.SPEED_LIMI.trim().length ? ' (SL = '+fieldValues.SPEED_LIMI+')' : '');",
        "label = ''; var cd = new Date(Number(fieldValues.created_date)); label += fieldValues.FullStreetName +' - ' + cd.toLocaleDateString(); return label;",
        "label = ''; var cd = new Date(Number(fieldValues.created_da)); label += fieldValues.STREET_NAM + ' - ' + cd.toLocaleDateString(); return label;",
        "label=fieldValues.FULL_NAME.toUpperCase(); if (fieldValues.Route_Type == 'BIA') {  label += '(BIA-' + fieldValues.RID + ')'; } return label;",
        "return 'CEMETERY:\\n' + label;",
        "label = ''; var cd = new Date(Number(fieldValues.EDIT_DAT)); label += fieldValues.STNAME + ' - ' + cd.toLocaleDateString(); return label;",
        "label = ''; var cd = new Date(Number(fieldValues.DATE_OF_EDIT)); label += fieldValues.FULL_NAME + ' - ' + cd.toLocaleDateString(); return label;",
        "label = ''; var cd = new Date(Number(fieldValues.CREATEDATE)); label += fieldValues.STRNAME + ' - ' + cd.toLocaleDateString(); return label;",
        "label = ''; var cd = new Date(Number(fieldValues.CREATE_DAT)); label += fieldValues.FULLNAME+ ' - ' + cd.toLocaleDateString(); return label;",
        "label = ''; var cd = new Date(Number(fieldValues.Create_Date)); label += fieldValues.FullName+ ' - ' + cd.toLocaleDateString(); return label;",
        "label = ''; var cd = new Date(Number(fieldValues.CREATE_DATE)); label += fieldValues.FULLNAME+ ' - ' + cd.toLocaleDateString(); return label;",
        "label = fieldValues.Type + ' (' + fieldValues.CARTEID + ')'; return label;",
        "label = ''; var cd = new Date(Number(fieldValues.CREATE_DATE)); label += fieldValues.STREETNAME+ ' - ' + cd.toLocaleDateString(); return label;",
        "label = ''; var cd = new Date(Number(fieldValues.created_date)); label += fieldValues.FULL_ST_NAME+ ' - ' + cd.toLocaleDateString(); return label;",
        "label = ''; var cd = new Date(Number(fieldValues.DATE_OF_EDIT)); label += fieldValues.FULL_NAME+ ' - ' + cd.toLocaleDateString(); return label;",
        "label = ''; cd = new Date(Number(fieldValues.CREATED)); label += fieldValues.STREET+ ' - ' + cd.toLocaleDateString(); return label;",
        "label = ''; var cd = new Date(Number(fieldValues.dateadded)); label += fieldValues.wholestname + ' - ' + cd.toLocaleDateString(); return label;",
        "label = ''; var cd = new Date(Number(fieldValues.CREATION)); label += fieldValues.STREET+ ' - ' + cd.toLocaleDateString(); return label;",
        "label = ''; var cd = new Date(Number(fieldValues.CREATEDATE)); label += fieldValues.LABEL+ ' - ' + cd.toLocaleDateString(); return label;",
        "label = ''; var cd = new Date(Number(fieldValues.created_date)); label += fieldValues.Legacy_Full_Name+ ' - ' + cd.toLocaleDateString(); return label;",
        "label = ''; var cd = new Date(Number(fieldValues.created_da)); label += fieldValues.FULLNAME+ ' - ' + cd.toLocaleDateString(); return label;",
        "return fieldValues.NAME + ' Park\\n' + fieldValues.ADDRESS;",
        "label = ''; var start = new Date(Number(fieldValues.STARTDATE)); var end = new Date(Number(fieldValues.ENDDATE)); label += fieldValues.COMMENT + ' - ' + fieldValues.BLOCKTYPE; label += '\\nStart: ' + start.toLocaleString(); label += '\\nEnd: ' + end.toLocaleString(); return label;",
        'return "Unit " + fieldValues.UNITRNG;',
        "label = ''; var cd = new Date(Number(fieldValues.DATECREATE)); label += fieldValues.STREETNAME+ ' ' + fieldValues.STREETTYPE+ ' - ' + cd.toLocaleDateString(); return label;",
        "label = ''; var cd = new Date(Number(fieldValues.created_date)); label += fieldValues.full_st_name+ ' - ' + cd.toLocaleDateString(); return label;",
        "label = ''; var cd = new Date(Number(fieldValues.CREATE_DATE)); label += fieldValues.CARTONAME + ' - ' + cd.toLocaleDateString(); return label;",
        "label = ''; var cd = new Date(Number(fieldValues.CREATEDATE)); label += fieldValues.STREET+ ' - ' + cd.toLocaleDateString(); return label;",
        "return '';",
        "label =`${fieldValues.STREET_PREFIX_DIR_CD||''} ${fieldValues.STREET_NAME||''} ${fieldValues.STREET_SUFFIX_CD||''} ${fieldValues.STREET_DIR_SUFFIX_CD||''}`; if (!['IR','RA','MR','TR'].includes(fieldValues.ROUTE_TYPE)) label += ` / ${fieldValues.ROUTE_TYPE||''}-${Number(fieldValues.ROUTE_NBR||'')} ${fieldValues.ROUTE_SUFFIX != '*' ? fieldValues.ROUTE_SUFFIX : ''}`; if (fieldValues.SPEED_LIMIT_NBR) label += `(${fieldValues.SPEED_LIMIT_NBR} MPH)`; return label;",
        "let zoom = W.map.getZoom(); if (zoom >= 14) {  label = fieldValues.org_name; } if (zoom >= 17) {  label += '\\n' + fieldValues.address_out + ', ' + fieldValues.city_out; } return label;",
        "return `${fieldValues.NAME}\\n${fieldValues.ADDRESS}`;",
        'return fieldValues.alsn.trim() != "" ? `${fieldValues.lsn} (${fieldValues.alsn})` : fieldValues.lsn;',
        "label = fieldValues.NAME; (W.map.getZoom() > 17) ? label += '\\n' + fieldValues.ADDRESS.replace(_regexReplace.r1, '$1$2') : ''; return label;",
        'return fieldValues.ALSN.trim() != "" ? `${fieldValues.LSN} (${fieldValues.ALSN})` : fieldValues.LSN;',
        "label = ''; label += fieldValues.PATHTYPE + ' - ' + fieldValues.ROADNAME; return label;",
        "label = ''; label += fieldValues.OFFICENAME + ' - ' + fieldValues.ADDRESS; return label;",
        "return label.replace(_regexReplace.r0, '').replace(_regexReplace.r5, '$1\\n$2');;",
        "return label.replace(/^(.*?) ([EWNS] )?(\\d+)$/,'$3 $2$1').replace(_regexReplace.r0, '');",
        "return fieldValues.FullName + ((fieldValues.SpeedLimit != null) ? ` (${fieldValues.SpeedLimit} MPH)` : '');",
        "return fieldValues.CVSTNAME + ((fieldValues.SpeedLimit != '') ? ` (${fieldValues.SpeedLimit} MPH)` : '');",
        "return label.replace(_regexReplace.r1, '$1\\n$2').replace(_regexReplace.r0, '');",
        "return label.replace(/^99999.*/, '');",
        "label = fieldValues.STR_NAME; label += ((fieldValues.SPEEDLIMIT != '') ? ` (${fieldValues.SPEEDLIMIT} MPH)` : ''); return label;",
        "return label.replace(_regexReplace.r0, '').replace(/\\\\/,'').replace(_regexReplace.r5, '$1\\n$2');",
        "return 'MM ' + Math.round(label).toString()",
        "label = ''; if (fieldValues.US_SIGN_1 !== '')  label += 'US-' + fieldValues.US_SIGN_1 + ' '; label+= fieldValues.FNAME; if (fieldValues.US_SIGN_2 !== '')  label += 'US-' + fieldValues.US_SIGN_2 + ' '; if (fieldValues.UR_SIGN_1 !== '')  label += 'OR-' + fieldValues.US_SIGN_1 + ' '; if (fieldValues.UR_SIGN_1 !== '')  label += 'OR-' + fieldValues.UR_SIGN_1 + ' '; return label;",
        "return fieldValues.Name + '\\n' + fieldValues.Address;",
        "return label.replace(_regexReplace.r1, '$1');",
        "return label.replace(/,.*$/,'');",
        "return fieldValues.NAME + '\\n' + fieldValues.Address;",
        "return '(' + fieldValues.ST_RT_NO.replace(_regexReplace.r0, '') + ') - ' + fieldValues.MILE_MARKER;",
        "return 'Open Road Tolling Gantry' + '\\n' + fieldValues.Gantry_Location;",
        "return 'Exit ' + fieldValues.EXIT_NUMBER + '\\n' + fieldValues.EXIT_NAME;",
        "return 'SR-' + fieldValues.ST_RT_NO + '\\n' + fieldValues.SPEED_LIMIT + ' MPH'",
        "return fieldValues.LR_NAME + ' ' + fieldValues.LR_TYPE + '\\n' + fieldValues.CART_WAY_WIDTH + ' ft'",
        "return fieldValues.STREET_NAME + '\\n' + fieldValues.TOTAL_WIDTH + ' ft / ' + fieldValues.LANE_CNT + ' lanes'",
        "return fieldValues.SCHOOL_NAME + '\\n' + fieldValues.SCHOOL_LOCATION_ADDRESS1;",
        "return 'State Game Lands ' + fieldValues.SGL",
        "return fieldValues.Route_Type + '-' + fieldValues.Route_Num;",
        "return label.replace(/.* (\\d.*)/,'$1');",
        "return `${fieldValues.MVADDR}\\n${fieldValues.City}`;",
        "return label.replace(/,\\s+/, '\\n');",
        "return `${fieldValues.LOCADD}\\n${fieldValues.LOCCITY}`;",
        "return label.replace(_regexReplace.r1, '$1 $2');",
        "return 'RA: ' + label;",
        "return 'GPA: ' + label;",
        "return 'I-' + label;",
        "label = fieldValues.ROADNAME; if (fieldValues.ROADNAME_ALIAS) {   label += ' | ' + fieldValues.ROADNAME_ALIAS;  } return label;",
        "label = '#' + fieldValues.BRIDGE_ID + '\\n' + fieldValues.facility + '\\n' + ' over ' + fieldValues.featint; return label;",
        "return label.replace (_regexReplace.r3, '');",
        "var cName = fieldValues.CommonName, hName = fieldValues.HistoricName, pName = fieldValues.PreferredName, addr = fieldValues.Address, label;"
            + "\nif (pName)label = pName === 'common' ? cName : hName;"
            + "\nelse label = cName ? cName : hName;"
            + "\nif (addr) label += `\\n(${addr})`;"
            + "\nreturn label;",
        "label = ''; cd = new Date(Number(fieldValues.created_date)); label += fieldValues.FULL_NAME +' - ' + cd.toLocaleDateString(); return label;",
        "return fieldValues.Fromstreet + ' ' + '->' + ' ' + fieldValues.Tostreet + '\\n' + '( Status:' + ' ' + fieldValues.Status + ' )';",
        "label = ''; cd = new Date(Number(fieldValues.created_date)); label += fieldValues.FULLNAME +' - ' + cd.toLocaleDateString(); return label;",
        "label = ''; cd = new Date(Number(fieldValues.created_date)); label += fieldValues.LABEL +' - ' + cd.toLocaleDateString(); return label;",
        "label = ''; cd = new Date(Number(fieldValues.DATE_INSTALLED)); label += fieldValues.FULLNAME +' - ' + cd.toLocaleDateString(); return label;",
        "label = ''; label += ((fieldValues['FACLTY_CARRD_BY_STRUC'] != '') ? (`Route: ${fieldValues['FACLTY_CARRD_BY_STRUC']}\\n`): ''); label += ((fieldValues['FEAT_INTSECT'] != '') ? (`Intersection: ${fieldValues['FEAT_INTSECT']}`): ''); return label;",
        "label = ''; label += (Boolean(fieldValues['Street']) ? fieldValues['Street'] : ''); label += (Boolean(fieldValues['Crossing_Number']) ? ' (' + fieldValues['Crossing_Number'] + ')' : ''); return label;",
        "label = fieldValues['SDE.SDE.HCTRA_Facilities.OnlineMapDescription']; if (fieldValues['SDE.SDE.HCTRA_Facilities.Type']) { label += '\\n TYPE: ' + fieldValues['SDE.SDE.HCTRA_Facilities.Type'] }; if (fieldValues['SDE.SDE.HCTRA_Facilities.Tolled']) { label += '\\n TOLL: ' + fieldValues['SDE.SDE.HCTRA_Facilities.Tolled'] }; if (fieldValues['SDE.SDE.HCTRA_Facilities.EZ_Rate']) { label += '\\n EZ-Rate: ' + fieldValues['SDE.SDE.HCTRA_Facilities.EZ_Rate'] }; if (fieldValues['SDE.SDE.HCTRA_Facilities.Cash_Rate']) { label += '\\n Cash-Rate: ' + fieldValues['SDE.SDE.HCTRA_Facilities.Cash_Rate'] }; return label;",
        "label = fieldValues['SDE.SDE.HCTRA_Facilities.OnlineMapDescription']; if (fieldValues['SDE.SDE.HCTRA_Facilities.Type']) { label += '\\n TYPE: ' + fieldValues['SDE.SDE.HCTRA_Facilities.Type'] }; if (fieldValues['SDE.SDE.HCTRA_Facilities.Tolled']) { label += '\\n TOLL: ' + fieldValues['SDE.SDE.HCTRA_Facilities.Tolled'] }; return label;",
        "label = ((fieldValues.FULL_NAME!= '') ? fieldValues.FULL_NAME : ''); label += ((fieldValues.SPEED != '') ? ` (${fieldValues.SPEED} MPH)` : ''); return label;",
        "return label.replace(_regexReplace.r4, '$2\\n$1').replace(_regexReplace.r0, '$2');",
        "label = fieldValues.fullname; label += ((fieldValues.FlowDirection != 'B') ? ` ONE-WAY: ${fieldValues.FlowDirection}` : ''); return label;",
        "label = fieldValues.ST_NM; if (fieldValues.RTE_NBR != '<Null>' && fieldValues.RTE_NBR != null && fieldValues.RTE_NBR != '0' && fieldValues.RTE_NBR != '' && fieldValues.RTE_NBR != ' ') {  label += ' (' + fieldValues.RTE_PRFX_C + '-' + fieldValues.RTE_NBR + ')'; } return label;",
        "label = (Boolean(fieldValues['PREFIX']) ? fieldValues['PREFIX'] : ''); label += (Boolean(fieldValues['PRETYPE']) ? fieldValues['PRETYPE'] : ''); label += (Boolean(fieldValues['STREET']) ? fieldValues['STREET'] : ''); label += (Boolean(fieldValues['TYPE']) ? fieldValues['TYPE'] : ''); label += (Boolean(fieldValues['SUFFIX']) ? fieldValues['SUFFIX'] : ''); label += (Boolean(fieldValues['SPEED']) ? ` (${fieldValues['SPEED']} MPH)` : ''); return label;",
        "label = fieldValues.DISPLAYNAME; label += ((fieldValues.POSTEDSPEEDLIMIT != '') && (fieldValues.POSTEDSPEEDLIMIT != null) ? ` (${fieldValues.POSTEDSPEEDLIMIT } MPH)` : ''); return label;",
        "return label.replace(/^(\\d+)(.*)/,'$1\\n$2');",
        "label = (Boolean(fieldValues['STREET']) ? fieldValues['STREET'] : ''); label += (Boolean(fieldValues['MPH']) ? ` (${fieldValues['MPH']} MPH)` : ''); return label;",
        "return label.replace(_regexReplace.r6, '$1\\n$2');",
        "label = (Boolean(fieldValues['PREFIX']) ? fieldValues['PREFIX'] : ''); label += (Boolean(fieldValues['PRETYPE']) ? fieldValues['PRETYPE'] : ''); label += (Boolean(fieldValues['STREET']) ? fieldValues['STREET'] : ''); label += (Boolean(fieldValues['TYPE']) ? fieldValues['TYPE'] : ''); label += (Boolean(fieldValues['SUFFIX']) ? fieldValues['SUFFIX'] : ''); label += (Boolean(fieldValues['SPEED_MPH']) ? ` (${fieldValues['SPEED_MPH']} MPH)` : ''); return label;",
        "label = (Boolean(fieldValues['PREFIX']) ? fieldValues['PREFIX'] : ''); label += (Boolean(fieldValues['NAME']) ? fieldValues['NAME'] : ''); label += (Boolean(fieldValues['TYPE']) ? fieldValues['TYPE'] : ''); label += (Boolean(fieldValues['SUFFIX']) ? fieldValues['SUFFIX'] : ''); label += (Boolean(fieldValues['SPEED_MPH']) ? ` (${fieldValues['SPEED_MPH']} MPH)` : ''); return label;",
        "label = (Boolean(fieldValues['DIR']) ? fieldValues['DIR'] : ''); label += (Boolean(fieldValues['STREETNAME']) ? ` ${fieldValues['STREETNAME']}` : ''); label += (Boolean(fieldValues['STYPE']) ? ` ${fieldValues['STYPE']}` : ''); label += (Boolean(fieldValues['SPEED']) ? ` (${fieldValues['SPEED']} MPH)` : ''); return label;",
        "return !fieldValues.LandmkName ? fieldValues.Address : `${fieldValues.Address}\\n${fieldValues.LandmkName}`;",
        "return `${fieldValues.Name}\\n(${fieldValues.Type.includes('Park') ? fieldValues.Type : fieldValues.Type + ' Park'})`;",
        "label = (Boolean(fieldValues['FULL_NAME']) ? fieldValues['FULL_NAME'] : ''); label += (Boolean(fieldValues['SPEED']) ? ` (${fieldValues['SPEED']} MPH)` : ''); return label;",
        "label = ((fieldValues.PREFIX != '') ? `${fieldValues.PREFIX} ` : ''); label += ((fieldValues.STREET_NAME != '') ? fieldValues.STREET_NAME : ''); label += ((fieldValues.STREET_TYPE != '') ? ` ${fieldValues.STREET_TYPE}` : ''); label += ((fieldValues.SUFFIX != '') ? ` ${fieldValues.SUFFIX}` : ''); label += ((fieldValues.SPEED_LIMIT != '') ? ` (${fieldValues.SPEED_LIMIT} MPH)` : ''); return label;",
        "label = ((fieldValues.ROAD_NAME != '') ? `${fieldValues.ROAD_NAME} ` : ''); label += ((fieldValues.MPH != '') ? ` (${fieldValues.MPH} MPH)` : ''); return label;",
        "return label.replace(/^(\\d+)\\s+(.*)\\s+.*,.*/,'$1\\n$2').replace(/TEXAS$/,'').replace(/,.*/,'');",
        "label = ((fieldValues.STREETLABEL != '') ? fieldValues.STREETLABEL : ''); label += (((fieldValues.SPEEDLIMIT != '') && (fieldValues.SPEEDLIMIT != null)) ? ` (${fieldValues.SPEEDLIMIT} MPH)` : ''); return label;",
        "label = ((fieldValues.St_FullName != '') ? fieldValues.St_FullName : ''); label += ((fieldValues.SpeedLimit != '') ? ` (${fieldValues.SpeedLimit} MPH)` : ''); return label;",
        "return label.replace(/0\\s+(.*)/,'$1').replace(_regexReplace.r5, '$1\\n$2');",
        "return label.replace(/\\r?\\nTX/g, '').replace(_regexReplace.r5, '$1\\n$2');;",
        "label = ((fieldValues.FEDIRP != null) ? fieldValues.FEDIRP : ''); label += ((fieldValues.FENAME != null) ? ` ${fieldValues.FENAME}` : ''); label += ((fieldValues.FETYPE != null) ? ` ${fieldValues.FETYPE}` : ''); label += ((fieldValues.FEDIRS != null) ? ` ${fieldValues.FEDIRS}` : ''); label += ((fieldValues.SPEED_MPH != null) ? ` (${fieldValues.SPEED_MPH} MPH)` : ''); return label;",
        "label = ''; label += ((fieldValues.St_PreMod != '') ? fieldValues.St_PreMod : ''); label += ((fieldValues.St_PreDir != '') ? ` ${fieldValues.St_PreDir}` : ''); label += ((fieldValues.St_PreTyp != '') ? ` ${fieldValues.St_PreTyp}` : ''); label += ((fieldValues.St_PreSep != '') ? ` ${fieldValues.St_PreSep}` : ''); label += ((fieldValues.StreetName != '') ? ` ${fieldValues.StreetName}` : ''); label += ((fieldValues.St_PosTyp != '') ? ` ${fieldValues.St_PosTyp}` : ''); label += ((fieldValues.St_PosDir != '') ? ` ${fieldValues.St_PosDir}` : ''); label += ((fieldValues.St_PosMod != '') ? ` ${fieldValues.St_PosMod}` : ''); return label;",
        "label = ((fieldValues.LABEL != '') ? fieldValues.LABEL : ''); label += ((fieldValues.SPEED != '') ? ` (${fieldValues.SPEED} MPH)` : ''); return label;",
        "label = ((fieldValues.FULLNAME != '') ? fieldValues.FULLNAME : ''); label += ((fieldValues.SPD_LIMIT != '') ? ` (${fieldValues.SPD_LIMIT} MPH)` : ''); return label;",
        "label = ((fieldValues.PRE_DIR != '') ? `${fieldValues.PRE_DIR} ` : ''); label += ((fieldValues.NAME != '') ? fieldValues.NAME : ''); label += ((fieldValues.ST_TYPE != '') ? ` ${fieldValues.ST_TYPE}` : ''); label += ((fieldValues.SUFFDIR != '') ? ` ${fieldValues.SUFFDIR}` : ''); label += ((fieldValues.SPEED != '') ? ` (${fieldValues.SPEED} MPH)` : ''); return label;",
        "label = (Boolean(fieldValues.PREFIX) ? `${fieldValues.PREFIX} ` : ''); label += (Boolean(fieldValues.PREFIXTYPE) ? `${fieldValues.PREFIXTYPE} ` : ''); label += ((fieldValues.NAME != '') ? fieldValues.NAME : ''); label += ((fieldValues.TYPE != '') ? ` ${fieldValues.TYPE}` : ''); label += (Boolean(fieldValues.SUFFIX) ? ` ${fieldValues.SUFFIX}` : ''); label += (Boolean(fieldValues.SPEEDLIMIT) ? ` (${fieldValues.SPEEDLIMIT} MPH)` : ''); return label;",
        "label = (Boolean(fieldValues.Name) ? `${fieldValues.Name} ` : ''); label += (Boolean(fieldValues.TrafficDirection) ? ` [${(fieldValues.TrafficDirection).charAt(0)}]`:''); label += (Boolean(fieldValues.EZ_Rate) ? `\\n(${fieldValues.EZ_Rate})` : ''); return label;",
        "label = ((fieldValues.PREFIX != '') ? `${fieldValues.PREFIX} ` : ''); label += ((fieldValues.NAME != '') ? ` ${fieldValues.NAME}` : ''); label += ((fieldValues.TYPE != '') ? ` ${fieldValues.TYPE}` : ''); label += ((fieldValues.SUFFIX != '') ? ` ${fieldValues.SUFFIX}` : ''); label += ((fieldValues.SPEED_MPH != '') ? ` (${fieldValues.SPEED_MPH} MPH)` : ''); return label;",
        "label = ((fieldValues.FULLNAME != '') ? `${fieldValues.FULLNAME} ` : ''); label += ((fieldValues.SpeedLimit != '') ? ` (${fieldValues.SpeedLimit} MPH)` : ''); return label;",
        "label = ((fieldValues.FULLNAME != '') ? `${fieldValues.FULLNAME} ` : ''); label += ((fieldValues.RD_SPEED != '') ? ` (${fieldValues.RD_SPEED} MPH)` : ''); return label;",
        "label = ((fieldValues.BLOCKNM != '') ? `${fieldValues.BLOCKNM} ` : ''); label += ((fieldValues.DIRECTION != '') ? `\\nDirection: ${fieldValues.DIRECTION} ` : ''); label += ((fieldValues.STARTDATE != '') ? `\\nStart: ${new Date(fieldValues.STARTDATE)} ` : ''); label += ((fieldValues.ENDDATE != '') ? `\\nEnd: ${new Date(fieldValues.ENDDATE)} ` : ''); return label;",
        "label = (Boolean(fieldValues['St_FullName']) ? fieldValues['St_FullName'] : ''); label += (Boolean(fieldValues['SpeedLimit']) ? ` (${fieldValues['SpeedLimit']} MPH)` : ''); return label.trim();",
        "label = (Boolean(fieldValues['FULLSTREET']) ? fieldValues['FULLSTREET'] : ''); label += (Boolean(fieldValues['SPEEDLIMIT']) ? ` (${fieldValues['SPEEDLIMIT']} MPH)` : ''); return label.trim();",
        "label = (Boolean(fieldValues['FullName']) ? fieldValues['FullName'] : ''); label += (Boolean(fieldValues['SpeedLimit']) ? ` (${fieldValues['SpeedLimit']} MPH)` : ''); return label.trim();",
        "label = (Boolean(fieldValues['STREET']) ? fieldValues['STREET'] : ''); label += (Boolean(fieldValues['SPEED']) ? ` (${fieldValues['SPEED']} MPH)` : ''); return label.trim();",
        "return label.replace(/(.*?),(.*)/, '$1\\n$2');",
        "return 'MM '+fieldValues.Measure+'\\n'+fieldValues.ROUTE_ALIAS_COMMON;",
        "return label + ' MPH';",
        "return label.replace(/[A-Z]{4}\\s\\d{5}$/,'');",
        'return `${fieldValues.LSt_Full ? fieldValues.LSt_Full : ""} ${fieldValues.Route ? "[VA-" + fieldValues.Route + "]" : ""}`;',
        "label = (Boolean(fieldValues['FullName']) ? fieldValues['FullName'] : ''); label += (Boolean(fieldValues['SpeedLimit']) ? ` (${fieldValues['SpeedLimit']} MPH)` : ''); return label;",
        `let zoom = W.map.getZoom(); label = ""; if (zoom >= 2) { label = fieldValues.FACILITY_NAME + ' (fire station)'; } if (zoom >= 5) { label += '\\n' + fieldValues.ADDRESS; } return label;`,
        "let zoom = W.map.getZoom(); if (zoom >= 4) { label = fieldValues.NAME; } if (zoom >= 5) { label += '\\n' + fieldValues.ADDRESS; } return label;",
        "let zoom = W.map.getZoom(); if (zoom >= 3) { label = fieldValues.PARK_NAME + ' (park)'; } if (zoom >= 5) { label += '\\n' + fieldValues.ADDRESS + ', ' + fieldValues.CITY; } return label;",
        "var parts = label.split(', '); if (parts.length > 1) {  label = parts[0] + '\\n' + parts[1]; } return label;",
        "return label.replace(/\\b0+/g, '');",
        `label = ""; const availableName = fieldValues.RDFLNAME   || fieldValues.PRIMARYNAME   || (fieldValues.SN ? fieldValues.SN + ' ' + fieldValues.ST : ''); if (availableName) {  label += availableName; } if (fieldValues.HWYSIGN) {  label += ' ( ' + fieldValues.HWYSIGN + ' )'; } return label;`,
        "function formatTimestamp(timestamp) {  if (!timestamp) return '';   const date = new Date(parseInt(timestamp, 10));    const year = date.getFullYear();  const month = String(date.getMonth() + 1).padStart(2, '0');  const day = String(date.getDate()).padStart(2, '0');  const hours = String(date.getHours()).padStart(2, '0');  const minutes = String(date.getMinutes()).padStart(2, '0');  const seconds = String(date.getSeconds()).padStart(2, '0');   return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; }  label = '';  if (fieldValues) {  if (fieldValues.desc_) {  label = fieldValues.desc_;  }  if (fieldValues.LanesOpen) {  label += `\\n${fieldValues.LanesOpen}`;  }  if (fieldValues.lastUpdatedTimestamp) {  label += `\\n${formatTimestamp(fieldValues.lastUpdatedTimestamp)}`;  } }  return label;",
        "function formatTimestamp(timestamp) {  if (!timestamp) return '';   const date = new Date(parseInt(timestamp, 10));   const year = date.getFullYear();  const month = String(date.getMonth() + 1).padStart(2, '0');  const day = String(date.getDate()).padStart(2, '0');  const hours = String(date.getHours()).padStart(2, '0');  const minutes = String(date.getMinutes()).padStart(2, '0');  const seconds = String(date.getSeconds()).padStart(2, '0');   return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; }  label = '';  if (fieldValues) {  if (fieldValues.desc_) {  label = fieldValues.desc_;  }  if (fieldValues.affectedLanesDescription) {  label += `\\n${fieldValues.affectedLanesDescription}`;  }  if (fieldValues.lastUpdatedTimestamp) {  label += `\\n${formatTimestamp(fieldValues.lastUpdatedTimestamp)}`;  } }  return label;",
        `label = ""; const surfaceTypeMapping = {  1: 'Paved',  2: 'Gravel',  3: 'Soil/graded drained earth',  5: 'Unimproved/Primitive',  6: 'Impassable/untravelled',  9: 'Unknown' }; if (fieldValues.SURFACETYPE !== undefined) {  let surfaceTypeLabel = surfaceTypeMapping[fieldValues.SURFACETYPE];  if (surfaceTypeLabel) {  label += surfaceTypeLabel;  } else {  label += ' Surface: Unknown';  } } if (fieldValues.RPCCLASS) {  label += ' (C' + fieldValues.RPCCLASS + ' )'; } return label;`,
        'return label + " " + "MPH"',
        "return label.replace(/\\n.*/,'').replace(_regexReplace.r3, '');",
        "return fieldValues.SchoolName + '\\n' + fieldValues.AddressLine1;",
        "return 'I-' + fieldValues.FromLabel + ': EXIT ' + fieldValues.ExitNumber + '\\nEXIT TO: ' + fieldValues.ToRouteDescription;",
        "return fieldValues['RT_TYPEA'] + '-' + fieldValues['DISPLAY'];",
        "label = `${fieldValues.PreDir} ${fieldValues.StreetName} ${fieldValues.StreetType} ${fieldValues.PostDir}`; label += (((fieldValues.Speed != '<Null>') && (fieldValues.Speed != null) && (fieldValues.Speed != '0') && (fieldValues.Speed != '') && (fieldValues.Speed != ' '))  ? ` (${fieldValues.Speed} MPH)`  : ''); return label;",
        "return fieldValues.FAC_NAME + '\\nTYPE: ' + fieldValues.FAC_TYPE + '\\nMANAGED BY: ' + fieldValues.OP_NAME + '\\nBASE RATE or PERMIT: ' + fieldValues.RTE_1HR;",
        "return fieldValues.NAME + '\\n' + fieldValues.FULLADDR;",
        "return fieldValues.SPEED_LIMIT_MPH + ' MPH';",
        "return fieldValues.AVG_SPEED + ' MPH';",
        "return label.replace(/((\\w+ )+)(\\d+)$/,'$3 $1').trim();",
        `label = ""; if (fieldValues.AddNo_Full) { label += fieldValues.AddNo_Full;} if (fieldValues.StNam_Full) { label += ' '+fieldValues.StNam_Full;} if (fieldValues.Post_City) { label += '\\n ' + fieldValues.Post_City;} return label;`,
        "label = ''; label += Closure_Type; label += '\\nStart: ' + Start_Date; label += '\\nEnd: ' + End_Date; return label;",
        "return fieldValues.HOUSE_PRE1.trim() + fieldValues.HOUSE_NUM1.trim() + ' ' + fieldValues.HALF1 + ' ' + fieldValues.STREET_DR1 + ' ' + fieldValues.STREET1;",
        "label = fieldValues.abFullStNm; if (fieldValues.SpeedLimit) {  label += ' | SL= ' + fieldValues.SpeedLimit; } return label;",
        "const city = fieldValues.Mailing_City; const re = new RegExp(`\\\\b((${city}\\\\s+)?WI\\\\s+\\\\d{5})$`); return fieldValues.Site_addr.replace(re,'\\n$1').replace(/\\bWI\\b\\s/,'');",
        "return fieldValues.Full_House_Number.replace(/^\\w{5}/,'') + ' ' + fieldValues.FullStNm;",
        "return fieldValues.SiteAddresses1.replace(/^\\w{5}/,'');",
        "return fieldValues.Full_Address.replace(fieldValues.Site_Num_Prefix, '');",
        "label = fieldValues.DISPLAYNAME; cd = new Date(Number(fieldValues.RPTTIME)); label += `\\nUPDATED TIME: ${cd.toLocaleString()}\\nPOSTED SPEED: ${fieldValues.POSTEDSPEED} MPH`; label += ((fieldValues.SPEEDREDUCED == 'F')  ? '\\nREDUCED SPEED: NO'  : (fieldValues.SPEEDREDUCED == 'T')  ? '\\nREDUCED SPEED: YES'  : ((fieldValues.SPEEDREDUCED == null) || (fieldValues.SPEEDREDUCED == ''))  ? '\\nREDUCED SPEED: UNKNOWN'  : ''); return label;",
        "return fieldValues.Name + '\\n' + fieldValues.Location;",
        "return fieldValues.TITLE + '\\n' + fieldValues.LOCATION + '\\nSTATUS: ' + fieldValues.STATUS;",
        "return fieldValues.Name + '\\n' + fieldValues.Address + '\\nTYPE: ' + fieldValues.RURALSTATIONTYPE;"
    ];

    const tests = [
        new Test({
            id: 'ReturnStatement (literal)',
            code: "return 3;",
            variables: { },
            expectedOutput: 3,
            expectedVariables: { }
        }),
        new Test({
            id: 'ReturnStatement (variable literal)',
            code: "return a;",
            variables: { a: 3 },
            expectedOutput: 3,
            expectedVariables: { a: 3 }
        }),
        new Test({
            id: 'VariableDeclaration (no init)',
            code: "var t;",
            variables: { },
            expectedOutput: undefined,
            expectedVariables: { t: undefined }
        }),
        new Test({
            id: 'VariableDeclaration (error - reassigned)',
            code: "var t;",
            variables: { t: 2 },
            expectedOutput: { errorType: SyntaxError, message: 'Invalid function declaration. Identifier t has already been declared.' }
        }),
        new Test({
            id: 'AssignmentExpression (assign literal to variable)',
            code: "t = 3;",
            variables: { t: undefined },
            expectedOutput: 3,
            expectedVariables: { t: 3 }
        }),
        new Test({
            id: 'VariableDeclaration (with assignment literal init)',
            code: "var t = 3;",
            variables: { },
            expectedOutput: undefined,
            expectedVariables: { t: 3 }
        }),
        new Test({
            id: 'VariableDeclaration (with assignment, variable init)',
            code: "var t = a;",
            variables: { a: 3 },
            expectedOutput: undefined,
            expectedVariables: { t: 3, a: 3 }
        }),
        new Test({
            id: 'BinaryExpression (+, left = literal, right = literal)',
            code: "var t = 3 + 1; return t",
            variables: { },
            expectedOutput: 4
        }),
        new Test({
            id: 'BinaryExpression (+, left = variable, right = literal)',
            code: "var t = a + 1",
            variables: { a: 3 },
            expectedOutput: undefined,
            expectedVariables: { a: 3, t: 4 }
        }),
        new Test({
            id: 'BinaryExpression (+, left = variable, right = variable)',
            code: "var b = 4; var t = a + b;",
            variables: { a: 3 },
            expectedOutput: undefined,
            expectedVariables: { a: 3, b: 4, t: 7 }
        }),
        new Test({
            id: 'LogicalExpression (&&, left = literal, right = variable)',
            code: "return true && a",
            variables: { a: true },
            expectedOutput: true,
            expectedVariables: { a: true }
        }),
        new Test({
            id: 'LogicalExpression (||, left = literal, right = variable)',
            code: "return false || a",
            variables: { a: true },
            expectedOutput: true,
            expectedVariables: { a: true }
        }),
        new Test({
            id: 'ObjectExpression 1',
            code: "return { b: 1 };",
            variables: { },
            expectedOutput: { b: 1 },
            expectedVariables: { }
        }),
        new Test({
            id: 'ObjectExpression 2',
            code: "return { b: 1, d };",
            variables: { d: 'test' },
            expectedOutput: { b: 1, d: 'test' },
            expectedVariables: { d: 'test' }
        }),
        new Test({
            id: 'real test 1',
            code: "return 'MM ' + Math.round(label).toString()",
            variables: { label: '32.2' },
            expectedOutput: 'MM 32',
            expectedVariables: { }
        }),
        new Test({
            id: 'real test 2',
            code: "return fieldValues.mission.replace(/^CA-\\w{3}-(\\w{3,10})-\\w{3,6}/,'$1');",
            variables: { fieldValues: { mission: 'CA-123-abcd-efgh' } },
            expectedOutput: 'abcd',
            expectedVariables: { fieldValues: { mission: 'CA-123-abcd-efgh' } }
        }),
        new Test({
            id: 'real test 3',
            code: "label = ''; cd = new Date(Number(fieldValues.created_date)); label += fieldValues.FULL_NAME +' - ' + cd.toLocaleDateString(); return label;",
            variables: {
                fieldValues: {
                    FULL_NAME: 'TEST RD',
                    created_date: '159339600000'
                }
            },
            expectedOutput: `TEST RD - ${new Date(159339600000).toLocaleDateString()}`,
            expectedVariables: {
                fieldValues: {
                    FULL_NAME: 'TEST RD',
                    created_date: '159339600000'
                },
                cd: new Date(159339600000)
            }
        })
    ];

    // moreTests.forEach((code, index) => {
    //     const test = new Test({
    //         id: 3 + index,
    //         code,
    //         variables: { fieldValues: {} },
    //         expectedOutput: ''
    //     });
    //     code.matchAll(/fieldValues\.([a-z0-9_.]+)/ig).forEach(match => ([, test.variables.fieldValues[match[1]]] = match));
    //     code.matchAll(/fieldValues\[['"]([a-z0-9_.]+)['"]\]/ig).forEach(match => ([, test.variables.fieldValues[match[1]]] = match));
    //     tests.push(test);
    // });

    const ONLY_RUN_TEST_ID = null;
    const SHOW_ALL_RESULTS = false;
    const yellowBackground = 'background-color: yellow';
    const boldFont = 'font-weight: bold';
    const normal = '';

    let testCount = 0;
    const testIds = [];

    tests.forEach(test => {
        let tree;
        try {
            if (testIds.includes(test.id)) {
                throw new Error('Repeated Test ID');
            }
            testIds.push(test.id);
            if (ONLY_RUN_TEST_ID && test.id !== ONLY_RUN_TEST_ID) return;
            testCount++;
            tree = LabelProcessor.parseLabelScript(test.code);

            let testResult;
            try {
                testResult = LabelProcessor.process(tree, test.variables);
            } catch (ex) {
                testResult = { output: ex, variables: test.variables };
            }

            // Filter out the default variables first
            const testResultVariables = {};
            Object.keys(testResult.variables)
                .filter(key => !LabelProcessor.DEFAULT_VARIABLES.hasOwnProperty(key) && !Test.DEFAULT_VARIABLES.hasOwnProperty(key))
                .forEach(key => (testResultVariables[key] = testResult.variables[key]));
            delete testResultVariables.__$lp; // remove the program function variable
            testResult.variables = testResultVariables;

            const validationResult = test.validate(testResult);
            if (SHOW_ALL_RESULTS || !validationResult.outputValidated || !validationResult.variablesValidated) {
                console.log(`TEST ID:    %c${test.id}`, boldFont);
                console.log('%cOUTPUT:    ', validationResult.outputValidated ? normal : yellowBackground, testResult.output.replace('\n', '\\n'));
                console.log('%cEXPECTED:  ', validationResult.outputValidated ? normal : yellowBackground, test.expectedOutput);
                console.log('%cVARIABLES: ', validationResult.variablesValidated ? normal : yellowBackground, testResult.variables);
                console.log('%cEXPECTED:  ', validationResult.variablesValidated ? normal : yellowBackground, test.expectedVariables);
                console.log('TEST:      ', test);
                console.log('TREE:      ', tree);
                console.log('\n\n');
            }
        } catch (ex) {
            console.error(`Error in test "${test.id}"`, ex);
            console.log(test);
            console.log(tree);
        }

        // try {
        //     if (tree) {
        //         const t0 = performance.now();
        //         for (let i = 0; i < 1000; i++) {
        //             parser.process(tree, test.variables);
        //         }
        //         console.log(performance.now() - t0);
        //     }
        // } catch (ex) {
        //     // skip it
        // }
    });
    console.log(`TESTS COMPLETED: ${testCount}`);
})();
