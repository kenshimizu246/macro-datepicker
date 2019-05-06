import React, { Component } from 'react';
import larrow from './left-arrow.svg';
import rarrow from './right-arrow.svg';
import './calender.css';

import moment from 'moment';
import {isBz, m2d} from './utils';

const monthFormat = "YYYY-MM-01";
const months = [ "January", "February", "March", "April",
            "May", "June", "July", "August", "September",
            "October", "November", "December" ];

class MacroDateInput extends Component {
	constructor(props){
		super(props);

		let dateFormat;
		let date;
		let baseDate;

		if(props.dateFormat === undefined){
			dateFormat = "YYYY-MM-DD";
		}	else {
			dateFormat  = props.dateFormat;
		}

		if(props.defaultValue === undefined){
			date = moment();
		}	else {
			date = moment(props.defaultValue, props.dateFormat);
		}

		if(props.baseDate === undefined){
			baseDate = moment();
		}	else {
			baseDate = moment(props.baseDate, props.dateFormat);
		}

		this.state = {
			dateFormat: dateFormat,
			value: date.format(dateFormat),
			baseDate: baseDate.format(dateFormat),
			macro: "",
			calender: date.format(monthFormat),
			open: false,
		};
	}

	nextMonth(e){
		let d = moment(this.state.calender, monthFormat);
		d = d.add(1, 'months');
		this.setState({calender: d.format(monthFormat)});
	}

	prevMonth(e){
		let d = moment(this.state.calender, monthFormat);
		d = d.subtract(1, 'months');
		this.setState({calender: d.format(monthFormat)});
	}

	selectedDate(e){
		let d = moment(e.currentTarget.id, this.state.dateFormat);
		this.setState({value: d.format(this.state.dateFormat),
									calender: d.format(monthFormat),
									macro: ""});
	}

	monthSelected(e){
		let v = moment(e.currentTarget.value, monthFormat);
		this.setState({calender: e.currentTarget.value});
	}

	doClickCalendar(){
		this.setState({open: !this.state.open});
	}

	handleInputChange(e){
		let v = e.target.value;
		if(typeof(v) === 'string' && v.match(/^\d{4}-\d{2}-\d{2}$/)) {
			let d = moment(v, this.state.dateFormat);
			this.setState({value: d.format(this.state.dateFormat),
										calender: d.format(monthFormat),
										macro: ""});
		} else {
			this.setState({
				value: e.target.value
			});
		}
	}

	handleKeyPress(e){
		console.log("key:"+e.key);
		let v = this.state.value;
		let d;
		let macro2date = (this.props.macro2date === undefined ? m2d : this.props.macro2date);
		let isBizDate = (this.props.isBizDate === undefined ? isBz : this.props.isBizDate);

		if(e.key == 'Enter'){
			d = macro2date(v,moment(this.state.baseDate, this.state.defaultFormat),isBizDate);
			if(moment.isMoment(d)){
				this.setState({value: d.format(this.state.dateFormat),
											calender: d.format(monthFormat),
											macro: v});
			} else {
				this.setState({value: v});
			}
		} else if(typeof(v) === 'string' && v.match(/^\d{4}-\d{2}-\d{2}$/)) {
			d = moment(v, this.state.dateFormat);
				this.setState({value: d.format(this.state.dateFormat),
											calender: d.format(monthFormat),
											macro: ""});
		}
	}

	handleBlur(e){
		let macro2date = (this.props.macro2date === undefined ? m2d : this.props.macro2date);
		let isBizDate = (this.props.isBizDate === undefined ? isBz : this.props.isBizDate);
		let v = this.state.value;
		let d = macro2date(v,moment(this.state.baseDate, this.state.defaultFormat),isBizDate);

		if(typeof(v) === 'string' && v.match(/^\d{4}-\d{2}-\d{2}$/)) {
			d = moment(v, this.state.dateFormat);
			v = "";
		}

		if(moment.isMoment(d)){
			this.setState({value: d.format(this.state.dateFormat),
										calender: d.format(monthFormat),
										macro: v});
		} else {
			this.setState({value: v});
		}
	}

	renderCalendar(){
		let control;
		let header;
		let date = moment(this.state.calender, this.state.dateFormat);
		let isBizDate = (this.props.isBizDate === undefined ? isBz : this.props.isBizDate);

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

		let mm = [];
		let sm = date.clone();
		sm.subtract(3, 'months');
		for(let i = 0; i < 12; i++){
			mm[i] = sm.clone();
			sm = sm.add(1, 'months');
		}
		let opts = mm.map(a => {
			return (<option value={a.format(monthFormat)}>{months[a.month()] + " " + a.year()}</option>);
		});

		let days;	
		let dt = date.startOf('month');
		let m = dt.month();
		while(dt.day() != 0){
			dt = dt.subtract(1, 'days');
		}

		let dd = [];
		for(let i = 0; i < (7*6); i++){
			dd[i] = dt.clone();
			dt.add(1, 'days');
		}

		days = dd.map(d => {
			let cls = "rcell";
			if(!isBizDate(d)){
				cls += " off";
			}
			if(m != d.month()){
				cls += " not-this-month";
			}
			if(d.format(this.state.dateFormat) === this.state.value) {
				cls += " selected-date";
			}
			return (<div className={cls} id={d.format(this.state.dateFormat)} onClick={this.selectedDate.bind(this)}>{d.format("D")}</div>);
		});
		let thisMonth = this.state.calender;
	
		return (
				<div className="calender" id="calender">
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
		let dateInput;
		let calender;
	
		dateInput = this.renderDateInput();
		if(this.state.open){
			calender = this.renderCalendar();
		}
		return (
			<div className="calender-input-field">
				{dateInput}
				{calender}
			</div>
		);
	}
}

export default MacroDateInput;
