export class GlobalProperties {

  public static genericError: string = 'Something went wrong. Please try again later.';

  public static nameRegx: string = '^[a-zA-Z ]+$';

  public static mobileNumberRegex: RegExp = /^\d{10}$/;

  public static salaryRegex: string = '^\\d+(\\.\\d{1,2})?$';

  public static toastrConfig = {
    maxOpened: 0,
    preventDuplicates: true,
    closeButton: true,
    timeOut: 5000,
    easing: 'ease-in',
    progrssBar: true,
    toastClass: 'ngx-toastr',
    positionClass: 'toast-top-right',
    titleClass: 'toast-title',
    messageClass: 'toast-message',
    topToDismiss: true,
  };
}