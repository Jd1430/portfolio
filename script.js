document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.sidebar ul li a');
  const menuIcon = document.querySelector('.menu-icon');
  
  links.forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault(); // Prevent the default link behavior

          // Remove the 'active' class from all the links
          links.forEach(l => l.classList.remove('active'));

          // Add the 'active' class to the clicked link
          link.classList.add('active');

          // Get the section ID from the link's id attribute (like 'about-link')
          const sectionId = link.id.replace('-link', '');

          // Activate the section
          activateSection(sectionId);
      });
  });

  // Add event listener to the menu icon
  menuIcon.addEventListener('click', () => {
      resetToInitialState();
  });
});

function activateSection(sectionId) {
    const sections = document.querySelectorAll('.third-container .content');
    
    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show the selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Add smooth transition for appearance
        targetSection.style.transition = "opacity 0.5s";
        targetSection.style.opacity = 1;
    }

    // Make sure the third container is visible
    const thirdContainer = document.querySelector('.third-container');
    thirdContainer.style.display = 'block';
    
    // Optionally add a fade-in effect for the container
    thirdContainer.style.transition = "opacity 0.5s";
    thirdContainer.style.opacity = 1;
}

function resetToInitialState() {
  // Hide the third container
  const thirdContainer = document.querySelector('.third-container');
  thirdContainer.style.display = 'none';
  
  // Remove active class from all the links
  const links = document.querySelectorAll('.sidebar ul li a');
  links.forEach(link => link.classList.remove('active'));

  // Hide all sections
  const sections = document.querySelectorAll('.third-container .content');
  sections.forEach(section => section.classList.remove('active'));
}

//-------------------------------for circle bar%------------------------------------------------//
document.addEventListener('DOMContentLoaded', () => {
    const circles = document.querySelectorAll('.percent');

    circles.forEach(circle => {
        const value = circle.getAttribute('data-percentage'); // Get the percentage value
        const svgCircle = circle.querySelector('svg circle:nth-child(2)'); // Select the second circle (for the color fill)

        // Calculate the stroke-dashoffset based on the percentage
        const radius = svgCircle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (value / 100) * circumference;

        // Apply the calculated offset to the circle's stroke-dashoffset
        svgCircle.style.strokeDasharray = `${circumference} ${circumference}`;
        svgCircle.style.strokeDashoffset = offset;

        // Set the color dynamically based on the value or other logic
        if (value >= 75) {
            svgCircle.style.stroke = '#06a0f9 '; // Green for high percentages
        } else if (value >= 50) {
            svgCircle.style.stroke = '#06a0f9bb'; // Yellow for medium percentages
        } else {
            svgCircle.style.stroke = '#00d2ff'; // Red for low percentages
        }

        // Optionally update the displayed percentage number
        circle.querySelector('.num h3').textContent = `${value}%`;
    });
});

//------------------------------------------------------------------------//

// Tab functionality
const tabButtons = document.querySelectorAll(".tab-button");
const sections = document.querySelectorAll(".projects-gallery, .projects-content");

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    tabButtons.forEach(btn => btn.classList.remove("active"));
    // Hide all sections
    sections.forEach(section => section.style.display = "none");

    // Add active class to clicked button
    button.classList.add("active");
    // Show the corresponding section
    document.querySelector(`[data-section="${button.getAttribute("data-filter")}"]`).style.display = "block";
  });
});

// Modal functionality for images and videos
const modal = document.getElementById("media-modal");
const modalImage = document.getElementById("modal-image");
const modalVideo = document.getElementById("modal-video");
const closeBtn = document.querySelector(".close");

// Function to open modal for image or video
function openModal(type, src) {
  modal.style.display = "block";
  
  if (type === "image") {
    modalImage.src = src;
    modalImage.style.display = "block";
    modalVideo.style.display = "none";
  } else if (type === "video") {
    modalVideo.src = src;
    modalVideo.style.display = "block";
    modalImage.style.display = "none";
    modalVideo.play();
  }
}

// Event listeners for image items
document.querySelectorAll(".image-item img").forEach(image => {
  image.addEventListener("click", () => openModal("image", image.src));
});

// Event listeners for video items
document.querySelectorAll(".video-item video").forEach(video => {
  video.addEventListener("click", () => openModal("video", video.src));
});

// Close modal on close button click
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  modalImage.src = "";
  modalVideo.src = "";
  modalVideo.pause();
});

// Close modal on outside click
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
    modalImage.src = "";
    modalVideo.src = "";
    modalVideo.pause();
  }
});

//-------------------------certification section-------------------//

// Close the modal
function closeModal() {
  document.getElementById("imageModal").style.display = "none";
}

// Function to download the certificate image
function downloadImage(imgPath) {
  const a = document.createElement('a');
  a.href = imgPath;
  a.download = imgPath.split('/').pop(); // Extract the filename
  a.click();
}


//-----------------------------Contact& Map--------------------------//

// Initialize the map and set its view

var map = L.map('map').setView([40.7128, -74.0060], 13); // Replace with your location coordinates

// Load and display the map tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Add a marker for your location
  var marker = L.marker([12.2713327,76.8956055]).addTo(map)
  .bindPopup('Mysuru ,Karnataka')
  .openPopup();

  //Feedback form
  const messageBox = document.getElementById('messageBox');
    const sendMessage = document.getElementById('sendMessage');
    const messageSent = document.getElementById('messageSent');

    // Disable send button by default
    sendMessage.disabled = true;

    // Enable send button only when there is text in the message box
    messageBox.addEventListener('input', () => {
        if (messageBox.value.trim() !== '') {
            sendMessage.disabled = false;
            sendMessage.classList.add('enabled');
        } else {
            sendMessage.disabled = true;
            sendMessage.classList.remove('enabled');
        }
    });

    // Show message sent confirmation and reset form
    sendMessage.addEventListener('click', () => {
        if (!sendMessage.disabled) {
            messageSent.style.display = 'block'; // Show the success message
            setTimeout(() => {
                messageSent.style.display = 'none'; // Hide message after 2 seconds
            }, 2000);
            // Clear the form
            document.getElementById('fullName').value = '';
            document.getElementById('emailAddress').value = '';
            messageBox.value = '';
            sendMessage.disabled = true;
            sendMessage.classList.remove('enabled');
        }
    });