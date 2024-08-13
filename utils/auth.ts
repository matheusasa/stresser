export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem("token"); // Verifica a chave correta
    return !!token; // Retorna true se o token estiver presente, caso contrário, false
  };

export const signOut = async (): Promise<void> => {
  try {
    const response = await fetch('/api/auth/signout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to sign out');
    }
    localStorage.removeItem('token'); 
    // Redireciona para a página de login ou qualquer outra página
    window.location.href = '/login';
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

export const fetchUserData = async (): Promise<string | null> => {
  try {
    const response = await fetch('/api/user');
    if (!response.ok) {
      throw new Error('Erro ao obter dados do usuário');
    }
    const data = await response.json();
    return data.user?.id || null; // Retorna o ID do usuário ou null se não encontrado
  } catch (error) {
    console.error('Erro ao obter ID do usuário:', error);
    return null;
  }
};