/**
 * An abstract class which provides an unified and simple interface for handling
 * forms which have a "loading" state
 */
export abstract class FormRequestHandling {
  isRequestPending = false;
  isLastRequestFailed = false;

  watchRequestState(request: Promise<any>) {
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
