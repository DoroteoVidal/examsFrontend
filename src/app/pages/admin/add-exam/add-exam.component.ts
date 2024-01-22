import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ExamService } from 'src/app/services/exam.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css']
})
export class AddExamComponent implements OnInit {

  categories : any = [];

  examData = {
    title : '',
    description : '',
    maxPoints : '',
    numberOfQuestions : '',
    active : true,
    category : {
      id : ''
    }
  }

  constructor(
    private categoryService : CategoryService, 
    private snack : MatSnackBar,
    private examService : ExamService,
    private router : Router) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (data : any) => {
        this.categories = data;
        console.log(this.categories)
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error loading data', 'error');
      }
    )
  }

  addExam() {
    console.log(this.examData);
    if(this.examData.title.trim() == '' || this.examData.title == null) {
      this.snack.open('Title is required', '' ,{
        duration : 3000
      })
      return;
    }

    this.examService.addExam(this.examData).subscribe(
      (data : any) => {
        console.log(data);
        Swal.fire('Added exam', 'The exam has been added successfully', 'success');
        this.examData = {
          title : '',
          description : '',
          maxPoints : '',
          numberOfQuestions : '',
          active : true,
          category : {
            id : ''
          }
        }
        this.router.navigate(['/admin/exams'])
      },
      (error) => {
        Swal.fire('Error !!', 'Error when saving exam', 'error');
      }
    )
  }

}
