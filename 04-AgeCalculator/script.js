const ageCalculate = () => {
  const today = new Date();
  const inputDate = new Date(document.getElementById("date-input").value);

  const birth = {
    date: inputDate.getDate(),
    month: inputDate.getMonth() + 1,
    year: inputDate.getFullYear(),
  };

  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDate = today.getDate();

  if (isFutureDate(birth, currentYear, currentMonth, currentDate)) {
    alert("Not Born Yet");
    display("-", "-", "-");
    return;
  }

  const { years, months, days } = calculateAge(
    birth,
    currentYear,
    currentMonth,
    currentDate
  );

  display(years,months,days)
};

const isFutureDate = (birth, currentYear, currentMonth, currentDate) => {
  return (
    birth.year > currentYear ||
    (birth.year === currentYear &&
      (birth.month > currentMonth ||
        (birth.month === currentMonth && birth.date > currentDate)))
  );
};

const calculateAge=(birth,currentYear,currentMonth,currentDate)=>{
    let years=currentYear-birth.year
    let months,days

    if (currentMonth < birth.month) {
    years--;
    months = 12 - (birth.month - currentMonth);
  } else {
    months = currentMonth - birth.month;
  }

  if (currentDate < birth.date) {
    months--;
    const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const daysInLastMonth = getDays(lastMonth, currentYear);
    days = daysInLastMonth - (birth.date - currentDate);
  } else {
    days = currentDate - birth.date;
  }

  return { years, months, days };
}

const getDays=(month,year)=>{
    const isLeap=year%4===0 && (year%100!=0 || year%400===0)
    const getDaysInMonth=[31,isLeap?29:28,31,30,31,30,31,31,30,31,30,31]
    return getDaysInMonth[month-1]
}

const display=(year,month,day)=>{
    document.getElementById("year").textContent=year
    document.getElementById("month").textContent=month
    document.getElementById("day").textContent=day
}

document.getElementById("cal").addEventListener("click", ageCalculate);


