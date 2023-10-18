document.addEventListener('DOMContentLoaded', function () {
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const dateRangeInfo = document.getElementById('date-range-info');
    const calendar = document.getElementById('calendar');
    const numberOfLeadsInput = document.getElementById('number-of-leads');
    const expectedLeadCount = document.getElementById('expected-lead-count');
    const submitButton = document.getElementById('submit-button');
    let excludedDates = [];
  
    // Add event listeners for date inputs
    startDateInput.addEventListener('input', updateDateRangeInfo);
    endDateInput.addEventListener('input', updateDateRangeInfo);
  
    // Add event listeners for excluded dates
    calendar.addEventListener('click', handleDateExclusion);
  
    // Add event listener for number of leads input
    numberOfLeadsInput.addEventListener('input', updateExpectedLeadCount);
  
    // Add event listener for submit button
    submitButton.addEventListener('click', submitData);
  
    function updateDateRangeInfo() {
      const startDate = new Date(startDateInput.value);
      const endDate = new Date(endDateInput.value);
      const dateDifference = (endDate - startDate) / (1000 * 60 * 60 * 24);
  
      dateRangeInfo.textContent = `Selected Range: ${dateDifference} days`;
    }
  
    function handleDateExclusion(event) {
      if (event.target.tagName === 'BUTTON') {
        const date = event.target.getAttribute('data-date');
  
        if (excludedDates.includes(date)) {
          excludedDates = excludedDates.filter((d) => d !== date);
          event.target.classList.remove('excluded');
        } else {
          excludedDates.push(date);
          event.target.classList.add('excluded');
        }
      }
      updateExpectedLeadCount();
    }
  
    function updateExpectedLeadCount() {
      const leads = parseInt(numberOfLeadsInput.value);
      const startDate = new Date(startDateInput.value);
      const endDate = new Date(endDateInput.value);
      const dateDifference = (endDate - startDate) / (1000 * 60 * 60 * 24);
      const validDateDifference = dateDifference - excludedDates.length;
      const expectedCount = Math.round((leads / dateDifference) * validDateDifference);
  
      expectedLeadCount.textContent = expectedCount;
    }
    submitButton.addEventListener('click', submitData);

    function submitData() {
    
        // Collect data to be sent
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;
        const leads = numberOfLeadsInput.value;
        const excluded = excludedDates;
      
        // Prepare the data as an object
        const data = {
          startDate,
          endDate,
          leads,
          excluded,
          expectedLeadCount: expectedLeadCount.textContent,
        };
      
        // Define the URL where you want to send the data
        const url = 'https://example.com/your-api-endpoint';
      
        // Send the data using the Fetch API
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Failed to submit data.');
            }
          })
          .then((responseData) => {
            // Handle the response from the server as needed
            console.log('Data submitted successfully:', responseData);
            // You can show a success message or perform other actions here.
          })
          .catch((error) => {
            console.error('Error submitting data:', error);
            // Handle the error, show an error message, or retry the submission.
          });
      }
      
      // Implement your AJAX data submission here
      // You can send data like startDateInput.value, endDateInput.value, excludedDates, numberOfLeadsInput.value, and expectedLeadCount.textContent
      // For example, you can use the fetch API to send a POST request to your server.
    });
    document.addEventListener('DOMContentLoaded', function () {
      const startDateInput = document.getElementById('start-date');
      const endDateInput = document.getElementById('end-date');
      const dateRangeInfo = document.getElementById('date-range-info');
      const calendar = document.getElementById('calendar');
      const numberOfLeadsInput = document.getElementById('number-of-leads');
      const expectedLeadCount = document.getElementById('expected-lead-count');
      const submitButton = document.getElementById('submit-button');
      let excludedDates = [];
    
      // Add event listeners for date inputs
      startDateInput.addEventListener('input', updateDateRangeInfo);
      endDateInput.addEventListener('input', updateDateRangeInfo);
    
      // Add event listeners for excluded dates
      calendar.addEventListener('click', handleDateExclusion);
    
      // Add event listener for number of leads input
      numberOfLeadsInput.addEventListener('input', updateExpectedLeadCount);
    
      // Add event listener for submit button
      submitButton.addEventListener('click', submitData);
    
      function updateDateRangeInfo() {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);
        const dateDifference = (endDate - startDate) / (1000 * 60 * 60 * 24);
    
        dateRangeInfo.textContent = `Selected Range: ${dateDifference} days`;
      }
    
      function handleDateExclusion(event) {
        if (event.target.tagName === 'BUTTON') {
          const date = event.target.getAttribute('data-date');
    
          if (excludedDates.includes(date)) {
            excludedDates = excludedDates.filter((d) => d !== date);
            event.target.classList.remove('excluded');
          } else {
            excludedDates.push(date);
            event.target.classList.add('excluded');
          }
        }
    
        updateExpectedLeadCount();
      }
    
      function updateExpectedLeadCount() {
        const leads = parseInt(numberOfLeadsInput.value);
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);
        const dateDifference = (endDate - startDate) / (1000 * 60 * 60 * 24);
        const validDateDifference = dateDifference - excludedDates.length;
        const expectedCount = Math.round((leads / dateDifference) * validDateDifference);
    
        expectedLeadCount.textContent = expectedCount;
      }
    
      function submitData() {
        // Implement your AJAX data submission here
        // You can send data like startDateInput.value, endDateInput.value, excludedDates, numberOfLeadsInput.value, and expectedLeadCount.textContent
        // For example, you can use the fetch API to send a POST request to your server.
      }
    
      // Populate the calendar
      function populateCalendar() {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);
        const today = new Date();
        const daysInMonth = new Date(
          startDate.getFullYear(),
          startDate.getMonth() + 1,
          0
        ).getDate();
        calendar.innerHTML = '';
    
        for (let i = 1; i <= daysInMonth; i++) {
          const date = new Date(startDate.getFullYear(), startDate.getMonth(), i);
    
          const button = document.createElement('button');
          button.textContent = i;
          button.setAttribute('data-date', date.toISOString().split('T')[0]);
    
          if (date >= startDate && date <= endDate) {
            button.addEventListener('click', handleDateExclusion);
          } else {
            button.classList.add('excluded');
            button.style.cursor = 'not-allowed';
          }
    
          if (date < today) {
            button.style.cursor = 'not-allowed';
            button.title = 'This date is in the past.';
          }
    
          if (excludedDates.includes(date.toISOString().split('T')[0])) {
            button.classList.add('excluded');
          }
    
          calendar.appendChild(button);
        }
      }
    
      startDateInput.addEventListener('input', populateCalendar);
      endDateInput.addEventListener('input', populateCalendar);
    
      // Initially populate the calendar
      populateCalendar();
    });
    