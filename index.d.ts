type Ret = void | Generator<void> | Promise<void>

type Fn =
  | ((req: any, res: any, next: any) => Ret)
  | ((err: any, req: any, res: any, next: any) => Ret)

export default function expressModern(fn: Fn): (...args: any[]) => void
