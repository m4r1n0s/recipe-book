import {Injectable} from "@angular/core";
import {HttpClient, HttpRequest} from "@angular/common/http";

import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {map} from "rxjs/operators";

@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService,
  ) {
  }

  storeRecipes() {
    // const headers = new HttpHeaders().set('Authorization', 'Bearer afssfkffalkk');

    // return this.http.put('https://ng-overall-assignment.firebaseio.com/recipes.json', this.recipeService.getRecipes(),
    //   {
    //     observe: 'body',
    //     params: new HttpParams().set('auth', token)
    //     // headers: headers
    //   });

    const req = new HttpRequest('PUT', 'https://ng-overall-assignment.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(),
      {
        reportProgress: true,
      });
    return this.http.request(req);
  }

  getRecipes() {
    // this.http.get<Recipe[]>('https://ng-overall-assignment.firebaseio.com/recipes.json?auth=' + token)
    this.http.get<Recipe[]>('https://ng-overall-assignment.firebaseio.com/recipes.json',)
      .pipe(
        map(
          (recipes) => {
            return recipes.map((recipe) => {
              if (!recipe['shoppingListState']) {
                console.log(recipe);
                recipe['shoppingListState'] = [];
              }
              return recipe;
            });
          }
        )
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.storeRecipes(recipes);
        }
      );
  }
}
