import { BehaviorSubject } from 'rxjs';

export interface ContextMenuState {
  visible: boolean;
  position: { x: number; y: number };
  items: { label: string; onClick: () => void }[];
}

export class ContextMenuService {
  private stateSubject = new BehaviorSubject<ContextMenuState>({
    visible: false,
    position: { x: 0, y: 0 },
    items: [],
  });

  stateSubject$ = this.stateSubject.asObservable();

  showMenu(position: { x: number; y: number }, items: { label: string; onClick: () => void }[]) {
    this.stateSubject.next({ visible: true, position, items });
  }

  hideMenu() {
    this.stateSubject.next({ visible: false, position: { x: 0, y: 0 }, items: [] });
  }
}

export function createContextMenuService() {
  return new ContextMenuService();
}
