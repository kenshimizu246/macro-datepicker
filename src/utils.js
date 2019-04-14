import moment from 'moment';

const WEEKS = ["na","mo","tu","we","th","fr","st","su"];

/**
 * This is date adjustment function.
 * 
 * @param a date to be determine whether bisiness date or not.
 * @return the result must be true or false.
 **/
export const isBz = (v) => {
	const fmt = "MM/DD/YYYY";

	if(moment.isMoment(v)){
		if(v.isoWeekday() === 7 || v.isoWeekday() === 6){
			return false;
		}
	}
	return true;
}

/**
 * This is date adjustment function.
 * 
 * @param a date to be determine whether bisiness date or not.
 * @param test function whether a date is bisiness date or not.
 * @return calculated date if it contains a macro.
 **/
const dtAdj = (d,isBizDate) => {
	const m = d.month();
	const o = d.clone();

	while(!isBizDate(d)){
		d.add(1, "d");
	}
	if(m != d.month()){
		d = o;
		while(!isBizDate(d)){
			d.subtract(1, "d");
		}
	}
	return d;
}

/**
 * This function resolves a macro if it contains, for example; 
 * 	2d -> 2 days
 * 	2bd -> 2 bisiness days
 * 	2m -> the month after next month
 * 	2m2tu -> the second Tuesday of the month after next month
 * 	2m2 -> the second day of the month after next month
 * 	1m31 -> the last day of the next month
 * 
 * Also it accepts noAdj option. The default behavior is it escapes holidays, Saturday or Sunday.
 * This option disable this default behavior. For example, "2m2tu noAdj".
 * 
 * @param value it is possible to contain macro.
 * @param base date  
 * @param isBizDate calculator  
 * @return calculated date if it contains a macro.
 **/
export const m2d = (v,t,isBizDate) => {
	if(typeof(v) === 'string'){
		let adj = true;
		if(v.match(/noAdj/i)){
			adj = false;
		}
		if(v.match(/^\d+d/i)){
			const n = Number(v.match(/^\d+/));
			t.add(Number(n), "d");
			while(adj && !isBizDate(t)){
				t.add(1, "d");
			}
			return t;
		} else if(v.match(/^\d+bd/i)){
			const n = Number(v.match(/^\d+/));
			let i = 0;

			while(i < n){
				t.add(1, "d");
				if(isBizDate(t)){
					i++;
				}
			}
			return t;
		}

		if(v.match(/^\d+m/i)){
			const n = Number(v.match(/^\d+/));
			t = t.add(n, "M");
		}

		const ww = v.match(/\d+(su|mo|tu|we|th|fr|st)/i);
		if(ww !== null){
			const w = ww[0];
			let s = moment(t.format("YYYY-MM-01"), "YYYY-MM-DD");

			// weekday for first day of month to count weekday.
			const f = WEEKS[s.isoWeekday()];
			const m = t.month();
			for(let i = 0; i <= 5;){
				if(WEEKS[s.isoWeekday()] === f){
					i++;
				}
				if(w == (i+WEEKS[s.isoWeekday()])){
					t = s;
					break;
				}
				s.add(1, "d");
			}
		} else if(v.match(/^\d+m\d+$/i)){
			for(let n = v.match(/\d+$/); n > 0; n--){
				let s = moment(t.format("YYYY-MM-")+n, "YYYY-MM-DD");
				if(moment.isMoment(s) && s.isValid()){
						t = s;
						break;
				}
			}
		}

		if(adj) {
			t = dtAdj(t,isBizDate);
		}
		return t;
	}
	return v;
}


