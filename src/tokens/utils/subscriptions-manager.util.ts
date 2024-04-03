import {Subscription} from "rxjs";
import { v4 as uuidv4 } from 'uuid';

export class SubscriptionsManagerUtil {
  private subs = new Map<string, Subscription>();

  public add(sub?: Subscription): void;
  public add(sub?: Subscription, name?: string): void {
    if (name == null || name === '') {
      name = uuidv4();
    }
    if (sub) {
      this.subs.set(name, sub);
    }
  }

  public get(name: string): Subscription | undefined {
    return this.subs.get(name);
  }

  public clear(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
