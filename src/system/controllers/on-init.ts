export function hasControllerImplementedOnInit(controller: any): boolean {
  return !!controller['onInit'];
}

export interface OnInit {
  onInit(): void;
}
