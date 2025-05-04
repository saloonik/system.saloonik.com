'use server';

export interface FormActionState {
  error: string;
  activeTab?: 'personal' | 'company'; // zwaracamy taba w register formie jeżeli jest błąd w danym tabie
  data?: Record<string, any>;
}

export async function loginAction(
  prevState: FormActionState,
  formData: FormData
) {
  const userData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  try {
    const response = await fetch('https://localhost:8000/login', {
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) return { ...prevState };
  } catch (err) {
    return {
      error: 'Wystąpił błąd podczas logowania.',
      data: userData,
    };
  }
  return {
    ...prevState,
  };
}

export async function registerAction(
  prevState: FormActionState,
  formData: FormData
) {
  const userData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
    companyName: formData.get('companyName') as string,
    companyAddress: formData.get('companyAddress') as string,
    companyNIP: formData.get('companyNIP') as string,
    terms: formData.get('terms') as string,
  };

  console.log(userData);

  try {
    const response = await fetch('https://localhost:8000/register', {
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        companyName: userData.companyName,
        companyAddress: userData.companyAddress,
        companyNIP: userData.companyNIP,
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) return { ...prevState };
  } catch (err) {
    return {
      error: 'Wystąpił błąd podczas rejestracji.',
      data: userData,
    };
  }
  return {
    ...prevState,
  };
}
