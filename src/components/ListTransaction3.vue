<template>
  <div id="app">
    <SortedTable :values="this.transactions">
      <thead>
        <tr>
          <th scope="col" style="text-align: left; width: 10rem;">
            <SortLink name="data">Data</SortLink>
          </th>
          <th scope="col" style="text-align: left; width: 10rem;">
            <SortLink name="name">Nome</SortLink>
          </th>
          <th scope="col" style="text-align: left; width: 10rem;">
              <select v-model="selectedTipo" >
                <option value = "Receita">Receita</option>
                <option value = "Despesa">Despesa</option>
              </select>
          </th>
          <th scope="col" style="text-align: left; width: 10rem;">
              <select v-model="selectedCategoria" >
                <option value = "Casa Despesa">Casa Despesa</option>
                <option value = "Carisia Despesa">Carisia Despesa</option>
                <option value = "Flavio Despesa">Flavio Despesa</option>
                <option value = "Carisia Receita">Carisia Receita</option>
                <option value = "Flavio Receita">Flavio Receita</option>
              </select>
          </th>
          <th scope="col" style="text-align: left; width: 10rem;">
              <select v-model="selectedBanco" >
                <option value = "BB">BB</option>
                <option value = "Caixa">Caixa</option>
              </select>
          </th>
        </tr>
      </thead>
      <tbody slot="body" slot-scope="sort">
        <tr v-for="transaction in sort.computed_transactions" :key="transaction.id">
          <td>{{ transaction.data }}</td>
          <td>{{ transaction.name }}</td>
          <td>{{ transaction.tipo }}</td>
          <td>{{ transaction.categoria }}</td>
          <td>{{ transaction.banco }}</td>
          <td>{{ transaction.valor }}</td>
        </tr>
      </tbody>
    </SortedTable>
  </div>
</template>

<script>
    import { db } from '../firebaseDb';
    import moment from 'moment'

    export default {
    name: "App",
    data: function() {
        return {
          selectedTipo: 'Despesa',
          selectedCategoria: 'Casa Despesa',
          selectedBanco: 'BB',
          transactions: [],
          total:0,

        };
    },

    created() 
    {  
        db.collection('transactions').onSnapshot((snapshotChange) => {
            this.transactions = [];
            snapshotChange.forEach((doc) => {
                this.transactions.push({
                    key: doc.id,
                    name: doc.data().name,
                    data: moment(doc.data().data).format('DD-MM-YYYY'),
                    tipo: doc.data().tipo,
                    categoria: doc.data().categoria,
                    banco: doc.data().banco,
                    valor: doc.data().valor
                })
                
            });

        })
        
    },

    computed: {
      computed_transactions() {
        let filterTipo= this.selectedTipo,
            filterCategoria = this.selectedCategoria
            //filterBanco = this.selectedBanco
        return this.transactions.filter(function(transaction){
          let filtered = true
          if(filterTipo && filterTipo.length > 0){
            filtered = transaction.tipo == filterTipo
          }
          if(filtered){
            if(filterCategoria && filterCategoria.length > 0){
              filtered = transaction.categoria == filterCategoria
            }
          }
          return filtered
        })
      }
    }
  }

</script>