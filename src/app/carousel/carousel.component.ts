import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription, fromEvent, pairwise, switchMap, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  @Input() images: string[] = [];
  currentIndex: number = 0;
  startX: number = 0;
  isSwiping: boolean = false;

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
    this.isSwiping = true;
  }

  onTouchMove(event: TouchEvent) {
    if (!this.isSwiping) return;

    const moveX = event.touches[0].clientX;
    const deltaX = moveX - this.startX;

    if (deltaX > 50) {
      this.prev();
      this.isSwiping = false;
    } else if (deltaX < -50) {
      this.next();
      this.isSwiping = false;
    }
  }
}
