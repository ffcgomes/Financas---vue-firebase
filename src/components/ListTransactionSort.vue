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
          <th scope="col" style="text-align: left; width: 10rem;">Tipo</th>
            <th scope="col" style="text-align: left; width: 10rem;">Categoria</th>
            <th scope="col" style="text-align: left; width: 10rem;">Banco</th>
            <th scope="col" style="text-align: left; width: 10rem;">Valor</th>
        </tr>
      </thead>
      <tbody slot="body" slot-scope="sort">
        <tr v-for="value in sort.values" :key="value.id">
          <td>{{ value.data }}</td>
          <td>{{ value.name }}</td>
          <td>{{ value.tipo }}</td>
          <td>{{ value.categoria }}</td>
          <td>{{ value.banco }}</td>
          <td>{{ value.valor }}</td>
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
        transactions: [],
            total:0,
            searchTipo:'',
            searchCategoria:'',
            searchBanco:'' ,

        values: [
            { name: "Plugin Foo", id: 2, hits: 33 },
            { name: "Plugin Bar", id: 1, hits: 42 },
            { name: "Plugin Foo Bar", id: 3, hits: 79 }
        ]
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
            
        }
    };


</script>