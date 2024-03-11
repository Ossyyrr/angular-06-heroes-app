import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable, map, startWith } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    CommonModule,
  ],
})
export class SearchPageComponent implements OnInit {
  constructor(private heroesService: HeroesService) {}

  public myControl = new FormControl('');
  public options: Hero[] = [];
  public filteredOptions: Observable<Hero[]> = new Observable<Hero[]>();

  ngOnInit() {
    this.heroesService.getHeroes().subscribe((heroes) => {
      this.options = heroes;
      this.myControl.updateValueAndValidity();
    });
    console.log('*** this.options', this.options.length);

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): Hero[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.superhero.toLowerCase().includes(filterValue)
    );
  }
}
