// 1
  	window.onload = (e) => {document.querySelector("#search").onclick = searchButtonClicked};
	
	// 2
	let displayTerm = "";
	
	// 3
	function searchButtonClicked(){
		console.log("searchButtonClicked() called");
		//1
		const GIPHY_URL= "https://api.giphy.com/v1/gifs/search?";
		//2
		let GIPHY_KEY= "5PuWjWVnwpHUQPZK866vd7wQ2qeCeqg7";
		//3
		let url= GIPHY_URL;
		url+= "api_key=" +GIPHY_KEY;
		//4
		let term= document.querySelector("#searchterm").value;
		displayTerm=term;
		//5
		term=term.trim();
		//6
		term= encodeURIComponent(term);
		//7
		if(term.length<1) return;
		//8
		url += "&q="+term;
		//9
		let limit = document.querySelector("#limit").value;
		url += "&limit="+limit;
		//10
		document.querySelector("#status").innerHTML="<b>Searching for '"+ displayTerm+"'</b>";
		//11
		console.log(url);
		// 12 Request data!
		getData(url);
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
		if(!obj.data||obj.data.length==0){
			document.querySelector("#status").innerHTML = "<b>No results found for '"+displayTerm+"'</b>";
			return;
		}
		let results = obj.data;
		console.log("results.legnth = "+results.length);
		let bigString ="<p><i>Here are "+results.length+" results for '"+displayTerm+"'</i></p>";
		//Loop
		for(let i=0;i<results.length;i++){
			let result=results[i];

			let smallURL=result.images.fixed_width_small.url;
			if(!smallURL) smallURL= "images/no-image-found.png";
			let url= result.url;
			let rating= (result.rating ? result.rating: "NA").toUpperCase();
			let line= `<div class='result'><img src='${smallURL}' title= '${result.id}' />`;
			line += `<span><a target='_blank' href='${url}'>View on Giphy</a></span>`;
			line +=`<p>Rating: ${rating}</div>`;
			bigString+=line;
		}
		document.querySelector('#content').innerHTML=bigString;
		document.querySelector('#status').innerHTML="<b>Success!</b>";
	}
	function dataError(e)
	{
		console.Log("An error occured");
	}