// Atualiza a lista de projeto do arquiteto
export const ProjectListAction = ({ projects }) => ({
  type: "UPDATE_PROJECT_LIST",
  payload: {
    projects
  }
});

// Atualiza o projeto atual selecionado na lista de projetos
export const ProjectCurrentAction = ({ project }) => ({
  type: "UPDATE_PROJECT_CURRENT",
  payload: {
    project
  }
});

// Atualiza a lista de etapas
export const StepsCurrentAction = ({ steps }) => ({
  type: "UPDATE_STEPS_LIST",
  payload: {
    steps
  }
});

// Atualiza a lista de etapas
export const StepCurrentAction = ({ step }) => ({
  type: "UPDATE_STEP_CURRENT",
  payload: {
    step
  }
});

// Recarrega lista consultando a api
export const ReloadAction = ({ reload }) => ({
  type: "UPDATE_RELOAD",
  payload: {
    reload
  }
});

// atualiza o estado com o orçamento atual
export const BudgetCurrentAction = ({ budget }) => ({
  type: "UPDATE_BUDGET",
  payload: {
    budget
  }
});
