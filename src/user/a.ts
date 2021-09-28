class a {
  constructor(private b: b) {}
  goodbye() {
    return this.b.hello();
  }
}

class b {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(public num: number) {}
  hello() {
    return 'hello';
  }
}

const d = new b(2);

const c = new a(d);
console.log(c.goodbye());
