import{ErrorHandler} from "@angular/core";
import{NgModule} from "@angular/core";
export class MyErrorHandler implements ErrorHandler {

    call(error: any, stackTrace: any = null, reason: any = null) {
        // do something with the exception
        console.log("do something with the exception");
    }

    // I handle the given error.
    public handleError( error: any ): void {
        console.log("I handle the given error", error);
    }

}