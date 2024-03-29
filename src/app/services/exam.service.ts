import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http : HttpClient) { }

  public getExams() {
    return this.http.get(`${baserUrl}/exams/`);
  }

  public addExam(exam : any) {
    return this.http.post(`${baserUrl}/exams/`, exam);
  }

  public deleteExam(id : any) {
    return this.http.delete(`${baserUrl}/exams/${id}`);
  }

  public getExam(id : any) {
    return this.http.get(`${baserUrl}/exams/${id}`);
  }

  public updateExam(id : any, exam : any) {
    return this.http.put(`${baserUrl}/exams/${id}`, exam);
  }

  public getCategoryExams(id : any) {
    return this.http.get(`${baserUrl}/exams/category/${id}`);
  }

  public getActiveExams() {
    return this.http.get(`${baserUrl}/exams/active`);
  }

  public getActiveExamsOfCategory(id : any) {
    return this.http.get(`${baserUrl}/exams/category/active/${id}`);
  }

}
