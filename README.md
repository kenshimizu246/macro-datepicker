# rc-macro-date-input
MacroDateInput is a input field with a date picker calendar but it enables macro to calculate a date as following rule.

1d -> next day, 2d -> the day after tomorrow.
1bd -> next business day, 2bd -> the business day after next business day.
1m -> 1month later for example, today is 2019-05-21 and m1 + Enter calculates to 2019-06-21. If it is not a bisiness day, it becomes next business day. It means if the result is 2019-06-21 and this is not a business day, then it becomes 2019-06-22 which is next business day. ...
Also it supports week keywords, mo, tu, we, th, fr, st, sun. How it works is 1m1mo means first Monday of next month, 1m3th means third Thusday of next month. If the result is not a business day, then it will adjust next business day but if it becomes next month, then it selects previous month.
