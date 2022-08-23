export function hasObjectImplementedOnInit(obj: any) {
  return !!obj['onInit'];
}

export interface OnInit {
  onInit(): void;
}
