import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Hall, HallService } from '@app/hall';
import { EditorSteps } from './editor-steps.enum';
import { HallConstructorService } from './hall-constructor.service';

@Component({
  selector: 'admin-hall-editor',
  templateUrl: './hall-editor.component.html',
  styleUrls: ['./hall-editor.component.scss']
})
export class HallEditorComponent implements OnDestroy {

  public readonly STEP = EditorSteps;
  public step = this.STEP.START;

  constructor(
    public hallConstructorService: HallConstructorService,
    private hallService: HallService,
    private router: Router,
  ) { }

  ngOnDestroy(): void {
    this.hallConstructorService.clear();
  }

  public nextStep(): void {
    this.step++;
    if (this.step === this.STEP.GENERATING) {
      this.request();
    }
  }

  public undo(): void {
    if (this.step === this.STEP.START) {
      this.hallConstructorService.clear();
    } else {
      this.step--;
    }
  }

  public request(): void {
    const payload = this.hallConstructorService.buildHall();
    this.hallService.createHall(payload).subscribe((hall: Hall) => {
      this.router.navigate(['cinema/'], { queryParams: { selectedHallId: hall.id } });
    });
  }

}
