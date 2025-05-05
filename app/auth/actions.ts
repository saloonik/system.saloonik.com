'use server';

import { RegisterFormTabs } from './register/register-form';

export interface FormActionState {
  error: string;
  data: Record<string, any>;
  activeTab?: RegisterFormTabs;
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
    name: prevState.data.name,
    email: prevState.data.email,
    password: prevState.data.password,
    confirmPassword: prevState.data.confirmPassword,
    companyName: formData.get('companyName') as string,
    companyAddress: formData.get('companyAddress') as string,
    companyNIP: formData.get('companyNIP') as string,
    terms: formData.get('terms') === 'true',
  };

  console.log(userData);
  if (prevState.data.password !== prevState.data.confirmPassword) {
    return {
      error: 'Hasła nie są zgodne.',
      data: userData,
      activeTab: RegisterFormTabs.PERSONAL,
    };
  }

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
    data: userData,
  };
}
