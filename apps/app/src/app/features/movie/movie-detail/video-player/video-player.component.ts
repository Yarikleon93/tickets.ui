import { animate, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { MediaEndpoint } from '@app/ui/components/ui-elements';

const desktopWidthFactor = 0.7;
const smartphoneWidthFactor = 0.9;
const desktopHeightFactor = 0.5;
const smartphoneHeightFactor = 0.56;

const playBtnAnimation =
  trigger('playBtnAnimation', [
    transition('* => void', [
      style({ opacity: 1, transform: 'scale(1)' }),
      animate('250ms ease-in-out', style({ opacity: 0, transform: 'scale(0)' }))
    ])
  ]);

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  animations: [playBtnAnimation]
})
export class VideoPlayerComponent implements OnInit {

  @ViewChild('player') player: YouTubePlayer;
  @Input() videoId: string;
  @Input() autoplay = false;
  public width = 100;
  public height = 100;
  public isReady = false;
  public isPlaying = this.autoplay;

  constructor() { }

  ngOnInit(): void {
    this.setVideoResolution();
  }

  public playerOnReady(): void {
    this.isReady = true;
    if (this.autoplay) {
      this.player.mute();
      this.player.playVideo();
      this.isPlaying = true;
    }
  }

  public playVideo(): void {
    if (this.isPlaying) {
      this.player.pauseVideo();
    } else {
      this.player.playVideo()
    }
    this.isPlaying = !this.isPlaying;
  }

  @HostListener('window:resize')
  public setVideoResolution(): void {
    const width = window.innerWidth;
    this.width = width > MediaEndpoint.SMARTPHONE ?
      width * desktopWidthFactor :
      width * smartphoneWidthFactor;
    this.height = width > MediaEndpoint.DESKTOP ?
      this.width * desktopHeightFactor :
      this.width * smartphoneHeightFactor;
  }
}
