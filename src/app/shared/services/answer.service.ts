import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx'
import { Answer } from '../../pages/pages';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AnswerService {

  private url: string = 'http://localhost:3000/api/answers/'

  constructor(private http: Http) {
    console.log('Answer Service Initialized')
  }
  
 /*Retrieve all answers associated with the question*/
  getAnswers(questionid: string): Observable<any> {

    return this.http.get(this.url)
      .switchMap((res: any) => <any>res.json()
        .filter(a => a.questionid === questionid))
  };

  /*Delete request*/
  deleteAnswers(answerIds: any[]): Observable<any> {

    return Observable.from(answerIds).flatMap(a => {
      return this.http.delete(this.url + a).map(res => res.json())
    })
  }

  /*Post Request*/
  submitNewAnswers(answers: Answer[]): Observable<any> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return Observable.from(answers).flatMap(a => {

      let newAnswerObject = {
        "questionid": a.questionId, "answer": a.answer, "iscorrect": a.isCorrect
      }

      return this.http.post(this.url, JSON.stringify(newAnswerObject), options)
        .map(res => res.json()).catch(this.handleError);
    })
  }


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
