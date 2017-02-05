
issues = ['immigration', 'health & welfare', 'Business & Economy', 'Labor', 'Jobs', 'Minimum Wage', 'Offshoring', 'Unemployment Rate', 'Labor Unions', 'Macroeconomics', 'Free Trade', 'Monetary Policy', 'Federal Reserve', 'Gold Standard', 'Inflation & Deflation', 'Taxes', 'Corporate Taxes', 'Offshore Tax Shelters', 'Tax Shelters', 'U.S. Debt & Deficits', 'Debt Ceiling', 'Regulation', 'Financial Regulation', 'Civil & Human Rights', 'Individual Rights & Freedoms', 'Freedom of Press', 'Freedom of Religion', 'Freedom of Speech', 'Gay Rights', 'Defense of Marriage Act (DOMA)', 'Gay Adoption', 'Gay Marriage', 'Gays in Military', 'Don\'t Ask Don\'t Tell', 'Right to Privacy', 'Right to Vote', 'Women\'s Rights', 'Abortion', 'Discrimination', 'Affirmative Action', 'Profiling', 'Gambling', 'Gun Control', 'Human Trafficking', 'Legalization of Drugs', 'Legalizing Marijuana', 'Medical Marijuana', 'Racial Politics', 'Racism', 'Torture', 'Education', 'Abstinence Only Education', 'Charter Schools', 'Head Start Program', 'Higher Education', 'Homeschooling', 'Pell Grants', 'Sex Education', 'Teachers', 'Teachers Pay', 'Teachers Unions', 'Environment', 'Endangered Species', 'Energy', 'Energy Independence', 'Fossil Fuels', 'Fracking', 'Gasoline Prices', 'Offshore Drilling', 'Nuclear Energy', 'Yucca Mountain', 'Renewable Energy', 'Biofuels', 'Geothermal Energy', 'Hydropower', 'Solar Power', 'Wind Power', 'Global Warming', 'Recycling', 'Foreign Policy', 'International Relations', 'Military & Defense', 'Guantanamo Bay', 'The Draft', 'Weapons', 'Combat Drones', 'Joint Strike Fighter (F-35)', 'Biological Weapons', 'Chemical Weapons', 'Nuclear Weapons', 'Weapons of Mass Destruction', 'Treaties & Agreements', 'Kyoto Protocol', 'NAFTA', 'NATO', 'Nuclear Proliferation', 'Nuclear Non-Proliferation Treaty', 'START Treaties', 'United Nations', 'Wars & Conflicts', 'Persian Gulf War', 'Afghanistan War', 'Taliban', 'Iraq War', 'Darfur Conflict', 'Israel vs Palestinians', 'North Korea vs South Korea', 'Somali Civil War', 'Sri Lankan Civil War', 'Terrorism', 'Al-Qaeda', 'Hezbollah', 'Islamic State (ISIS)', 'Joseph Kony', 'Lord\'s Resistance Army', 'Pakistani Taliban', 'Health & Welfare', 'Government Benefits', 'Disability Benefits', 'FHA Loans', 'Food Stamp Program', 'Government Health Benefits', 'Children\'s Health Insurance Programs', 'Medicaid', 'Medicare', 'Medicare & Medicaid', 'Student Loans', 'Housing Assistance', 'Public Housing', 'Section 8 Housing', 'Social Security', 'Unemployment Benefits', 'Veterans Benefits', 'GI Bill', 'Welfare Program', 'Laws & Crime', 'Campaign Finance Reform', 'Capital Punishment', 'Hate Crimes', 'Pardons', 'Police Abuse', 'Police Brutality', 'Prisons', 'Sentencing', 'Mandatory Minimum Sentences', 'Three Strikes Laws', 'Tort Reform', 'Religion', 'Faith Based Initiatives', 'Intelligent Design', 'School Prayer', 'Separation of Church & State', 'Science & Technology', 'Genetically Engineered Foods', 'High Speed Rail', 'Internet Neutrality', 'Scientific Discoveries', 'Stem Cell Research']

