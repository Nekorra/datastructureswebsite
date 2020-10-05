function getCode() {
    var r = confirm("ARE YOU SURE YOU WANT TO SUBMIT?");
    if (r == true) {
        var editor = ace.edit("editorCode")
        var code = editor.getValue();
        var user = firebase.auth().currentUser;
        var uid = user.uid;
        console.log(code);

        db.collection('users').doc(uid).update({
            code: code,
        }).then(function () {
            console.log("Document written with ID: ", uid);
        }).catch(function(error) {
            window.alert("Error adding document: ", error);
        });

    }

}

function getoutput() {
    var x = confirm("ARE YOU SURE YOU WANT TO SUBMIT?");
    if (x == true) {
        var user = firebase.auth().currentUser;
        var uid = user.uid;
        var docRef = db.collection("users").doc(uid);
        docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                var bool = doc.data();
                console.log(bool)
                var bool = bool["bool"]
                var points = bool["points"]
                console.log(bool)
            } else {
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    
        if (bool == "true") {
            
            var outputval = document.getElementById("textareaID").value
            console.log(outputval);

            if (outputval == "Hello World!") {
                points = points + 10;
                db.collection('users').doc(uid).update({
                    points: points,
                    bool: "false"
                }).then(function () {
                    console.log("Document written with ID: ", uid);
                }).catch(function(error) {
                    window.alert("Error adding document: ", error);
                });

            }

        } else {
            window.alert("sorry you already submitted")
        }
    }
    

}


