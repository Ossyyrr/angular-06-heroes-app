import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.css',
})
export class HeroPageComponent implements OnInit {
  constructor(
    private heroesService: HeroesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  public hero?: Hero;

  ngOnInit(): void {
    this.activatedRoute.params.pipe(delay(300)).subscribe(({ id }) => {
      this.heroesService
        .getHeroById(id)

        .subscribe((hero) => {
          if (!hero) return this.router.navigate(['/heroes/list']);
          this.hero = hero;
          return;
        });
    });
  }

  goBack() {
    this.router.navigate(['/heroes/list']);
  }
}
