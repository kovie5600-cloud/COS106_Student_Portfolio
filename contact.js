function sendMessage() {

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let message = document.getElementById("contactMessage").value;

    if (name == "" || email == "" || phone == "" || message == "") {
        document.getElementById("result").innerHTML =
            "Please fill in all the fields.";
        document.getElementById("result").style.color = "red";
    } else {
        document.getElementById("result").innerHTML =
            "Thank you, " + name + "! Your message has been sent successfully.";
        document.getElementById("result").style.color = "green";

        document.getElementById("contactForm").reset();
    }

}