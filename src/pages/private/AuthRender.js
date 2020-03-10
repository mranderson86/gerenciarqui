import React from 'react';

// Renderiza apenas elementos Autorizados ao usuário.
function AuthRender(props) {
  return <>{props.auth ? props.children : <></>}</>;
}

export default AuthRender;
