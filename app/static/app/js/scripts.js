$(document).ready(function() {
    // Initialize select2 for the annotation dropdown
    $('#annotations').select2({
        width: '100%'
    });

    // Handle drag-and-drop for file input
    let dropzone = $("#dropzone");
    let fileInput = $("#fileInput");

    dropzone.on("dragover", function(event) {
        event.preventDefault();
        dropzone.addClass("dragging");
    });

    dropzone.on("dragleave drop", function(event) {
        event.preventDefault();
        dropzone.removeClass("dragging");
    });

    dropzone.on("drop", function(event) {
        let files = event.originalEvent.dataTransfer.files;
        fileInput[0].files = files;
        dropzone.find("span").text(files.length + " file(s) selected");
    });

    fileInput.on("change", function() {
        let files = fileInput[0].files;
        dropzone.find("span").text(files.length + " file(s) selected");
    });

    // Handle image upload form submission
    $("#uploadForm").on("submit", function(event) {
        event.preventDefault();
        const files = $("#fileInput")[0].files;
        const progressBar = $("#progressBar");

        if (files.length === 0) {
            alert("No files selected!");
            return;
        }

        $(".progress").show();
        progressBar.width("0%");

        uploadImages(files, progressBar);
    });

    // Handle annotations form submission
    $("#annotationForm").on("submit", function(event) {
        event.preventDefault();
        const annotations = $("#annotations").val();
        const imageIds = $("#uploaded-images").data("imageIds");

        if (!Array.isArray(imageIds) || imageIds.length === 0) {
            alert("No images to annotate!");
            return;
        }

        if (annotations.length === 0) {
            alert("No annotations selected!");
            return;
        }

        let annotationPromises = imageIds.map(imageId => saveAnnotations(imageId, annotations));

        Promise.all(annotationPromises)
            .then(() => {
                alert("Annotations submitted successfully!");
                showSuccessMessage();
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Failed to submit annotations.");
            });
    });
});

function uploadImages(files, progressBar) {
    let uploadedImages = [];
    let counter = 0;

    for (const file of files) {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("annotations", JSON.stringify([]));

        $.ajax({
            url: "/images/",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            xhr: function () {
                const xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        const percentComplete = (evt.loaded / evt.total) * 100;
                        progressBar.width(percentComplete + "%");
                    }
                }, false);
                return xhr;
            },
            success: function (data) {
                uploadedImages.push(data);
                counter++;
                if (counter === files.length) {
                    progressBar.width("100%");
                    alert("Images uploaded successfully!");
                    displayUploadedImages(uploadedImages);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Error:", textStatus, errorThrown);
                alert("Failed to upload image.");
            }
        });
    }
}

function displayUploadedImages(images) {
    const container = $("#uploaded-images-container").empty();
    const imageIds = images.map(image => image.id);

    // const columnClass = images.length === 1 ? 'col-md-8 offset-md-2' : 'col-md-6';

    let columnClass;

    // Determine the appropriate Bootstrap grid class based on the number of images
    if (images.length === 1) {
        columnClass = 'col-md-8 offset-md-2'; // Larger single image, centered
    } else if (images.length === 2) {
        columnClass = 'col-md-6'; // Two images per row
    } else {
        columnClass = 'col-md-4'; // Three images per row, the standard layout for more than 2
    }


    for (const image of images) {
        const imageItem = $(`
            <div class="${columnClass} mt-3 uploaded-image">
                <div class="card">
                    <img src="${image.image}" alt="Uploaded Image" class="card-img-top">
                    <div class="card-body">
                        <p class="card-text">Status: <span class="badge badge-warning">Pending</span></p>
                    </div>
                </div>
            </div>
        `);
        container.append(imageItem);
    }

    $("#uploaded-images").show();
    $("#uploaded-images").data("imageIds", imageIds); 

    // Move to step 2
    $("#step1").hide();
    $("#step2").show();
}

function saveAnnotations(imageId, annotations) {
    return fetch(`/images/${imageId}/annotate/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ annotations: annotations, status: "annotated" })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    })
    .then(data => {
        $(`#uploaded-images-container .card:has(img[src="${data.image}"]) .badge`).removeClass("badge-warning"). addClass("badge-success").text("Annotated");
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Failed to submit annotations.");
    });
}

function showSuccessMessage() {
    $("#success-message").fadeIn("slow").delay(3000).fadeOut("slow");
}
