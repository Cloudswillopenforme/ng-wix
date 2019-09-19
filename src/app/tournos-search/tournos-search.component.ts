import { Component, OnInit } from '@angular/core';
import { TournosSearchService } from './tournos-search.service';
import { Observable, fromEvent } from 'rxjs';
import { ITourno } from '../core/models/ITourno';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-tournos-search',
  templateUrl: './tournos-search.component.html',
  styleUrls: ['./tournos-search.component.scss']
})
export class TournoSearchComponent implements OnInit {

  items: any[];
  isLoading$: Observable<boolean>;
  isLogged: boolean;

  searchInput = document.getElementById('tournos-search-input');

  constructor(
    private tournosService: TournosSearchService,
    public authService: AuthService,
  ) { }

  ngOnInit() {
    this.tournosService.searchTournaments().subscribe((val) => this.items = val);
    this.isLoading$ = this.tournosService.loading$;
    this.tournosService.getUserId();
    this.isLogged = this.authService.isUserLogged;
  }

  trySearchByName($event) {
    this.tournosService.searchSubject$.next($event);
    this.items = this.tournosService.getFilteredItems();
  }

  tryFilterByGame($event) {
    this.tournosService.gameSubject$.next($event);
    this.items = this.tournosService.getFilteredItems();
  }

  tryFilterByStatus($event) {
    this.tournosService.statusSubject$.next($event);
    this.items = this.tournosService.getFilteredItems();
  }

  tryFilterByMine($event) {
    this.tournosService.myTournamentsSubject$.next($event);
    this.items = this.tournosService.getFilteredItems();
  }

}
