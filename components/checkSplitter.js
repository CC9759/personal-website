let priceCount;
let tax;
let personCount = 0;
let peopleList = new Map();
const submit = document.querySelector("#submit");
const addPerson = document.querySelector("#addPerson");

submit.addEventListener("click", (e) => {
    const totalPrice = document.querySelector("#totalPrice");
    // prevent the form from submitting
    e.preventDefault();

    // show the form values
    const formData = new FormData(totalPrice);
    priceCount = Number(formData.get("price"));
    tax = Number(formData.get("tax"));
    document.querySelector("#totalPrice").reset();
    console.log("Total Price: " + (priceCount + tax));
});

addPerson.addEventListener("click", (e) => {
    currentPerson = personCount;
    const removeButtonHTML = `<button class='remove' id=${currentPerson} onclick='removePerson(this.id)'>Remove</button>`;
    const addItemButtonHTML = `<button class='addItem' id=${currentPerson} onclick='addItem(this.id)'>Add Item</button>`;

    console.log("Adding Person " + currentPerson);
    peopleList.set(currentPerson, []);
    document.getElementById('people').innerHTML += (
        `<li id='person${currentPerson}'> ${removeButtonHTML} ${addItemButtonHTML} Person ${currentPerson + 1} <ul style="list-style: none;"></ul> </li>`
    );
    personCount++;
});

function removePerson(removeIndex){
    console.log("Removing Person " + removeIndex);
    peopleList.delete(Number(removeIndex));
    document.getElementById(`person${removeIndex}`).remove();
}

function addItem(personIndex){
    let person = document.getElementById(`person${personIndex}`);
    personIndex = Number(personIndex);
    const formData = new FormData(document.querySelector("#itemInfo"));
    document.querySelector("#itemInfo").reset();

    let itemName = formData.get("itemName");
    let itemPrice = Number(formData.get("itemPrice"));
    if(itemName == ""){
        itemName = "Item";
    }
    itemIndex = peopleList.get(personIndex).length;
    peopleList.get(personIndex).push(itemPrice);
    const removeButtonHTML = `<button class='remove' id='${personIndex},${itemIndex}' onclick='removeItem(this.id)'>Remove</button>`;

    person.querySelector("ul").innerHTML += (
        `<li id="${personIndex},${itemIndex}">${removeButtonHTML} ${itemName}: $${itemPrice}</li>`
    );
    console.log(`Adding ${itemName} of $${itemPrice} to Person ${personIndex}`);
}

function removeItem(indexPair){
    indexPair = indexPair.split(",");
    let personIndex = Number(indexPair[0]);
    let itemIndex = Number(indexPair[1]);

    console.log(`Removing Item ${itemIndex} from Person ${personIndex}`);
    peopleList.get(personIndex).splice(itemIndex, 1);
    itemListDoc = document.querySelector(`#person${personIndex}`);
    itemListDoc.querySelector(`[id=\"${personIndex},${itemIndex}\"]`).remove();
}

function calculate(){
    priceList = new Array(peopleList.size);

    //calculate prices
    if(noItems()){
        for(let i = 0; i < peopleList.size; i++){
            priceList[i] = (priceCount/peopleList.size);
        }
    }
    else{
        let total = priceCount + tax;
        let itemTotal = 0;
        let count = 0;

        for(var itemPriceList of peopleList.values()){
            priceList[count] = calculateItemTotal(itemPriceList);
            itemTotal += priceList[count++];
        }

        total -= itemTotal;
        for(let i = 0; i < peopleList.size; i++){
            priceList[i] += (total/peopleList.size);
        }
    }
    
    //build HTML
    let htmlString = '<ul style="list-style: none;">'
    count = 0;
    for(var itemPriceList of peopleList.values()){
        htmlString += `<li>Total: ${priceList[count++].toFixed(2).replace(/^0+/, '')}</li>`;
        htmlString += "<br>".repeat(itemPriceList.length);
    }
    htmlString += "</ul>"

    document.querySelector("#pay").innerHTML = ""
    document.querySelector("#pay").innerHTML += htmlString;
}

function noItems(){
    for(var person of peopleList){
        if(person.size != 0){
            return false;
        }
    }
    return true;
}

function calculateItemTotal(lst){
    let total = 0;

    for(var i of lst){
        total += i;
    }
    return total;
}

//known bugs, when deleting or adding items, it does not update the total