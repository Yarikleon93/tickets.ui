import { Component, OnInit } from '@angular/core';
import { RulesService } from './rules.service';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {

  public text: string;
  public lastText: string;
  public isLoading = false;

  constructor(private rulesService: RulesService) { }

  ngOnInit(): void {
    this.rulesService.getText().subscribe(text => {
      this.text = this.lastText = text;
    });
  }

  public submit(): void {
    this.isLoading = true;
    this.rulesService.updateText(this.text).subscribe(() => {
      this.isLoading = false;
    });
  }

  public reset(): void {
    this.text = this.lastText;
  }
}
