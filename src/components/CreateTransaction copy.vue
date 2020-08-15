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
                        <option value="Receita Carisia">Receita Carisia</option>
                        <option value="Receita Flavio">Receita Flavio</option>
                        <option value="Despesa Casa">Despesa Casa</option>
                        <option value="Despesa Carisia">Despesa Carisia</option>
                        <option value="Despesa Flavio">Despesa Flavio</option>

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
                    categoria:"Despesa Casa",
                    data: new Date().now()
                
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
                    this.transaction.data = new Date().now()
                    this.transaction.tipo = 'Despesa'
                    this.transaction.categoria = ''
                    this.transaction.valor = 0.0
                }).catch((error) => {
                    console.log(error);

                });
            },

        }
    }
</script>