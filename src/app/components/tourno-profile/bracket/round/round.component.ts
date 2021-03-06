import { Component, Input, DoCheck, Output, EventEmitter } from '@angular/core';
import { IRound } from 'src/app/core/models/IRound';

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss']
})
export class RoundComponent implements DoCheck {

  @Input() round: IRound;
  @Input() roundType: string;
  @Input() isEditingDisabled: boolean;
  @Input() last: boolean;

  @Output() TournoWinnerEmitter: EventEmitter<{}> = new EventEmitter();

  ngDoCheck() {
    this.defineNextRoundCandidates(this.round);
  }

  public defineNextRoundCandidates(round: IRound): void {

    const newNextRoundCandidates: string[] = [];

    for (const game of round.games) {
      newNextRoundCandidates.push(game.gameWinner);
    }

    round.nextRoundCandidates = newNextRoundCandidates;
  }

}
