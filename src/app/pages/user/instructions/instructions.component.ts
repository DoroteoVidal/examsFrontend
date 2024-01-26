import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from 'src/app/services/exam.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  id : any;
  exam : any = new Object();

  constructor(
    private examService : ExamService,
    private route : ActivatedRoute,
    private router : Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.examService.getExam(this.id).subscribe(
      (data : any) => {
        console.log(data);
        this.exam = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  startExam() {
    Swal.fire({
      title : 'Do you want to start the exam?',
      showCancelButton : true,
      cancelButtonText : 'Cancel',
      confirmButtonText : 'Start',
      icon :  'info'
    }).then((result : any) => {
      if(result.isConfirmed) {
        this.router.navigate(['/start/'+this.id]);
      }
    });
  }

}
