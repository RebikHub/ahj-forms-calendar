import moment from 'moment';

export default class Widget {
  constructor() {
    this.date = document.querySelector('.date');
    this.checkbox = document.querySelector('.date-check');
    this.dateBack = document.querySelector('.date-input-back');
    this.dateThere = document.querySelector('.date-input-there');
    this.inputBack = document.querySelector('.input-back');
    this.inputThere = document.querySelector('.input-there');
    this.datePrev = document.querySelector('.date-prev');
    this.dateNext = document.querySelector('.date-next');
    this.inputBackValue = {};
    this.inputThereValue = {};
    this.currentInput = null;
    this.count = 0;
  }

  events() {
    this.clickCheckbox();
    this.dateBackInput();
    this.dateThereInput();
    this.clickNextMonth();
    this.clickPrevMonth();
  }

  clickCheckbox() {
    this.checkbox.addEventListener('click', () => {
      const textThereDate = document.querySelector('.date-input-there > p');
      if (document.querySelector('.date-choice').style.display === 'flex') {
        document.querySelector('.date-choice').style.display = 'none';
      }
      if (this.checkbox.checked) {
        this.dateBack.style = 'display: block';
        this.dateThere.style = 'width: auto';
        textThereDate.textContent = 'Туда:';
        document.querySelector('.input-back').value = '';
      } else {
        this.dateBack.style = 'display: none';
        this.dateThere.style = 'width: 99%';
        textThereDate.textContent = 'Дата:';
      }
    });
  }

  dateBackInput() {
    this.inputBack.addEventListener('focus', () => {
      Widget.popUpDate(this.inputBack);
    });
  }

  dateThereInput() {
    this.inputThere.addEventListener('focus', () => {
      Widget.popUpDate(this.inputThere);
    });
  }

  static otherClick(element) {
    for (const i of element) {
      i.addEventListener('click', () => {
        if (document.querySelector('.date-choice').style.display === 'flex' && !i.classList.contains('calendar-days')) {
          document.querySelector('.date-choice').style.display = 'none';
        }
      });
    }
  }

  static dateMoment(m = 0) {
    const titleMonth = document.querySelector('.date-month');
    const titleYear = document.querySelector('.date-year');
    const tableBody = document.querySelector('.calendar > tbody');
    const day = moment().format('D');
    const month = moment().format('M');
    const year = moment().format('YYYY');
    const curMonth = moment().add(m, 'month').format('M');
    const daysInMonth = moment().add(m, 'month').daysInMonth();
    let firstDayMonth = 6;
    if (moment().add(m, 'month').startOf('month').day() !== 0) {
      firstDayMonth = (moment().add(m, 'month').startOf('month').day() - 1);
    }

    console.log(moment().format('M'));

    titleMonth.textContent = moment().add(m, 'month').format('MMMM');
    titleYear.textContent = year;

    if (!document.querySelector('.calendar > tbody > tr')) {
      for (let i = 0; i < 6; i += 1) {
        const cloneTr = document.querySelector('.calendar > thead > tr').cloneNode(true);
        tableBody.appendChild(cloneTr);
      }
    }

    const monthDays = Array.from(document.querySelectorAll('.calendar > tbody > tr > th'));

    for (let i = 0; i < monthDays.length; i += 1) {
      monthDays[i].textContent = '';
      monthDays[i].classList.add('calendar-days');
      monthDays[i].classList.remove('current-date');
    }

    for (let j = 0; j < monthDays.length; j += 1) {
      if (j === firstDayMonth) {
        for (let i = 0; i < daysInMonth; i += 1) {
          monthDays[j + i].textContent = i + 1;
          if ((i + 1) > +day) {
            monthDays[j + i].classList.add('bold-date');
            monthDays[j + i].classList.remove('calendar-days');
          }
          if ((i + 1) === +day && curMonth === month) {
            monthDays[j + i].classList.add('current-date');
          }
        }
      }
    }
    Widget.dateChoiceBack(monthDays, curMonth, year);
    Widget.dateChoiceThere(monthDays, curMonth, year);
    Widget.otherClick(monthDays);
  }

  clickPrevMonth() {
    this.datePrev.addEventListener('click', () => {
      this.count -= 1;
      Widget.dateMoment(this.count);
    });
  }

  clickNextMonth() {
    this.dateNext.addEventListener('click', () => {
      this.count += 1;
      Widget.dateMoment(this.count);
    });
  }

  static dateChoiceBack(element, month, year) {
    console.log(this.inputThereValue);
    for (const i of element) {
      i.addEventListener('click', (ev) => {
        if (document.querySelector('.input-back') === this.currentInput && !i.classList.contains('calendar-days')) {
          if (this.inputThereValue.year <= +year && this.inputThereValue.month <= +month && this.inputThereValue.day <= +ev.target.textContent) {
            document.querySelector('.input-back').value = `${ev.target.textContent}.${month}.${year}`;
          }
        }
      });
    }
  }

  static dateChoiceThere(element, month, year) {
    console.log(this.inputBackValue);
    for (const i of element) {
      i.addEventListener('click', (ev) => {
        if (document.querySelector('.input-there') === this.currentInput && !i.classList.contains('calendar-days')) {
          document.querySelector('.input-there').value = `${ev.target.textContent}.${month}.${year}`;
          this.inputThereValue = {
            year: +year,
            month: +month,
            day: +ev.target.textContent,
          };
        }
      });
    }
  }

  static popUpDate(element) {
    element.focus();
    this.currentInput = element;
    const calendar = document.querySelector('.date-choice');
    if (calendar.style === 'display: flex') {
      calendar.style = 'display: none';
    }
    calendar.style = 'display: flex';
    Widget.dateMoment();
    element.offsetParent.appendChild(calendar);
    calendar.style.top = `${element.offsetTop + element.offsetHeight}px`;
    calendar.style.left = `${element.offsetLeft}px`;
  }
}
