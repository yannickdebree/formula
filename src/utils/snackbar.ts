type SnackbarOptions = {
  message: string;
};

export default class Snackbar {
  open(options: SnackbarOptions): void {
    alert(options.message);
  }
}
