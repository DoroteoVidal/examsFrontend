import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  id : any = 0;
  question : any;
  exam : any;

  constructor(
    private route : ActivatedRoute,
    private questionService : QuestionService,
    private router : Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.questionService.getQuestion(this.id).subscribe(
      (data : any) => {
        this.question = data;
        console.log(this.question);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  updateQuestion() {
    this.questionService.updateQuestion(this.id, this.question).subscribe(
      (data : any) => {
        Swal.fire('Updated question', 'The question has been updated successfully', 'success').then((e) => {
          this.router.navigate(['/admin/view-questions/exam/'+this.question.exam.id+'/'+this.question.title]);
        })
      }
    )
  }

}
