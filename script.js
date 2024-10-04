document.addEventListener("DOMContentLoaded", function () {
  const studentForm = document.getElementById("studentForm");
  const studentList = document.getElementById("studentList");

  // Load students from local storage
  let students = JSON.parse(localStorage.getItem("students")) || [];
  displayStudents();

  // Form submission event
  studentForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission behavior

    const studentName = document.getElementById("studentName").value.trim();
    const studentId = document.getElementById("studentId").value.trim();
    const email = document.getElementById("email").value.trim();
    const contactNo = document.getElementById("contactNo").value.trim();

    // Validate inputs
    if (!validateInputs(studentName, studentId, email, contactNo)) {
      return; // Exit the function if validation fails
    }

    // Create a new student object
    const student = {
      name: studentName,
      id: studentId,
      email: email,
      contact: contactNo,
    };

    // Add the new student to the array
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students)); // Save to local storage

    displayStudents(); // Refresh the displayed list of students
    studentForm.reset(); // Reset the form fields
  });

  // Function to display students
  function displayStudents() {
    studentList.innerHTML = ""; // Clear the previous contents

    students.forEach((student, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td class="actions">
                    <button class="edit" onclick="editStudent(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
      studentList.appendChild(row);
    });
  }

  // Function to validate input fields
  function validateInputs(name, id, email, contact) {
    // Validate name (only characters)
    if (!name || name.length === 0) {
      alert("Please enter a valid name (only characters).");
      return false;
    }

    // Validate student ID (only numbers)
    if (!id || isNaN(id) || id <= 0) {
      alert("Please enter a valid Student ID (numbers only).");
      return false;
    }

    // Validate contact number (must be exactly 10 digits)
    if (!contact || isNaN(contact) || contact.length !== 10) {
      alert("Please enter a valid Contact Number (10 digits only).");
      return false;
    }

    // Validate email 
    if (
      !email ||
      email.length === 0 ||
      !email.includes("@") ||
      !email.includes(".")
    ) {
      alert("Please enter a valid email address.");
      return false;
    }

    return true; // All validations passed
  }

  // Function to delete a student record
  window.deleteStudent = function (index) {
    if (confirm("Are you sure you want to delete this record?")) {
      students.splice(index, 1); // Remove student from array
      localStorage.setItem("students", JSON.stringify(students)); // Update local storage
      displayStudents(); // Refresh the displayed list of students
    }
  };

  // Function to edit a student record
  window.editStudent = function (index) {
    const student = students[index]; // Get the student to edit

    // Populate the form fields with the student's existing details for editing
    document.getElementById("studentName").value = student.name;
    document.getElementById("studentId").value = student.id;
    document.getElementById("email").value = student.email;
    document.getElementById("contactNo").value = student.contact;

    // Remove the student from the array so it can be replaced with updated details after editing
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students)); // Update local storage
    displayStudents(); // Refresh the displayed list of students
  };
});
