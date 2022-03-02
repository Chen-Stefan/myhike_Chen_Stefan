function read_display_Quote(){
    // console.log("inside the function")

    // get into the right collection, has to be exactly the same as firestore website under +Start collection
    db.collection("quotes").doc("tuesday")
    // onSnapshot is real time reading, need to use a callback function here
    .onSnapshot(tuesdayDoc => {
        console.log(tuesdayDoc.data());
        document.getElementById("quote-goes-here").innerHTML = tuesdayDoc.data().quote
    })
}
read_display_Quote();

function insertName(){
// to check if the user is logged in
    firebase.auth().onAuthStateChanged(user =>{        // this let me have access to the logged in user info
        if (user){
            console.log(user.uid);                  // let me know who is the user logged in
            currentUser = db.collection("users").doc(user.uid);  // will go to the firestore and go to the document of the user
            currentUser.get().then(userDoc=>{
                //get the user name
                var user_Name = userDoc.data().name;
                console.log(user_Name);
                document.getElementById("name-goes-here").innerHTML = user_Name;
                // jQuery way: $("#name-goes-here").text(user_name);
            })
        }
    })
}
insertName();

function writeHikes() {
    //define a variable for the collection you want to create in Firestore to populate data
    var hikesRef = db.collection("hikes");

    hikesRef.add({
        code:"BBY01",
        name: "Burnaby Lake Park Trail",    
        city: "Burnaby",
        province: "BC",
        level: "easy",
        length: "10 km",
        details: "Stefan lives close to here and he visits regularly"
    });
    hikesRef.add({
        code:"AM01",
        name: "Buntzen Lake Trail Trail",    
        city: "Anmore",
        province: "BC",
        level: "moderate",
        length: "10.5 km",
        details: "Stefan thinks it's a beautiful place and would like to hike here"
    });
    hikesRef.add({
        code:"NV01",
        name: "Mount Seymoure Trail",   
        city: "North Vancouver",
        province: "BC",
        level: "hard",
        length: "8.2 km",
        details: "Stefan visits here every quarter"
    });
}


function displayHikes() {
    let hikeCardTemplate = document.getElementById("hikeCardTemplate");
    let hikeCardGroup = document.getElementById("hikeCardGroup");
    
    db.collection("hikes").get()
        .then(allHikes => {
            allHikes.forEach(doc => {
                var hikeName = doc.data().name; //gets the name field
                var hikeID = doc.data().code; //gets the unique ID field
                var hikeDetails = doc.data().details; // get the details field
                let newCard = hikeCardTemplate.content.cloneNode(true);
                newCard.querySelector('.card-title').innerHTML = hikeName;
                newCard.querySelector('.card-details').innerHTML = hikeDetails;
                newCard.querySelector('img').src = `./images/${hikeID}.jpg`;
                hikeCardGroup.appendChild(newCard);
            })

        })
}
displayHikes();








// function displayCards(collection) {
//     let cardTemplate = document.getElementById("hikeCardTemplate");

//     db.collection(collection).get()
//         .then(snap => {
//             var i = 1;
//             snap.forEach(doc => { //iterate thru each doc
//                 var title = doc.data().name;   // get value of the "name" key
//                 var details = doc.data().details;   // get value of the "details" key
//                 let newcard = cardTemplate.content.cloneNode(true);

//                 //update title and text and image
//                 newcard.querySelector('.card-title').innerHTML = title;
//                 newcard.querySelector('.card-text').innerHTML = details;
//                 newcard.querySelector('.card-image').src = "./images/" + collection + ".jpg"; //hikes.jpg

//                 // // give unique ids to all elements for future use
//                 // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
//                 // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
//                 // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

//                 //attach to gallery
//                 document.getElementById(collection + "-go-here").appendChild(newcard);
//                 i++;
//             })
//         })
// }

// displayCards("hikes");