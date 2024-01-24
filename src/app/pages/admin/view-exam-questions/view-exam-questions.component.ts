import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-exam-questions',
  templateUrl: './view-exam-questions.component.html',
  styleUrls: ['./view-exam-questions.component.css']
})
export class ViewExamQuestionsComponent implements OnInit {

  //Se refiere a atributos de examen
  id : any;
  title : any;
  questions : any = [];

  constructor(
    private route : ActivatedRoute, 
    private questionService : QuestionService,
    private snack : MatSnackBar) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.title = this.route.snapshot.params['title'];
    this.questions = this.questionService.getExamQuestions(this.id).subscribe(
      (data : any) => {
        console.log(data);
        this.questions = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  deleteQuestion(id : any) {
    Swal.fire({
      title : 'Delete question',
      text : 'Are you sure to delete this question?',
      icon : 'warning',
      showCancelButton : true,
      confirmButtonColor : '#3085d6',
      cancelButtonColor : '#d33',
      confirmButtonText : 'Delete',
      cancelButtonText : 'Cancel'
    }).then((result) => {
      if(result.isConfirmed) {
        this.questionService.deleteQuestion(id).subscribe(
          (data : any) => {
            this.snack.open('Deleted question', '', {
              duration : 3000
            })
            this.questions = this.questions.filter((question : any) => question.id != id);
          },
          (error) => {
            this.snack.open('Error deleting question', '', {
              duration : 3000
            })
            console.log(error);
          }
        )
      }
    })
  }

}
