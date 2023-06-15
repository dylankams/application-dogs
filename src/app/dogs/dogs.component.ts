import { Component, OnInit } from '@angular/core';
import { DogService } from '../dog.service';
import { Dog } from '../types';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.css']
})
export class DogsComponent implements OnInit {
  dogs: Dog[] = [];
  updateSuccessMessage: string = '';

  constructor(private dogService: DogService) {}

  ngOnInit(): void {
    this.getDogs();
  }

  getDogs(): void {
    this.dogService.getDogs().subscribe(dogs => {
      this.dogs = dogs.map(dog => ({ ...dog, isEditing: false, updatedName: dog.name }));
    });
  }

   /* Fonction pour gérer l'affichage du mode édition du nom d'un chien */
   toggleEditMode(dog: Dog): void {
    dog.isEditing = !dog.isEditing;
    if (!dog.isEditing) {
      dog.updatedName = dog.name; // permet d'afficher par défaut le nom du chien à modifier dans un champs
    }
  }

  saveDogName(dog: Dog): void {
    dog.name = dog.updatedName; // Met à jour le nom du chien avec le nom modifié
    this.dogService.updateDog(dog).subscribe(() => {
      dog.isEditing = false;
      console.log('Le nom du chien a été mis à jour avec succès');
    });
  }

  deleteDog(dogId: number): void {
    this.dogService.deleteDog(dogId).subscribe(() => {
      console.log('Chien supprimé avec succès');
      this.dogs = this.dogs.filter(dog => dog.id !== dogId);
    });
  }
}
