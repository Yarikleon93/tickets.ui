import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '@app/models';

@Component({
  selector: 'app-ads-board',
  templateUrl: './ads-board.component.html',
  styleUrls: ['./ads-board.component.scss', '../ads-common.scss']
})
export class AdsBoardComponent implements OnInit {

  @Input() title: string;
  @Input() movies: Movie[];

  constructor() { }

  ngOnInit(): void {
  }

}
