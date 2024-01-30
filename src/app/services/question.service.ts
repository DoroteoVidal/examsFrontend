import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http : HttpClient) { }

  public getExamQuestions(id : any) {
    return this.http.get(`${baserUrl}/questions/exam/all/${id}`);
  }

  public addQuestion(question : any) {
    return this.http.post(`${baserUrl}/questions/`, question);
  }

  public deleteQuestion(id : any) {
    return this.http.delete(`${baserUrl}/questions/${id}`);
  }

  public updateQuestion(id : any, question : any) {
    return this.http.put(`${baserUrl}/questions/${id}`, question);
  }

  public getQuestion(id : any) {
    return this.http.get(`${baserUrl}/questions/${id}`);
  }

  public listQuestionsForExam(id : any) {
    return this.http.get(`${baserUrl}/questions/exam/all/${id}`);
  }

  public evaluateExam(questions : any) {
    return this.http.post(`${baserUrl}/questions/evaluate-exam`, questions);
  }

}
