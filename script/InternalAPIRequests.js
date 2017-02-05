///templates have 5 (first 4 of which are strings) properties: id, issueId, author, text.  
///last property is medium, 

///guid making function
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

///will call the callback when it returns. 
///The string the callback passes as its only parameter will be 'true' or 'false', indicating success
function httpPostTemplate(template,callback)
{
	var url = 'https://hab2017.azurewebsites.net/api/template/';
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }

    xmlHttp.open("POST", url, true); // true for asynchronous 
	xmlHttp.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8' );
	//template  = '{ "text":"This is the template\'s text!!!!", "id" : "'+guid()+'", "issueId" : "' + guid()+'", "author":"trent"}'
    xmlHttp.send(template);
}

///will call the callback when it returns. 
///The object the callback passes will be a json list of template objects
///pass in the issueId string to get the templates for an issue
function httpGetTemplates(issueId,callback)
{
	var url = 'https://hab2017.azurewebsites.net/api/template/'+issueId;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }

    xmlHttp.open("GET", url, true); // true for asynchronous 
	xmlHttp.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8' );
    xmlHttp.send();
}

///will call the callback when it returns. 
///The object the callback passes will be a json list of representative objects
///pass in the zipcode string to get the representitives for a specified zip code
function httpGetReps(zipcode,callback)
{
	var url = 'https://hab2017.azurewebsites.net/api/reps/'+zipcode;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }

    xmlHttp.open("GET", url, true); // true for asynchronous 
	xmlHttp.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8' );
    xmlHttp.send();
}

///will call the callback when it returns. 
///This will return the website for a given rep and issue.
///Pass in the reb object and the string issue.  
///will return empty string if no website could be found.
function httpGetRepWebsite(rep,issue,callback)
{
	var url = 'https://hab2017.azurewebsites.net/api/repissues/';
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }

    xmlHttp.open("POST", url, true); // true for asynchronous 
	xmlHttp.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8' );
    xmlHttp.send("{'rep':'"+JSON.stringify(rep)+"','issue':'"+issue+"'}");
}

//will call the callback when it returns. 
///THis is called to incremenet the uses count for a given template.
///simply pass in the template Id.
function httpIncrementTemplate(templateId,callback)
{
	var url = 'https://hab2017.azurewebsites.net/api/incrementtemplate/'+templateId;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }

    xmlHttp.open("GET", url, true); // true for asynchronous 
	xmlHttp.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8' );
    xmlHttp.send();
}

//will call the callback when it returns. 
///This call will fetch the template objects for a given author
//will return a json list of template objects.  
//Call JSON.parse(s) on the returned string
function httpGetTemplatesOfAuthor(authorName,callback)
{
	var url = 'https://hab2017.azurewebsites.net/api/fetchusertemplates/'+authorName
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }

    xmlHttp.open("GET", url, true); // true for asynchronous 
	xmlHttp.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8' );
    xmlHttp.send();
}



function callback(s){
	reps = JSON.parse(s);
	var issue = "abortion";
	rep = reps[0]
	console.log(rep)
	httpGetRepWebsite(rep,issue,printCallback)
}

function printCallback(s){
	console.log(s);
}




///EXAMPLES:

//httpGetTemplatesOfAuthor('trent',printCallback)

//httpIncrementTemplate('0',printCallback);

//httpPostTemplate('{ "text":"This is the template\'s text!!!!", "id" : "'+guid()+'", "issueId" : "issue_example_id", "author":"trent","medium":"letter"}',printCallback)

//httpGetTemplates("issue_example_id",printCallback)

//httpGetReps("85282",callback)
