document.getElementById("imageUpload").onclick = function () {
    let xhttp = new XMLHttpRequest(); // create new AJAX request

    const selectedImage = document.getElementById("selectedImage");
    const imageStatus = document.getElementById("imageStatus");

    xhttp.onreadystatechange = function () {
        if(xhttp.status === 200){
            imageStatus.innerHTML = this.responseText;
            selectedImage.value = "";
        }else{
            imageStatus.innerHTML = this.responseText;
        }
    };

    xhttp.open("POST", "/admin/image-upload");
    let formData = new FormData();

    if (selectedImage.files.length > 0) {
        formData.append("image", selectedImage.files[0]);
        xhttp.send(formData);
    } else {
        imageStatus.innerHTML = "برای آپلود باید عکسی انتخاب کنید";
    }
};


document.getElementById("musicUpload").onclick = function () {
    let xhttp = new XMLHttpRequest(); // create new AJAX request

    const selectedMusic = document.getElementById("selectedMusic");
    const musicStatus = document.getElementById("musicStatus");

    xhttp.onreadystatechange = function () {
        if(xhttp.status === 200){
            musicStatus.innerHTML = this.responseText;
            selectedMusic.value = "";
        }else{
            musicStatus.innerHTML = this.responseText;
        }
    };

    xhttp.open("POST", "/admin/music-upload");
    let formData = new FormData();

    if (selectedMusic.files.length > 0) {
        formData.append("music", selectedMusic.files[0]);
        xhttp.send(formData);
    } else {
        musicStatus.innerHTML = "برای آپلود باید اهنگی را انتخاب کنید";
    }
};
