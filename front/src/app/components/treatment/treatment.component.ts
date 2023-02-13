import { Component, OnInit } from '@angular/core';
import { TreatmentService } from 'src/app/services/treatment.service';
import ITreatment from 'src/app/models/Treatment';

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.css']
})

export class TreatmentComponent implements OnInit {
  treatment: ITreatment = {
    id: 0,
    name: '',
    type: '',
    description: '',
    price: 0
  };
  
  constructor(private treatmentService: TreatmentService) { }

  ngOnInit() {
  }

  addTreatment() {
    this.treatmentService.addTreatment(this.treatment).subscribe(res => {
      console.log(res);
    });
  }
}
