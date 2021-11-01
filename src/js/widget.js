import moment from 'moment';

export default class Widget {
  constructor() {
    this.date = document.querySelector('.date');
    this.checkbox = document.querySelector('.date-check');
    this.dateBack = document.querySelector('.date-input-back');
    this.dateThere = document.querySelector('.date-input-there');
    this.inputBack = document.querySelector('.input-back');
    this.inputThere = document.querySelector('.input-there');
  }

  events() {
    this.dateChoice();
    this.dateBackInput();
    this.dateThereInput();
    Widget.otherClick();
  }

  dateChoice() {
    this.checkbox.addEventListener('click', () => {
      const textThereDate = document.querySelector('.date-input-there > p');
      if (document.querySelector('.date-choice').style.display === 'flex') {
        document.querySelector('.date-choice').style.display = 'none';
      }
      if (this.checkbox.checked) {
        this.dateBack.style = 'display: block';
        this.dateThere.style = 'width: auto';
        textThereDate.textContent = 'Туда:';
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

  static otherClick() {
    document.querySelector('body').addEventListener('click', (ev) => {
      console.log(ev.target);
    });
  }

  static dateMoment() {
    const titleMonth = document.querySelector('.date-month');
    const titleYear = document.querySelector('.date-year');
    const tableBody = document.querySelector('.calendar > tbody');
    const month = moment().format('MMMM');
    // const day = moment().format('dddd');
    const year = moment().format('YYYY');
    const rangeDay = moment.locale();
    // console.log(day, month, year);
    console.log(rangeDay);

    titleMonth.textContent = month;
    titleYear.textContent = year;

    if (!document.querySelector('.calendar > tbody > tr')) {
      for (let i = 0; i < 5; i += 1) {
        const cloneTr = document.querySelector('.calendar > thead > tr').cloneNode(true);
        tableBody.appendChild(cloneTr);
      }
    }

    const monthDays = Array.from(document.querySelectorAll('.calendar > tbody > tr > th'));
    const startOfMonth = moment().startOf('month');
    const arrDays = [...Array(startOfMonth.daysInMonth())];

    let count = 1;
    for (let i = (startOfMonth.weekday() - 1); i < arrDays.length; i += 1) {
      monthDays[i].textContent = count;
      count += 1;
    }
  }

  static popUpDate(element) {
    element.focus();
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
