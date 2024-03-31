

document.getElementById("myForm").addEventListener("submit", function(event) {
    var nameInput = document.getElementById("form6Example3");
    var phoneInput = document.getElementById("form6Example6");
    var addressInput = document.getElementById("form6Example4");
    var emailInput = document.getElementById("form6Example5");

    var nameError = document.getElementById("nameError");
    var phoneError = document.getElementById("phoneError");
    var addressError = document.getElementById("addressError");
    var emailError = document.getElementById("emailError");

    nameError.textContent = "";
    phoneError.textContent = "";
    addressError.textContent = "";
    emailError.textContent = "";

    if (!nameInput.validity.valid || nameInput.value.length < 2) {
        nameError.textContent = "Please enter a valid name.";
        event.preventDefault();
    }

    if (!phoneInput.validity.valid) {
        phoneError.textContent = "Please enter a 10-digit phone number.";
        event.preventDefault();
    }

    if (!addressInput.validity.valid) {
        addressError.textContent = "Please enter your address.";
        event.preventDefault();
    }

    if (!emailInput.validity.valid) {
        emailError.textContent = "Please enter a valid email address.";
        event.preventDefault();
    }
});
