'use client';

import type { User } from '@/types/user';



import axiosInstance from '../../services/axiosInstance';


function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

const user = {
  id: 'USR-000',
  avatar: '/assets/avatar.png',
  firstName: 'Sofia',
  lastName: 'Rivers',
  email: 'john.doe@example.com',
} satisfies User;

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

export interface UpdatePasswordParams {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

class AuthClient {
  async signUp(_: SignUpParams): Promise<{ error?: string }> {
    // Make API request

    // We do not handle the API, so we'll just generate a token and store it in localStorage.
    const token = generateToken();
    localStorage.setItem('custom-auth-token', token);

    return {};
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: 'Social authentication not implemented' };
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    try {
      const { email, password } = params;

      // Make API request to sign in
      const response = await axiosInstance.post(`/users/login`, {
        email,
        password,
        isAdmin: true,
      });

      // Handle successful response
      const responseData = response.data.data;

      localStorage.setItem('custom-auth-token', responseData.token);

      return {}; // No error if successful
    } catch (error: any) {
      // Handle error
      if (error.response && error.response.data) {
        console.error('Error signing in:', error.response.data);
        return { error: error.response.data?.message || 'Invalid credentials' };
      } else {
        console.error('Error signing in:', error);
        return { error: 'An error occurred while signing in' };
      }
    }
  }

  async resetPassword(params: ResetPasswordParams): Promise<{ error?: string }> {
    try {
      const { email } = params;

      await axiosInstance.post(`/users/forgotPassword`, {
        email,
      });

      return {}; // No error if successful
    } catch (error: any) {
      // Handle error
      if (error.response && error.response.data) {
        console.error('Error forgetting:', error.response.data);
        return { error: error.response.data?.message || 'Invalid email' };
      } else {
        console.error('Error forgetting:', error);
        return { error: 'An error occurred while requesting' };
      }
    }
  }

  async confirmResetPassword(params: any, token: string): Promise<{ error?: string }> {
    try {
      const response = await axiosInstance.patch(`/users/resetpassword/${token}`, params);

      // Handle successful response
      const responseData = response.data.data;

      localStorage.setItem('custom-auth-token', responseData.token);
      return {}; // No error if successful
    } catch (error: any) {
      // Handle error
      if (error.response && error.response.data) {
        console.error('Error forgetting:', error.response.data);
        return { error: error.response.data?.message || 'Invalid Error' };
      } else {
        console.error('Error forgetting:', error);
        return { error: 'An error occurred while requesting' };
      }
    }
  }

  async addUser(params: any): Promise<{ error?: string }> {
    try {
      await axiosInstance.post(`/users/add-user`, params);

      return {}; // No error if successful
    } catch (error: any) {
      // Handle error
      if (error.response && error.response.data) {
        console.error('Error forgetting:', error.response.data);
        return { error: error.response.data?.message || 'Invalid Error' };
      } else {
        console.error('Error forgetting:', error);
        return { error: 'An error occurred while requesting' };
      }
    }
  }

  async updateStatus(params: any, id: any): Promise<{ error?: string }> {
    try {
      await axiosInstance.patch(`/users/update-status/${id}`, params);

      return {}; // No error if successful
    } catch (error: any) {
      // Handle error
      if (error.response && error.response.data) {
        console.error('Error forgetting:', error.response.data);
        return { error: error.response.data?.message || 'Invalid Error' };
      } else {
        console.error('Error forgetting:', error);
        return { error: 'An error occurred while requesting' };
      }
    }
  }

  async deleteUser(params: any, id: any): Promise<{ error?: string }> {
    try {
      await axiosInstance.delete(`/users/${id}`, params);

      return {}; // No error if successful
    } catch (error: any) {
      // Handle error
      if (error.response && error.response.data) {
        console.error('Error forgetting:', error.response.data);
        return { error: error.response.data?.message || 'Invalid Error' };
      } else {
        console.error('Error forgetting:', error);
        return { error: 'An error occurred while requesting' };
      }
    }
  }

  async updatePassword(params: UpdatePasswordParams): Promise<{ error?: string }> {
    try {
      const { currentPassword, newPassword, newPasswordConfirm } = params;

      await axiosInstance.post(`/users/updatePassword`, {
        currentPassword,
        newPassword,
        newPasswordConfirm,
      });

      return {}; // No error if successful
    } catch (error: any) {
      // Handle error
      if (error.response && error.response.data) {
        console.error('Error forgetting:', error.response.data);
        return { error: error.response.data?.message || 'Invalid password' };
      } else {
        console.error('Error forgetting:', error);
        return { error: 'An error occurred while requesting' };
      }
    }
  }

  async updateProfile(params: any, id: any): Promise<{ error?: string }> {
    try {
      await axiosInstance.patch(`/users/${id}`, params);

      return {}; // No error if successful
    } catch (error: any) {
      // Handle error
      if (error.response && error.response.data) {
        console.error('Error forgetting:', error.response.data);
        return { error: error.response.data?.message || 'Invalid error' };
      } else {
        console.error('Error forgetting:', error);
        return { error: 'An error occurred while requesting' };
      }
    }
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    // Make API request

    // We do not handle the API, so just check if we have a token in localStorage.
    const token = localStorage.getItem('custom-auth-token');

    if (!token) {
      return { data: null };
    }

    try {
      const userResponse = await axiosInstance.get(`/users/`);

      return { data: userResponse.data.data.user };
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        // Clear local storage if error code is 401
        localStorage.removeItem('custom-auth-token');
      }

      return { error: error.message }; // You might want to handle the error better
    }
  }

  async getAllUser(): Promise<{ AllUsers?: User[] | null; error?: string }> {
    // Make API request

    // We do not handle the API, so just check if we have a token in localStorage.
    const token = localStorage.getItem('custom-auth-token');

    if (!token) {
      return { AllUsers: null };
    }

    const userResponse = await axiosInstance.get(`/users/AllUsers`);

    return { AllUsers: userResponse?.data?.data?.users };
  }

  async getActiveUsers(): Promise<{ AllActiveUsers?: User[] | null; error?: string }> {
    // Make API request

    // We do not handle the API, so just check if we have a token in localStorage.
    const token = localStorage.getItem('custom-auth-token');

    if (!token) {
      return { AllActiveUsers: [] };
    }

    const userResponse = await axiosInstance.get(`/users/active`);

    return { AllActiveUsers: userResponse?.data?.data?.users };
  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('custom-auth-token');

    return {};
  }
}

export const authClient = new AuthClient();