import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hall, HallService } from '@app/hall';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/internal/operators';
import { HallEditorService } from './hall-editor.service';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.scss']
})
export class CinemaComponent implements OnInit, OnDestroy {

  constructor(
    public hallEditorService: HallEditorService,
    private activatedRoute: ActivatedRoute,
    private hallService: HallService,
  ) { }

  private destroy$ = new Subject();
  ngOnInit(): void {
    this.hallService.getHalls().pipe(
      takeUntil(this.destroy$),
      switchMap((halls: Hall[]) => {
        this.hallEditorService.halls = halls;
        return this.activatedRoute.queryParamMap;
      })
    ).subscribe(params => {
      const hallId = params.get('selectedHallId');
      this.hallEditorService.setSelectedHall(hallId);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
