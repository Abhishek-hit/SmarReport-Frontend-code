// Auto-fill geolocation
    window.onload = function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;
            document.getElementById("location").value = `${lat}, ${lng}`;
          },
          () => {
            document.getElementById("location").value = "Unable to detect location.";
          }
        );
      }
//recent complaint
      fetch("http://localhost:8080/api/complaints/recent")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("recentComplaints");
      container.innerHTML = ""; // clear static

      data.forEach(c => {
        const el = document.createElement("div");
        el.className = "complaint";
        el.innerHTML = `
          <div class="tag">${c.category}</div>
          <strong>${c.location}</strong>
          <p>${c.description}</p>
          <small>${new Date(c.createdAt || c.id).toLocaleString()}</small>
        `;
        container.appendChild(el);
      });
      
    })
    .catch(err => console.error("Failed to load recent complaints", err));
    };
    

    

    // Handle form submission
    document.getElementById("complaintForm").addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);

      fetch("http://localhost:8080/api/complaints/add", {
        method: "POST",
        body: formData,
      })
      .then((res) => res.json())
      .then((data) => {
        alert("Complaint submitted! Ticket ID: " + data.ticketId);
        this.reset();
      })
      .catch((err) => {
        console.error(err);
        alert("Submission failed.");
      });
    });

    function login(){
        
    }