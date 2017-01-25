import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import { Question } from '../../pages/pages'
@Injectable()

export class QuestionService {

  private url: string = 'http://localhost:3000/api/questions/';

  constructor(private http: Http) {
    console.log('Question Service Initialized')
  }

  getQuestions(): Observable<any> {
    return this.http.get(this.url).flatMap((res: Response) => <any>res.json().filter(res => res._id != null));
  }

  /*get all questions*/
  getQuestionList(): Observable<any[]> {
    return this.http.get(this.url).map((res: Response) => <any[]>res.json());
  }
  /*delete a quesstion*/
  deleteQuestion(questionId: string):Observable<any> {
    return this.http.delete(this.url + questionId).map(res => <any>res.json()
      .filter(q => q.id == questionId))
  }
  /*insert new question*/
  submitNewQuestion(newQuestion: Question): Observable<any> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let fileObj = { "title": newQuestion.title, "subject": newQuestion.subject }

    return this.http.post(this.url,
      JSON.stringify(fileObj), options
    ).map(res => res.json()).catch(this.handleError);
  }
  /*error handler*/
  private handleError(error: Response | any) {

    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
