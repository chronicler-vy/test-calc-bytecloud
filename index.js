
const currentStorageValue = document.querySelector("#storage-range-p")
const currentTransferValue = document.querySelector("#transfer-range-p")

const storageInput = document.querySelector("#storage-range")
const transferInput = document.querySelector("#transfer-range")

const backblazePlot = document.querySelector("#backblazeRect")
const bunnyPlot = document.querySelector("#bunnyRect")
const scalewayPlot = document.querySelector("#scalewayRect")
const vultrPlot = document.querySelector("#vultrRect")

const backblazeCost = document.querySelector("#backblaze-cost-value")
const bunnyCost = document.querySelector("#bunny-cost-value")
const scalewayCost = document.querySelector("#scaleway-cost-value")
const vultrCost = document.querySelector("#vultr-cost-value")

let backblazeSum = 0;
let bunnySum = 0;
let scalewaySum = 0;
let vultrSum = 0;

let backblaze = {
    min: 7,
    storage: 0.005,
    transfer: 0.01   
}

let bunny = {
    max: 10,
    storageHDD: 0.01,
    storageSSD: 0.02,
    transfer: 0.01    
}

let scaleway = {
    storageMultiFree: 75,
    storageSingleFree: 75,
    storageMulti: 0.06,
    storageSingle: 0.03,
    transferFree: 75,
    transfer: 0.02
}

let vultr = {
    min: 5,
    storage: 0.01,
    transfer: 0.01    
}

function calcBackblaze(){
    backblazeSum = storageInput.value * backblaze.storage + transferInput.value * backblaze.transfer
    if (backblazeSum > backblaze.min) return backblazeSum
    return backblazeSum = backblaze.min
}

function calcBunny(){
    const checkHdd = document.querySelector("#bunnyRadio_H")
    if (checkHdd.checked) {
        bunnySum = storageInput.value * bunny.storageHDD + transferInput.value * bunny.transfer
    }
    else {
        bunnySum = storageInput.value * bunny.storageSSD + transferInput.value * bunny.transfer
    }
    
    if (bunnySum > bunny.max) return bunnySum = bunny.max
    return bunnySum
}

function calcScaleway(){
    const checkMulti = document.querySelector("#scalewayRadio_M")
    
    if (checkMulti.checked) {
        scalewaySum = (storageInput.value-scaleway.storageMultiFree) * scaleway.storageMulti + (transferInput.value-scaleway.transferFree) * scaleway.transfer
    }
    else {
        scalewaySum = (storageInput.value-scaleway.storageSingleFree) * scaleway.storageSingle + (transferInput.value-scaleway.transferFree) * scaleway.transfer
    }
    if (scalewaySum < 0) return scalewaySum = 0
    return scalewaySum
}

function calcVultr(){
    vultrSum = storageInput.value * vultr.storage + transferInput.value * vultr.transfer
    if (vultrSum > vultr.min) return vultrSum
    return vultrSum = vultr.min
}

function setCost()
{   
    calcBackblaze()
    backblazeCost.innerHTML = (backblazeSum).toFixed(1) + '$'
    backblazePlot.style.width = `${backblazeSum*100/74}%`;

    calcBunny()
    bunnyCost.innerHTML = (bunnySum).toFixed(1) + '$'
    bunnyPlot.style.width = `${bunnySum*100/74}%`;

    calcScaleway()
    scalewayCost.innerHTML = (scalewaySum).toFixed(1) + '$'
    scalewayPlot.style.width = `${scalewaySum*100/74}%`;

    calcVultr()
    vultrCost.innerHTML = (vultrSum).toFixed(1) + '$'
    vultrPlot.style.width = `${vultrSum*100/74}%`;

    let minSum = Math.min(backblazeSum,bunnySum,scalewaySum,vultrSum)

    backblazePlot.style.fill = minSum === backblazeSum ? '#D30035' : '#424242'
    bunnyPlot.style.fill = minSum === bunnySum ? '#F9A318' : '#424242'
    scalewayPlot.style.fill = minSum === scalewaySum ? '#FFFFFF' : '#424242'
    vultrPlot.style.fill = minSum === vultrSum ? '#007BFC' : '#424242'

}

storageInput.addEventListener("input", (event) => {
    currentStorageValue.innerHTML = 'Storage: ' + event.target.value + ' GB'
    setCost()
})


transferInput.addEventListener("input", (event) => {

    currentTransferValue.innerHTML = 'Transfer: ' + event.target.value + ' GB'
    setCost()
})

setCost()
if (window.matchMedia('(max-width:1024px)').matches) {
    var title = document.querySelector('.plot-title-block');
    var plot = document.querySelectorAll('.plot');
    plot.forEach(function(plot){plot.style.height = title.offsetWidth + 'px'});
}
addEventListener("resize", (event) => {
    if (window.matchMedia('(max-width:1024px)').matches) {
        var title = document.querySelector('.plot-title-block');
        var plot = document.querySelectorAll('.plot');
        plot.forEach(function(plot){plot.style.height = title.offsetWidth + 'px'});
    }
    else {
        var plot = document.querySelectorAll('.plot');
        plot.forEach(function(plot){plot.style.height = 50 + 'px'});
    }
});


