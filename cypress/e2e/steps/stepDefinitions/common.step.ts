export const formatDateForAriaLabel = (date: Date): string => {
    const day = date.getDate();
    const dayName = date.toLocaleDateString('en-GB', { weekday: 'long' });
    const monthName = date.toLocaleDateString('en-GB', { month: 'long' });
    const year = date.getFullYear();
 
    return `${day}, ${dayName} ${monthName} ${year}`;
};

export const formatDateForSearch = (date: Date): string => {
    const day = date.getDate();
    const year = date.getFullYear(); 
    const monthMap = {
      0: 'Jan', 1: 'Feb', 2: 'Mar', 3: 'Apr', 4: 'May', 5: 'Jun',
      6: 'Jul', 7: 'Aug', 8: 'Sep', 9: 'Oct', 10: 'Nov', 11: 'Dec'
    };

    const month = monthMap[date.getMonth()]; 

    return `${day} ${month} ${year}`;
  };

  export function navigateMonthsInCalendarIframe(selector: string)  {
    
    cy.get('iframe.U73P_q')
            .its('0.contentDocument')
            .find(selector)
            .click();
};

export function selectDateInIframe(date: Date)  {
    const formattedDate = formatDateForAriaLabel(date);
    cy.get('iframe.U73P_q')
            .its('0.contentDocument')
            .find(`button[aria-label="${formattedDate}"]`)
            .click();
};

export function navigateToFutureMonth(futureDate, today, navigateSelector) {
  const monthsToClick = (futureDate.getFullYear() - today.getFullYear()) * 12 + (futureDate.getMonth() - today.getMonth()) - 1;

  for (let i = 0; i < monthsToClick; i++) {
    navigateMonthsInCalendarIframe(navigateSelector);
  }
}