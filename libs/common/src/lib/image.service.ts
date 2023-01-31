import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from '@app/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private sanitizer: DomSanitizer) { }

  public getPath(imagesName: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(`${environment.API.image}/${imagesName}`);
  }

}
