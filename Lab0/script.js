function validateForm() {
    let name = document.getElementById("name");
    let reg = document.getElementById("regno");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");

    let nameVal = name.value.trim();
    let regVal = reg.value.trim();
    let emailVal = email.value.trim();
    let phoneVal = phone.value.trim();

    // Reset borders
    name.style.borderColor = "#b3c6ff";
    reg.style.borderColor = "#b3c6ff";
    email.style.borderColor = "#b3c6ff";
    phone.style.borderColor = "#b3c6ff";

    // NAME VALIDATION
    if (nameVal === "") {
        alert("Error: Name cannot be empty.");
        name.style.borderColor = "red";
        name.focus();
        return false;
    }

    // REG NUMBER VALIDATION
    if (!/^\d{10}$/.test(regVal)) {
        alert("Error: Registration Number must contain exactly 10 digits.");
        reg.style.borderColor = "red";
        reg.focus();
        return false;
    }

    // EMAIL VALIDATION
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailVal)) {
        alert("Error: Please enter a valid Email ID.");
        email.style.borderColor = "red";
        email.focus();
        return false;
    }

    // PHONE NUMBER VALIDATION
    if (!/^\d{10}$/.test(phoneVal)) {
        alert("Error: Phone Number must contain exactly 10 digits.");
        phone.style.borderColor = "red";
        phone.focus();
        return false;
    }

    // SUCCESS → Generate Reference ID
    let randomNum = Math.floor(100000 + Math.random() * 900000); 
    let referenceID = "VITAP" + randomNum;

    alert(
        "🎉 Registration Successful!\n\n" +
        "Your Reference ID: " + referenceID
    );

    // CLEAR FORM AFTER SUCCESS
    document.getElementById("regForm").reset();

    // RESET BORDERS AFTER CLEARING
    name.style.borderColor = "#b3c6ff";
    reg.style.borderColor = "#b3c6ff";
    email.style.borderColor = "#b3c6ff";
    phone.style.borderColor = "#b3c6ff";

    return true;
}

function goBack() {
    window.location.href = "index.html";
}
