<template>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <h3 class="text-center">Cria Transação</h3>
            <form @submit.prevent="onFormSubmit">
               
                <div class="form-group">
                    <label>Data</label>
                    <input type="date" class="form-control" v-model="transaction.data" required>
                </div>
                
                <div class="form-group">
                    <label>Descrição</label>
                    <input type="text" class="form-control" v-model="transaction.name" required>
                    
                    <label>Tipo</label>
                    <select v-model="transaction.tipo" id="tipo">
                        <option value="Receita">Receita</option>
                        <option value="Despesa">Despesa</option>
                    </select>

                    <label>Categoria</label>
                    <select v-model="transaction.categoria" id="categoria">
                        <option value="Carisia Receita">Carisia Receita </option>
                        <option value="Flavio Receita">Flavio Receita </option>
                        <option value="Casa Despesa">Casa Despesa</option>
                        <option value="Carisia Despesa">Carisia Despesa</option>
                        <option value="Flavio Despesa">Flavio Despesa</option>
                        <option value="Ativa Despesa">Ativa Despesa</option>

                    </select>


                    <label>Banco</label>
                    <select v-model="transaction.banco" id="banco">
                        <option value="BB">BB</option>
                        <option value="Caixa">Caixa</option>
                        <option value="MasterCard">MasterCard</option>
                        <option value="Visa">Visa</option>
                        <option value="Dinheiro">Dinheiro</option>

                    </select>

                </div>
                

                <div class="form-group">
                    <label>Valor</label>
                    <input type="number" class="form-control" v-model="transaction.valor" 
                    required pattern="[0-9]+([,\.][0-9]+)?" min="0" step="any" name="null">
                </div>

                <div class="form-group">
                    <button class="btn btn-primary btn-block">Cria transação</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import { db } from '../firebaseDb';

    export default {
        data() {
            return {
                transaction: {
                    valor:0.00,
                    tipo:"Despesa",
                    categoria:"Casa Despesa",
                    banco:"BB"
                    
                
                 }
            }
        },
        methods: {
            onFormSubmit(event) {
                event.preventDefault()
            

                if(this.transaction.tipo=="Despesa"){this.transaction.valor=-this.transaction.valor}

                db.collection('transactions').add(this.transaction).then(() => {
                    this.$router.push('/')
                    this.transaction.name = ''
                    this.transaction.data = new Date()
                    this.transaction.tipo = 'Despesa'
                    this.transaction.categoria = ''
                    this.transaction.valor = 0.0
                    this.transaction.banco = 'BB'
                }).catch((error) => {
                    console.log(error);

                });
            },

        }
    }
</script>