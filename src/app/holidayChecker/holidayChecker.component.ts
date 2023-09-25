import {Component, OnInit, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Holiday } from '../app.component';

interface ApiResponse {
  date: string;
  time: string
}

@Component({
  selector: 'holiday-checker',
  templateUrl: './holidayChecker.component.html',
  styleUrls: ['./holidayChecker.component.scss']
})
export class HolidayChecker implements OnInit {
  @Input() holidayList: Holiday[];
  responseData:any;
  matchedData:any;
  URL = `https://jsonmock.hackerrank.com/datetime`;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {

  }

  async getData(){
    this.responseData=null;
    await this.http.get(this.URL).subscribe((res:ApiResponse)=>{
      this.responseData=res;
      this.matchedData=this.getHolidayByDate(this.responseData.date);
    });
  }

  // Function to get the holiday object for a given date
  getHolidayByDate(inputDate) {
    const matchingHoliday = this.holidayList.find(holiday => holiday.date === inputDate);
    return matchingHoliday || null; // Return null if no matching holiday is found
  }
}
