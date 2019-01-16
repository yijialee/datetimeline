import React from "react";
import { DatePicker, Icon } from 'antd';
import moment from 'moment';


import styles from "./timeline.less";


const { MonthPicker } = DatePicker;


class TimeLine extends React.PureComponent {

  constructor(props) {
    super(props);
    const now = new Date();
    this.state = { date: now };
  }


  onDatePickerChange(date) {
    if (date && date.toDate)
      this.setState({ date: date.toDate() });
  }


  getDayList1() {
    const result = [];
    const { date } = this.state;
    if (!date) return result;
    const month = date.getMonth();
    const nextMonth = new Date(date);
    nextMonth.setMonth(month + 1);
    nextMonth.setDate(1);
    const day = date.getDate();
    const dd = new Date(date);
    let i = 1;
    dd.setDate(i);
    while (dd.getTime() < nextMonth.getTime()) {
      const key = `key${dd.getDate()}--${Math.random()}`;
      result.push(
        <div className={styles.day1} key={key}>
          {(day === dd.getDate() ? <div className={styles.float} /> : "")}
        </div>
      );
      i += 1;
      dd.setDate(i);
    }
    return result;
  }

  getDayList() {
    const result = [];
    const { date } = this.state;
    if (!date) return result;
    const month = date.getMonth();
    const nextMonth = new Date(date);
    nextMonth.setMonth(month + 1);
    nextMonth.setDate(1);
    const dd = new Date(date);
    let i = 1;
    dd.setDate(i);
    while (dd.getTime() < nextMonth.getTime()) {
      const key = `key2${dd.getDate()}--${Math.random()}`;
      result.push(<div className={styles.day} key={key}>{dd.getDate()}</div>)
      i += 1;
      dd.setDate(i);
    }
    return result;
  }


  setDay(day) {
    const { date } = this.state;
    date.setDate(day);
    this.setState({ date: new Date(date) });
  }

  addYear(num) {
    const { date } = this.state;
    const year = date.getFullYear();
    date.setFullYear(year + num);
    this.setState({ date: new Date(date) });
  }

  addMonth(num) {
    const { date } = this.state;
    const month = date.getMonth();
    date.setMonth(month + num);
    this.setState({ date: new Date(date) });
  }

  addDay(num) {
    const { date } = this.state;
    const date1 = date.getDate();
    date.setDate(date1 + num);

    this.setState({ date: new Date(date) });
  }





  render() {
    const { date } = this.state;
    const monthFormat = 'YYYY 年 MM 月';
    return (
      <div className={styles.timeline}>
        <div className={styles.head}>
          <MonthPicker
            style={{ width: 130 }}
            format={monthFormat}
            value={moment(date)}
            onChange={(d) => { this.onDatePickerChange(d) }}
          />
          <Icon type="double-left" className={styles.iconbtn} onClick={() => { this.addYear(-1) }} />
          <Icon type="left" className={styles.iconbtn} onClick={() => { this.addMonth(-1) }} />
          <Icon type="caret-right" className={styles.iconbtn} />
          <Icon type="right" className={styles.iconbtn} onClick={() => { this.addMonth(1) }} />
          <Icon type="double-right" className={styles.iconbtn} onClick={() => { this.addYear(1) }} />
        </div>
        <div className={styles.date}>
          <div className={styles.days1}>
            {this.getDayList1()}
          </div>
          <div className={styles.days}>{this.getDayList()}</div>
        </div>
      </div>
    )
  }

}

export default TimeLine;

