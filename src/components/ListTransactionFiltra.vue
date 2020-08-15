<template>
    <div class="row">
        <div class="col-md-12">
            <div class="col-md-12">   Selecione o Filtro desejado</div>
            <div class="search-wrapper panel-heading col-sm-12">
                <input class="form-control" type="text" v-model="searchTipo" placeholder="Digite Tipo" />
            </div> 
            <div class="search-wrapper panel-heading col-sm-12">
                <input class="form-control" type="text" v-model="searchCategoria" placeholder="Digite Categoria" />
            </div> 
            <div class="search-wrapper panel-heading col-sm-12">
                <input class="form-control" type="text" v-model="searchBanco" placeholder="Digite Banco" />
            </div> 
            <table class="table table-striped">
                <thead>

                    <tr>
                        <th>>Data</th>
                        <th>>Descrição </th>
                        <th>Tipo</th>
                        <th>Categoria</th>
                        <th>Banco</th>
                        <th >Valor</th>
                        <th></th>
                    </tr>
                    
                        <tr>

                            <td></td>
                            <td></td>
                            <td></td>
                            <td><b>Total </b></td>
                            <td></td>
                            <td align="right"> <b> {{parseFloat(calculaTotal()).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}} </b></td>
                        </tr>

                </thead>
                <tbody>
                        
                        <tr v-for="transaction in filtraTransactions" :key="transaction.key">
                            <td>{{ transaction.data }}</td>
                            <td>{{ transaction.name }}</td>
                            <td>{{ transaction.tipo }}</td>
                            <td>{{ transaction.categoria }}</td>
                            <td>{{ transaction.banco }}</td>
                            <td align="right">{{ parseFloat(transaction.
                                valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</td>
                            <td>
                                <router-link :to="{name: 'edit', params: { id: transaction.key }}" class="btn btn-primary">Edita
                                </router-link>
                                <button @click.prevent="deletetransaction(transaction.key)" class="btn btn-danger">Apaga</button>
                            </td>
                        </tr>



                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import { db } from '../firebaseDb';
    import moment from 'moment'
    //import sortBy from 'sort-by'
    //import _ from 'lodash'
    
    export default {
        data() {
            return {
                transactions: [],
                total:0,

                searchTipo:'',
                searchCategoria:'',
                searchBanco:'' ,
               
            }
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
                filtraTransactions (){
                    if(this.searchTipo){
                        return this.transactions.filter((transaction)=>{
                            let filtered = transaction.tipo.startsWith(this.searchTipo);
                            return filtered
                        })
                    }
                    else if(this.searchCategoria){
                        return this.transactions.filter((transaction)=>{
                        let filtered = transaction.categoria.startsWith(this.searchCategoria);
                        return filtered
                        })
                    }
                    else if(this.searchBanco){
                        return this.transactions.filter((transaction)=>{
                        let filtered = transaction.banco.startsWith(this.searchBanco);
                        
                        return filtered
                        })
                    }
                    else{
                        return this.transactions
                       
                    }
                },

        },
        
 
        methods: {
            deletetransaction(id){
              if (window.confirm("Tem certeza?")) {
                db.collection("transactions").doc(id).delete().then(() => {
                    console.log("Documento apagado!");
                })
                .catch((error) => {
                    console.error(error);
                })
              }
            },

            calculaTotal(){
                let amounts = this.filtraTransactions.map(transaction => transaction.valor);
                this.total = amounts.reduce((acc, item) => (acc += parseFloat(item)), 0).toFixed(2);
                return this.total
            },


                
        }
    }
</script>

<style>
    .btn-primary {
        margin-right: 12px;
    }
</style>

