import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";
import authService from "@/services/authService";
import { useRouter } from "next/navigation";

/**
 * Authentication Hook for seamless Login/Signup logic
 * Combining React Query mutations with Zustand state management
 */

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setAuth, logout: localLogout } = useAuthStore();

  /**
   * LOGIN MUTATION
   */
  const loginMutation = useMutation({
    mutationFn: (credentials) => authService.login(credentials),
    onSuccess: (data) => {
      // Data expected to have: { user, token }
      setAuth(data.user, data.token);
      
      // Clear cache for related queries (if needed)
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });

      // Professional redirection after login
      router.push("/dashboard");
    },
    onError: (error) => {
      // Error is already formatted in axios interceptor: { message, status }
      console.error("Login failed:", error.message);
    }
  });

  /**
   * REGISTER MUTATION
   */
  const registerMutation = useMutation({
    mutationFn: (userData) => authService.register(userData),
    onSuccess: (data) => {
      // Auto-login after registration (optional, but typical)
      setAuth(data.user, data.token);
      router.push("/home"); // Redirect as per your flow
    },
     onError: (error) => {
      console.error("Registration failed:", error.message);
    }
  });

  /**
   * LOGOUT LOGIC
   */
  const logout = async () => {
    try {
      await authService.logout();
      localLogout();
      router.push("/login");
    } catch (error) {
       // local logout anyway for better UX
      localLogout();
      router.push("/login");
    }
  };

  return {
    login: loginMutation.mutate,
    isLoginLoading: loginMutation.isPending,
    loginError: loginMutation.error,
    
    register: registerMutation.mutate,
    isRegisterLoading: registerMutation.isPending,
    registerError: registerMutation.error,

    logout
  };
};
