export function usernameValidator(username: string) {
  if (!username) {
    return "Username is required";
  }
  if (username.length <= 4) {
    return "Username must be at least 4 characters long";
  }
  if (username.length > 20) {
    return "Username must be less than 20 characters long";
  }
  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    return "Username must be alphanumeric";
  }

  return null;
}

export function passwordValidator(password: string) {
  if (!password) {
    return "Password is required";
  }
  if (password.length < 4) {
    return "Password must be at least 4 characters long";
  }
  if (password.length > 20) {
    return "Password must be less than 20 characters long";
  }
  if (!/^[a-zA-Z0-9!@#$%^&*()]+$/.test(password)) {
    return "Password must be alphanumeric";
  }

  return null;
}

export function emailValidator(email: string) {
  if (!email) {
    return "Email is required";
  }
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    return "Invalid email address";
  }
  return null;
}

export function nameValidator(name: string) {
  if (!name) {
    return "Name is required";
  }
  if (name.length < 2) {
    return "Name must be at least 2 characters long";
  }
  if (name.length > 20) {
    return "Name must be less than 20 characters long";
  }
  if (!/^[a-zA-Z]+$/.test(name)) {
    return "Name must be alphabets";
  }
  return null;
}
