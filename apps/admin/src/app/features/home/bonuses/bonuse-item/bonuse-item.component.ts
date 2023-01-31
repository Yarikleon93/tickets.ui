import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageService } from '@app/common';
import { Bonuse } from '@app/models';

@Component({
  selector: 'app-bonuse-item',
  templateUrl: './bonuse-item.component.html',
  styleUrls: ['./bonuse-item.component.scss']
})
export class BonuseItemComponent implements OnInit {
  @Output() editBonuse = new EventEmitter<string>();
  @Output() removeModal = new EventEmitter<string>();
  @Input() bonuse: Bonuse;
  constructor(
    public imageService: ImageService,
  ) { }

  ngOnInit(): void {
  }

  public onEditButtonClick(bonuseId): void {
    this.editBonuse.emit(bonuseId);
  }
}
