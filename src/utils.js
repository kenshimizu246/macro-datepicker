import moment from 'moment';

export const isBz = (v) => {
	var fmt = "MM/DD/YYYY";
	var holidays = {};
	holidays["01/01/2019"] = moment("01/01/2019", fmt);
	holidays["01/14/2019"] = moment("01/14/2019", fmt);
	holidays["02/11/2019"] = moment("02/11/2019", fmt);
	holidays["03/21/2019"] = moment("03/21/2019", fmt);
	holidays["04/29/2019"] = moment("04/29/2019", fmt);
	holidays["04/30/2019"] = moment("04/30/2019", fmt);
	holidays["05/01/2019"] = moment("05/01/2019", fmt);
	holidays["05/02/2019"] = moment("05/02/2019", fmt);
	holidays["05/03/2019"] = moment("05/03/2019", fmt);
	holidays["05/06/2019"] = moment("05/06/2019", fmt);
	holidays["07/15/2019"] = moment("07/15/2019", fmt);
	holidays["08/12/2019"] = moment("08/12/2019", fmt);
	holidays["09/16/2019"] = moment("09/16/2019", fmt);
	holidays["09/23/2019"] = moment("09/23/2019", fmt);
	holidays["10/14/2019"] = moment("10/14/2019", fmt);
	holidays["10/22/2019"] = moment("10/22/2019", fmt);
	holidays["11/04/2019"] = moment("11/04/2019", fmt);
	holidays["11/23/2019"] = moment("11/23/2019", fmt);

	if(moment.isMoment(v)){
		if(v.isoWeekday() === 7 || v.isoWeekday() === 6){
			return false;
		}
		if(holidays[v.format(fmt)]){
			return false;
		}
	}
	return true;
}

/***
Macro

5d : 5 days and next day if holiday
5bd : 5 biz days
5m : 5 months and next day if holiday
eom : end of month

***/
export const m2d = (v) => {
	var weeks = ["na","mo","tu","we","th","fr","st","su"];
	if(typeof(v) === 'string'){
		if(v.match(/^\d+m$/i)){
			var n = Number(v.match(/^\d+/));
			var t = moment();
			t = t.add(n, "M");
			var m = t.month();

			while(!isBz(t)){
				t = t.add(1, "d");
			}
			if(m != t.month()){
				t = moment().add(n, "M");
				while(!isBz(t)){
					t = t.subtract(1, "d");
				}
			}
			return t;
		} else if(v.match(/^\d+d$/i)){
			var n = Number(v.match(/^\d+/));
			var t = moment();
			t.add(Number(n), "d");
			while(!isBz(t)){
				t.add(1, "d");
			}
			return t;
		} else if(v.match(/^\d+bd$/i)){
			var n = Number(v.match(/^\d+/));
			var t = moment();
			var i = 0;

			while(i < n){
				t = t.add(1, "d");
				if(isBz(t)){
					i++;
				}
			}
			return t;
		} else if(v.match(/^\d+m\d+$/i)){
			var n = Number(v.match(/^\d+/));
			var d = v.match(/\d+$/);
			var t = moment();
			t = t.add(n, "M");
			t = moment(t.format("YYYY-MM-")+d, "YYYY-MM-DD");
			var m = t.month();

			while(!isBz(t)){
				t = t.add(1, "d");
			}
			if(m != t.month()){
				t = moment().add(n, "M");
				while(!isBz(t)){
					t = t.subtract(1, "d");
				}
			}
			return t;
		} else if(v.match(/^\d+m\d\w{2,3}$/i)){
			var n = Number(v.match(/^\d+/));
			var w = v.match(/\d+\w{2,3}$/); //su,mo,tu,we,th,fr,st
			var t = moment();
			t = t.add(n, "M");
			t = moment(t.format("YYYY-MM-01"), "YYYY-MM-DD");
			var m = t.month();

			var f = weeks[t.isoWeekday()];
			var i = 0;

			for(var k = 1; k <= 31; k++){
				if(weeks[t.isoWeekday()] === f){
					i++;
				}
				if(w == (i+weeks[t.isoWeekday()])){
					break;
				}
				t = t.add(1, "d");
			}

			while(!isBz(t)){
				t = t.add(1, "d");
			}
			if(m != t.month()){
				t = moment().add(n, "M");
				while(!isBz(t)){
					t = t.subtract(1, "d");
				}
			}
			return t;
		}
	}
	return v;
}


