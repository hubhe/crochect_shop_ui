export const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePassword = (password: string) => {
  // Password must be at least 8 characters long and contain at least one letter, one number, and may include special characters
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()-_=+{}|;:'",.<>?]{8,}$/.test(
    password
  );
};

export const validateFullName = (fullName: string) => {
  const trimmedFullName = fullName.trim(); // Remove leading and trailing whitespace
  return (
    /^[A-Za-z]+(?:-[A-Za-z]+)?(?:\s+[A-Za-z]+(?:-[A-Za-z]+)?)*$/.test(
      trimmedFullName
    ) &&
    !/\d/.test(trimmedFullName) &&
    /\s/.test(trimmedFullName)
  );
};
