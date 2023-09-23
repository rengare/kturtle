import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { Turtle } from './turtle';
import { CommandWithType, parse } from './lang/parser';
import { lexer } from './lang/lexer';
import { TokenType } from 'src/app/models';

const pipe =
  (input: any) =>
  (...fns: Function[]) =>
    fns.reduce((result, fn) => fn(result), input);

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

  addCommand(input: string) {
    const command: CommandWithType = pipe(input)(lexer, parse);
    if (command.type === TokenType.NOT_FOUND) return;
    this.commands.push(input);

    if (this.turtle) {
      this.turtle.execute(command);
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
