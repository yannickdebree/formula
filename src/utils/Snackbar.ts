type SnackbarOptions = {
  message: string;
};

export class Snackbar {
  open(options: SnackbarOptions) {
    console.log(options);
  }
}
