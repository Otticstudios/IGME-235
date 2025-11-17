// 1
  	window.onload = (e) => {document.querySelector("#search").onclick = searchButtonClicked};
	
	// 2
	let displayTerm = "";
// 3 Function to get search terms
function searchButtonClicked()
{
    //1 Amiibo API URL
    const amiiboURL= "https://www.amiiboapi.com/api/amiibo/";
    //2 Build up URL string
    let URL= amiiboURL;
    //3 Grab Users chosen search Filter (Name, Game Series, Amiibo Series, Character Name, Type)
    let filter= document.querySelector("#filter").value;
    URL+="?"+filter;
    //4 Get SearchTerm
	let term= document.querySelector("#searchterm").value;
	displayTerm=term;
	//5 trim Searchterm
	term=term.trim();
	//6 Encode Spaces
	term= encodeURIComponent(term);
	//7 if no Search terms, return
	if(term.length<1) return;
    //8 Add Search term to URL
    URL+="="+term;
 //9 update UI
	document.querySelector("#status").innerHTML="<b>Searching for '"+ displayTerm+"'</b>";
		//10 Log URL
		console.log(URL);
		// 12 Request data!
		getData(URL);

}
//4
function getData(url)
	{
		//1
		let xhr= new XMLHttpRequest();
		//2
		xhr.onload= dataLoaded;
		//3
		xhr.onerror= dataError;
		//4
		xhr.open("GET",url);
		xhr.send();
		
	}
//Callback functions
	function dataLoaded(e)
	{
		let xhr=e.target;
		console.log(xhr.responseText);
		let  obj= JSON.parse(xhr.responseText);
		if(!obj.amiibo||obj.amiibo.length==0){
			document.querySelector("#status").innerHTML = "<b>No results found for '"+displayTerm+"'</b>";
			return;
		}
		let results = obj.amiibo;
		console.log("results.legnth = "+results.length);
		let bigString ="<p><i>Here are "+results.length+" results for '"+displayTerm+"'</i></p>";
        //Loop
		for(let i=0;i<results.length;i++)
            {
                let result=results[i];
                //Grab Results
                let name= result.name;
                let game= result.gameSeries;
                let series= result.amiiboSeries;
                let type= result.type;
                let character= result.character;
                let imageURL= result.image;
                if(!imageURL) imageURL="images/no-image-found.png";
                let line=`<div class="result">
				<h3>${name}</h3>
                <img src="${imageURL}">
                <p>Character: ${character} <br>
                Game Series: ${game} <br>
                Amiibo Series: ${series} <br>
                Type: ${type}</p> </div>`;
                bigString+=line;
            }
        document.querySelector('#content').innerHTML=bigString;
		document.querySelector('#status').innerHTML="<b>Success!</b>";
    }
function dataError(e)
	{
		console.Log("An error occured");
	}