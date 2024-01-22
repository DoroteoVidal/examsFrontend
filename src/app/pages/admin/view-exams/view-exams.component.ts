import { Component, OnInit } from '@angular/core';
import { ExamService } from 'src/app/services/exam.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-exams',
  templateUrl: './view-exams.component.html',
  styleUrls: ['./view-exams.component.css']
})
export class ViewExamsComponent implements OnInit {

  exams : any = []

  constructor(private examService : ExamService) { }

  ngOnInit(): void {
    this.examService.getExams().subscribe(
      (data : any) => {
        this.exams = data;
        console.log(this.exams);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error loading exams', 'error');
      }
    )
  }

  deleteExam(id : any) {
    Swal.fire({
      title : 'Delete exam',
      text : 'Are you sure to delete this exam?',
      icon : 'warning',
      showCancelButton : true,
      confirmButtonColor : '#3085d6',
      cancelButtonColor : '#d33',
      confirmButtonText : 'Delete',
      cancelButtonText : 'Cancel'
    }).then((result) => {
      if(result.isConfirmed) {
        this.examService.deleteExam(id).subscribe(
          (data : any) => {
            this.exams = this.exams.filter((exam : any) => exam.id != id);
            Swal.fire('Exam removed', 'The exam has been successfully removed', 'success');
          },
          (error) => {
            Swal.fire('Error !!', 'Error deleting exam', 'error');
          }
        )
      }
    })
  }

}