issues.forEach(function(issue){
	var div = $('<button type="button" class="btn-block btn btn-secondary issue ">'+issue.toLowerCase()+'</button>')
	//var div = $('<a class="issue list-group-item list-group-item-action">'+issue.toLowerCase()+'</a>')
	$("#issues_list").append(div)
});

$(".issue").click( function() {
    $('.issue.selected').removeClass('selected');
    $(this).addClass('selected');
    $(this).css('border-color','#fff');
});

var checkOptions = function() {
    if ($(".medium-btn.focus") && $(".stance-btn.focus") && $(".issue.focus")) {
        $("#nextButton i").css('color','green');
        $("#nextButton i").on(linkToWriting());}
};
$(".medium-btn").click( function(e){ e.preventDefault(); $(".medium-btn.focus").removeClass('focus'); $(this).addClass('focus'); checkOptions();});
$(".stance-btn").click( function(e){ e.preventDefault(); $(".stance-btn.focus").removeClass('focus'); $(this).addClass('focus');});
$(".issue").click( function(e){ e.preventDefault(); $(".issue.focus").removeClass('focus'); $(this).addClass('focus');});


// String formatting method
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}


// Generate writing.html params
var linkToWriting = function() {
    var rep = reps[$(".carousel-item.active").attr('index')];
    var stance = $(".stance-btn.focus")[0].innerText;
    var issue = $(".issue.focus")[0].innerText;
    var medium = $(".medium-btn.focus")[0].innerText;
    var official = rep.title + ' ' + rep.firstName + ' ' + rep.lastName;
    if (medium == 'email') {
        window.location.assign('writing.html?' + encodeURI('stance=' + stance + '&' + 'issue=' + issue + '&' +
                                                        'medium=' + medium + '&official=' + official + '&email=' + rep.email_addresses[0]));
    } else if(medium == 'call') {
        window.location.assign('writing.html?' + encodeURI('stance=' + stance + '&' + 'issue=' + issue + '&' +
                                                        'medium=' + medium + '&official=' + official + '&call=' + rep.number));

    } else if(medium == 'write') {
        window.location.assign('writing.html?' + encodeURI('stance=' + stance + '&' + 'issue=' + issue + '&' +
                                                        'medium=' + medium + '&official=' + official + '&write=' + rep.mailing_addresses[0]));
    }
};


// requires that html file that imports this script also imports InternalAPIRequests.js

// TODO:Add input validation for zip
var zip = location.href.substr(location.href.indexOf("?")+1);

var generic_card = '<div class="carousel-item " index={8}>' +
                '<div class="card" style="width: 800px; height: 480px; padding: 25px 70px">' +
                  '<div class="row">' +
                    '<div class="card-block">' +
                      '<h4 class="card-title">{0}</h4>' +
                      '<p class="card-text">{1} / {2}<br>district:{6}<br>{5}<br>{7}<br>{4}</p>' +
                    '</div>' +
                    '<div class="container" style="height:250px; width:332px">' +
                      '<img class="img-responsive" style="height:320px; width:250px" src="{3}" alt="Card image cap">' +
                    '</div>' +
                  '</div>' +
                '</div>'

httpGetReps(zip,function(resp) {
    reps = JSON.parse(resp);

    console.log(reps)
    reps.forEach(function(r,i) {
        var name = r['title'] + ' '+ r['firstName'] + ' ' +  r['lastName'];
        if (name.length > 20) {
          console.log(name)
          name = r['title'] + ' '+ r['firstName'] + '<br>' + r['lastName'];
        }
        var mail = r['mailing_addresses']
        mail = mail[0];
        console.log(mail)
        if (mail.length > 28) {
          var mail_split = mail.split(" ");
          var half = Math.floor(mail_split.length/2);
          mail = mail_split.slice(0, half).join(" ") + "<br>" + mail_split.slice(half, mail_split.length).join(" ");
          console.log(mail);
        }
        $(".carousel-inner").append( generic_card.format(name, r['party'], r['state'], r['image_url'],
        r['email_addresses'], r['phone_numbers'], r['district'], mail, i.toString()) );
    });

    $(".dummy").remove()
    $(".carousel-item:nth-of-type(1)").addClass("active");
});
