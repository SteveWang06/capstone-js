
var phoneList = [];

function createPhone(){
    var name = document.getElementById("name").value;
    var price = document.getElementById("price").value;
    var screen = document.getElementById("screen").value;
    var backCamera = document.getElementById("backCamera").value;
    var frontCamera = document.getElementById("frontCamera").value;
    var frontCamera = document.getElementById("img").value;
    var desc = document.getElementById("desc").value;
    var type = document.getElementById("type").value;

    var newPhone = new Phone(
        name, price, screen, backCamera, frontCamera,img, desc, type
    );

    axios({
        url: "https://634235dc20f1f9d7997ef83f.mockapi.io/api/phone",
        method: "POST",
        data: newPhone,
    })
        .then(function(res){
            console.log(res);
            getPhoneList();
        })
        .catch(function (err) {
            console.log(err);
        });
}

function getPhoneList(){
    var promise = axios({
        url: "https://634235dc20f1f9d7997ef83f.mockapi.io/api/phone",
        method: "GET",
    });
    promise
        .then(function (response){
            phoneList = mapData(response.data);
            renderPhone();
        })
        .catch(function (err){
            console.log(err);
        });
}

function mapData(phoneListLocal){
    var result = [];
    for (var i = 0; i < phoneListLocal.length; i++) {
        var oldPhone = phoneListLocal[i];
        var newPhone = new Phone(
            oldPhone.name,
            oldPhone.price,
            oldPhone.screen,
            oldPhone.backCamera,
            oldPhone.frontCamera,
            oldPhone.img,
            oldPhone.desc,
            oldPhone.type,

        );
        result.push(newPhone);
    }
    return result;
}

function renderPhone(data){
    var tableHTML = "";
    for (let index = 0; index < data.length; index++) {
        var currentPhone = data[index];
        tableHTML += `<tr><td>${currentPhone.img}</td></tr>
                    <tr><td>${currentPhone.name}</td></tr>
                    <tr><td>${currentPhone.screen}</td></tr>
                    <tr><td>${currentPhone.backCamera}</td></tr>
                    <tr><td>${currentPhone.frontCamera}</td></tr>
                    <tr><td>${currentPhone.desc}</td></tr>
                    <tr><td>${currentPhone.price}</td></tr>
                    <tr><td>${currentPhone.type}</td></tr>`;
    }
    document.getElementById("tbodyPhone").innerHTML = tableHTML;

}

window.onload = function () {
    // code sẽ chạy khi window đc load lên
    console.log("window load");
    getStudentList();
  };