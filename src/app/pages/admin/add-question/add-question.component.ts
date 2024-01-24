import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  //Se refiere a atributos de examen
  id : any;
  title : any;
  question : any = {
    exam : {},
    content : '',
    option1 : '',
    option2 : '',
    option3 : '',
    option4 : '',
    answer : ''
  }

  constructor(
    private route : ActivatedRoute, 
    private questionService : QuestionService,
    private router : Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.title = this.route.snapshot.params['title'];
    this.question.exam['id'] = this.id;
  }

  addQuestion() {
    if(this.question.content.trim() == '' || this.question.content == null) {
      return;
    }
    if(this.question.option1.trim() == '' || this.question.option1 == null) {
      return;
    }
    if(this.question.option2.trim() == '' || this.question.option2 == null) {
      return;
    }
    if(this.question.option3.trim() == '' || this.question.option3 == null) {
      return;
    }
    if(this.question.option4.trim() == '' || this.question.option4 == null) {
      return;
    }
    if(this.question.answer.trim() == '' || this.question.answer == null) {
      return;
    }

    this.questionService.addQuestion(this.question).subscribe(
      (data : any) => {
        Swal.fire('Saved question', 'The question has been saved successfully', 'success');
        this.question.content = '';
        this.question.option1 = '';
        this.question.option2 = '';
        this.question.option3 = '';
        this.question.option4 = '';
        this.question.answer = '';
        this.router.navigate([`/admin/view-questions/exam/${this.id}/${this.title}`]);
      },
      (error) => {
        Swal.fire('Error !!', 'Error when saved question', 'error');
        console.log(error);
      }
    )
  }

}
