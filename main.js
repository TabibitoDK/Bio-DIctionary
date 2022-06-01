const mainTextFile = 'https://tabibitodk.github.io/StudyApp/data/biology%20enskicopedia/links.txt';
const headerHttp = 'https://tabibitodk.github.io/StudyApp/data/biology%20enskicopedia/'
const resultSearchTerm = document.getElementById('resultSearchTerm')
const resultTerm = document.getElementById('resultTerm')
const resultDescription = document.getElementById('resultDesc')
const searchInput = document.getElementById('searchbar')
var dat;
var datassss = [];

var HTML=""
var HTMLTerm = ""
var HTMLDesc = ""

document.addEventListener('click', function(e){
    //console.log(e.target.value)
    if (e.target.innerHTML ==""){
        return
    }
    result = dataHandler.simpleSearch(datassss, e.target.innerHTML)
    //console.log(result.length)
    if (result.length == 0 || result.length == null){
        return
    }
    HTMLDesc =""
    console.log(e.target.innerHTML)
    for (x=0; x<result.length; x++){
        HTMLTerm = datassss[result[x]].term
        var strings = datassss[result[x]].description.replace(/ ; /g,'\n')
        HTMLDesc += strings + '\n' + '\n'
    }
    resultTerm.innerText = HTMLTerm
    resultDescription.innerText = HTMLDesc
})

window.addEventListener('load', awake);

async function awake(){ 
    await dataHandler.allDataLoader(mainTextFile)
}

searchInput.addEventListener('keyup', function (input) {
    HTML = ""
    if (input.target.value == "" || input.target.value == undefined){
        return
    }
    result = dataHandler.simpleSearch(datassss, input.target.value)
    //console.log(result)
    for (x=0; x<result.length; x++){
        HTML += `<li class="btn w-100 ms-0 text-start">${datassss[result[x]].term}</li>`
    }
    resultSearchTerm.innerHTML = HTML
})


class bioData {
    constructor (term, description){
        this.term = term
        this.description = description
    }
}


dataHandler = {
    allDataLoader: async function (mainDataFile) {
        var datas = await fetch(mainDataFile)
        datas = await datas.text()
        datas = datas.match(/[^\r\n]+/g) 
        for (x=0; x<datas.length; x++){
            var datass = await fetch(headerHttp + datas[x])
            datass = await datass.text()
            datass = datass.match(/[^\r\n]+/g) 
            for(i=0; i<datass.length; i++){
                var datasss = datass[i].split(" = ")
                if (datasss.length == 2){
                    datassss[datassss.length] = new bioData(datasss[0], datasss[1])
                }
            }
        }
    },
    simpleSearch: function (data, term){
        dataNum = []
        for (x=0; x<data.length; x++){
            var lowerCaseData = String(data[x].term).toLowerCase()
            if (data[x].term.includes(term) || String(lowerCaseData).includes(term)){
                dataNum[dataNum.length] = x
            }
        }
        return dataNum
    },
    checkRepeat: function (data, term){ 
        for (x=0; x<data.length; x++){
            if ( term === data[x]){
                return true
            }
        }
        return false
    }
}

