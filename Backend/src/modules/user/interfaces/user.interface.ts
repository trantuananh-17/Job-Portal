class User {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

class SignUp extends User {
  name: string;

  constructor(email: string, password: string, name: string) {
    super(email, password);
    this.name = name;
  }
}

export { User, SignUp };
