export abstract class FormRequestHandling{
  isRequestPending: boolean = false;
  isLastRequestFailed: boolean = false;

  watchRequestState(request: Promise<any>){
    this.isRequestPending = true;

    request.then(
      (success) => {
        this.isLastRequestFailed = false;
        this.isRequestPending = false;
      },
      (error) => {
        this.isLastRequestFailed = true;
        this.isRequestPending = false;
      }
    );
  }

}
