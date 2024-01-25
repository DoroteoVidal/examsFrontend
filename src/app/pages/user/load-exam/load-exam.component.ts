import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-load-exam',
  templateUrl: './load-exam.component.html',
  styleUrls: ['./load-exam.component.css']
})
export class LoadExamComponent implements OnInit {

  //Categoria
  id : any;

  //Examen
  exams : any;

  constructor(private route : ActivatedRoute, private examService : ExamService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if(this.id == 0) {
        console.log("Loading all exams");
        this.examService.getActiveExams().subscribe(
          (data : any) => {
            this.exams = data;
            console.log(this.exams);
          },
          (error) => {
            console.log(error);
          }
        )
      }else {
        console.log("Loading a specific exam");
        this.examService.getActiveExamsOfCategory(this.id).subscribe(
          (data : any) => {
            this.exams = data;
            console.log(this.exams);
          },
          (error) => {
            console.log(error);
          }
        )
      }
    })
    
  }

}
