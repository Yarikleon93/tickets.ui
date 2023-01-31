import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormManager } from '@app/form-manager';
import { Sector } from '@app/hall';
import { KinoFormValidators } from '@app/utils';
import { HallConstructorService } from './../hall-constructor.service';

interface FormGroupManagerPair {
  group: FormGroup;
  manager: FormManager;
}

@Component({
  selector: 'admin-sectors-form',
  templateUrl: './sectors-form.component.html',
  styleUrls: ['./sectors-form.component.scss']
})
export class SectorsFormComponent implements OnInit {

  public fgManagerPairs: FormGroupManagerPair[];

  constructor(
    private fb: FormBuilder,
    private hallConstructorService: HallConstructorService,
  ) { }

  ngOnInit(): void {
    this.fgManagerPairs = [];
    this.addForm();
  }

  public addForm(): void {
    const form = this.fb.group({
      from: [null, [Validators.required, KinoFormValidators.number(1)]],
      to: [null, [Validators.required, KinoFormValidators.number(1)]],
      name: ['VIP', [Validators.required, Validators.maxLength(32)]],
    });
    const manager = new FormManager(form);
    this.fgManagerPairs.push({ group: form, manager });
    this.validSectors.length && (this.hallConstructorService.sectors = this.validSectors);
  }

  public removeForm(index: number): void {
    this.fgManagerPairs.splice(index, 1);
    const { validSectors: sectors } = this;
    sectors.length && (this.hallConstructorService.sectors = sectors);
  }

  private get validSectors(): Sector[] {
    return this.fgManagerPairs.filter(current => current.group.valid)
      .map(current => current.group.value);
  }
}
