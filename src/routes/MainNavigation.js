import React from "react";
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "../routes/AuthNavigator";
import AppNavigator from "../routes/AppNavigator";

// Cria o menu de navegação
// Autenticação e Cadastro
// const MainNavigator = NavigationContainer(
//   // Cria tabNavigator
//   createSwitchNavigator(
//     // Configura navegação
//     {
//       Auth: AuthNavigator,
//       App: AppNavigator
//     },
//     {
//       // Rota de navegação inicial
//       initialRouteName: "Auth"
//     }
//   )
// );

function MainNavigator(props) {
  const { userLogin } = props;
  const { authenticate } = userLogin;

  return (
    <NavigationContainer>
      {authenticate ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

const mapStateToProps = state => {
  const { userLogin } = state;
  return { userLogin };
};

export default connect(mapStateToProps)(MainNavigator);
