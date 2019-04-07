import React, { Component } from 'react';
import larrow from './left-arrow.svg';
import rarrow from './right-arrow.svg';
import './calendar.css';

import moment from 'moment';
import {isBz, m2d} from './utils';

class MacroDateInput extends Component {
	constructor(props){
		super(props);

		this.monthFormat = "";
		var d;
		if(!props.dateFormat){
//			this.props.dateFormat = "YYYY-MM-DD";
		}

		if(props.defaultValue){
			d = moment(props.defaultValue, this.props.dateFormat);
		}	else {
			d = moment();
		}
			//value: moment().format(this.props.dateFormat),
		this.state = {
			value: moment().format("YYYY-MM-DD"),
			macro: "",
			calendar: moment().format("YYYY-MM-01"),
			open: false
		};
	}

	nextMonth(e){
		var d = moment(this.state.calendar, "YYYY-MM-01");
		d = d.add(1, 'months');
		this.setState({calendar: d.format("YYYY-MM-01")});
	}

	prevMonth(e){
		var d = moment(this.state.calendar, "YYYY-MM-01");
		d = d.subtract(1, 'months');
		this.setState({calendar: d.format("YYYY-MM-01")});
	}

	selectedDate(e){
		var d = moment(e.currentTarget.id, "YYYY-MM-DD");
		this.setState({value: d.format("YYYY-MM-DD"),
									calendar: d.format("YYYY-MM-01"),
									macro: ""});
	}

	monthSelected(e){
		var v = moment(e.currentTarget.value, "YYYY-MM-01");
		this.setState({calendar: e.currentTarget.value});
	}

	doClickCalendar(){
		this.setState({open: !this.state.open});
	}

	handleInputChange(e){
		var v = e.target.value;
		if(typeof(v) === 'string' && v.match(/^\d{4}-\d{2}-\d{2}$/)) {
			var d = moment(v, "YYYY-MM-DD");
			this.setState({value: d.format("YYYY-MM-DD"),
										calendar: d.format("YYYY-MM-01"),
										macro: ""});
		} else {
			this.setState({
				value: e.target.value
			});
		}
	}

	handleKeyPress(e){
		console.log("key:"+e.key);
		var v = this.state.value;
		var d;

		if(e.key == 'Enter'){
			d = m2d(v);
			if(moment.isMoment(d)){
				this.setState({value: d.format("YYYY-MM-DD"),
											calendar: d.format("YYYY-MM-01"),
											macro: v});
			} else {
				this.setState({value: v});
			}
		} else if(typeof(v) === 'string' && v.match(/^\d{4}-\d{2}-\d{2}$/)) {
			d = moment(v, "YYYY-MM-DD");
				this.setState({value: d.format("YYYY-MM-DD"),
											calendar: d.format("YYYY-MM-01"),
											macro: ""});
		}
	}

	handleBlur(e){
		var v = this.state.value;
		var d = m2d(v);

		if(typeof(v) === 'string' && v.match(/^\d{4}-\d{2}-\d{2}$/)) {
			d = moment(v, "YYYY-MM-DD");
			v = "";
		}

		if(moment.isMoment(d)){
			this.setState({value: d.format("YYYY-MM-DD"),
										calendar: d.format("YYYY-MM-01"),
										macro: v});
		} else {
			this.setState({value: v});
		}
	}

	renderCalendar(){
		var control;
		var header;
		var date = moment(this.state.calendar, "YYYY-MM-DD");

		header = (
          <div className="header">
            <div className="hcell">Su</div>
            <div className="hcell">Mo</div>
            <div className="hcell">Tu</div>
            <div className="hcell">We</div>
            <div className="hcell">Th</div>
            <div className="hcell">Fr</div>
            <div className="hcell">Sa</div>
          </div>
		);
		var mstr = [ "January", "February", "March", "April",
            "May", "June", "July", "August", "September",
            "October", "November", "December" ];

		var dd = [];
		var sm = date.clone();
		sm.subtract(3, 'months');
		for(var i = 0; i < 12; i++){
			dd[i] = sm.clone();
			sm = sm.add(1, 'months');
		}
		var opts = dd.map(a => {
			return (<option value={a.format("YYYY-MM-01")}>{mstr[a.month()] + " " + a.year()}</option>);
		});

		var days;	
		var dt = date.startOf('month');
		var m = dt.month();
		while(dt.day() != 0){
			dt = dt.subtract(1, 'days');
		}

		var dd = [];
		for(var i = 0; i < (7*6); i++){
			dd[i] = dt.clone();
			dt.add(1, 'days');
		}

		days = dd.map(d => {
			var cls = "rcell";
			if(!isBz(d)){
				cls += " off";
			}
			if(m != d.month()){
				cls += " not-this-month";
			}
			if(d.format("YYYY-MM-DD") === this.state.value) {
				cls += " selected-date";
			}
			return (<div className={cls} id={d.format("YYYY-MM-DD")} onClick={this.selectedDate.bind(this)}>{d.format("D")}</div>);
		});
		var thisMonth = this.state.calendar;
	
		return (
				<div className="calender" id="calendar">
					<div className="control">
						<div className="button-prev" onClick={this.prevMonth.bind(this)}><img src={larrow} className="arrow" alt="previous month" /></div>
						<select name="select-month" value={thisMonth} onChange={this.monthSelected.bind(this)}>
							{opts}
 						</select>
						<div className="button-next" onClick={this.nextMonth.bind(this)}><img src={rarrow} className="arrow" alt="next month" /></div>
					</div>
					<div className="main">
						{header}
						{days}
					</div>
				</div>
		);
	}

	handleOnFocus(e){
		if(this.props.openOnFocus){
			this.doClickCalendar();
		}
	}

	renderDateInput(){
		return (
      <div className="field-component">
        <div className="input-field-box">
          <input type="text" className="input-field"
						onKeyPress={this.handleKeyPress.bind(this)}
						onBlur={this.handleBlur.bind(this)} // onFocusOut
						onFocus={this.handleOnFocus.bind(this)} // onFocusOut
						onChange={this.handleInputChange.bind(this)}
						value={this.state.value}/>
        </div>
        <div className="button-open" onClick={this.doClickCalendar.bind(this)}>O</div>
      </div>
		);
	}

  render() {
		var dateInput;
		var calendar;
	
		dateInput = this.renderDateInput();
		if(this.state.open){
			calendar = this.renderCalendar();
		}
		return (
			<div className="calendar-input-field">
				{dateInput}
				{calendar}
			</div>
		);
	}
}

export default MacroDateInput;
