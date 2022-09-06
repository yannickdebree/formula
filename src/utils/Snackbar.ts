type SnackbarOptions = {
  message: string;
};

export class Snackbar {
  open(options: SnackbarOptions) {
    alert(options.message);
  }
}
