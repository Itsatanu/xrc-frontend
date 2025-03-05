export default function TimeAndDate(dateTimeStr) {
    const date = new Date(dateTimeStr);  // Convert string to Date object (in UTC)
  
    // Convert to IST (UTC + 5:30)
    const istDate = new Date(date.getTime()); // Add 5 hours 30 minutes to UTC
  
    const datePart = istDate.toISOString().split('T')[0];  // Extract the date part (yyyy-mm-dd)
    
    // Extract the time part and adjust for AM/PM
    let hours = istDate.getHours();
    let minutes = istDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    // Format minutes to always have two digits
    minutes = minutes < 10 ? '0' + minutes : minutes;
  
    const timePart = `${hours}:${minutes} ${ampm}`;
  
    return { date: datePart, time: timePart };
  }
  
