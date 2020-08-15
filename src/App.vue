<template>
  <div>

    <nav class="navbar navbar-dark bg-dark justify-content-between flex-nowrap flex-row">
      <div class="container">
        <a class="navbar-brand float-left">Gestão de Receitas e Despesas</a>
        <ul class="nav navbar-nav flex-row float-left">
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/add">Nova Transação</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/">Balanço</router-link>
          </li>
          <li> -- </li>
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/resultado">Resultado</router-link>
          </li>
         
        </ul>
  
      </div>
    </nav>


    <div class="container mt-5">
      <router-view></router-view>
    </div>
  </div>
</template>