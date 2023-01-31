import { Component, Input, OnInit } from '@angular/core';
import { ImageService } from '@app/common';
import { Bonuse } from '@app/models';

@Component({
  selector: 'app-bonuse-card',
  templateUrl: './bonuse-card.component.html',
  styleUrls: ['./bonuse-card.component.scss']
})
export class BonuseCardComponent implements OnInit {
  @Input() bonuse: Bonuse;
  constructor(
    public imageService: ImageService
    ) { }

  ngOnInit(): void {
  }

}
