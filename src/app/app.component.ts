import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { Turtle } from './turtle';
import { executeCommand } from './command';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  @ViewChild('canvas', { static: true }) canvas:
    | ElementRef<HTMLCanvasElement>
    | undefined;
  private turtle: Turtle | undefined;

  canvasWidth: number = 50;
  canvasHeight: number = 50;

  commands: string[] = [];
  isLoaded: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.reset();
  }

  constructor(private cd: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.reset();
  }

  addCommand(command: string) {
    this.commands.push(command);
    if (this.turtle) {
      executeCommand(this.turtle, command);
    }
  }

  reset() {
    this.canvasWidth = window.innerWidth / 2;
    this.canvasHeight = window.innerHeight / 2;
    const ctx = this.canvas?.nativeElement.getContext('2d');
    if (ctx) {
      this.loadTurtleImage(ctx);
    }

    this.cd.detectChanges();
  }

  private loadTurtleImage(ctx: CanvasRenderingContext2D) {
    const turtleImage = new Image();
    turtleImage.src = 'assets/turtle.jpeg';

    turtleImage.onload = () => {
      this.initScene(ctx, turtleImage);
    };
  }

  private initScene(
    ctx: CanvasRenderingContext2D,
    turtleImage: HTMLImageElement,
  ) {
    this.commands = [];
    this.turtle = new Turtle(ctx, turtleImage);
    this.turtle.drawTurtle();
  }
}
