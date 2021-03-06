import { Component, OnInit, Input } from '@angular/core';
import { PlayerService } from '../../../../core/services/player.service';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/models/IUser';
import { PlayerCardService } from './player-card.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { IPlayer } from 'src/app/core/models/IPlayer';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
})
export class PlayerCardComponent implements OnInit {

  games: number;
  wins: number;

  isFavorite: boolean;
  isLogged$: Observable<IUser | null>;

  @Input() item: IPlayer;
  @Input() showBtns: boolean = true;

  constructor(
    private playerService: PlayerService,
    private playerCardService: PlayerCardService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.isLogged$ = this.authService.userLoggedSubject$;

    if (this.authService.isUserLogged) {
      this.showFavorites();
    }

    this.playerService.updatePlayerInfo(this.item);
  }

  private showFavorites(): void {
    this.isFavorite = this.playerCardService.defineIfFavorite(this.item.id);
  }

  public handleFavorite(): void {

    this.isFavorite
      ? this.playerCardService.removeFromFavorite(this.item.id)
      : this.playerCardService.addToFavorite(this.item.id);

    this.isFavorite = !this.isFavorite;
  }

}
