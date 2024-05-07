document.addEventListener("DOMContentLoaded", function () {
    const addEventBtn = document.getElementById("addEventBtn");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const monthYear = document.getElementById("monthYear");
    const daysContainer = document.querySelector(".days");
    const eventForm = document.getElementById("eventForm");
    const eventDetails = document.getElementById("eventDetails");
  
    let currentDate = new Date();
    let events = {};
  
    renderCalendar(currentDate);
  
    addEventBtn.addEventListener("click", () => {
      eventForm.style.display = "block";
      document.getElementById("eventDate").value = currentDate
        .toISOString()
        .slice(0, 10); // Pre-fill with today's date
    });
  
    prevBtn.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar(currentDate);
    });
  
    nextBtn.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar(currentDate);
    });
  
    function renderCalendar(date) {
      monthYear.textContent = `${getMonthName(date.getMonth())} ${date.getFullYear()}`;
      daysContainer.innerHTML = "";
  
      const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      const daysInMonth = lastDayOfMonth.getDate();
  
      let dayOfWeek = firstDayOfMonth.getDay();
      if (dayOfWeek === 0) dayOfWeek = 7; // Convert Sunday (0) to 7
  
      for (let i = 1; i < dayOfWeek; i++) {
          const emptyDay = document.createElement("div");
          emptyDay.classList.add("day", "empty");
          daysContainer.appendChild(emptyDay);
      }
  
      for (let i = 1; i <= daysInMonth; i++) {
          const day = document.createElement("div");
          day.textContent = i;
          day.classList.add("day");
  
          const dateKey = `${date.getFullYear()}-${padNumber(date.getMonth() + 1)}-${padNumber(i)}`;
          if (events[dateKey]) {
              Object.values(events[dateKey]).forEach((event) => {
                  const eventElement = document.createElement("div");
                  eventElement.classList.add("event");
                  eventElement.addEventListener("click", () => {
                      showEventDetails(event.type, event.time, event.description, event.serviceType); // Pasamos el tipo de dispositivo y el tipo de servicio del evento
                  });
                  day.appendChild(eventElement);
              });
          }
  
          daysContainer.appendChild(day);
      }
  }
  
    function getMonthName(monthIndex) {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return months[monthIndex];
    }
  
    function padNumber(num) {
      return num.toString().padStart(2, "0");
    }
  
    document.getElementById("closeForm").addEventListener("click", function () {
      eventForm.style.display = "none";
    });
  
    document
      .getElementById("saveEventBtn")
      .addEventListener("click", function () {
        const eventType = document.getElementById("eventType").value;
        const eventDate = document.getElementById("eventDate").value;
        const eventTime = document.getElementById("eventTime").value;
        const eventDescription = document.getElementById("eventDescription").value;
        const eventServiceType = document.getElementById("eventServiceType").value;
  
        const dateKey = `${eventDate}`;
        if (!events[dateKey]) {
          events[dateKey] = [];
        }
  
        events[dateKey].push({ 
          type: eventType,
          time: eventTime,
          description: eventDescription,
          serviceType: eventServiceType 
        });
  
        renderCalendar(currentDate);
  
        eventForm.style.display = "none";
      });
  
    document
      .getElementById("closeDetails")
      .addEventListener("click", function () {
        eventDetails.style.display = "none";
      });
  
    // Función para mostrar detalles del evento
    function showEventDetails(eventType, eventTime, eventDescription, eventServiceType) {
      const eventDetailsContent = document.getElementById("eventDetailsContent");
      eventDetailsContent.innerHTML = `
          <p><strong>Tipo de Dispositivo:</strong> ${eventType}</p>
          <p><strong>Fecha:</strong> ${eventDate.value}</p>
          <p><strong>Hora: ${eventTime}</p>
          <p><strong>Descripción:</strong> ${eventDescription}</p>
          <p><strong>Tipo de Servicio:</strong> ${eventServiceType}</p>
      `;
      eventDetails.style.display = "block";
    }
  });
