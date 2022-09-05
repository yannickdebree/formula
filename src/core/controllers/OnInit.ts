export function hasControllerImplementedOnInit(controller: any) {
  return !!controller['onInit'];
}

export interface OnInit {
  onInit(): void;
}
