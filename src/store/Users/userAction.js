// Atualiza o estado usuário
export const UserAction = ({ authenticate, profissional, user, token }) => ({
  type: 'UPDATE_USER',
  payload: {
    authenticate,
    profissional,
    user,
    token
  }
});
