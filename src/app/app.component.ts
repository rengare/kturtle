import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subject, delay, of, takeUntil, tap, concatMap, from } from 'rxjs';

import { Scene } from './sketch';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvas:
    | ElementRef<HTMLCanvasElement>
    | undefined;

  private animationReset$ = new Subject<void>();
  private onDestroy$ = new Subject<void>();

  code: string = '';
  editorOptions = { language: 'turtleDSL', theme: 'turtleTheme' };

  canvasWidth: number = 50;
  canvasHeight: number = 50;
  isLoaded: boolean = false;
  scene: Scene | undefined;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.reset();
  }

  constructor(private cd: ChangeDetectorRef) {
    this.scene = new Scene(this.canvasWidth, this.canvasHeight);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngAfterViewInit() {
    this.reset();
  }

  onInit(editor: any) {
    editor.onKeyUp((e: KeyboardEvent) => {
      if (e.code !== 'F2') return;
    });
  }

  run() {
    this.animationReset$.next();
    this.scene?.reset(this.canvasWidth, this.canvasHeight);
    from(this.code.split('\n'))
      .pipe(
        concatMap((command) => of(command).pipe(delay(60))),
        takeUntil(this.animationReset$),
        tap((command) => this.addCommand(command.replace(';', ''))),
      )
      .subscribe();
  }

  private addCommand(input: string) {
    this.scene?.execute(input);
  }

  private reset() {
    this.canvasWidth = window.innerWidth / 2;
    this.canvasHeight = window.innerHeight / 2;

    this.scene?.reset(this.canvasWidth, this.canvasHeight);

    this.cd.detectChanges();
  }
}
