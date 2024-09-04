/* eslint-disable object-shorthand */
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
// @require      https://cdn.jsdelivr.net/npm/esprima-next@6/dist/esprima.min.js
// @require      https://github.com/mapomatic/Parsing-Test/raw/main/ESTreeProcessor.js
// @require      https://github.com/mapomatic/Parsing-Test/raw/main/Test.js
// ==/UserScript==

/* global ESTreeProcessor */
/* global Test */

console.log('started');

(function main() {
    'use strict';

    window.ESTreeProcessor = ESTreeProcessor;
    // ESTreeProcessor.debug = true;

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
        "label = ''; var cd = new Date(Number(fieldValues.ENTERED_ON)); label += fieldValues.ROADNAME +' - ' + cd.toLocaleDateString(); return label;",
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
        "label = ''; var cd = new Date(Number(fieldValues.CREATED)); label += fieldValues.STREET+ ' - ' + cd.toLocaleDateString(); return label;",
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
        "label = ''; var cd = new Date(Number(fieldValues.created_date)); label += fieldValues.FULL_NAME +' - ' + cd.toLocaleDateString(); return label;",
        "return fieldValues.Fromstreet + ' ' + '->' + ' ' + fieldValues.Tostreet + '\\n' + '( Status:' + ' ' + fieldValues.Status + ' )';",
        "label = ''; var cd = new Date(Number(fieldValues.created_date)); label += fieldValues.FULLNAME +' - ' + cd.toLocaleDateString(); return label;",
        "label = ''; var cd = new Date(Number(fieldValues.created_date)); label += fieldValues.LABEL +' - ' + cd.toLocaleDateString(); return label;",
        "label = ''; var cd = new Date(Number(fieldValues.DATE_INSTALLED)); label += fieldValues.FULLNAME +' - ' + cd.toLocaleDateString(); return label;",
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
        "label = fieldValues.DISPLAYNAME; var cd = new Date(Number(fieldValues.RPTTIME)); label += `\\nUPDATED TIME: ${cd.toLocaleString()}\\nPOSTED SPEED: ${fieldValues.POSTEDSPEED} MPH`; label += ((fieldValues.SPEEDREDUCED == 'F')  ? '\\nREDUCED SPEED: NO'  : (fieldValues.SPEEDREDUCED == 'T')  ? '\\nREDUCED SPEED: YES'  : ((fieldValues.SPEEDREDUCED == null) || (fieldValues.SPEEDREDUCED == ''))  ? '\\nREDUCED SPEED: UNKNOWN'  : ''); return label;",
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
            id: '&&',
            code: "return true && false;",
            variables: { },
            expectedOutput: false,
            expectedVariables: { }
        }),
        new Test({
            id: '||',
            code: "return true || false;",
            variables: { },
            expectedOutput: true,
            expectedVariables: { }
        }),
        new Test({
            id: '+',
            code: "return 3 + 1;",
            variables: { },
            expectedOutput: 4,
            expectedVariables: { }
        }),
        new Test({
            id: '-',
            code: "return 3 - 1;",
            variables: { },
            expectedOutput: 2,
            expectedVariables: { }
        }),
        new Test({
            id: '*',
            code: "return 3 * 2;",
            variables: { },
            expectedOutput: 6,
            expectedVariables: { }
        }),
        new Test({
            id: '/',
            code: "return 3 / 2;",
            variables: { },
            expectedOutput: 3 / 2,
            expectedVariables: { }
        }),
        new Test({
            id: '%',
            code: "return 3 % 2;",
            variables: { },
            expectedOutput: 1,
            expectedVariables: { }
        }),
        new Test({
            id: '**',
            code: "return 3 ** 2;",
            variables: { },
            expectedOutput: 9,
            expectedVariables: { }
        }),
        new Test({
            id: '??',
            code: "return null ?? 2;",
            variables: { },
            expectedOutput: 2,
            expectedVariables: { }
        }),
        new Test({
            id: '&&=',
            code: "return a &&= false;",
            variables: { a: true },
            expectedOutput: false,
            expectedVariables: { a: false }
        }),
        new Test({
            id: '||=',
            code: "return a ||= false;",
            variables: { a: true },
            expectedOutput: true,
            expectedVariables: { a: true }
        }),
        new Test({
            id: '+=',
            code: "return a += 1;",
            variables: { a: 3 },
            expectedOutput: 4,
            expectedVariables: { a: 4 }
        }),
        new Test({
            id: '-=',
            code: "return a -= 1;",
            variables: { a: 3 },
            expectedOutput: 2,
            expectedVariables: { a: 2 }
        }),
        new Test({
            id: '*=',
            code: "return a *= 2;",
            variables: { a: 3 },
            expectedOutput: 6,
            expectedVariables: { a: 6 }
        }),
        new Test({
            id: '/=',
            code: "return a /= 2;",
            variables: { a: 3 },
            expectedOutput: 1.5,
            expectedVariables: { a: 1.5 }
        }),
        new Test({
            id: '%=',
            code: "return a %= 2;",
            variables: { a: 3 },
            expectedOutput: 1,
            expectedVariables: { a: 1 }
        }),
        new Test({
            id: '**=',
            code: "return a **= 2;",
            variables: { a: 3 },
            expectedOutput: 9,
            expectedVariables: { a: 9 }
        }),
        new Test({
            id: '??=',
            code: "return a ??= 2;",
            variables: { a: null },
            expectedOutput: 2,
            expectedVariables: { a: 2 }
        }),
        new Test({
            id: '?. #1',
            code: "return a?.doesntExist()",
            variables: { a: { } },
            expectedOutput: undefined,
            expectedVariables: { a: { } }
        }),
        new Test({
            id: '?. #2',
            code: "return a?.doesExist()",
            variables: { a: { doesExist: () => 3 } },
            expectedOutput: 3,
            expectedVariables: { a: { doesExist: () => 3 } }
        }),
        new Test({
            id: 'function #1',
            code: "function test() { return 99; } return test();",
            variables: { },
            expectedOutput: 99,
            expectedVariables: { test: function() { return 1; } }
        }),
        new Test({
            id: 'VariableDeclaration (error - reassigned)',
            code: "let t; let t;",
            variables: { t: undefined },
            expectedOutput: { errorType: SyntaxError, message: "Identifier 't' has already been declared" }
        }),
        new Test({
            id: 'reassign error in function',
            code: "function test(t) { let t = 45; } test(1);",
            variables: { t: undefined },
            expectedOutput: { errorType: SyntaxError, message: "Identifier 't' has already been declared" }
        }),
        new Test({
            id: 'array predicate function',
            code: "function test(v) { return v > 2; } var a = [1,2,3]; return a.some(test);",
            variables: { t: undefined },
            expectedOutput: true
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
            id: "return 'MM ' + Math.round(label).toString()",
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
            code: "label = ''; var cd = new Date(Number(fieldValues.created_date)); label += fieldValues.FULL_NAME +' - ' + cd.toLocaleDateString(); return label;",
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
        }),
        new Test({
            id: 'AssignmentExpression (+=, left variable, right literal)',
            code: "return a += 3;",
            variables: { a: 1 },
            expectedOutput: 4,
            expectedVariables: { a: 4 }
        }),
        new Test({
            id: 'AssignmentExpression (+=, left variable, right variable)',
            code: "return a += a;",
            variables: { a: 1 },
            expectedOutput: 2,
            expectedVariables: { a: 2 }
        }),
        new Test({
            id: '++a',
            code: "return ++a;",
            variables: { a: 1 },
            expectedOutput: 2,
            expectedVariables: { a: 2 }
        }),
        new Test({
            id: 'a++',
            code: "return a++;",
            variables: { a: 1 },
            expectedOutput: 1,
            expectedVariables: { a: 2 }
        }),
        new Test({
            id: '--a',
            code: "return --a;",
            variables: { a: 1 },
            expectedOutput: 0,
            expectedVariables: { a: 0 }
        }),
        new Test({
            id: 'a--',
            code: "return a--;",
            variables: { a: 1 },
            expectedOutput: 0,
            expectedVariables: { a: 0 }
        }),
        new Test({
            id: 'for #1',
            code: "for (var i=0; i<2; i++) a++; return a;",
            variables: { a: 0 },
            expectedOutput: 2,
            expectedVariables: { a: 1, i: 1 }
        }),
        new Test({
            id: 'TB sc0',
            code: `
// DON'T USE STRING TEMPLATES! MINIMIZER WILL REMOVE SPACES.
/* eslint-disable prefer-template */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-bitwise */
/* eslint-disable strict */
/* eslint-disable camelcase */

/* global sec */
/* global W */

function sc0() {
    /* ** sc[0] ******************************************************************************************************************************* */

    // GC list
    sec.WMETB_GC = [
        'adabadada',
        'alarun',
        'alemenezes',
        'alexs001',
        'amarock85',
        'antigerme',
        'anto64',
        'arnoniem',
        'artsleops',
        'arturoae',
        'asterix06',
        'aureozb',
        'banished',
        'bedo2991',
        'beffl',
        'bellhouse',
        'bgodette',
        'bretmcvey',
        'brshk1',
        'buchet37',
        'bullshoot',
        'bures',
        'calandraca',
        'caltedde',
        'caradellino',
        'carloslaso',
        'ci2212',
        'dacianova',
        'dave2084',
        'davidabarca',
        'davipt',
        'dbcm',
        'deanonzl',
        'demagogue2',
        'dewitg',
        'dpanics',
        'dragstor',
        'driving79',
        'drslump34',
        'dutchdirt',
        'ehepner1977',
        'erznevo',
        'eyal-fr',
        'felohidalgo',
        'fernandoanguita',
        'fmondini',
        'fokuspokus',
        'foxitrot',
        'fuchserl',
        'gasparfox',
        'ginbook',
        'giovanni-cortinovis',
        'glodenox',
        'goncalovm76',
        'gpsritter',
        'guardian-sg',
        'guri211',
        'hebermc',
        'hmarian',
        'houstonmg',
        'iainhouse',
        'iamrioo',
        'irafan',
        'iredisni',
        'iridium1',
        'ituajr',
        'itzwolf',
        'jcnina',
        'jemay',
        'jm6087',
        'joerodriguez12',
        'johndoe75',
        'juanfelipep',
        'juankx',
        'justins83',
        'kadyus',
        'kahlcolimon',
        'kayos_on_the_road',
        'kazmuth',
        'kdevries',
        'kentsmith9',
        'kkervinjones',
        'kpouer',
        'kukimonsta',
        'laukinisbriedis',
        'ldriveskier',
        'leocylau',
        'leorenaud',
        'livicu',
        'lopaolo69',
        'lostinmymaps',
        'ma5jkl',
        'maalrivba',
        'manoeuvre',
        'manzareck',
        'matsalka',
        'meb001',
        'michelozzo',
        'milkyway35',
        'mincho77',
        'miole67',
        'mousepl',
        'moweez',
        'nicolaswaisman',
        'no1ne',
        'nogetandet',
        'nomenclator1677',
        'nzahn1',
        'olestas',
        'orbitc',
        'ottonomy',
        'paulkok_my',
        'paulvdwyn',
        'perezgustavo',
        'pesachz',
        'petervdveen',
        'pferrariuy',
        'ply8808',
        'popel22',
        'porubcan',
        'ps_au',
        'pulsarxp',
        'ranttine',
        'reginamaga',
        'riff_raff',
        'robindlc',
        'russpa',
        'rickypv89',
        'sapozhnik',
        'sebiseba',
        'shmupi',
        'sirabouy',
        'sketch',
        'speeddzel',
        'spookyx',
        'stefaanschroeyers',
        'sverkern',
        'szata76',
        'szili17',
        'tenlucas',
        'the1who',
        'timbones',
        'tonestertm',
        'top_gun_de',
        'ulle2',
        'velezss',
        'vequalsdividedt',
        'vince1612',
        'vincio60',
        'vitj',
        'vladimobile',
        'watt25',
        'wazingarch',
        'webs101',
        'wilfredscat',
        'witoco',
        'xanderb',
        'yaacobyy',
        'yaniskyr',
        'zeze13',
        'zsezo',

        // Toolbox Developers - non-GC
        'skidooguy',
        'mapomatic'
    ];

    // SM list
    sec.WMETB_SM = [
        // Australia
        'btstar',
        'dizzie131',
        'garvingray',
        'gbspeedy1305',
        'jacksonrharvey',
        'kambingtinggi',
        'lostinmymaps',
        'lysdexiaeht',
        'minidooper',
        'territorykate',
        'theclem54',
        'timathing',
        'traveling_gav',
        'vestigal',

        // Canada
        'alexs001',
        'amoyer1974',
        'brycecampbell',
        'doctorkb',
        'dry_b0nes',
        'e-sarge',
        'got2bekd',
        'gregva3mgr',
        'harmonious4',
        'hmarian',
        'iamthelexx',
        'kayos_on_the_road',
        'manoeuvre',
        'marcmtlhappy',
        'mtylerb',
        'mushymedic',
        'petermuir',
        'phil-mtl',
        'psstdizel',
        'qazxcvbnmm',
        'restless_in_nb',
        'streetninja418',
        'taxy57',
        'trexer0',
        'webs101',

        // United States
        'abc1357',
        'abelter',
        'alanoftheberg',
        'anorestesx',
        'aquazr1',
        'banished',
        'be8el0ve',
        'benenmen',
        'bigbear3764',
        'bretmcvey',
        'bummerdude69',
        'bz2012',
        'chronos74',
        'chucksways',
        'citeman',
        'cluelessbillingsdriver',
        'cotero2002',
        'cparishjr',
        'crazycaveman',
        'ct13',
        'dajonel',
        'dangottschalk',
        'dclemur',
        'decktj001',
        'dfortney',
        'dfw_gis',
        'dhschneider',
        'dmcrandall',
        'doctorblah',
        'doryphore_6',
        'drgabowski',
        'dspille',
        'dude463',
        'dude495',
        'edfromohio',
        'ehcool68',
        'ehepner1977',
        'enfcer74',
        'falco_sparverius',
        'fastestbeef',
        'flith',
        'fuji2086',
        'fznk',
        'geoapophis',
        'gizmoguy411',
        'gooberking',
        'grsmhiker',
        'gunnargsd',
        'happy_lyn',
        'hawkeygoal',
        'hbiede',
        'herrchin',
        'hpmapper',
        'itzwolf',
        'jakflash',
        'jallen',
        'jalondon628',
        'jangliss',
        'jaywazin',
        'jb15tm',
        'jdelosa',
        'jdeyoung',
        'jellicle0',
        'jemay',
        'jm6087',
        'joerodriguez12',
        'joshjmm',
        'joyriding',
        'jr1982jr',
        'juliansean',
        'jushag',
        'jwe252',
        'karlcr9911',
        'karrows',
        'kodi75',
        'krzycholub',
        'kuniakid',
        'ldriveskier',
        'lennynrpd',
        'lonewolf147',
        'luke6270',
        'machete808',
        'macnewbold',
        'madcatvt',
        'megg2004',
        'mhh60',
        'mndinoman',
        'moogonk',
        'mrnicguy',
        'mrsmith66',
        'mtb2314',
        'mudge42',
        'mythdraug',
        'n4dog',
        'nacron',
        'nimbus-',
        'nimper2000',
        'nivekeel',
        'njmedic2535',
        'nnote',
        'nzahn1',
        'ohiostmusicman',
        'ojlaw',
        'onmywaysir',
        'orbitc',
        'ottonomy',
        'pesachz',
        'phantomsoul',
        'phoenixhawke',
        'phuz',
        'pleasedrivefast',
        'poncewattle',
        'rainman3699',
        'ramblinwreck_81',
        'raptorguyinnc',
        'red-nax',
        'rfrsw101',
        'roadtechie',
        'robert04101',
        'rocketsciguy',
        'ropaswan',
        'russblau',
        'russpa',
        's18slider',
        'sanzclew',
        'scottrm20',
        'sdtahoe',
        'severiorumpatrem',
        'sikemever',
        'sketch',
        'skidooguy',
        'skyviewguru',
        'snyowl',
        'snhroc',
        'spedracr',
        'spencerfg',
        'steelpanz',
        'steveinark',
        'subs5',
        'sundevil2213',
        'sunnyraynbows',
        'superdave1426',
        'tango259',
        'tcalvert317',
        'the_cre8r',
        'the1who',
        'tlknows',
        'tonestertm',
        'towerfire36',
        'turbomkt',
        'turnertr',
        'uscwaller',
        'w1qa',
        'whathappened15',
        'whoaitspete',
        'willdanneriv',
        'wxw777',
        'xanderb',
        'xkspeed'
    ];

    // Beta user list (gives access to WMETB_Debug console output)
    sec.WMETB_Beta_Users = [
        'age4670',
        'alexs001',
        'anorestesx',
        'chief_os',
        'chronos74',
        'citizentraffic',
        'corentin-48',
        'demagogue2',
        'doctorblah',
        'happy_lyn',
        'hbiede',
        'iridium1',
        'itzwolf',
        'jalondon628',
        'joerodriguez12',
        'josevaldos950',
        'krzycholub',
        'ldriveskier',
        'leorenaud',
        'locojd1',
        'lostinmymaps',
        'machete808',
        'no1xmohamed',
        'ojlaw',
        'phuz',
        'russpa',
        'sanzclew',
        'scottrm20',
        'sethspeedy28',
        'sheriffbufordtjusticemi',
        'snhroc',
        'tenetienne',
        'the_cre8r',
        'turbomkt',
        'vestigal',
        'willdanneriv',
        'wxw777'
    ];

    // Developers (all permissions and full developer options)
    sec.WMETB_Debug_Users = [
        'bellhouse',
        'jm6087',
        'justins83',
        'sethspeedy28',
        'skidooguy',
        'mapomatic'
    ];

    // GLOBAL CHAMPS DETECTION
    sec.WMETB_IsGC = function WMETB_IsGC() {
        return sec.WMETB_GC.includes(sec.WMETB_VerifiedUserName.toLowerCase()) && !sec.devPermSettings('ignoreGCPermission');
    };

    // State manager check
    sec.WMETB_IsSM = function WMETB_IsSM() {
        return sec.WMETB_SM.includes(sec.WMETB_VerifiedUserName.toLowerCase()) && !sec.devPermSettings('ignoreSMPermission');
    };

    // Developer check
    sec.WMETB_IsDev = function WMETB_IsDev() {
        return sec.WMETB_Debug_Users.includes(sec.WMETB_VerifiedUserName.toLowerCase());
    };

    // Beta tester check
    sec.WMETB_IsBeta = function WMETB_IsBeta() {
        return sec.WMETB_Beta_Users.includes(sec.WMETB_VerifiedUserName.toLowerCase());
    };

    sec.WMETB_IsCM = function WMETB_IsCM() {
        return sec.WMETB_VerifiedEditableCountryIDs && sec.WMETB_VerifiedEditableCountryIDs.length && !sec.devPermSettings('ignoreCMPermission');
    };

    sec.WMETB_IsAM = function WMETB_IsAM() {
        return sec.WMETB_VerifiedIsAreaManager && !sec.devPermSettings('ignoreAMPermission');
    };

    // Developer specific functions
    sec.devPermSettings = function devPermSettings(key) {
        const defaultSettings = {
            useCountryPerms: false,
            ignoreGCPermission: false,
            ignoreCMPermission: false,
            ignoreSMPermission: false,
            ignoreAMPermission: false,
            forceEditorRank: 1
        };
        if (localStorage.WMETB__DevPerms) {
            const devSettings = JSON.parse(localStorage.getItem('WMETB__DevPerms'));
            switch (key) {
                case 'useCountryPerms':
                    return devSettings[key];
                case 'ignoreGCPermission':
                    return devSettings[key];
                case 'ignoreCMPermission':
                    return devSettings[key];
                case 'ignoreSMPermission':
                    return devSettings[key];
                case 'ignoreAMPermission':
                    return devSettings[key];
                default:
                    global.WMETB_Debug('ERROR - No key found');
                    break;
            }
            return null;
        }
        // global.WMETB_Debug('(Didnt find item) Using devc tool permissions');
        return defaultSettings[key];
    };

    sec.saveDevPermSettings = function saveDevPermSettings() {
        if (localStorage) {
            const settingStatus = {
                useCountryPerms: $("input[id='WMETB_DevCountryPerms']").prop('checked'),
                ignoreGCPermission: $("input[id='WMETB_DevIgnoreGCPerms']").prop('checked'),
                ignoreCMPermission: $("input[id='WMETB_DevIgnoreCMPerms']").prop('checked'),
                ignoreSMPermission: $("input[id='WMETB_DevIgnoreSMPerms']").prop('checked'),
                ignoreAMPermission: $("input[id='WMETB_DevIgnoreAMPerms']").prop('checked'),
                forceEditorRank: 1
            };
            localStorage.setItem('WMETB__DevPerms', JSON.stringify(settingStatus));
        }
    };

    // USER DETECTION
    sec.uec = function uec(strUni) {
        // use regular expressions & String.replace callback function for better efficiency
        // than procedural approaches
        let strUtf = strUni.replace(
            /[\u0080-\u07ff]/g, // U+0080 - U+07FF => 2 bytes 110yyyyy, 10zzzzzz
            c => {
                const cc = c.charCodeAt(0);
                return String.fromCharCode(0xc0 | cc >> 6, 0x80 | cc & 0x3f);
            }
        );
        strUtf = strUtf.replace(
            /[\u0800-\uffff]/g, // U+0800 - U+FFFF => 3 bytes 1110xxxx, 10yyyyyy, 10zzzzzz
            c => {
                const cc = c.charCodeAt(0);
                return String.fromCharCode(0xe0 | cc >> 12, 0x80 | cc >> 6 & 0x3F, 0x80 | cc & 0x3f);
            }
        );
        return strUtf;
    };

    sec.crc32 = function crc32(str) {
        // http://kevin.vanzonneveld.net
        // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
        // +   improved by: T0bsn
        // -    depends on: utf8_encode
        // *     example 1: crc32('Kevin van Zonneveld');
        // *     returns 1: 1249991249

        str = sec.uec(str);
        const table = '00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D';

        let crc = 0;
        let x = 0;
        let y = 0;

        crc ^= -1;
        for (let i = 0, iTop = str.length; i < iTop; i++) {
            y = (crc ^ str.charCodeAt(i)) & 0xFF;
            x = '0x' + table.substr(y * 9, 8);
            crc = (crc >>> 8) ^ x;
        }

        // 12/24/2022 (mapomatic) The following was added because this function was returning negative
        // values in some cases due to JS integer limitations.  See this article:
        // https://2ality.com/2012/02/js-integers.html
        // Alternatively, the following can be implemented if the "signed shift right" operator doesn't
        // work for some reason...
        //
        // function ToInteger(x) {
        //     x = Number(x);
        //     return x < 0 ? Math.ceil(x) : Math.floor(x);
        // }
        // function modulo(a, b) {
        //     return a - Math.floor(a/b)*b;
        // }
        // function ToUint32(x) {
        //     return modulo(ToInteger(x), Math.pow(2, 32));
        // }

        function ToUint32(v) {
            return v >>> 0;
        }

        return ToUint32(crc ^ (-1));
    };

    sec.WMETB_Init = function WMETB_Init(callback) {
        // Hack detection
        const c = sec.crc32(global.wazeinit.toString().replace(/(\\r\\n|\\n|\\r|\\s)/gm, ''));
        let bypass = false;

        if (c !== sec.WMETB_CodeChecksum) {
            if (localStorage.WME_Toolbox_Devmode) {
                if (JSON.parse(localStorage.getItem('WME_Toolbox_Devmode')).hash === 'eI4yA8gXVFaz4ezP') {
                    console.log('WMETB Checksum *** : ' + c);
                    bypass = true;
                    try {
                        document.getElementById('toolbar').style.backgroundColor = 'Yellow';
                    } catch (e) {
                        console.log('WMETB: ' + e);
                    }
                }
            }
            if (!bypass) {
                prompt('WME Toolbox: please report this error (use Ctrl-C to copy):', 'Error 600');
                return;
            }
        }

        // detect editor: usa / row / israel
        // let EditorLocation = null;
        // let WazeEditorURL = null;
        // const SecureURL = 'https://';
        // let URLPrefix;
        // const URLPrefixProd = 'www';
        // const URLPrefixBeta = 'beta';
        // const WazeDomain = 'waze.com';
        // const RowLocation = 'row-';
        // const USALocation = '';
        // const IlLocation = 'il-';
        // const ProdLocationSuffix = 'live';
        // const BetaLocationSuffix = 'beta';
        // let LocationSuffix;
        // const Location = 'Descartes';
        // const URLSuffix = 'app';

        // if (localStorage.editorLocation) {
        //     // console.log("WMETB: getting editor environment");
        //     const options = JSON.parse(localStorage.getItem('editorLocation'));
        //     EditorLocation = options.code;
        // } else {
        //     EditorLocation = 'row';
        // }

        // WazeEditorURL = SecureURL;

        // if (location.href.indexOf(\`\${URLPrefixProd}.waze.com\`) !== -1) {
        //     URLPrefix = URLPrefixProd;
        //     LocationSuffix = ProdLocationSuffix;
        // } else if (location.href.indexOf(\`\${URLPrefixBeta}.waze.com\`) !== -1) {
        //     URLPrefix = URLPrefixBeta;
        //     LocationSuffix = BetaLocationSuffix;
        // }
        // WazeEditorURL += \`\${URLPrefix}.\${WazeDomain}/\`;

        // switch (EditorLocation) {
        //     case 'row':
        //         WazeEditorURL += RowLocation;
        //         break;
        //     case 'usa':
        //         WazeEditorURL += USALocation;
        //         break;
        //     case 'il':
        //         WazeEditorURL += IlLocation;
        //         break;
        //     default:
        //         // do nothing
        // }

        // WazeEditorURL += Location + '-' + LocationSuffix + '/' + URLSuffix;

        function init() {
            const WMETB_me = W.loginManager.user;
            sec.WMETB_VerifiedUserName = WMETB_me.attributes.userName;
            sec.WMETB_VerifiedUserRank = WMETB_me.attributes.rank + 1;
            sec.WMETB_VerifiedIsAreaManager = WMETB_me.attributes.isAreaManager;
            sec.WMETB_VerifiedEditableCountryIDs = WMETB_me.attributes.editableCountryIDs;
            callback();
        }

        function tbSecStart() {
            if (typeof W === 'object' && W.userscripts?.state.isReady) {
                init();
            } else {
                document.addEventListener('wme-ready', init, { once: true });
            }
        }

        tbSecStart();
    };
}

function sc1(sec) {
    /* ** sc[1] *********************************************************************************************************************** */

    // CHAMPS SHORTCUTS
    if (sec.WMETB_IsGC()) {
        global.WMETB_ShortcutsMenu.addItem(
            'WMETBsc_AllowAllConnectionsInLandmark',
            'Enable all turns in area place [GC Only]',
            sec.WMETB_AllowAllConnectionsInLandmark
        );
        global.WMETB_ShortcutsMenu.addItem(
            'WMETBsc_AllowAllConnectionsOnScreen',
            'Enable all turns on screen [GC Only]',
            sec.WMETB_AllowAllConnectionsOnScreen
        );
    }
}

function sc2(sec) {
    /* ** sc[2] *********************************************************************************************************************** */

    // Add protected toolbar icons
    let keys = 0;
    // CHAMPS HIDDEN ICONS
    if (sec.WMETB_IsGC()) {
        if ($("input[id='chooseFeature-AllowAllConLan']").prop('checked')) {
            const tbFeatureText = \`<img id='WMETB_AllowAllConnectionsInLandmark' class='WMETBtooltip' title='Enable all turns in area place or map comment (GC only)' src='\${document['WMETB_AllowAllConnectionsInLandmark.png'].src}'>\`;
            $(global.WMETB_NavBar).append(tbFeatureText);
            keys++;
        }

        if ($("input[id='chooseFeature-AllowAllConScrn']").prop('checked')) {
            const tbFeatureText = \`<img id='WMETB_AllowAllConnectionsOnScreen' class='WMETBtooltip' title='Enable all turns on screen (GC only)' src='\${document['WMETB_AllowAllConnectionsOnScreen.png'].src}'>\`;
            $(global.WMETB_NavBar).append(tbFeatureText);
            keys++;
        }
    }
    if (sec.WMETB_RightsCheck('RepTool')) {
        if ($("input[id='chooseFeature-reporting']").prop('checked')) {
            const tbFeatureText = \`<img id='WMETB_ReportingPermalink' class='WMETBtooltip' title='Permalink to reporting tool (GC only)' src='\${document['reporting.png'].src}'>\`;
            $(global.WMETB_NavBar).append(tbFeatureText);
            keys++;
        }
    }
    return keys;
}

function sc3(sec) {
    /* ** sc[3] ********************************************************************************************************************* */
    // CHAMPS HIDDEN ICONS
    if (sec.WMETB_IsGC()) {
        $('#WMETB_AllowAllConnectionsInLandmark').css('cursor', 'pointer');
        $('#WMETB_AllowAllConnectionsInLandmark').click(() => {
            sec.WMETB_AllowAllConnectionsInLandmark();
        });
        $('#WMETB_AllowAllConnectionsOnScreen').css('cursor', 'pointer');
        $('#WMETB_AllowAllConnectionsOnScreen').click(() => {
            sec.WMETB_AllowAllConnectionsOnScreen();
        });
    }
    if (sec.WMETB_RightsCheck('RepTool')) {
        // Click function defined in Toolbar_Permalinks.js
        $('#WMETB_ReportingPermalink').css('cursor', 'pointer');
    }
}

function sc4(sec) {
    // DON'T USE STRING TEMPLATES! MINIMIZER WILL REMOVE SPACES.
    /* eslint-disable prefer-template */
    /* eslint-disable strict */
    /* eslint-disable camelcase */

    /* global sec */
    /* global W */
    /* global OpenLayers */

    /* ** sc[4] ****************************************************************************************************** */
    // CHAMPS WMETB_AllowAllConnectionsOnScreen
    sec.WMETB_AllowAllConnectionsOnScreen = function WMETB_AllowAllConnectionsOnScreen() {
        if (sec.WMETB_IsGC()) {
            if (!global.WMETB_readyToRun(13)) return;
            const r = confirm('/!\\ DANGER /!\\\nAre you sure you want to enable all turns on screen?');
            if (r) {
                global.WMETB_Highlight_Obj.pauseRefreshes();
                let count = 0;
                let limitWarn = false;
                const tg = W.model.getTurnGraph();
                W.model.nodes.getObjectArray().forEach(node => {
                    if (!limitWarn) {
                        if (global.WMETB_limitForSaveReach()) { // Update limit
                            limitWarn = true;
                            global.WMETB_DispWarn('Please save before continuing to edit');
                        } else if (node.areConnectionsEditable() && global.WMETB_onScreen(node) && !node.areAllConnectionsEnabled()) {
                            // W.model.actionManager.add(new global.ModifyAllConnections(node, true));
                            node.attributes.segIDs.forEach(segID1 => {
                                node.attributes.segIDs.forEach(segID2 => {
                                    if (segID1 !== segID2) {
                                        const seg1 = W.model.segments.getObjectById(segID1);
                                        const seg2 = W.model.segments.getObjectById(segID2);
                                        if (node.isTurnAllowedBySegDirections(seg1, seg2) && !seg1.isTurnAllowed(seg2, node)
                                            && seg1.isDrivable() && seg2.isDrivable()) {
                                            const turn = tg.getTurnThroughNode(node, seg1, seg2);
                                            W.model.actionManager.add(new global.SetTurn(tg, turn.withTurnData(turn.getTurnData().withToggledState(true))));
                                            count++;
                                        }
                                    }
                                });
                            });
                        }
                    }
                });
                global.WMETB_Highlight_Obj.resumeRefreshes();
                if (count) {
                    global.WMETB_DispLog(count + ' turn' + (count > 1 ? 's' : '') + ' on screen enabled');
                    global.WMETB_Highlight_Obj.refreshAllLayers();
                } else {
                    global.WMETB_DispWarn('No disabled turns found on screen');
                }
            }
        } else global.WMETB_DispWarn("You're not allowed to use this feature.");
    };

    // CHAMPS WMETB_AllowAllConnectionsInLandmark
    sec.WMETB_AllowAllConnectionsInLandmark = function WMETB_AllowAllConnectionsInLandmark() {
        if (sec.WMETB_IsGC()) {
            if (!global.WMETB_readyToRun(13)) return;
            const objects = W.selectionManager.getSelectedDataModelObjects();
            const firstObject = objects[0];
            if (objects.length !== 1 || (firstObject.type !== 'venue' && firstObject.type !== 'mapComment')) {
                global.WMETB_DispWarn('No area place or map comment selected');
                return;
            }
            if (firstObject.isPoint()) {
                global.WMETB_DispWarn('Select a place (area), not a place (point)');
                return;
            }

            const areaString = firstObject.type === 'venue' ? 'area place' : 'map comment';
            const geoList = [];

            // dummyd2: I don't understand this part: selectedItems.length is 1 (cf return above)
            // for(var i = 0; i < W.selectionManager.getSelectedFeatures().length; i++) {
            //  var m = W.selectionManager.getSelectedFeatures()[i];
            //  if (m.type == W.Model.ObjectType.VENUE)
            geoList.push(firstObject.getOLGeometry());
            // }

            // dummyd2: I still don't understand this. A new landmark not saved yet is a venue...
            /* if(geoList.length == 0) {
            for(var id in W.model.venue.objects) {
            if(id < 0) {
            var curLm = W.model.venue.objects[id];
            var curFid;
            if(geoList.length == 0 || id < curFid) { geoList[0] = curLm.getOLGeometry(); curFid = id; }
            }
            }
            } */

            if (geoList.length > 0) {
                const r = confirm('/!\\ DANGER /!\\\nAre you sure you want to enable all turns on nodes within this ' + areaString + '?');
                if (r) {
                    let count = 0;
                    let limitWarn = false;
                    const tg = W.model.getTurnGraph();
                    W.model.nodes.getObjectArray().forEach(node => {
                        if (!limitWarn) {
                            if (global.WMETB_limitForSaveReach()) { // Update limit
                                global.WMETB_DispWarn('Please save before continuing to edit');
                                limitWarn = true;
                            } else if (global.WMETB_isNodeInGeometries(geoList, node) && node.areConnectionsEditable()
                                && !node.areAllConnectionsEnabled()) {
                                node.attributes.segIDs.forEach(segID1 => {
                                    node.attributes.segIDs.forEach(segID2 => {
                                        if (segID1 !== segID2) {
                                            const seg1 = W.model.segments.getObjectById(segID1);
                                            const seg2 = W.model.segments.getObjectById(segID2);
                                            if (node.isTurnAllowedBySegDirections(seg1, seg2) && !seg1.isTurnAllowed(seg2, node)
                                                && seg1.isDrivable() && seg2.isDrivable()) {
                                                const turn = tg.getTurnThroughNode(node, seg1, seg2);
                                                W.model.actionManager.add(new global.SetTurn(tg, turn.withTurnData(turn.getTurnData().withToggledState(true))));
                                                count++;
                                            }
                                        }
                                    });
                                });
                            }
                        }
                    });
                    if (count) {
                        global.WMETB_DispLog(count + ' turn' + (count > 1 ? 's' : '') + ' in ' + areaString + ' enabled');
                    } else {
                        global.WMETB_DispWarn('No disabled turns found in ' + areaString);
                    }
                }
            } else {
                global.WMETB_DispWarn('No area place or map comment selected');
            }
        } else global.WMETB_DispWarn("You're not allowed to use this feature.");
    };

    // WMETB_magicFixOthers
    sec.WMETB_magicFixOthers = function WMETB_magicFixOthers() {
        if (sec.WMETB_RightsCheck('FixOther')) {
            if (!global.WMETB_readyToRun(15)) return;

            let somethingdone = false;
            let countRevCon = 0;
            let countDeadEndLoop = 0;
            let countUnterminated = 0;
            let countRoundaboutLoop = 0;
            let maxfix = false;

            global.WMETB_Highlight_Obj.pauseRefreshes();

            W.model.nodes.getObjectArray().forEach(node => {
                if (global.WMETB_limitForSaveReach()) { // Update limit
                    maxfix = true;
                } else if (node && global.WMETB_onScreen(node) && node.attributes.segIDs.length > 1) {
                    let WMETB_FixThisNode = false;

                    // find segments that connect to this node
                    node.attributes.segIDs.map(segID => W.model.segments.getObjectById(segID)).filter(segment => segment).forEach(segment => {
                        const attr = segment.attributes;

                        // Fix dead-end segments
                        if (attr.toNodeID === null || attr.fromNodeID === null) {
                            WMETB_FixThisNode = true;
                            countUnterminated++;
                        }

                        // Fix or delete dead-end loops
                        if (attr.toNodeID === attr.fromNodeID) {
                            if (!segment.isLockedByHigherRank() && segment.isDeleteable()) {
                                if (attr.length < 10) { // Delete small loops
                                    if (global.WMETB_limitForSaveReach()) { // Update limit
                                        maxfix = true;
                                    } else {
                                        W.model.actionManager.add(new global.DeleteSegment(segment));
                                        countDeadEndLoop++;
                                        somethingdone = true;
                                    }
                                } else if (attr.junctionID == null) { // skip roundabouts
                                    WMETB_FixThisNode = true; // Let JNF do the job
                                    countDeadEndLoop++;
                                } else {
                                    countRoundaboutLoop++;
                                }
                            }
                        }
                    });

                    // Fix reverse connections
                    node.attributes.segIDs.map(segID => W.model.segments.getObjectById(segID)).forEach((seg1, seg1Index) => {
                        // Check to ensure the opposite end node on seg1 is onscreen to prevent the seg being switched to two-way
                        // let opp_node1 = seg1.attributes.toNodeID == node.attributes.id ? seg1.attributes.fromNodeID : seg1.attributes.toNodeID;
                        // if (!onScreen(W.model.nodes.getObjectById(opp_node1))) {
                        //     allLoaded = false;
                        //     WMETB_Debug(\`seg1 opposite node (\${opp_node1}) not onscreen\`);
                        //     return;
                        // }
                        for (let seg2Index = seg1Index + 1; seg2Index < node.attributes.segIDs.length; seg2Index++) {
                            const seg2 = W.model.segments.getObjectById(node.attributes.segIDs[seg2Index]);
                            // Check to ensure the opposite end node on seg2 is onscreen to prevent the seg being switched to two-way
                            // let opp_node2 = seg2.attributes.toNodeID == node.attributes.id ? seg1.attributes.fromNodeID : seg1.attributes.toNodeID;
                            // if (!onScreen(W.model.nodes.getObjectById(opp_node2))) {
                            //     allLoaded = false;
                            //     WMETB_Debug(\`seg2 opposite node (\${opp_node2}) not onscreen\`);
                            //     return;
                            // }

                            if (!seg1.isDeleted() && !seg2.isDeleted()) {
                                const fwd_t = seg1.isTurnAllowed(seg2, node);
                                const rev_t = seg2.isTurnAllowed(seg1, node);
                                const fwd_a = node.isTurnAllowedBySegDirections(seg1, seg2);
                                const rev_a = node.isTurnAllowedBySegDirections(seg2, seg1);
                                if ((fwd_t && !fwd_a) || (rev_t && !rev_a)) {
                                    if (!global.WMETB_isSegUnknown(seg1) && !global.WMETB_isSegUnknown(seg2)) {
                                        WMETB_FixThisNode = true;
                                        countRevCon++;
                                    }
                                }
                            }
                        }
                    });
                    if (!maxfix && WMETB_FixThisNode && node.areConnectionsEditable()) {
                        // if (WMETB_FixThisNode) {
                        const onScreen = global.WMETB_onScreen(node);
                        if (onScreen !== null) {
                            global.WMETB_JNF_FixNode(node, true, false); // local
                            somethingdone = true;
                        }
                    }
                }
            });
            global.WMETB_Highlight_Obj.resumeRefreshes();
            if (somethingdone) {
                global.WMETB_Highlight_Obj.refreshAllLayers();
                global.WMETB_DispLog(countRevCon + ' reverse connection' + (countRevCon !== 1 ? 's' : '') + ', ' + countDeadEndLoop
                    + ' dead-end loop' + (countDeadEndLoop !== 1 ? 's' : '') + ', and ' + countUnterminated
                    + ' unterminated road' + (countUnterminated !== 1 ? 's' : '') + ' fixed');
            } else {
                global.WMETB_DispLog('No reverse connections, dead-end loops, or unterminated roads in this area');
            }
            if (maxfix) {
                global.WMETB_DispWarn('Please save before continuing to edit');
            }
            if (countRoundaboutLoop) {
                global.WMETB_DispWarn('Please fix ' + countRoundaboutLoop + ' roundabout loop' + (countRoundaboutLoop > 1 ? 's' : '') + ' manually!');
            }
        } else {
            global.WMETB_DispWarn("You're not allowed to use this feature.");
        }
    };

    // WMETB_magicFixUnconfirmed
    sec.WMETB_magicFixUnconfirmed = function WMETB_magicFixUnconfirmed() {
        if (sec.WMETB_RightsCheck('FixUncTurn')) {
            if (!global.WMETB_readyToRun(15)) return false;

            let count = 0;
            let maxfix = false;

            global.WMETB_Highlight_Obj.pauseRefreshes();

            W.model.segments.getObjectArray().forEach(segment => {
                if (global.WMETB_limitForSaveReach()) { // Update limit
                    maxfix = true;
                } else {
                    const attr = segment.attributes;
                    const onScreen = global.WMETB_onScreen(segment);
                    const toNode = segment.getToNode();
                    const fromNode = segment.getFromNode();

                    if (!segment.isLockedByHigherRank() && segment.isAllowed(segment.permissionFlags.EDIT_PROPERTIES)) {
                        if (onScreen && attr.fwdTurnsLocked !== undefined && attr.revTurnsLocked !== undefined
                            && (attr.fwdDirection || attr.revDirection)) {
                            if (!attr.fwdTurnsLocked && toNode.attributes.segIDs.length > 1 && !toNode.isVirtual() && global.WMETB_onScreen(toNode)) {
                                W.model.actionManager.add(new global.UpdateObject(segment, { fwdTurnsLocked: true }));
                                count++;
                            }
                            if (!attr.revTurnsLocked && fromNode.attributes.segIDs.length > 1 && !fromNode.isVirtual() && global.WMETB_onScreen(fromNode)) {
                                W.model.actionManager.add(new global.UpdateObject(segment, { revTurnsLocked: true }));
                                count++;
                            }
                        }
                    }
                }
            });

            global.WMETB_Highlight_Obj.resumeRefreshes();

            if (count) {
                global.WMETB_Highlight_Obj.refreshAllLayers();
                global.WMETB_DispLog(count + ' soft turn' + (count > 1 ? 's' : '') + ' fixed');
            } else {
                global.WMETB_DispLog('No fixable soft turns in this area');
            }
            if (maxfix) {
                global.WMETB_DispWarn('Please save before continuing to edit');
            }
            return true;
        }
        global.WMETB_DispWarn("You're not allowed to use this feature.");
        return false;
    };

    // WMETB_magicFixUturns
    sec.WMETB_magicFixUturns = function WMETB_magicFixUturns() {
        if (sec.WMETB_RightsCheck('FixUTurnRed')) {
            if (!global.WMETB_readyToRun(15)) return;

            let count = 0;
            let maxfix = false;

            const objects = W.selectionManager.getSelectedDataModelObjects();
            const selSegs = objects.filter(obj => obj.type === 'segment');
            const tg = W.model.getTurnGraph();
            global.WMETB_Highlight_Obj.pauseRefreshes();

            W.model.nodes.getObjectArray().forEach(node => {
                if (global.WMETB_limitForSaveReach()) { // Update limit
                    maxfix = true;
                } else if (global.WMETB_onScreen(node)) {
                    // find segments that connect to this node
                    node.attributes.segIDs.map(segID => W.model.segments.getObjectById(segID)).filter(segment => segment).forEach(segment => {
                        const attr = segment.attributes;
                        if (!(selSegs.length && !selSegs.includes(segment))) { // segments selected, but the current one is not one of them
                            // Fix U-turns
                            if (attr.fwdDirection === true && attr.revDirection === true) {
                                // two-way, check for connections back to the same segment
                                if (node.attributes.segIDs.length > 1) { // no check for dead-end u-turn
                                    if (segment.isTurnAllowed(segment, node)) {
                                        if (node.areConnectionsEditable()) {
                                            const turn = tg.getTurnThroughNode(node, segment, segment);
                                            W.model.actionManager.add(new global.SetTurn(tg, turn.withTurnData(turn.getTurnData().withToggledState(false))));
                                            count++;
                                        }
                                    }
                                }
                            }
                        }
                    });
                }
            });
            global.WMETB_Highlight_Obj.resumeRefreshes();
            if (count) {
                global.WMETB_DispLog(count + ' u-turn' + (count > 1 ? 's' : '') + ' fixed');
                global.WMETB_Highlight_Obj.refreshAllLayers();
            } else {
                global.WMETB_DispLog('No U-turns ' + (selSegs.length === 0 ? 'in this area' : 'on selected segment(s)'));
            }
            if (maxfix) {
                global.WMETB_DispWarn('Please save before continuing to edit');
            }
        } else {
            global.WMETB_DispWarn("You're not allowed to use this feature.");
        }
    };

    // WMETB_magicFixLoops
    sec.WMETB_magicFixLoops = function WMETB_magicFixLoops() {
        if (sec.WMETB_RightsCheck('FixLoops')) {
            if (!global.WMETB_readyToRun(15)) return;

            let somethingdone = false;
            let count = 0;
            let maxfix = false;

            global.WMETB_Highlight_Obj.pauseRefreshes();

            W.model.segments.getObjectArray().forEach(segment => {
                if (global.WMETB_limitForSaveReach()) { // Update limit
                    maxfix = true;
                } else {
                    const toNode = segment.getToNode();
                    const fromNode = segment.getFromNode();
                    if (toNode && fromNode && global.WMETB_onScreen(segment.getToNode()) && global.WMETB_onScreen(segment.getFromNode())) {
                        if (toNode === fromNode) {
                            global.WMETB_JNF_FixNode(fromNode, true, true);
                            somethingdone = true;
                            count++;
                        }

                        const attr = segment.attributes;
                        const onScreen = global.WMETB_onScreen(segment);

                        if (segment.arePropertiesEditable() && onScreen && (attr.junctionID === null) && (attr.toNodeID !== attr.fromNodeID)) {
                            const newseg = global.WMETB_CheckSameSegmentsWithSameNodes(segment);
                            if (newseg && newseg.arePropertiesEditable()) {
                                if (global.WMETB_returnPriority(newseg.attributes.roadType) < global.WMETB_returnPriority(segment.attributes.roadType)) {
                                    global.WMETB_SplitRoad(newseg);
                                } else if (global.WMETB_returnPriority(newseg.attributes.roadType) > global.WMETB_returnPriority(segment.attributes.roadType)) {
                                    global.WMETB_SplitRoad(segment);
                                } else if (newseg.attributes.length > segment.attributes.length) {
                                    global.WMETB_SplitRoad(newseg);
                                } else {
                                    global.WMETB_SplitRoad(segment);
                                }
                                somethingdone = true;
                                count++;
                            }
                        }
                    }
                }
            });
            global.WMETB_Highlight_Obj.resumeRefreshes();
            if (somethingdone) {
                global.WMETB_DispLog(count + ' loop' + (count > 1 ? 's' : '') + ' fixed');
                global.WMETB_Highlight_Obj.refreshAllLayers();
            } else {
                global.WMETB_DispLog('No loops to fix');
            }
            if (maxfix) {
                global.WMETB_DispWarn('Please save before continuing to edit');
            }
        } else {
            global.WMETB_DispWarn("You're not allowed to use this feature.");
        }
    };

    // WMETB_magicFixToll
    sec.WMETB_magicFixToll = function WMETB_magicFixToll() {
        if (sec.WMETB_RightsCheck('FixToll')) {
            if (!global.WMETB_readyToRun(15)) return;

            let somethingdone = false;
            let maxfix = false;

            const tollSegments = [];
            let count = 0;

            W.model.segments.getObjectArray(seg => global.WMETB_onScreen(seg)).forEach(segment => {
                if (global.WMETB_limitForSaveReach()) { // Update limit
                    maxfix = true;
                } else {
                    const attr = segment.attributes;
                    const onScreen = global.WMETB_onScreen(segment);
                    if (onScreen && (attr.roadType < 3 || attr.roadType > 4) && (attr.fwdToll === true || attr.revToll === true)) {
                        tollSegments.push(segment);
                        count++;
                        somethingdone = true;
                    }
                }
            });

            if (somethingdone) {
                W.selectionManager.setSelectedModels(tollSegments);
                global.WMETB_DispLog(count + ' non-freeway/ramp segment' + (count > 1 ? 's' : '') + ' with toll attribute selected');
            } else {
                global.WMETB_DispLog('No non-freeway/ramp segments with toll attribute in this area');
            }
            if (maxfix) {
                global.WMETB_DispWarn('Please save before continuing to edit');
            }
        } else {
            global.WMETB_DispWarn("You're not allowed to use this feature.");
        }
    };

    // WMETB_SuppressUnneededGeometry -- simplify segments on screen, removing unnecessary geonodes
    sec.WMETB_SuppressUnneededGeometry = function WMETB_SuppressUnneededGeometry() {
        if (sec.WMETB_RightsCheck('FixSuppGeoSel')) {
            if (!global.WMETB_readyToRun(13)) return;

            let maxfix = false;

            const dmax = 2.5; // distance off segment ends to preserve first geo point in any case
            let count = 0;

            // limit action to selected segments, if any are selected. Otherwise use all visible segments
            let objects = W.selectionManager.getSelectedDataModelObjects();
            if (!objects.length) {
                if (!sec.WMETB_RightsCheck('FixSuppGeoAll')) { // check rights to use function without selection of segments
                    return;
                }
                objects = W.model.segments.getObjectArray();
            }

            global.WMETB_Highlight_Obj.pauseRefreshes();
            objects.filter(obj => obj.type === 'segment'
                    && obj.getOLGeometry().components.length > 2
                    && obj.attributes.junctionID == null
                    && global.WMETB_onScreen(obj)
                    && obj.isGeometryEditable()
                    && !obj.attributes.hasClosures
                    && obj.state?.toUpperCase() !== 'DELETE'
                    && obj.attributes.updatedOn // skip unedited basemap segments
                    && !obj.isLockedByHigherRank()
                    && !obj.getVirtualNodes().length) // skip segs with virtual (walking trail) nodes
                .forEach(obj => {
                    if (global.WMETB_limitForSaveReach()) { // Update limit
                        maxfix = true;
                        return;
                    }

                    global.WMETB_Debug('evaluating segment ' + obj.getID());
                    const olGeo = obj.getOLGeometry();
                    const comps = olGeo.components;
                    const ax = Math.abs(comps[0].x - comps[1].x);
                    const ay = Math.abs(comps[0].y - comps[1].y);
                    const da = Math.sqrt(ax * ax + ay * ay);
                    const bx = Math.abs(comps[comps.length - 2].x - comps[comps.length - 1].x);
                    const by = Math.abs(comps[comps.length - 2].y - comps[comps.length - 1].y);
                    const db = Math.sqrt(bx * bx + by * by);
                    let a1 = null;
                    let b1 = null;
                    if (da < dmax) {
                        a1 = comps[1].clone();
                    }
                    if (db < dmax) {
                        b1 = comps[comps.length - 2].clone();
                    }
                    if (a1 != null && b1 != null && a1.x === b1.x && a1.y === b1.y) {
                        b1 = null;
                    }
                    const geo = olGeo.simplify(0.8);
                    const geoComps = geo.components;
                    if (comps.length !== geoComps.length) {
                        if (
                            (da < dmax * 2 || db < dmax * 2)
                            && (geoComps[1].x !== comps[1].x
                                || geoComps[1].y !== comps[1].y
                                || geoComps[geoComps.length - 2].x !== comps[comps.length - 2].x
                                || geoComps[geoComps.length - 2].y !== comps[comps.length - 2].y)
                        ) {
                            global.WMETB_Debug('distance max: ' + dmax);
                            global.WMETB_Debug('distance (a): ' + da);
                            global.WMETB_Debug('distance (b): ' + db);
                        }
                        if (a1 != null) {
                            if (a1.x !== geoComps[1].x || a1.y !== geoComps[1].y) {
                                global.WMETB_Debug('re-add a1');
                                geo.addPoint(a1, 1);
                            }
                        }
                        if (b1 != null) {
                            if (b1.x !== geoComps[geoComps.length - 2].x || b1.y !== geoComps[geoComps.length - 2].y) {
                                global.WMETB_Debug('re-add b1');
                                geo.addPoint(b1, geoComps.length - 1);
                            }
                        }
                    }
                    const reduced = comps.length - geoComps.length;
                    if (reduced) {
                        const pct = (reduced * 100.0) / comps.length;
                        global.WMETB_Debug('Simplify(0.8) reduced seg(' + obj.getID() + ') by ' + reduced + ' of ' + comps.length + ' (' + pct.toFixed(2) + '%)');
                        W.model.actionManager.add(new global.UpdateSegmentGeometry(obj, obj.getGeometry(), W.userscripts.toGeoJSONGeometry(geo)));
                        count++;
                    }
                });
            global.WMETB_Highlight_Obj.resumeRefreshes();
            if (count > 0) {
                global.WMETB_Highlight_Obj.refreshAllLayers();
                global.WMETB_DispLog(count + ' segment' + (count > 1 ? 's' : '') + ' simplified');
            } else {
                let logtext = 'No segments to simplify';
                if (W.selectionManager.getSelectedDataModelObjects().length) {
                    logtext += ' (within selection)';
                }
                global.WMETB_DispLog(logtext);
            }

            if (maxfix) {
                global.WMETB_DispWarn('Please save before continuing to edit');
            }
        } else {
            global.WMETB_DispWarn("You're not allowed to use this feature.");
        }
    };

    // WMETB_magicFixMPs -- auto-close all on-screen MPs of one type
    sec.WMETB_magicFixMPs = function WMETB_magicFixMPs(themap, action) {
        if (sec.WMETB_RightsCheck('FixMP')) {
            if (!global.WMETB_readyToRun(13)) return;

            let count = 0;
            themap.forEach(p => {
                count++;
                W.model.actionManager.add(new global.UpdateObject(p, {
                    open: false,
                    resolution: action
                }));
            });
            global.WMETB_DispLog(count + ' MP' + (count > 1 ? 's' : '') + " closed with status '" + (action === 0 ? 'closed' : 'not identified') + "'");
        } else global.WMETB_DispWarn("You're not allowed to use this feature.");
    };

    // WMETB_deleteTIOs -- delete all TIOs on node and/or screen
    sec.WMETB_deleteTIOs = function WMETB_deleteTIOs() {
        if (sec.WMETB_RightsCheck('DelTIOs')) {
            if (!global.WMETB_readyToRun(15)) return;

            let count = 0;

            const objects = W.selectionManager.getSelectedDataModelObjects();
            const selNode = objects[0];

            // 2023-07-19 (mapomatic) After talking with jm6087, decided that it's not safe to allow deleting
            // all TIOs on screen, so that is disabled via this check.
            if (!selNode || selNode.type !== 'node') {
                global.WMETB_DispWarn('You must select a node first');
                return;
            }

            W.model.nodes.getObjectArray().forEach(node => {
                if (!node) return;
                if (selNode && selNode.attributes.id !== node.attributes.id) return;
                if (count < 100 && global.WMETB_onScreen(node)) {
                    // ignore dead-end nodes
                    if (node.attributes.segIDs.length <= 1) return;

                    const segments = node.attributes.segIDs
                        .map(segID => W.model.segments.getObjectById(segID))
                        .filter(segment => segment !== null && typeof segment !== 'undefined');
                    const turnGraph = W.model.getTurnGraph();

                    segments.forEach(segment1 => {
                        segments.forEach(segment2 => {
                            const turn = W.model.getTurnGraph().getTurnThroughNode(node, segment1, segment2);
                            if (turn.getTurnData().hasInstructionOpcode()) {
                                W.model.actionManager.add(new global.SetTurn(turnGraph, turn.withTurnData(turn.getTurnData().withInstructionOpcode(null))));
                                count++;
                            }
                        });
                    });
                }
            });
            if (count) {
                global.WMETB_Highlight_Obj.refreshAllLayers();
                global.WMETB_DispLog('Removed all TIOs from node');
            }
        } else {
            global.WMETB_DispWarn("You're not allowed to use this feature");
        }
    };

    // WMETB_NudgeHNs
    sec.WMETB_NudgeHNs = function WMETB_NudgeHNs() {
        if (sec.WMETB_RightsCheck('NudgeHNs')) {
            if (!global.WMETB_readyToRun(15)) return;
            // Check for HN editing mode
            if (!W.editingMediator.attributes.editingHouseNumbers) {
                global.WMETB_DispWarn('You must be in HN editing mode to use this feature');
                return;
            }

            let numMoved = 0;
            const extent = global.WMETB_getOLMapExtent();
            const activeStreetGeo = new OpenLayers.Geometry.MultiLineString();
            const activeSegments = W.selectionManager.getSelectedDataModelObjects().filter(seg => extent.intersectsBounds(seg.getOLGeometry().getBounds()));
            const activeSegmentIDs = activeSegments.map(seg => seg.attributes.id);

            activeSegments.forEach(seg => activeStreetGeo.addComponents(seg.getOLGeometry()));

            const hnsToNudge = W.model.segmentHouseNumbers
                .getObjectArray(hn => activeSegmentIDs.includes(hn.attributes.segID) && extent.intersectsBounds(hn.getOLGeometry().getBounds()));

            console.log(hnsToNudge.length + ' HN markers to nudge');

            const actions = [];
            hnsToNudge.forEach(hn => {
                const newGeometry = hn.getOLGeometry().clone();
                newGeometry.x += 0.000000001;
                const distanceInfo = newGeometry.distanceTo(activeStreetGeo, { details: true });
                const stopPoint = new OpenLayers.Geometry.Point(distanceInfo.x1, distanceInfo.y1);
                const closestSegmentId = activeSegments.find(seg => seg.getOLGeometry().distanceTo(stopPoint) <= 0.001)?.attributes.id;
                if (closestSegmentId) {
                    numMoved++;
                    actions.push(new global.MoveHouseNumber(
                        hn,
                        W.userscripts.toGeoJSONGeometry(newGeometry),
                        W.userscripts.toGeoJSONGeometry(stopPoint),
                        closestSegmentId
                    ));
                }
            });

            if (numMoved) {
                W.model.actionManager.add(new global.MultiAction(actions, { description: \`Nudged \${numMoved} house numbers (WME Toolbox)\` }));
                global.WMETB_DispLog('Nudged ' + numMoved + ' HNs');
            } else {
                global.WMETB_DispLog('No HNs nudged');
            }
        } else global.WMETB_DispWarn("You're not allowed to use this feature.");
    };

    // WMETB_MagicFix -- turn all segments on screen to two-way and enable all turns
    sec.WMETB_MagicFix = function WMETB_MagicFix() {
        if (sec.WMETB_RightsCheck('MagicFix')) {
            if (!global.WMETB_readyToRun(15)) return;

            const opt = global.WMETB_ToSave.ToolOptions.MagicFix;
            let segsUpdated = 0;
            let nodesUpdated = 0;
            let proceed = true;

            global.WMETB_Debug('Beginging MagicFix!');
            global.WMETB_Highlight_Obj.pauseRefreshes();

            W.model.nodes.getObjectArray().forEach(node => {
                // Update limit
                if (global.WMETB_limitForSaveReach() && proceed) {
                    global.WMETB_DispWarn('Please save before continuing to edit');
                    proceed = false;
                    return;
                }

                if (proceed) {
                    const nodeAtt = node.getAttributes();

                    for (let i = 0; i < nodeAtt.segIDs.length; ++i) {
                        let badDir = false;
                        let validRoad = false;
                        const segId = nodeAtt.segIDs[i];
                        const seg = W.model.segments.getObjectById(segId);
                        const sa = seg.getAttributes();

                        if (seg && global.WMETB_onScreen(seg) && seg.state?.toUpperCase() !== 'DELETE') {
                            if (sa.roadType === 1 && opt.fixLS) validRoad = true; // LS
                            if (sa.roadType === 2 && opt.fixPS) validRoad = true; // PS
                            if (sa.roadType === 6 && opt.fixMaj) validRoad = true; // MH
                            if (sa.roadType === 7 && opt.fixMin) validRoad = true; // mH
                            if (sa.roadType === 17 && opt.fixPVT) validRoad = true; // PVT
                            if (sa.roadType === 20 && opt.fixPLR) validRoad = true; // PLR
                            if (sa.roadType === 8 && opt.fixOff) validRoad = true; // Off-Road
                            if (!sa.fwdDirection || !sa.revDirection) badDir = true;

                            if (badDir && validRoad) {
                                const updates = {};
                                global.WMETB_Debug('Updating seg: ' + sa.id);

                                updates.fwdDirection = true;
                                updates.revDirection = true;
                                W.model.actionManager.add(new global.UpdateObject(seg, updates));
                                segsUpdated++;
                            }
                        }
                    }
                    if (nodeAtt.segIDs.length > 1 && node.areConnectionsEditable() && !node.areAllConnectionsEnabled()
                    && node.state?.toUpperCase() !== 'DELETE' && global.WMETB_onScreen(node)) {
                        W.model.actionManager.add(new global.ModifyAllConnections(node, !0));
                        nodesUpdated++;
                    }
                }
            });
            global.WMETB_Highlight_Obj.resumeRefreshes();
            if ((nodesUpdated || segsUpdated) > 0) {
                global.WMETB_DispLog('Updated direction on ' + segsUpdated + ' segments and turns on ' + nodesUpdated + ' nodes');
                global.WMETB_Highlight_Obj.refreshAllLayers();
            } else global.WMETB_DispLog('No segments or nodes require updating');
        } else {
            global.WMETB_DispWarn("You're not allowed to use this feature.");
        }
    };
}

function sc5(sec) {
    // DON'T USE STRING TEMPLATES! MINIMIZER WILL REMOVE SPACES.
    /* eslint-disable prefer-template */
    /* eslint-disable no-bitwise */
    /* eslint-disable strict */
    /* eslint-disable camelcase */

    /* global sec */
    /* global W */

    /* ** sc[5] ****************************************************************************************************************** */
    // ///////////////////////////////////
    // // Country Framework Functions ////
    // ///////////////////////////////////

    /*
    Table of toolCodes
    Tool                                                   Tool code
    L6 locks                                               HiLiL6
    L5 locks                                               HiLiL5
    L4 locks                                               HiLiL4
    L3 locks                                               HiLiL3
    L2 locks                                               HiLiL2
    Manual locks lesser greater equal                      HiLiMaLo
    Elevation < > ground                                   HiLiElGr
    Display elevation values with < or > ground            HiLiElVa
    House numbers                                          HiLiHouNo
    Streets with name but no house number                  HiLiwoHouNo
    Tunnel                                                 HiLiTunnel
    Speed limits                                           HiLiMaxSpeed
    Segments/nodes with time restrictions                  HiLiRest
    Loops (same connection segments)                       HiLiLoop
    Roundabouts which may cause issues                     HiLiRB
    Simplifiable segments                                  HiLiSi
    U-Turns                                                HiLiUTurn
    Reverse Connections                                    HiLiRevC
    Dead-end loops                                         HiLiDELp
    Soft-Turns                                             HiLiSoftT
    Lanes                                                  HiLiLanes
    Hide user greetings                                    Greet
    Force full screen                                      FullScreen
    Activate popups                                        PopUps
    Force arrows to be selectable after loading            ArrLoad
    Segment list                                           SegLi
    Place list                                             PlaLi
    Measurement tool                                       MeasT
    Properties editor                                      PropEd
    Copy segment attributes                                CSA
    Copy venue attributes                                  CVA
    Cut segment                                            CutSeg
    Create junctions                                       CreateJunc
    Reset elevation to ground                              EleGround
    Select all roundabout segments                         SelRB
    Redo roundabout                                        RedoRB
    Convert roundabout to standard road                    RBStan
    Draw roundabout area place                             RBArea
    Select in area place or map comment                    SelArea
    Suppress unneeded junctions                            FixSuppJunc
    Suppress unneeded geometry on selected segments        FixSuppGeoSel
    Suppress unneeded geometry on entire screen            FixSuppGeoAll
    Delete expired restrictions                            FixExpRest
    Auto add node to loops                                 FixLoops
    Auto fix soft turns                                    FixUncTurn
    Select non freeway/ramp segments with toll attribute   FixToll
    Auto fix u-turns (make red)                            FixUTurnRed
    Auto fix others (revcons, dead-end & undeterm. roads)  FixOther
    Auto close MPs                                         FixMP
    Nudge HNs                                              NudgeHNs
    */

    // All permission strings are generated in GoogleDoc
    // https://docs.google.com/spreadsheets/d/1VK2STi0gRW7_FPPRIA8SFTtbk_29OWs39zqTBQJYR9M/edit#gid=0

    /* eslint-disable key-spacing */
    /* eslint-disable max-len */
    /* eslint-disable comma-spacing */
    /* eslint-disable object-curly-spacing */
    /* eslint-disable object-curly-newline */
    const WMETB_RightsPerCountry = {

        // 000Defaults
        0:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:5472,HiLiUTurn:4222,HiLiRevC:4192,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5472,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:5488,PlaLi:5488,MeasT:4222,PropEd:4222,CSA:4222,ClearGeom:4222,CutSeg:4222,CreateJunc:4222,EleGround:4222,SelRB:4222,RedoRB:5488,RBStan:4222,RBArea:4222,SelArea:4222,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:5472,FixSuppGeoSel:5472,FixSuppGeoAll:5216,FixExpRest:5472,FixLoops:5472,FixUncTurn:5216,FixToll:5216,FixUTurnRed:5216,FixOther:5216,FixMP:6144,NudgeHNs:5120,MagicFix:6144,NAAuto1:4096,NAAuto2:4096},

        // 004US Territories
        4:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:5488,HiLiUTurn:4222,HiLiRevC:4208,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5472,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:5488,PlaLi:5488,MeasT:4222,PropEd:4222,CSA:4222,ClearGeom:4990,CutSeg:4990,CreateJunc:4222,EleGround:4222,SelRB:4478,RedoRB:5488,RBStan:4222,RBArea:4222,SelArea:4222,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:5472,FixSuppGeoSel:5472,FixSuppGeoAll:5216,FixExpRest:5472,FixLoops:5472,FixUncTurn:5216,FixToll:5216,FixUTurnRed:4096,FixOther:5488,FixMP:6144,NudgeHNs:5120,MagicFix:6144,NAAuto1:4096,NAAuto2:4096},

        // 006Angola
        6:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:5472,HiLiUTurn:4222,HiLiRevC:4192,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5472,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:5488,PlaLi:5488,MeasT:4222,PropEd:4222,CSA:4222,ClearGeom:4222,CutSeg:4222,CreateJunc:4222,EleGround:4222,SelRB:4222,RedoRB:5488,RBStan:4222,RBArea:4222,SelArea:4222,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:5488,FixSuppGeoSel:5488,FixSuppGeoAll:5232,FixExpRest:5488,FixLoops:5472,FixUncTurn:5216,FixToll:5216,FixUTurnRed:4096,FixOther:5216,FixMP:6144,NudgeHNs:5120,MagicFix:6144,NAAuto1:4096,NAAuto2:4096},

        // 013Australia
        13:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:5232,HiLiUTurn:4222,HiLiRevC:5216,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5240,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:5244,PlaLi:5244,MeasT:4222,PropEd:4220,CSA:4220,ClearGeom:4220,CutSeg:4222,CreateJunc:4096,EleGround:4220,SelRB:4222,RedoRB:5496,RBStan:4216,RBArea:4216,SelArea:4220,DelTIOs:5696,TIOShort:5696,NATool1:4096,NATool2:4096,FixSuppJunc:5496,FixSuppGeoSel:5232,FixSuppGeoAll:5184,FixExpRest:5500,FixLoops:5500,FixUncTurn:5240,FixToll:5216,FixUTurnRed:5216,FixOther:5216,FixMP:7264,NudgeHNs:7232,MagicFix:7232,NAAuto1:4096,NAAuto2:4096},

        // 014Austria
        14:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4222,HiLiSi:5472,HiLiUTurn:4222,HiLiRevC:4222,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5472,RepTool:7264,NAFeat1:4096,NAFeat2:4096,SegLi:5488,PlaLi:5488,MeasT:4222,PropEd:4222,CSA:4222,ClearGeom:4222,CutSeg:4222,CreateJunc:4222,EleGround:4222,SelRB:4222,RedoRB:5488,RBStan:4222,RBArea:4222,SelArea:4222,DelTIOs:5696,TIOShort:5696,NATool1:4096,NATool2:4096,FixSuppJunc:5440,FixSuppGeoSel:4096,FixSuppGeoAll:4096,FixExpRest:5472,FixLoops:5502,FixUncTurn:5246,FixToll:5216,FixUTurnRed:4096,FixOther:5246,FixMP:6208,NudgeHNs:5184,MagicFix:6144,NAAuto1:4096,NAAuto2:4096},

        // 016Bahamas
        16:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:7264,HiLiUTurn:4222,HiLiRevC:4222,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5472,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:5488,PlaLi:5488,MeasT:4222,PropEd:4222,CSA:4222,ClearGeom:4222,CutSeg:4222,CreateJunc:4222,EleGround:4222,SelRB:4222,RedoRB:5488,RBStan:4222,RBArea:4222,SelArea:4222,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:7520,FixSuppGeoSel:6144,FixSuppGeoAll:6144,FixExpRest:5472,FixLoops:5472,FixUncTurn:5216,FixToll:5216,FixUTurnRed:4096,FixOther:5216,FixMP:6144,NudgeHNs:5632,MagicFix:6144,NAAuto1:4096,NAAuto2:4096},

        // 017Bahrain
        17:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:5216,HiLiUTurn:4222,HiLiRevC:4192,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5216,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:4208,PlaLi:4208,MeasT:4222,PropEd:4208,CSA:4208,ClearGeom:4208,CutSeg:4222,CreateJunc:4222,EleGround:4222,SelRB:4222,RedoRB:5488,RBStan:4216,RBArea:4222,SelArea:4222,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:5472,FixSuppGeoSel:5216,FixSuppGeoAll:5216,FixExpRest:5216,FixLoops:5472,FixUncTurn:5216,FixToll:5216,FixUTurnRed:4192,FixOther:5216,FixMP:6144,NudgeHNs:5120,MagicFix:6144,NAAuto1:4096,NAAuto2:4096},

        // 019Bangladesh
        19:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:5216,HiLiUTurn:6144,HiLiRevC:4192,HiLiDELp:4220,HiLiSoftT:4208,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4220,ArrLoad:5472,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:5232,PlaLi:5488,MeasT:4222,PropEd:4336,CSA:5360,ClearGeom:4344,CutSeg:4222,CreateJunc:4220,EleGround:4220,SelRB:4222,RedoRB:5232,RBStan:4222,RBArea:4222,SelArea:4222,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:5232,FixSuppGeoSel:5500,FixSuppGeoAll:5216,FixExpRest:5496,FixLoops:5496,FixUncTurn:5216,FixToll:5216,FixUTurnRed:7168,FixOther:5216,FixMP:6144,NudgeHNs:5120,MagicFix:6144,NAAuto1:4096,NAAuto2:4096},

        // 021Belgium
        21:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:5472,HiLiUTurn:4222,HiLiRevC:4216,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5472,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:5488,PlaLi:5488,MeasT:4222,PropEd:4222,CSA:4222,ClearGeom:4222,CutSeg:4222,CreateJunc:4222,EleGround:4222,SelRB:4222,RedoRB:5488,RBStan:4222,RBArea:4222,SelArea:4222,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:5472,FixSuppGeoSel:5472,FixSuppGeoAll:5216,FixExpRest:5472,FixLoops:5472,FixUncTurn:5216,FixToll:5216,FixUTurnRed:4096,FixOther:4216,FixMP:6144,NudgeHNs:5120,MagicFix:6144,NAAuto1:4096,NAAuto2:4096},

        // 030Brasil
        30:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:5472,HiLiUTurn:4222,HiLiRevC:4192,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5472,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:5616,PlaLi:5616,MeasT:4222,PropEd:4222,CSA:4222,ClearGeom:4222,CutSeg:4222,CreateJunc:4222,EleGround:4222,SelRB:4222,RedoRB:5488,RBStan:4222,RBArea:4222,SelArea:4222,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:5472,FixSuppGeoSel:5472,FixSuppGeoAll:5216,FixExpRest:4160,FixLoops:5472,FixUncTurn:5216,FixToll:5216,FixUTurnRed:4160,FixOther:5216,FixMP:6144,NudgeHNs:5120,MagicFix:6144,NAAuto1:4096,NAAuto2:4096},

        // 037Belarus
        37:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:5496,HiLiUTurn:4222,HiLiRevC:4192,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5496,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:5500,PlaLi:5500,MeasT:4222,PropEd:4222,CSA:4222,ClearGeom:4222,CutSeg:4222,CreateJunc:4222,EleGround:4222,SelRB:4222,RedoRB:5488,RBStan:4222,RBArea:4222,SelArea:4222,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:5496,FixSuppGeoSel:5496,FixSuppGeoAll:5240,FixExpRest:5496,FixLoops:5496,FixUncTurn:5240,FixToll:5240,FixUTurnRed:4216,FixOther:5240,FixMP:6144,NudgeHNs:5120,MagicFix:6144,NAAuto1:4096,NAAuto2:4096},

        // 040Canada
        40:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:5496,HiLiUTurn:4222,HiLiRevC:7280,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5488,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:5488,PlaLi:5488,MeasT:4222,PropEd:4222,CSA:4222,ClearGeom:4222,CutSeg:4222,CreateJunc:4222,EleGround:4222,SelRB:4222,RedoRB:5488,RBStan:4222,RBArea:4222,SelArea:4222,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:5488,FixSuppGeoSel:5496,FixSuppGeoAll:5216,FixExpRest:5488,FixLoops:5488,FixUncTurn:5216,FixToll:5216,FixUTurnRed:5216,FixOther:5216,FixMP:7280,NudgeHNs:5120,MagicFix:6144,NAAuto1:4096,NAAuto2:4096},

        // 045Chile
        45:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4192,HiLiSi:5472,HiLiUTurn:4222,HiLiRevC:4192,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5472,RepTool:6208,NAFeat1:4096,NAFeat2:4096,SegLi:5496,PlaLi:5496,MeasT:4222,PropEd:4222,CSA:4222,ClearGeom:4220,CutSeg:4220,CreateJunc:4222,EleGround:4216,SelRB:4220,RedoRB:5488,RBStan:4220,RBArea:4220,SelArea:4220,DelTIOs:5632,TIOShort:5632,NATool1:4160,NATool2:4160,FixSuppJunc:5472,FixSuppGeoSel:5472,FixSuppGeoAll:5216,FixExpRest:5488,FixLoops:5472,FixUncTurn:5232,FixToll:5216,FixUTurnRed:4160,FixOther:5216,FixMP:6144,NudgeHNs:5120,MagicFix:6144,NAAuto1:4096,NAAuto2:4096},

        // 049Colombia
        49:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:5488,HiLiUTurn:4222,HiLiRevC:4192,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5472,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:5496,PlaLi:5500,MeasT:4222,PropEd:4222,CSA:4222,ClearGeom:4222,CutSeg:4222,CreateJunc:4222,EleGround:4222,SelRB:4222,RedoRB:5488,RBStan:4222,RBArea:4222,SelArea:4222,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:5488,FixSuppGeoSel:5472,FixSuppGeoAll:5216,FixExpRest:5472,FixLoops:5472,FixUncTurn:5216,FixToll:5216,FixUTurnRed:4096,FixOther:5216,FixMP:6144,NudgeHNs:5120,MagicFix:6144,NAAuto1:4096,NAAuto2:4096},

        // 053Costa Rica
        53:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:5472,HiLiUTurn:4192,HiLiRevC:4192,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5472,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:5488,PlaLi:5488,MeasT:4222,PropEd:4222,CSA:4222,ClearGeom:4096,CutSeg:4208,CreateJunc:4222,EleGround:4192,SelRB:4222,RedoRB:5488,RBStan:4192,RBArea:4222,SelArea:4222,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:5376,FixSuppGeoSel:5376,FixSuppGeoAll:5120,FixExpRest:5472,FixLoops:5472,FixUncTurn:5216,FixToll:5216,FixUTurnRed:4096,FixOther:5216,FixMP:6144,NudgeHNs:5120,MagicFix:6144,NAAuto1:4096,NAAuto2:4096},

        // 057Czech Republic
        57:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:5488,HiLiUTurn:4222,HiLiRevC:4192,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5488,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:5232,PlaLi:5496,MeasT:4222,PropEd:4222,CSA:4222,ClearGeom:4222,CutSeg:4222,CreateJunc:4222,EleGround:4222,SelRB:4222,RedoRB:5232,RBStan:4222,RBArea:4222,SelArea:4222,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:5488,FixSuppGeoSel:5488,FixSuppGeoAll:5232,FixExpRest:5488,FixLoops:5496,FixUncTurn:5232,FixToll:5232,FixUTurnRed:5232,FixOther:5232,FixMP:6144,NudgeHNs:5120,MagicFix:6144,NAAuto1:4096,NAAuto2:4096},

        // 058Denmark
        58:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:5488,HiLiUTurn:4222,HiLiRevC:4192,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5488,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:5488,PlaLi:5488,MeasT:4222,PropEd:4222,CSA:4222,ClearGeom:4222,CutSeg:4222,CreateJunc:4222,EleGround:4222,SelRB:4222,RedoRB:5488,RBStan:4222,RBArea:4222,SelArea:4222,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:5488,FixSuppGeoSel:5488,FixSuppGeoAll:5216,FixExpRest:5488,FixLoops:5488,FixUncTurn:5232,FixToll:5232,FixUTurnRed:4160,FixOther:5232,FixMP:6144,NudgeHNs:5120,MagicFix:6144,NAAuto1:4096,NAAuto2:4096},

        // 061Dominican Republic
        61:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:4192,HiLiUTurn:4222,HiLiRevC:5216,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5216,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:5232,PlaLi:5232,MeasT:4222,PropEd:4222,CSA:4222,ClearGeom:4222,CutSeg:4222,CreateJunc:4222,EleGround:4222,SelRB:4222,RedoRB:5232,RBStan:4222,RBArea:4222,SelArea:4222,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:5216,FixSuppGeoSel:5216,FixSuppGeoAll:5216,FixExpRest:5216,FixLoops:5216,FixUncTurn:5216,FixToll:5216,FixUTurnRed:5120,FixOther:5216,FixMP:7168,NudgeHNs:5120,MagicFix:6144,NAAuto1:4096,NAAuto2:4096},

        // 067Estonia
        67:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4222,HiLiSi:4216,HiLiUTurn:4222,HiLiRevC:4216,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5472,RepTool:4096,NAFeat1:4096,NAFeat2:4096,SegLi:5240,PlaLi:5240,MeasT:4222,PropEd:4222,CSA:4222,ClearGeom:4222,CutSeg:4222,CreateJunc:4222,EleGround:4222,SelRB:4222,RedoRB:5488,RBStan:4222,RBArea:4222,SelArea:4222,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:5496,FixSuppGeoSel:5496,FixSuppGeoAll:5472,FixExpRest:5472,FixLoops:5496,FixUncTurn:5232,FixToll:5216,FixUTurnRed:5216,FixOther:5216,FixMP:6144,NudgeHNs:5120,MagicFix:4160,NAAuto1:4096,NAAuto2:4096},

        // 073France
        73:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:5472,HiLiUTurn:4222,HiLiRevC:4192,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5472,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:4222,PlaLi:4222,MeasT:4222,PropEd:4222,CSA:4222,ClearGeom:4222,CutSeg:4222,CreateJunc:4222,EleGround:4222,SelRB:4222,RedoRB:4222,RBStan:4222,RBArea:4222,SelArea:4222,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:5472,FixSuppGeoSel:5472,FixSuppGeoAll:5216,FixExpRest:5472,FixLoops:5472,FixUncTurn:5216,FixToll:5216,FixUTurnRed:4192,FixOther:5216,FixMP:6144,NudgeHNs:5120,MagicFix:6144,NAAuto1:4096,NAAuto2:4096},

        // 081Germany
        81:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:5472,HiLiUTurn:4222,HiLiRevC:4216,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5244,RepTool:7168,NAFeat1:4096,NAFeat2:4096,SegLi:5488,PlaLi:5488,MeasT:4222,PropEd:4222,CSA:4220,ClearGeom:4220,CutSeg:4222,CreateJunc:4222,EleGround:4222,SelRB:4222,RedoRB:5488,RBStan:4220,RBArea:4222,SelArea:4216,DelTIOs:5744,TIOShort:5120,NATool1:4096,NATool2:4096,FixSuppJunc:5472,FixSuppGeoSel:5472,FixSuppGeoAll:5216,FixExpRest:5488,FixLoops:5488,FixUncTurn:5232,FixToll:5216,FixUTurnRed:5216,FixOther:5216,FixMP:7168,NudgeHNs:5120,MagicFix:7168,NAAuto1:4096,NAAuto2:4096},

        // 100Iceland
        100:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:5120,HiLiSi:7264,HiLiUTurn:4222,HiLiRevC:5216,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5472,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:5488,PlaLi:5488,MeasT:4222,PropEd:4222,CSA:4222,ClearGeom:4222,CutSeg:4222,CreateJunc:4222,EleGround:4222,SelRB:4222,RedoRB:5488,RBStan:4222,RBArea:4222,SelArea:4222,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:7520,FixSuppGeoSel:7168,FixSuppGeoAll:7168,FixExpRest:5472,FixLoops:5472,FixUncTurn:5216,FixToll:5216,FixUTurnRed:4096,FixOther:5216,FixMP:7168,NudgeHNs:5632,MagicFix:7168,NAAuto1:4096,NAAuto2:4096},

        // 101India
        101:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4216,HiLiLoop:4222,HiLiRB:4216,HiLiSi:5216,HiLiUTurn:7264,HiLiRevC:5216,HiLiDELp:5244,HiLiSoftT:5232,HiLiTTSOver:5244,HiLiLanes:5244,NAHigh1:4096,NAHigh2:4096,Greet:5246,FullScreen:5246,PopUps:5244,ArrLoad:5472,RepTool:7264,NAFeat1:4096,NAFeat2:4096,SegLi:5500,PlaLi:5500,MeasT:5246,PropEd:5360,CSA:5368,ClearGeom:5496,CutSeg:5246,CreateJunc:5244,EleGround:5244,SelRB:5244,RedoRB:5240,RBStan:5240,RBArea:5244,SelArea:5244,DelTIOs:5744,TIOShort:5744,NATool1:4096,NATool2:4096,FixSuppJunc:5232,FixSuppGeoSel:5616,FixSuppGeoAll:5216,FixExpRest:5488,FixLoops:5488,FixUncTurn:5216,FixToll:5216,FixUTurnRed:7264,FixOther:5216,FixMP:7264,NudgeHNs:5232,MagicFix:7264,NAAuto1:4096,NAAuto2:4096},

        // 102Indonesia
        102:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:4222,HiLiUTurn:4222,HiLiRevC:4192,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:4222,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:4222,PlaLi:4222,MeasT:4222,PropEd:4222,CSA:4222,ClearGeom:4208,CutSeg:4222,CreateJunc:4222,EleGround:4222,SelRB:4222,RedoRB:7520,RBStan:4208,RBArea:4216,SelArea:4222,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:6208,FixSuppGeoSel:6208,FixSuppGeoAll:6208,FixExpRest:7264,FixLoops:7264,FixUncTurn:7264,FixToll:7264,FixUTurnRed:7264,FixOther:7264,FixMP:6144,NudgeHNs:5120,MagicFix:6144,NAAuto1:6144,NAAuto2:4096},

        // 103Iran
        103:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:5472,HiLiUTurn:4222,HiLiRevC:4192,HiLiDELp:4220,HiLiSoftT:4220,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5472,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:5488,PlaLi:5488,MeasT:4222,PropEd:4222,CSA:4222,ClearGeom:4220,CutSeg:4222,CreateJunc:4220,EleGround:4222,SelRB:4222,RedoRB:5488,RBStan:4220,RBArea:4222,SelArea:4222,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:5376,FixSuppGeoSel:5376,FixSuppGeoAll:5120,FixExpRest:5472,FixLoops:5376,FixUncTurn:5120,FixToll:5120,FixUTurnRed:5120,FixOther:5184,FixMP:6144,NudgeHNs:5120,MagicFix:6144,NAAuto1:6144,NAAuto2:4096},

        // 105Ireland
        105:{HiLiL6:5246,HiLiL5:5246,HiLiL4:5246,HiLiL3:5246,HiLiL2:5246,HiLiMaLo:5246,HiLiElGr:5246,HiLiElVa:5246,HiLiHouNo:5246,HiLiwoHouNo:5246,HiLiTunnel:5246,HiLiMaxSpeed:5246,HiLiRest:5246,HiLiLoop:5246,HiLiRB:5120,HiLiSi:5472,HiLiUTurn:5246,HiLiRevC:5216,HiLiDELp:5246,HiLiSoftT:5246,HiLiTTSOver:5246,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:5246,FullScreen:5246,PopUps:5246,ArrLoad:5472,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:5496,PlaLi:5496,MeasT:5246,PropEd:5246,CSA:5246,ClearGeom:5246,CutSeg:5246,CreateJunc:5246,EleGround:5246,SelRB:5246,RedoRB:5472,RBStan:5246,RBArea:5246,SelArea:5246,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:5472,FixSuppGeoSel:5472,FixSuppGeoAll:5216,FixExpRest:5472,FixLoops:5472,FixUncTurn:5216,FixToll:5216,FixUTurnRed:5216,FixOther:5216,FixMP:5120,NudgeHNs:5120,MagicFix:6144,NAAuto1:4096,NAAuto2:4096},

        // 106Israel
        106:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:5472,HiLiUTurn:4222,HiLiRevC:4160,HiLiDELp:4160,HiLiSoftT:4216,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:4096,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:5488,PlaLi:5488,MeasT:4222,PropEd:4222,CSA:4222,ClearGeom:4208,CutSeg:4216,CreateJunc:4222,EleGround:4222,SelRB:4222,RedoRB:5488,RBStan:4216,RBArea:4216,SelArea:4216,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:5472,FixSuppGeoSel:5472,FixSuppGeoAll:5216,FixExpRest:5472,FixLoops:5472,FixUncTurn:5216,FixToll:5216,FixUTurnRed:4160,FixOther:5216,FixMP:6144,NudgeHNs:5120,MagicFix:6144,NAAuto1:4096,NAAuto2:4096},

        // 107Italy
        107:{HiLiL6:6270,HiLiL5:6270,HiLiL4:6270,HiLiL3:6270,HiLiL2:6270,HiLiMaLo:6270,HiLiElGr:6270,HiLiElVa:6270,HiLiHouNo:6270,HiLiwoHouNo:6270,HiLiTunnel:6270,HiLiMaxSpeed:6270,HiLiRest:6270,HiLiLoop:6270,HiLiRB:6144,HiLiSi:7264,HiLiUTurn:6270,HiLiRevC:6144,HiLiDELp:6270,HiLiSoftT:6270,HiLiTTSOver:6270,HiLiLanes:6270,NAHigh1:6144,NAHigh2:6144,Greet:6270,FullScreen:6270,PopUps:6270,ArrLoad:7520,RepTool:6144,NAFeat1:6144,NAFeat2:6144,SegLi:7536,PlaLi:7536,MeasT:6270,PropEd:6270,CSA:6270,ClearGeom:6240,CutSeg:6270,CreateJunc:6270,EleGround:6270,SelRB:6270,RedoRB:6256,RBStan:6256,RBArea:6256,SelArea:6256,DelTIOs:7680,TIOShort:7680,NATool1:6144,NATool2:6144,FixSuppJunc:7264,FixSuppGeoSel:7264,FixSuppGeoAll:7264,FixExpRest:7520,FixLoops:7520,FixUncTurn:7264,FixToll:7264,FixUTurnRed:7264,FixOther:7264,FixMP:6144,NudgeHNs:7168,MagicFix:6144,NAAuto1:6144,NAAuto2:6144},

        // 186Russia
        186:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:5500,HiLiUTurn:4222,HiLiRevC:4192,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5500,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:5500,PlaLi:5500,MeasT:4222,PropEd:4222,CSA:4222,ClearGeom:4222,CutSeg:4222,CreateJunc:4222,EleGround:4222,SelRB:4222,RedoRB:5496,RBStan:4222,RBArea:4222,SelArea:4222,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:5216,FixSuppGeoSel:5500,FixSuppGeoAll:5240,FixExpRest:5496,FixLoops:5500,FixUncTurn:5244,FixToll:5240,FixUTurnRed:5232,FixOther:5244,FixMP:6144,NudgeHNs:5120,MagicFix:6144,NAAuto1:4096,NAAuto2:4096},

        // 123Latvia
        123:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:5472,HiLiUTurn:4222,HiLiRevC:4192,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5472,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:5488,PlaLi:5488,MeasT:4222,PropEd:4222,CSA:4222,ClearGeom:4222,CutSeg:4222,CreateJunc:4222,EleGround:4222,SelRB:4222,RedoRB:5216,RBStan:5216,RBArea:4222,SelArea:4222,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:5496,FixSuppGeoSel:5472,FixSuppGeoAll:5472,FixExpRest:5472,FixLoops:5500,FixUncTurn:5496,FixToll:4096,FixUTurnRed:4096,FixOther:5496,FixMP:6144,NudgeHNs:5120,MagicFix:6144,NAAuto1:4096,NAAuto2:4096},

        // 130Luxembourg
        130:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:5472,HiLiUTurn:4222,HiLiRevC:4216,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5472,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:5488,PlaLi:5488,MeasT:4222,PropEd:4222,CSA:4222,ClearGeom:4222,CutSeg:4222,CreateJunc:4222,EleGround:4222,SelRB:4222,RedoRB:5488,RBStan:4222,RBArea:4222,SelArea:4222,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:5472,FixSuppGeoSel:5472,FixSuppGeoAll:5216,FixExpRest:5472,FixLoops:5472,FixUncTurn:5216,FixToll:5216,FixUTurnRed:4096,FixOther:4216,FixMP:6144,NudgeHNs:5120,MagicFix:6144,NAAuto1:4096,NAAuto2:4096},

        // 135Malaysia
        135:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:5472,HiLiUTurn:4222,HiLiRevC:4160,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5472,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:5488,PlaLi:5488,MeasT:4222,PropEd:4222,CSA:4222,ClearGeom:5232,CutSeg:4222,CreateJunc:4222,EleGround:4222,SelRB:4222,RedoRB:5472,RBStan:4208,RBArea:4216,SelArea:4222,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:5216,FixSuppGeoSel:5216,FixSuppGeoAll:5216,FixExpRest:5216,FixLoops:5216,FixUncTurn:5216,FixToll:5216,FixUTurnRed:4096,FixOther:5216,FixMP:6144,NudgeHNs:5120,MagicFix:6144,NAAuto1:4096,NAAuto2:4096},

        // 145Mexico
        145:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:4160,HiLiUTurn:4216,HiLiRevC:4160,HiLiDELp:4222,HiLiSoftT:4160,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4216,FullScreen:4222,PopUps:4222,ArrLoad:4216,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:5488,PlaLi:5488,MeasT:4222,PropEd:4222,CSA:4222,ClearGeom:4216,CutSeg:4222,CreateJunc:4222,EleGround:4216,SelRB:4222,RedoRB:4208,RBStan:4216,RBArea:4216,SelArea:4208,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:4208,FixSuppGeoSel:4160,FixSuppGeoAll:4160,FixExpRest:4222,FixLoops:4222,FixUncTurn:4216,FixToll:4216,FixUTurnRed:4160,FixOther:4160,FixMP:6144,NudgeHNs:5120,MagicFix:6144,NAAuto1:4096,NAAuto2:4096},

        // 147Moldova
        147:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:5488,HiLiUTurn:4208,HiLiRevC:4192,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5488,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:5488,PlaLi:5488,MeasT:4222,PropEd:4222,CSA:4222,ClearGeom:4222,CutSeg:4222,CreateJunc:4222,EleGround:4222,SelRB:4222,RedoRB:5488,RBStan:4208,RBArea:4222,SelArea:4222,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:5472,FixSuppGeoSel:5488,FixSuppGeoAll:5216,FixExpRest:5488,FixLoops:5488,FixUncTurn:5488,FixToll:5232,FixUTurnRed:7264,FixOther:5488,FixMP:6144,NudgeHNs:5120,MagicFix:6144,NAAuto1:4096,NAAuto2:4096},

        // 158Netherlands
        158:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:4096,HiLiUTurn:4222,HiLiRevC:4464,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5472,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:5488,PlaLi:5624,MeasT:4222,PropEd:4220,CSA:4220,ClearGeom:4220,CutSeg:4222,CreateJunc:4222,EleGround:4222,SelRB:4222,RedoRB:5488,RBStan:4220,RBArea:4222,SelArea:4222,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:4096,FixSuppGeoSel:4192,FixSuppGeoAll:4096,FixExpRest:5472,FixLoops:5472,FixUncTurn:5216,FixToll:5216,FixUTurnRed:4096,FixOther:5216,FixMP:6144,NudgeHNs:5120,MagicFix:6144,NAAuto1:4096,NAAuto2:4096},

        // 170Oman
        170:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:5216,HiLiUTurn:4222,HiLiRevC:4192,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5216,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:4208,PlaLi:4208,MeasT:4222,PropEd:4208,CSA:4208,ClearGeom:4208,CutSeg:4222,CreateJunc:4222,EleGround:4222,SelRB:4222,RedoRB:5488,RBStan:4216,RBArea:4222,SelArea:4222,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:5472,FixSuppGeoSel:5216,FixSuppGeoAll:5216,FixExpRest:5216,FixLoops:5472,FixUncTurn:5216,FixToll:5216,FixUTurnRed:4192,FixOther:5216,FixMP:6144,NudgeHNs:5120,MagicFix:6144,NAAuto1:4096,NAAuto2:4096},

        // 180Poland
        180:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:5472,HiLiUTurn:4222,HiLiRevC:4192,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5472,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:5488,PlaLi:5488,MeasT:4222,PropEd:4222,CSA:4222,ClearGeom:4222,CutSeg:4222,CreateJunc:4222,EleGround:4222,SelRB:4222,RedoRB:5488,RBStan:4222,RBArea:4222,SelArea:4222,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:5472,FixSuppGeoSel:5472,FixSuppGeoAll:5216,FixExpRest:5472,FixLoops:5472,FixUncTurn:5216,FixToll:5216,FixUTurnRed:5216,FixOther:5216,FixMP:6144,NudgeHNs:5120,MagicFix:6144,NAAuto1:4096,NAAuto2:4096},

        // 181Portugal
        181:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:5472,HiLiUTurn:4222,HiLiRevC:4192,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5472,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:5488,PlaLi:5488,MeasT:4222,PropEd:4222,CSA:4222,ClearGeom:4222,CutSeg:4222,CreateJunc:4222,EleGround:4222,SelRB:4222,RedoRB:5488,RBStan:4222,RBArea:4222,SelArea:4222,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:5472,FixSuppGeoSel:5472,FixSuppGeoAll:5216,FixExpRest:5472,FixLoops:5472,FixUncTurn:5216,FixToll:5216,FixUTurnRed:5216,FixOther:5216,FixMP:6144,NudgeHNs:5120,MagicFix:6144,NAAuto1:4096,NAAuto2:4096},

        // 183Qatar
        183:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:5120,HiLiSi:5216,HiLiUTurn:4222,HiLiRevC:4192,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5216,RepTool:7168,NAFeat1:4096,NAFeat2:4096,SegLi:4208,PlaLi:4208,MeasT:4222,PropEd:4208,CSA:4208,ClearGeom:4208,CutSeg:4222,CreateJunc:4222,EleGround:4222,SelRB:4222,RedoRB:5488,RBStan:4216,RBArea:4222,SelArea:4222,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:5472,FixSuppGeoSel:5216,FixSuppGeoAll:5216,FixExpRest:5216,FixLoops:5472,FixUncTurn:5216,FixToll:5216,FixUTurnRed:4192,FixOther:5216,FixMP:7168,NudgeHNs:5120,MagicFix:7168,NAAuto1:4096,NAAuto2:4096},

        // 185Romania
        185:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:7536,HiLiUTurn:4222,HiLiRevC:4216,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:7536,RepTool:7520,NAFeat1:4096,NAFeat2:4096,SegLi:7264,PlaLi:7536,MeasT:4606,PropEd:4604,CSA:4604,ClearGeom:4472,CutSeg:4604,CreateJunc:4606,EleGround:4604,SelRB:4606,RedoRB:7536,RBStan:4216,RBArea:4606,SelArea:4606,DelTIOs:7776,TIOShort:8056,NATool1:4096,NATool2:4096,FixSuppJunc:7264,FixSuppGeoSel:7536,FixSuppGeoAll:7264,FixExpRest:7544,FixLoops:7544,FixUncTurn:7544,FixToll:7544,FixUTurnRed:6208,FixOther:7536,FixMP:7232,NudgeHNs:7232,MagicFix:6208,NAAuto1:4096,NAAuto2:4096},

        // 190Saudi Arabia
        190:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:5216,HiLiUTurn:4222,HiLiRevC:4192,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5216,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:4208,PlaLi:4208,MeasT:4222,PropEd:4208,CSA:4208,ClearGeom:4208,CutSeg:4222,CreateJunc:4222,EleGround:4222,SelRB:4222,RedoRB:5488,RBStan:4216,RBArea:4222,SelArea:4222,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:5472,FixSuppGeoSel:5216,FixSuppGeoAll:5216,FixExpRest:5216,FixLoops:5472,FixUncTurn:5216,FixToll:5216,FixUTurnRed:4192,FixOther:5216,FixMP:6144,NudgeHNs:5120,MagicFix:6144,NAAuto1:4096,NAAuto2:4096},

        // 216Switzerland
        216:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:5216,HiLiUTurn:4222,HiLiRevC:4192,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5500,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:5616,PlaLi:5616,MeasT:4222,PropEd:4222,CSA:4222,ClearGeom:4222,CutSeg:4222,CreateJunc:4222,EleGround:4222,SelRB:4222,RedoRB:5616,RBStan:4222,RBArea:4222,SelArea:4222,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:5472,FixSuppGeoSel:5488,FixSuppGeoAll:5216,FixExpRest:5616,FixLoops:5616,FixUncTurn:5488,FixToll:5216,FixUTurnRed:5184,FixOther:5616,FixMP:6144,NudgeHNs:5120,MagicFix:6144,NAAuto1:4096,NAAuto2:4096},

        // 227Turkey
        227:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:5216,HiLiUTurn:4222,HiLiRevC:4192,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5472,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:4208,PlaLi:4208,MeasT:4222,PropEd:4208,CSA:4208,ClearGeom:4208,CutSeg:4222,CreateJunc:4222,EleGround:4222,SelRB:4222,RedoRB:5232,RBStan:4216,RBArea:4222,SelArea:4222,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:5472,FixSuppGeoSel:5496,FixSuppGeoAll:5216,FixExpRest:5496,FixLoops:5496,FixUncTurn:5216,FixToll:5216,FixUTurnRed:4192,FixOther:5216,FixMP:6144,NudgeHNs:5120,MagicFix:6144,NAAuto1:4096,NAAuto2:4096},

        // 232Ukraine
        232:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4208,HiLiSi:5496,HiLiUTurn:4222,HiLiRevC:4096,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5472,RepTool:6512,NAFeat1:4096,NAFeat2:4096,SegLi:5500,PlaLi:5500,MeasT:4222,PropEd:4222,CSA:4222,ClearGeom:4220,CutSeg:4222,CreateJunc:4222,EleGround:4222,SelRB:4222,RedoRB:5488,RBStan:4222,RBArea:4222,SelArea:4222,DelTIOs:5744,TIOShort:5744,NATool1:4096,NATool2:4096,FixSuppJunc:5496,FixSuppGeoSel:5496,FixSuppGeoAll:5240,FixExpRest:5488,FixLoops:5500,FixUncTurn:5240,FixToll:5216,FixUTurnRed:4160,FixOther:64,FixMP:6240,NudgeHNs:5216,MagicFix:6144,NAAuto1:4096,NAAuto2:4096},

        // 233United Arab Emirates
        233:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:5216,HiLiUTurn:4222,HiLiRevC:4192,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5216,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:4208,PlaLi:4208,MeasT:4222,PropEd:4208,CSA:4208,ClearGeom:4208,CutSeg:4222,CreateJunc:4222,EleGround:4222,SelRB:4222,RedoRB:5488,RBStan:4216,RBArea:4222,SelArea:4222,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:5472,FixSuppGeoSel:5216,FixSuppGeoAll:5216,FixExpRest:5216,FixLoops:5472,FixUncTurn:5216,FixToll:5216,FixUTurnRed:4192,FixOther:5216,FixMP:6144,NudgeHNs:5120,MagicFix:6144,NAAuto1:4096,NAAuto2:4096},

        // 234United Kingdom
        234:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:5472,HiLiUTurn:4222,HiLiRevC:4192,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5472,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:5488,PlaLi:5488,MeasT:4222,PropEd:4222,CSA:4222,ClearGeom:4222,CutSeg:4222,CreateJunc:4222,EleGround:4222,SelRB:4222,RedoRB:5488,RBStan:4222,RBArea:4222,SelArea:4222,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:5472,FixSuppGeoSel:5472,FixSuppGeoAll:5216,FixExpRest:5472,FixLoops:5472,FixUncTurn:5216,FixToll:5216,FixUTurnRed:4160,FixOther:5216,FixMP:7168,NudgeHNs:5120,MagicFix:6144,NAAuto1:4096,NAAuto2:4096},

        // 235United States
        235:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:7264,HiLiUTurn:4222,HiLiRevC:4222,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5472,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:5488,PlaLi:5488,MeasT:4222,PropEd:4222,CSA:4222,ClearGeom:4222,CutSeg:4222,CreateJunc:4222,EleGround:4222,SelRB:4222,RedoRB:5488,RBStan:4222,RBArea:4222,SelArea:4222,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:7520,FixSuppGeoSel:6144,FixSuppGeoAll:6144,FixExpRest:5472,FixLoops:5472,FixUncTurn:5216,FixToll:5216,FixUTurnRed:4096,FixOther:5216,FixMP:6144,NudgeHNs:5632,MagicFix:6144,NAAuto1:4096,NAAuto2:4096},

        // 239Venezuela
        239:{HiLiL6:4222,HiLiL5:4222,HiLiL4:4222,HiLiL3:4222,HiLiL2:4222,HiLiMaLo:4222,HiLiElGr:4222,HiLiElVa:4222,HiLiHouNo:4222,HiLiwoHouNo:4222,HiLiTunnel:4222,HiLiMaxSpeed:4222,HiLiRest:4222,HiLiLoop:4222,HiLiRB:4096,HiLiSi:5120,HiLiUTurn:4192,HiLiRevC:4192,HiLiDELp:4222,HiLiSoftT:4222,HiLiTTSOver:4222,HiLiLanes:4222,NAHigh1:4096,NAHigh2:4096,Greet:4222,FullScreen:4222,PopUps:4222,ArrLoad:5472,RepTool:6144,NAFeat1:4096,NAFeat2:4096,SegLi:5488,PlaLi:5488,MeasT:4222,PropEd:4220,CSA:4220,ClearGeom:4220,CutSeg:4222,CreateJunc:4222,EleGround:4216,SelRB:4222,RedoRB:5488,RBStan:4216,RBArea:4222,SelArea:4222,DelTIOs:5632,TIOShort:5632,NATool1:4096,NATool2:4096,FixSuppJunc:5184,FixSuppGeoSel:5120,FixSuppGeoAll:5120,FixExpRest:5488,FixLoops:5488,FixUncTurn:5216,FixToll:5216,FixUTurnRed:4096,FixOther:5216,FixMP:6144,NudgeHNs:5120,MagicFix:6144,NAAuto1:4096,NAAuto2:4096}
    };
    /* eslint-enable key-spacing */
    /* eslint-enable max-len */
    /* eslint-enable comma-spacing */
    /* eslint-enable object-curly-spacing */
    /* eslint-enable object-curly-newline */

    const USTerritoriesCodes = [
        4, // American Samoa
        89, // Guam
        167, // Northern Mariana Islands
        182, // Puerto Rico
        241 // US Virgin Islands
    ];

    // WMETB_topCountryID
    // Returns the current country ID (in the center of the map)
    sec.WMETB_topCountryID = function WMETB_topCountryID() {
        if (W.model.countries && W.model.getTopCountry() && typeof W.model.getTopCountry() !== 'undefined') {
            return W.model.getTopCountry().attributes.id;
        }
        return 0;
    };

    // WMETB_UserRights
    // Returns the current user's permission code
    // Utilizes Bitwise OR assignment (|=)
    const WMETB_UserRights = function WMETB_UserRights() {
        let rights = 0;
        if (localStorage.WME_Toolbox_Devmode) {
            if (JSON.parse(localStorage.getItem('WME_Toolbox_Devmode')).hash === 'eI4yA8gXVFaz4ezP') {
                rights = JSON.parse(localStorage.getItem('WME_Toolbox_Devmode')).rights;
            }
        }
        if (!rights) {
            rights = 1 << sec.WMETB_VerifiedUserRank;

            if (sec.WMETB_IsAM()) {
                if (sec.WMETB_VerifiedUserRank < 3) {
                    rights |= 128; // 2^7
                } else {
                    rights |= 256; // 2^8
                }
            }
            if (sec.WMETB_IsSM()) {
                rights |= 512; // 2^9
            }
            if (sec.WMETB_IsCM()) {
                rights |= 1024; // 2^10
            }
            if (sec.WMETB_IsGC()) {
                rights |= 2048; // 2^11
            }
            if (sec.WMETB_IsDev() && !sec.devPermSettings('useCountryPerms')) {
                rights |= 4096; // 2^12
            }
        }
        return rights;
    };

    // WMETB_RightsCheck
    // Returns a boolean value (0 = false, non-0 = true), if the user has the rights to use the function toolCode in the current country
    sec.WMETB_RightsCheck = function WMETB_RightsCheck(toolCode) {
        const curUserRights = WMETB_UserRights();
        let curCountry = sec.WMETB_topCountryID();
        let validRights = WMETB_RightsPerCountry[0];
        let result = false;

        // CVA_TODO: implement CVA into rights table, then delete this block
        if (toolCode === 'CVA') {
            if ((curUserRights & 2048) || sec.WMETB_VerifiedUserName.toLowerCase() === 'no1ne') { // Tb devs and no1ne only
                return true;
            }
            return false;
        }

        if (WMETB_RightsPerCountry.hasOwnProperty(curCountry)) {
            validRights = WMETB_RightsPerCountry[curCountry];
        } else if (USTerritoriesCodes.indexOf(curCountry) > -1) {
            // eslint-disable-next-line prefer-destructuring
            validRights = WMETB_RightsPerCountry[4]; // US Territories (CountryID 4 is actually American Samoa)
        } else {
            curCountry = 0;
        }
        if (validRights[toolCode] !== undefined) {
            result = validRights[toolCode] & curUserRights; // Bitwise comparison, returns true if any match in rights
            //  global.WMETB_Debug("RightsCheck: CountryID:" + curCountry + " toolCode:"+ toolCode + " validRights:"
            // + validRights[toolCode] + " curUserRights:" + curUserRights + " result:" + result);
        } else {
            global.WMETB_Debug('RightsCheck: toolCode ' + toolCode + ' not found in CountryID ' + curCountry);
        }

        global.WMETB_DebugPerms(toolCode, result);
        return result;
    };

    // This function is called after panning the map to update the country framework, should the country have changed
    sec.WMETB_UpdateCountryFramework = function WMETB_UpdateCountryFramework() {
        const tCID = sec.WMETB_topCountryID();
        if (tCID) {
            // console.log('WMETB: new country id detected: ' + tCID + ' ' + sec.WMETB_TopCountry);
            if (sec.WMETB_TopCountry !== tCID) {
                global.WMETB_Debug('CountryID changed from ' + sec.WMETB_TopCountry + ' to ' + tCID);
                sec.WMETB_TopCountry = tCID;
                global.WMETB_DispLog('Country changed to ' + W.model.countries.getObjectById(tCID).attributes.name);
                global.WMETB_CountryChanged(); // Re-initialize highlights
            }
        } else {
            global.WMETB_Debug('No country ID, loading UI panels');
            global.WMETB_Highlight_Init(); // Init highlight vars and layers
            global.WMETB_Toolbar_Options_Init(); // Init toolbar options panel
            global.WMETB_Options_Init(); // Init options panel
        }
    };

    // Display
    if (localStorage.WME_Toolbox_Devmode) {
        if (JSON.parse(localStorage.getItem('WME_Toolbox_Devmode')).hash === 'eI4yA8gXVFaz4ezP') {
            let { rights } = JSON.parse(localStorage.getItem('WME_Toolbox_Devmode'));
            if (rights) console.log('WMETB: *************** Emulated rights: ' + rights);
            rights = 'undefined';
        }
    }
}
sc0(sec);
sc4(sec);
sc5(sec);
sec.WMETB_Init();
sec.WMETB_IsGC();
            `,
            variables: {
                sec: {},
                W: {
                    loginManager: {
                        user: {
                            attributes: {
                                userName: 'MapOMatic',
                                rank: 5,
                                isAreaManager:
                                true,
                                editableCountryIDs:
                                [235]
                            }
                        }
                    }
                },
                localStorage: {},
                global: {
                    wazeinit: 0
                }
            },
            expectedOutput: 2,
            expectedVariables: { a: 2 }
        }),
        new Test({
            id: 'arrow function',
            code: `var f = (a) => a + 1; return f(1)`,
            variables: { },
            expectedOutput: 2
        }),
        new Test({
            id: 'function expression',
            code: `var t = function t(v) { return v + 1; }; return t(1);`,
            variables: { },
            expectedOutput: 2
        }),
        new Test({
            id: 'missing call method 1',
            code: `a();`,
            variables: { },
            expectedOutput: 2
        }),
        new Test({
            id: 'missing call method 2',
            code: `a.b()`,
            variables: { a: {} },
            expectedOutput: 2
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

    const ONLY_RUN_TEST_ID = "";
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
            tree = parseProcessLabelFunction(test.code);

            let testResult;
            test.variables.Date = Date;
            test.variables.prompt = prompt;
            try {
                testResult = ESTreeProcessor.execute(tree, test.variables);
            } catch (ex) {
                testResult = { output: ex, variables: test.variables };
            }

            // Filter out the default variables first
            // const testResultVariables = {};
            // Object.keys(testResult.variables)
            //     .filter(key => !ESTreeProcessor.#DEFAULT_VARIABLES.hasOwnProperty(key) && !Test.DEFAULT_VARIABLES.hasOwnProperty(key))
            //     .forEach(key => (testResultVariables[key] = testResult.variables[key]));
            // delete testResultVariables.__$lp; // remove the program function variable
            // testResult.variables = testResultVariables;

            const validationResult = test.validate(testResult);
            // testResult.variables = ESTreeProcessor.variableHistory;
            if (SHOW_ALL_RESULTS || !validationResult.outputValidated || !validationResult.variablesValidated || ONLY_RUN_TEST_ID) {
                console.log(`TEST ID:    %c${test.id}`, boldFont);
                console.log('%cOUTPUT:    ', validationResult.outputValidated ? normal : yellowBackground, testResult.output); // .replace('\n', '\\n'));
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

    function parseProcessLabelFunction(script) {
        return ESTreeProcessor.compile(`function __$lp(){${script}} __$lp()`);
    }
    console.log(`TESTS COMPLETED: ${testCount}`);
})();
