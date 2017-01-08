var articles = document.getElementsByClassName('articleEntry'); // get all articles

var reg_jour_vol = /\/toc\/([^\/]+)\/([^\/]+)\//; // the journal's name and volume number

var reg_art_url_title = /href="([^>]+)"><div class="art_title">((?!<\/div>).+)<\/div>/; // the article's url and title

var reg_art_doi = /<a href="([^\"<]+)" class="ref doi">/; // the article doi

var reg_page_range = /<span class="ciationPageRange">([^<]+)<\/span>/; // the page range

var journal, volume, real_url, page_range, art_doi;
[,journal,volume,] = reg_jour_vol.exec(document.baseURI);
switch(journal.substr(0,6))
{
case 'mmsubt':		// Multiscale Modeling and Simulation
    journal = 'MMS';
    break;
case 'sjaday':		// SIAM Journal on Applied Dynamical Systems
    journal = 'SIADS';
    break;
case 'smjmap':		// SIAM Journal on Applied Mathematics
    journal = 'SIAP';
    break;
case 'smjcat':		// SIAM Journal on Computing
    journal = 'SICOMP';
    break;
case 'sjcodc':		// SIAM Journal on Control and Optimization
    journal = 'SICON';
    break;
case 'sjdmec':		// SIAM Journal on Discrete Mathematics
    journal = 'SIDMA';
    break;
case 'sjfmbj':		// SIAM Journal on Financial Mathematics
    journal = 'SIFIN';
    break;
case 'sjisbi':		// SIAM Journal on Imaging Sciences
    journal = 'SIIMS';
    break;
case 'sjmaah':		// SIAM Journal on Mathematical Analysis
    journal = 'SIMA';
    break;
case 'sjmael':		// SIAM Journal on Matrix Analysis and Applications
case 'sjamdu':		// SIAM Journal on Algebraic Discrete Methods
    journal = 'SIMAX';
    break;
case 'sjnaam':		// SIAM Journal on Numerical Analysis
    journal = 'SINUM';
    break;
case 'sjope8':		// SIAM Journal on Optimization
    journal = 'SIOPT';
    break;
case 'sjoce3':		// SIAM Journal on Scientific Computing
    journal = 'SISC';
    break;
case 'sjuqa3':		// SIAM/ASA Journal on Uncertainty Quantification
    break;
case 'siread':		// SIAM Review
    journal = 'SIREV';
    break;
case 'tprbau':		// Theory of Probability and Its Applications
    journal = 'TVP';
    break;
}
var real_host = "http://166.111.120.94";
for (var i = 0; i < articles.length; i++)
{
    page_range = reg_page_range.exec(articles[i].innerHTML)[1];
    art_doi = reg_art_doi.exec(articles[i].innerHTML)[1].split('/').pop();
    if (art_doi.length == 7)	// the Locus database
    {
	real_url = real_host + '/OpenPDF-SIAMLOCUS/DATA/' + journal + 'volume-' + ('0' + volume).slice(-2) + art_doi + '.pdf';
    }
    else
    {
	var doi = art_doi.slice(-1-5,-1);
	real_url = real_host + '/OpenPDF-SIAM/DATA/' + doi + '.pdf';
    }
    articles[i].innerHTML = articles[i].innerHTML.replace(reg_art_url_title,'href="' + real_url + '" title="' + art_doi + '.pdf"><div class="art_title">$2, ' + page_range + '</div>');
}

//http://166.111.120.94/OpenPDF-SIAM/OpenFT.exe?FileName=/89753.pdf
