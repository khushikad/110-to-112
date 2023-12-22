//https://teachablemachine.withgoogle.com/models/WoSQw2oqc/

prediction1="";
prediction2="";

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90

});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function takephoto() {
    Webcam.snap(function (data_uri) {
        document.getElementById("snapshotresult").innerHTML = "<img id='myphoto' src='" + data_uri + "'>"
    });

}
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/WoSQw2oqc/model.json", modelloaded);

function modelloaded() {
    console.log("modelloaded");
}

function check() {
    img = document.getElementById("myphoto");
    classifier.classify(img, gotresult);

}

function gotresult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("emotion1").innerHTML=results[0].label;
        document.getElementById("emotion2").innerHTML=results[1].label;
        prediction1= results[0].label;
        prediction2= results[1].label;
        if(prediction1=="ok"){
            document.getElementById("updateemoji1").innerHTML= "&#128076;";
        }
        if(prediction2=="ok"){
            document.getElementById("updateemoji2").innerHTML= "&#128076;";
        }
        if(prediction1=="thumbsup"){
            document.getElementById("updateemoji1").innerHTML= "&#128077";
        }
        if(prediction2=="thumbsup"){
            document.getElementById("updateemoji2").innerHTML= "&#128077";
        }
        if(prediction1=="peace"){
            document.getElementById("updateemoji1").innerHTML= "&#9996;";
        }
        if(prediction2=="peace"){
            document.getElementById("updateemoji2").innerHTML= "&#9996;";
        }
       speak() ;
    }

}
function speak(){
    synth=window.speechSynthesis;
    s1="The first prediction is "+  prediction1;
    s2="The second prediction is "+  prediction2;
    saythis=new SpeechSynthesisUtterance(s1+s2);
    synth.speak(saythis);
 }