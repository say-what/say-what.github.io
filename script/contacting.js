
issues = ['Business & Economy', 'Labor', 'Jobs', 'Minimum Wage', 'Offshoring', 'Unemployment Rate', 'Labor Unions', 'Macroeconomics', 'Free Trade', 'Monetary Policy', 'Federal Reserve', 'Gold Standard', 'Inflation & Deflation', 'Taxes', 'Corporate Taxes', 'Offshore Tax Shelters', 'Tax Shelters', 'U.S. Debt & Deficits', 'Debt Ceiling', 'Regulation', 'Financial Regulation', 'Civil & Human Rights', 'Individual Rights & Freedoms', 'Freedom of Press', 'Freedom of Religion', 'Freedom of Speech', 'Gay Rights', 'Defense of Marriage Act (DOMA)', 'Gay Adoption', 'Gay Marriage', 'Gays in Military', 'Don\'t Ask Don\'t Tell', 'Right to Privacy', 'Right to Vote', 'Women\'s Rights', 'Abortion', 'Discrimination', 'Affirmative Action', 'Profiling', 'Gambling', 'Gun Control', 'Human Trafficking', 'Legalization of Drugs', 'Legalizing Marijuana', 'Medical Marijuana', 'Racial Politics', 'Racism', 'Torture', 'Education', 'Abstinence Only Education', 'Charter Schools', 'Head Start Program', 'Higher Education', 'Homeschooling', 'Pell Grants', 'Sex Education', 'Teachers', 'Teachers Pay', 'Teachers Unions', 'Environment', 'Endangered Species', 'Energy', 'Energy Independence', 'Fossil Fuels', 'Fracking', 'Gasoline Prices', 'Offshore Drilling', 'Nuclear Energy', 'Yucca Mountain', 'Renewable Energy', 'Biofuels', 'Geothermal Energy', 'Hydropower', 'Solar Power', 'Wind Power', 'Global Warming', 'Recycling', 'Foreign Policy', 'International Relations', 'Immigration', 'Military & Defense', 'Guantanamo Bay', 'The Draft', 'Weapons', 'Combat Drones', 'Joint Strike Fighter (F-35)', 'Biological Weapons', 'Chemical Weapons', 'Nuclear Weapons', 'Weapons of Mass Destruction', 'Treaties & Agreements', 'Kyoto Protocol', 'NAFTA', 'NATO', 'Nuclear Proliferation', 'Nuclear Non-Proliferation Treaty', 'START Treaties', 'United Nations', 'Wars & Conflicts', 'Persian Gulf War', 'Afghanistan War', 'Taliban', 'Iraq War', 'Darfur Conflict', 'Israel vs Palestinians', 'North Korea vs South Korea', 'Somali Civil War', 'Sri Lankan Civil War', 'Terrorism', 'Al-Qaeda', 'Hezbollah', 'Islamic State (ISIS)', 'Joseph Kony', 'Lord\'s Resistance Army', 'Pakistani Taliban', 'Health & Welfare', 'Government Benefits', 'Disability Benefits', 'FHA Loans', 'Food Stamp Program', 'Government Health Benefits', 'Children\'s Health Insurance Programs', 'Medicaid', 'Medicare', 'Medicare & Medicaid', 'Student Loans', 'Housing Assistance', 'Public Housing', 'Section 8 Housing', 'Social Security', 'Unemployment Benefits', 'Veterans Benefits', 'GI Bill', 'Welfare Program', 'Laws & Crime', 'Campaign Finance Reform', 'Capital Punishment', 'Hate Crimes', 'Pardons', 'Police Abuse', 'Police Brutality', 'Prisons', 'Sentencing', 'Mandatory Minimum Sentences', 'Three Strikes Laws', 'Tort Reform', 'Religion', 'Faith Based Initiatives', 'Intelligent Design', 'School Prayer', 'Separation of Church & State', 'Science & Technology', 'Genetically Engineered Foods', 'High Speed Rail', 'Internet Neutrality', 'Scientific Discoveries', 'Stem Cell Research']
issues = issues.sort()

issues.forEach(function(issue){
	var div = $('<a class="issue list-group-item list-group-item-action">'+issue.toLowerCase()+'</a>')
	$("#issues_list").append(div)
});

$(".issue").click( function() {
    $('.issue.selected').removeClass('selected');
    $(this).addClass('selected');
    $(this).css('border-color','#fff');
});


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
//var linkToWriting = function() {
    //var forChange = ___.selected;
    //var forStay = ___.selected;
    //var issue =
    //var official = this.title + ' ' + this.firstName + ' ' + this.lastName;
    //if (medium == '

// requires that html file that imports this script also imports InternalAPIRequests.js

// TODO:Add input validation for zip
var zip = location.href.substr(location.href.indexOf("?")+1);

var generic_card = '<div class="carousel-item ">' +
                '<div class="card" style="width: 800px; height: 480px; padding: 25px 70px">' +
                  '<div class="row">' +
                    '<div class="card-block">' +
                      '<h4 class="card-title">{0}</h4>' +
                      '<p class="card-text">{1} / {2}</p>' +
                    '</div>' +
                    '<div class="container" style="height:250px; width:332px">' +
                      '<img class="img-responsive" style="height:320px; width:250px" src="{3}" alt="Card image cap">' +
                    '</div>' +
                  '</div>' +
                '</div>'

httpGetReps(zip,function(resp) {
    var reps = JSON.parse(resp);

    console.log(reps)
    reps.forEach(function(r) {
        var name = r['title'] + ' '+ r['firstName'] + ' ' +  r['lastName'];
        if (name.length > 20) {
          console.log(name)
          name = r['title'] + ' '+ r['firstName'] + '<br>' + r['lastName'];
        }
        $(".carousel-inner").append( generic_card.format(name, r['party'], r['state'], r['image_url']) );
    });

    $(".dummy").remove()
    $(".carousel-item:nth-of-type(1)").addClass("active");
});
