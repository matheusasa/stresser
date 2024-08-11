export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem("token"); // Verifica a chave correta
    return !!token; // Retorna true se o token estiver presente, caso contrário, false
  };
  
  export const signOut = (): void => {
    localStorage.removeItem('token'); // Remove o token usando a chave correta
    window.location.href = '/login'; // Redireciona para a página de login (ou qualquer outra página)
  };
  