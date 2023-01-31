import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { BonuseService } from '@app/bonuse';
import { ImageService } from '@app/common';
import { FormManager } from '@app/form-manager';
import { Bonuse } from '@app/models';
import { ModalService } from '@app/ui/components/ui-elements';
import { ImageManager } from '@app/utils';
import { TranslateService } from '@ngx-translate/core';
import { omit } from 'lodash';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bonuses',
  templateUrl: './bonuses.component.html',
  styleUrls: ['./bonuses.component.scss']
})
export class BonusesComponent implements OnInit {

  constructor(
    public bonuseService: BonuseService,
    private toastrService: ToastrService,
    private translateService: TranslateService,
    public modalService: ModalService,
    private fb: FormBuilder,
    private imageService: ImageService,
  ) { }
  public bonuses: Bonuse[];
  public form = this.fb.group({
    name: ['', [Validators.required]],
    total: ['', [Validators.required]],
    image: ['']
  });

  public imageUrl: string | SafeUrl;
  public readonly formManager = new FormManager(this.form);
  public updatedBonuseFormData: Bonuse;
  public currentBonuse: Bonuse;
  public currentBonuseId: string;

  ngOnInit(): void {
    this.bonuseService.getBonuses().subscribe((bonuses) => {
      this.bonuses = bonuses;
    });
  }

  public onSubmit(modalId): void {
    const updatedFormData = this.setUpdatedFormData(this.form.value);
    let imageUrl = this.imageUrl;
    (typeof this.imageUrl === 'object') && (imageUrl = '');
    if (this.currentBonuseId !== '') {
      this.bonuseService.updateBonuse(this.currentBonuseId, { ...updatedFormData, imageUrl }).subscribe(() => {
        const indexUpdatedBonuse = this.bonuses.findIndex(bonuse => bonuse.id === this.currentBonuseId);
        this.bonuses.splice(indexUpdatedBonuse, 1, { ...updatedFormData, id: this.currentBonuseId });
        this.toastrService.success(
          ' ',
          this.translateService.instant('ADMIN.MOVIE.CHANGES_SAVED')
        );
        this.modalService.close(modalId);
      });
      return;
    } else {
      this.bonuseService.addBonuse({ ...updatedFormData, imageUrl }).subscribe((bonuse) => {
        this.bonuses.unshift(bonuse);
        this.toastrService.success(
          ' ',
          this.translateService.instant('ADMIN.BONUSE.BONUSE_ADDED')
        );
      });
    }
    this.modalService.close(modalId);
  }

  private setUpdatedFormData(data: Bonuse): Bonuse {
    this.updatedBonuseFormData = data;
    this.updatedBonuseFormData.image = !data.image ? this.currentBonuse.image : ImageManager.setUrl(data.image);
    return this.updatedBonuseFormData;
  }

  public openRemoveModal(bonuseId): void {
    this.currentBonuseId = bonuseId;
    this.modalService.open('remove-modal');
  }

  public remove(modalId): void {
    this.bonuseService.deleteBonuse(this.currentBonuseId).subscribe(() => {
      this.bonuses = this.bonuses.filter(bonuse => bonuse.id !== this.currentBonuseId);
      this.toastrService.success(
        ' ',
        this.translateService.instant('ADMIN.BONUSE.BONUSE_DELETED')
      );
      this.currentBonuseId = null;
    });
    this.modalService.close(modalId);
  }

  public openEditorModal(modalId: string, bonuseId = null): void {
    this.modalService.open(modalId);
    if (!bonuseId) {
      this.currentBonuseId = '';
      return;
    }
    this.currentBonuseId = bonuseId;
    this.bonuseService.getBonuse(bonuseId).subscribe((bonuse) => {
      this.currentBonuse = bonuse;
      this.imageUrl = this.imageService.getPath(bonuse.image);
      this.form.patchValue(omit(bonuse, ['image']));
    });
  }

  public resetForm(): void {
    this.form.reset();
    this.form.markAsUntouched();
    this.imageUrl = null;
  }

  public closeModal(modalId: string): void {
    this.currentBonuseId = null;
    this.modalService.close(modalId);
  }

  public previewImage(files: File[]): void {
    ImageManager.setImg(files, (reader) => {
      return () => {
        this.imageUrl = reader.result;
      };
    });
  }
}
