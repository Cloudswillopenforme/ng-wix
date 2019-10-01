import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { TournoCreationService } from './tourno-creation.service';
import { DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from '../core/deactivate-guard.service';
import { IPlayer } from '../core/models/IPlayer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tourno-creation',
  templateUrl: './tourno-creation.component.html',
  styleUrls: ['./tourno-creation.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class TournoCreationComponent implements OnInit, CanComponentDeactivate {

  ref: DocumentReference;

  isLinear = true;
  formGroup: FormGroup;
  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }

  constructor(
    private formBuilder: FormBuilder,
    private tournoCreationService: TournoCreationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
    this.createNewTournoDoc().then(ref => {
      this.ref = ref;
      this.bindFormToDoc();
    });
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.formBuilder.group({
          name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
          tournamentType: [''],
          country: ['', Validators.required],
          game: ['', Validators.required],
          playerType: [''],
          description: ['', Validators.maxLength(200)],
        }),
        this.formBuilder.group({
          startDate: ['', Validators.required],
          endDate: ['', Validators.required],
          entryFee: ['', Validators.maxLength(30)],
          prize: ['', Validators.maxLength(30)],
        }),
        this.formBuilder.group({
          participants: ['', Validators.required]
        }),
      ])
    });
  }

  createNewTournoDoc() {
    return this.tournoCreationService.createDefaultTourno();
  }

  bindFormToDoc() {
    this.formGroup.patchValue(this.ref);
  }

  updateRelatedPlayers(val: DocumentReference[]) {
    this.ref.update({
      'relatedPlayers': val
    })
  }

  updateRounds(val: IPlayer[]) {
    this.ref.update({
      'rounds': val
    })
  }

  saveFormChanges(numberRef) {
    const data = this.formGroup.get('formArray').get([numberRef]).value;
    data['id'] = this.ref.id;

    this.tournoCreationService.updateDefaultTourno(this.ref, data);
  }


  async checkBeforeSaveTournament(numberRef) {

    if (this.formGroup.status != 'VALID') {
      console.log('form is not valid, cannot save data');
      return;
    }

    let participantsNumber = await this.formGroup.get('formArray').get([2]).get('participants').value;
    let chosenPlayers = await this.ref.get().then((doc) => {
      if (doc.exists) {
        return doc.data().relatedPlayers;
      }
    })
    console.log(participantsNumber)
    console.log(chosenPlayers.length)

    if (+participantsNumber === +chosenPlayers.length) {
      this.saveTournament(numberRef, participantsNumber, chosenPlayers)
    } else {
      console.log('Chosen number players and participants number do not correspond. Add or remove some');
    };

  }

  saveTournament(numberRef, participantsNumber, chosenPlayers) {
    // save last part
    this.saveFormChanges(numberRef);

    this.tournoCreationService.updateUserInfo(this.ref);

    // tourno/rounds building methods
    let rounds = this.tournoCreationService.generateBracket(participantsNumber, chosenPlayers);
    this.updateRounds(rounds);

    this.router.navigate(['/tourno-profile/' + this.ref.id])
  }

  // cancelTournoCreation() {
  //   this.tournoCreationService.deleteTourno(this.ref);
  // }

  // canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
  //   let res = window.confirm('Discard changes?');
  //   if (res) {
  //     this.cancelTournoCreation();
  //   }
  //   return res;
  // }

}
