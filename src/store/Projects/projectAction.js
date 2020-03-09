// Atualiza o projeto atual selecionado na lista de projetos
export const ProjectCurrentAction = ({ project }) => ({
  type: 'UPDATE_PROJECT',
  payload: {
    project
  }
});

// Atualiza a lista de etapas
export const StepCurrentAction = ({ step }) => ({
  type: 'UPDATE_STEP',
  payload: {
    step
  }
});

// atualiza o estado com o orçamento atual
export const BudgetCurrentAction = ({ budget }) => ({
  type: 'UPDATE_BUDGET',
  payload: {
    budget
  }
});

export const PaymentCurrentAction = ({ payment }) => ({
  type: 'UPDATE_PAYMENT',
  payload: {
    payment
  }
});
