import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import StepsList from "../pages/private/Steps/StepsList";
import StepRegister from "../pages/private/Steps/StepRegister";
import ProjectsList from "../pages/private/Projects/ProjectsList";
import ProjectRegister from "../pages/private/Projects/ProjectRegister";
import DetailsList from "../pages/private/Details/DetailsList";
import DetailRegister from "../pages/private/Details/DetailRegister";
import ProjectMenu from "../pages/private/ProjectMenu/ProjectMenu";
import BudgetList from "../pages/private/Budget/BudgetList";
import BudgetRegister from "../pages/private/Budget/BudgetRegister";
import BudgetListItems from "../pages/private/BudgetItems/BudgetListItems";
import BudgetItemRegister from "../pages/private/BudgetItems/BudgetItemRegister";
import StepMenu from "../pages/private/StepMenu/StepMenu";
import PictureCamera from "../pages/private/Picture/PictureCamera";
import PictureList from "../pages/private/Picture/PictureList";
import Home from "../pages/private/Home";
import PictureGallery from "../pages/private/Picture/PictureGallary";
import PaymentsList from "../pages/private/Payments/PaymentsList";
import PaymentRegister from "../pages/private/Payments/PaymentRegister";

// function LogoTitle() {
//     return (
//       <Image
//         style={{ width: 50, height: 50 }}
//         source={require('@expo/snack-static/react-native-logo.png')}
//       />
//     );
//   }

const AppStack = createStackNavigator();

// Rota de navigação Entre Home - Projetos - Etapas
function AppNavigator() {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: "#FFF", //"#3C4858",
        headerStyle: {
          backgroundColor: "#1FB6FF" //"#FF9E7C" //"#F7F7F7"
        }
      }}
    >
      <AppStack.Screen
        name="Home"
        component={Home}
        options={{
          title: "GerenciArqui"
        }}
      />

      <AppStack.Screen
        name="Steps"
        component={StepsList}
        options={{
          title: "Todas as Etapas"
        }}
      />

      <AppStack.Screen
        name="StepRegister"
        component={StepRegister}
        options={{
          title: "Nova Etapa"
        }}
      />

      <AppStack.Screen
        name="Projects"
        component={ProjectsList}
        options={{
          title: "Meus Projetos"
        }}
      />

      <AppStack.Screen
        name="ProjectRegister"
        component={ProjectRegister}
        options={{
          title: "Novo Projeto"
        }}
      />

      <AppStack.Screen
        name="Details"
        component={DetailsList}
        options={{
          title: "Todos os detalhes"
        }}
      />

      <AppStack.Screen
        name="DetailRegister"
        component={DetailRegister}
        options={{
          title: "Novo Detalhe"
        }}
      />

      <AppStack.Screen
        name="ProjectMenu"
        component={ProjectMenu}
        options={({ route }) => ({
          title: route.params.title
          //title: "Projeto Atual"
        })}
      />

      <AppStack.Screen
        name="Budgets"
        component={BudgetList}
        options={{
          title: "Todos os orçamentos"
        }}
      />

      <AppStack.Screen
        name="BudgetRegister"
        component={BudgetRegister}
        options={{
          title: "Novo Orçamento"
        }}
      />

      <AppStack.Screen
        name="BudgetListItems"
        component={BudgetListItems}
        options={{
          title: "Todos os itens"
        }}
      />

      <AppStack.Screen
        name="BudgetItemRegister"
        component={BudgetItemRegister}
        options={{
          title: "Novo item"
        }}
      />

      <AppStack.Screen
        name="StepMenu"
        component={StepMenu}
        options={({ route }) => ({
          title: route.params.title
        })}
      />

      <AppStack.Screen
        name="PictureCamera"
        component={PictureCamera}
        options={{
          title: "Câmera"
        }}
      />

      <AppStack.Screen
        name="PictureList"
        component={PictureList}
        options={{
          title: "Todas as imagens"
        }}
      />

      <AppStack.Screen
        name="PictureGallery"
        component={PictureGallery}
        options={{
          title: "Procurar Imagem"
        }}
      />

      <AppStack.Screen
        name="PaymentRegister"
        component={PaymentRegister}
        options={{
          title: "Novo Pagamento"
        }}
      />

      <AppStack.Screen
        name="PaymentsList"
        component={PaymentsList}
        options={{
          title: "Todos os pagamentos"
        }}
      />
    </AppStack.Navigator>
  );
}

export default AppNavigator;
