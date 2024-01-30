import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  //Id de examen
  id : any;
  questions : any;
  pointsAchieved = 0;
  correctAnswers = 0;
  attempts = 0;

  isSent = false;
  timer : any;

  constructor(
    private location : LocationStrategy,
    private route : ActivatedRoute,
    private questionService : QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.id = this.route.snapshot.params['id'];
    this.loadQuestions();
  }

  loadQuestions() {
    this.questionService.listQuestionsForExam(this.id).subscribe(
      (data : any) => {
        console.log(data);
        this.questions = data;
        this.timer = this.questions.length * 2 * 60;
        this.questions.forEach((q : any) => {
          q['answer'] = '';
        });
        console.log(this.questions);
        this.initTimer();
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error loading exam questions', 'error');
      }
    )
  }

  initTimer() {
    let time = window.setInterval(() => {
      if(this.timer <= 0) {
        this.evaluateExam();
        clearInterval(time);
      }else {
        this.timer--;
      }
    },1000)
  }

  preventBackButton() {
    history.pushState(null, null!, location.href);
    this.location.onPopState(() => {
      history.pushState(null, null!, location.href);
    })
  }

  sendExam() {
    Swal.fire({
      title : 'Do you want to send the exam?',
      icon : 'info',
      showCancelButton : true,
      confirmButtonText : 'Send',
      cancelButtonText : 'Cancel'
    }).then((result) => {
      if(result.isConfirmed) {
        this.evaluateExam();
      }
    })
  }

  evaluateExam() {
    this.questionService.evaluateExam(this.questions).subscribe(
      (data : any) => {
        console.log(data);
        this.pointsAchieved = data.maxPoints;
        this.correctAnswers = data.correctAnswers;
        this.attempts = data.attempts;
        this.isSent = true;
      },
      (error) => {
        console.log(error);
      }
    )

    //Evaluacion frontend
    /*this.isSent = true;
    this.questions.forEach((q : any) => {
      if(q.answer == q.correctAnswer) {
        this.correctAnswers++;
        let points = this.questions[0].exam.maxPoints/this.questions.length;
        this.pointsAchieved += points;
      }
      if(q.answer.trim() != '') {
        this.attempts++;
      }
    })
    console.log("Correct answers :" + this.correctAnswers);
    console.log("Points achieved :" + this.pointsAchieved);
    console.log("Attempts :" + this.attempts);
    console.log(this.questions);*/
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer/60);
    let ss = this.timer - mm * 60;
    return `${mm} : min : ${ss} : seg`;
  }

  printPage() {
    window.print();
  }

}
