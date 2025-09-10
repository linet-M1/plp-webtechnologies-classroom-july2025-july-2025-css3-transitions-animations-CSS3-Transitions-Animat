/* =========================
   Week 7 RSVP Script
   ========================= */

/* Global attendee array to demonstrate scope */
let attendees = [];

/* =========================
   Helper Functions
   ========================= */

/**
 * validateForm
 * Parameters: name (string), attendance (string)
 * Returns: boolean (true if valid, false if invalid)
 * Purpose: Checks if form fields are filled
 */
function validateForm(name, attendance) {
  if (name.trim() === "" || attendance === "") {
    return false; // Invalid input
  }
  return true; // Valid input
}

/**
 * addAttendee
 * Parameters: name (string), attendance (string)
 * Purpose: Adds attendee to array and updates the DOM with animation
 */
function addAttendee(name, attendance) {
  // Add to global array
  attendees.push({ name: name, attendance: attendance });

  // Get the list element
  const list = document.getElementById("attendeeList");

  // Create new list item
  const li = document.createElement("li");
  li.textContent = `${name} - ${attendance.toUpperCase()}`;

  // Add to DOM
  list.appendChild(li);

  // Animation automatically handled via CSS keyframe 'slideIn'
}

/**
 * showConfirmation
 * Parameters: message (string)
 * Purpose: Displays a confirmation message with fade-in animation
 */
function showConfirmation(message) {
  const confirmation = document.getElementById("confirmation");
  const messageElement = document.getElementById("confirmationMessage");

  messageElement.textContent = message;

  // Trigger animation by adding 'show' class
  confirmation.classList.add("show");

  // Hide after 3 seconds
  setTimeout(() => {
    confirmation.classList.remove("show");
  }, 3000);
}

/* =========================
   Event Listener for Form
   ========================= */
document.getElementById("rsvpForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form from submitting

  // Get form values
  const name = document.getElementById("name").value;
  const attendance = document.getElementById("attendance").value;

  // Validate
  if (!validateForm(name, attendance)) {
    showConfirmation("Please fill in all fields!"); // Validation feedback
    return; // Stop further execution
  }

  // Add attendee
  addAttendee(name, attendance);

  // Show success confirmation
  showConfirmation(`Thank you, ${name}! Your RSVP has been recorded.`);

  // Clear form fields (optional)
  document.getElementById("rsvpForm").reset();
});

/* =========================
   Demonstrating Advanced JS Concepts
   ========================= */

/* Example: Higher-order function to list all attendees */
function listAttendees(callback) {
  attendees.forEach(callback);
}

// Usage of listAttendees with an anonymous function
listAttendees(function(att) {
  console.log(`Attendee: ${att.name} - ${att.attendance}`);
});

/* Example: Function with return value */
function countYesAttendees() {
  return attendees.filter(att => att.attendance === "yes").length;
}

// Example: Call it to log the number of 'Yes' RSVPs
console.log("Total attending:", countYesAttendees());
