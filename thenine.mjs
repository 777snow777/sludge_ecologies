let maxiumimSize = 150
const inatAPIobs = 'https://api.inaturalist.org/v1/observations?project_id=127096&order=desc&order_by=created_at&per_page=200';
const inatAPIproj = 'https://api.inaturalist.org/v1/observations/species_counts?project_id=127096';

let cols = 30
let ecologyW = 250
let results
let red
let green 
let blue
window.onload = (ev) => {
    fetchProjectInfo()
    fetchEcologies()

}

function fetchProjectInfo() {
    fetch(inatAPIproj)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        document.getElementById("species-count").innerHTML= data.total_results
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
}


function fetchEcologies() {
    fetch(inatAPIobs)
    .then(response => response.json())
    .then(data => {
        initializeEcosystem(data.results);
        console.log('Data received:', data);
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
}

async function readJSON(file) {
    const response = await fetch(file);
    const jsonData = await response.json();
    return jsonData;
}



function initializeEcosystem(results) {
    let ecologyCountC = 0
                
    let ecosystem = document.getElementById("ecosystem")
    ecosystem.innerHTML =""
    while (ecologyCountC < cols){
        let selectedEcology = document.createElement("div")
        let wiki = document.createElement("a")
        let resultIndex = Math.floor(Math.random()*results.length)
        let species = results[resultIndex]
        if (species.taxon != null){
            let speciesName =""
            if (species.photos.length == 0 || species.taxon.name == null){
                break
            }
            if (species.taxon.name != null ) {
                speciesName = species.taxon.name
            }
            wiki.innerHTML =speciesName
            wiki.setAttribute("href", species.taxon.wikipedia_url)
            wiki.className ="protected"
            selectedEcology.appendChild(wiki)
            if (species.preferred_common_name != ""){
                let nameTxt = document.createElement("div")
                nameTxt.innerHTML=species.species_guess
                nameTxt.style.fontSize="0.85em"
                selectedEcology.appendChild(nameTxt)
            }            
            let photo = document.createElement("img")
            photo.className ="photo"
            let photoIndex = Math.floor(species.photos.length*Math.random())
            let path = species.photos[photoIndex].url.split("square")
            let ext = path.pop()
            let highRes = path.join("") 
            highRes += "original"
            highRes += ext
            photo.src =highRes
            selectedEcology.appendChild(photo)

            ecosystem.appendChild(selectedEcology)
            selectedEcology.style.width = 4+ 8*Math.random()+"%"
            // selectedEcology.style.minWidth =ecologyW+"px"
            selectedEcology.classList.add("selectedEcology")
            selectedEcology.id = ecologyCountC

            let cell = document.createElement("div")
            cell.style.width =ecologyW+"px"
            cell.style.height="80vh"
        }
        ecologyCountC +=1
    }
    
}

function toggleAudio(e){
    if (e.target.className == "play"){ 
        e.target.play()
        toggle.innerHTML="&#9208;"
        toggle.className ="pause"
    }else{
        e.target.pause()
        toggle.innerHTML="&#9658;" 
        toggle.className ="play"

    }
}
